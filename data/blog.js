// Flipeet Pay Case Study
const flipeetPayCaseStudy = {
	title: 'Building a Stablecoin Payment Stack for Africa: Inside Flipeet Pay',
	slug: 'flipeet-pay-stablecoin-infrastructure',
	date: '2026-04-04',
	readTime: '16 min',
	author: 'Precious Okolo',
	excerpt: "Cross-border payments in Africa are slow, expensive, and unprogrammable. Here's how Flipeet Pay's dual-rail stablecoin infrastructure works under the hood: the multi-provider ramp abstraction, the live MongoDB-to-PostgreSQL migration, and the Stellar self-custody system that gives every user their own on-chain wallet without the reserve-cost problem eating the margins.",
	tags: [
		'Fintech',
		'Stellar',
		'PostgreSQL',
		'NestJS',
		'Payments',
		'Web3',
		'Backend Engineering',
	],
	featured: true,
	category: 'Fintech',
	content: `# Building a Stablecoin Payment Stack for Africa: Inside Flipeet Pay

*A technical walkthrough of the architecture decisions, engineering tradeoffs, and real problems we solved building a dual-rail fintech system from the ground up.*

---

Cross-border money movement in Africa is an exercise in patience. Transfer fees vanish into four layers of correspondent banking. Exchange rates get quoted at whatever spread the intermediary feels like that day. Settlement takes working days instead of seconds, and there's rarely a programmable interface to build anything on top of it. If you've ever tried sending money from Lagos to London, or gotten paid as a Nigerian freelancer by a client in New York, you know the friction isn't a minor annoyance. It's the whole experience.

That frustration was the founding premise of Flipeet Pay.

## What We Built

Flipeet Pay is two products sharing one backend: a consumer stablecoin wallet with on/off-ramp to Nigerian banks, and a merchant payment layer that other businesses can build on top of the same rails. Individual users hold USDC and USDT, convert to and from NGN, pay utility bills, buy airtime, and send money that's denominated in stablecoin but settles wherever the recipient actually needs it. The merchant layer exposes most of that as a white-label API, with virtual account provisioning, webhook delivery, and API key management, so other businesses can build on our infrastructure without touching the plumbing underneath.

It's the same database, the same transaction ledger, and the same liquidity providers, underneath two very different customer surfaces.

This isn't a marketing piece. It's a record of the engineering decisions that shaped the system: what we chose, what we ruled out, and what the tradeoffs actually cost us.

---

## System Architecture

The API is a NestJS monolith deployed on AWS, backed by PostgreSQL, organized around clear domain boundaries. Modules own their entities, repositories, and business logic, and they talk to each other through typed service interfaces or an internal event bus instead of reaching directly into each other's internals.

\`\`\`
┌──────────────────────────────────────────────────────────────────┐
│                        Flipeet Pay API                           │
│                                                                  │
│  ┌──────────┐  ┌──────────┐  ┌─────────────┐  ┌─────────────┐  │
│  │   Auth   │  │   User   │  │ Transaction │  │   Ledger    │  │
│  │ JWT+TOTP │  │ profile, │  │ deposit,    │  │ double-entry│  │
│  │ OAuth    │  │ balance, │  │ withdraw,   │  │ statements  │  │
│  │ 2FA      │  │ wallet   │  │ ramp,bridge │  │ audit trail │  │
│  └──────────┘  └──────────┘  └──────┬──────┘  └─────────────┘  │
│                                     │                            │
│  ┌──────────┐  ┌──────────┐         │         ┌─────────────┐   │
│  │   Ramp   │  │ Commerce │         │         │  Merchant   │   │
│  │Provider A│  │ airtime  │         │         │ virt. accts │   │
│  │Provider B│  │ electricity│       │         │ API keys    │   │
│  │Provider C│  │ bills    │         │         │ webhooks    │   │
│  └────┬─────┘  └────┬─────┘         │         └─────────────┘   │
│       │             │               │                            │
│       └─────────────┴───────────────┘                           │
│                          │                                       │
│         ┌────────────────┴────────────────┐                     │
│         │      Deposit Infra Provider       │                     │
│         │  EVM / Solana / Tron deposits    │                     │
│         │  address pool, webhook delivery  │                     │
│         └─────────────────────────────────┘                     │
│                                                                  │
│         ┌─────────────────────────────────┐                     │
│         │         Stellar Module           │                     │
│         │  per-user child wallets          │                     │
│         │  USDC self-custody               │                     │
│         │  global feed polling             │                     │
│         │  sweep + idle-wallet reclaim     │                     │
│         └─────────────────────────────────┘                     │
└──────────────────────────────────────────────────────────────────┘
\`\`\`

The module boundaries didn't show up fully formed on day one. They crystallized over time, partly from instinct and partly from the specific pain of getting them wrong the first time. The three sections below are the decisions that mattered most.

---

## Decision 1: The Multi-Provider Ramp Abstraction

Off-ramping stablecoin to a Nigerian bank account sounds like a solved problem: convert USDC to NGN, send it to the user's account, done. In practice, no single provider does this reliably at scale, with good rates, and without occasional settlement failures. You need multiple liquidity sources, and you need to be able to switch between them, sometimes mid-operation and sometimes permanently, without touching the business logic sitting above them.

We abstracted each ramp provider behind a common interface, which is really just the Strategy pattern applied to money movement: one interface, one implementation per provider, and the caller never needs to know which concrete class it's holding. \`RampProviderA\`, \`RampProviderB\`, and \`RampProviderC\` each implement the same surface: quote, initialize, transfer, confirm, handle webhook. \`RampService\` knows about the interface, not the implementations.

\`\`\`typescript
// The service doesn't know which provider wire is running beneath
async createOffRampOrder(user: AuthUser, payload: OffRampDto) {
    const provider = this.resolveProvider(payload.provider);
    const quote = await provider.getQuote(payload);
    // business logic unchanged regardless of which provider
}
\`\`\`

The practical payoff showed up fast. When one provider started settling faster than another for NGN payouts, we moved that traffic without touching a single line of business logic. When a provider's API went down for a weekend, the fix was a config change. The abstraction isn't fancy, just a consistent interface with one implementation per provider, but it meant "change providers" never turned into a code change.

The harder question was where provider selection should live. We pushed it to the request: callers specify which provider they want. That keeps provider selection observable (it's sitting in the request body, not hidden in config), keeps the service stateless, and makes it easy for the frontend to build its own routing logic based on real-time quote comparison. The tradeoff is that clients need to know providers exist at all, which is a slightly leaky abstraction. We accepted that.

---

## Decision 2: Migrating MongoDB to PostgreSQL in Production

This is the decision I get asked about most. It's also the one I'd make the same way again.

We started on MongoDB because it's fast to bootstrap, and schema flexibility is genuinely useful early on when the data model is evolving weekly. That's the usual schema-on-read versus schema-on-write tradeoff, and early in a product's life, schema-on-read tends to win. But payment systems accumulate specific pressures over time that document databases handle poorly: relational integrity across transactions, ledger entries, and users; multi-row atomic operations for balance debits; complex queries for reporting; and the sheer cognitive overhead of denormalized data when you need to know exactly what happened to someone's money.

The migration wasn't trivial, because the system was already live with real users and real transactions, and staging had to work correctly before we touched production.

The approach followed what's often called the expand-contract pattern for schema changes: introduce TypeORM entities and repositories alongside the existing Mongoose schemas, migrate domain by domain rather than all at once, run both database connections simultaneously during the transition, and never use \`synchronize: true\` in production. Every schema change was written as an explicit migration with both \`up()\` and \`down()\` methods, versioned and auditable.

\`\`\`typescript
// Every change is a versioned file, no magic schema sync
export class AddChildWalletSweepSupport implements MigrationInterface {
    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(\`
            ALTER TABLE "stellar_address_pool"
                ADD COLUMN IF NOT EXISTS "encrypted_secret" TEXT NOT NULL DEFAULT ''
        \`);
        // ... every other change, explicit and reversible
    }
}
\`\`\`

Once MongoDB was fully removed, the entire application ran cleanly on a single relational database with connection pooling, explicit foreign keys, and indexes we could actually reason about. The reporting queries that had been painful or impossible became straightforward. The balance integrity that used to require careful application-level coordination became something the database enforced on its own.

The migration files turned out to be a precise chronicle of the product's evolution: one marks the moment we moved from shared-treasury-and-memo to per-user child wallets, another marks the moment we solved the reserve cost problem. That kind of auditability doesn't happen by accident.

---

## Decision 3: Stellar USDC Self-Custody

This is where most of the recent engineering depth lives.

### Why Stellar USDC

The existing multi-chain deposit system uses a managed third-party infrastructure provider that handles address generation, transaction detection, and webhook delivery for EVM chains, Solana, and Tron. It works well, but deposit detection and custody is something we pay for and don't directly control.

Stellar USDC is different. Circle issues USDC natively on Stellar, liquidity is deep, and transaction fees are fractions of a cent. More importantly, Stellar's Horizon API gives direct, programmable access to the full transaction history of every account on the network in real time. We can watch the global payments feed and detect deposits ourselves, without a third-party custody layer. The cost of removing that dependency is owning the infrastructure. We chose to own it.

### The Architecture We Rejected

The simplest model is shared custody: one treasury account, with every user identified by a unique memo attached to their deposit. One address for everyone; your on-chain identity is just a number appended to the transaction. This is how a lot of exchanges work, and it's cheap (one account, one trustline) and operationally simple.

We rejected it for one reason: memo-based attribution depends on the depositor including the memo correctly. When they don't, because they copied the address from an exchange's withdraw screen and missed the memo field, or because the exchange doesn't support memos at all, the deposit lands in the treasury with no attribution. Reconciliation turns into a support ticket. At scale, that's a system that generates its own operational overhead as a fixed cost of doing business.

The model we chose instead: every user gets their own real Stellar account, with their own keypair and their own on-chain identity. Deposits get attributed by address instead of memo, and the network handles the routing.

### Provisioning: Two Steps, Both Required

A Stellar account doesn't exist on the ledger until it receives its first payment. Before that, it's just a keypair with no on-chain presence. Two things have to happen before the account can receive USDC:

**Step 1: Reserve funding.** The treasury sends a \`CreateAccount\` operation funding the child account with enough XLM to cover its minimum network reserve. At the current base reserve of 0.5 XLM, an account with one trustline subentry requires at least 1.5 XLM locked up permanently for as long as the account exists.

**Step 2: Trustline establishment.** The child account signs its own \`ChangeTrust\` operation, opening a trustline for USDC. Only then can it receive USDC payments.

Both steps require real transactions to Stellar mainnet, and either one can fail transiently from a Horizon error or a fee spike. We track both with \`reserveFunded\` and \`trustlineEstablished\` flags on each pool row, which is what makes \`ensureProvisioned()\` idempotent in the same spirit as Stripe's well-known idempotency keys: calling it twice by accident does no harm, and it picks up exactly where it left off on retry instead of orphaning a wallet mid-provision.

The funding amount is sized precisely:

\`\`\`typescript
async getInitialChildFundingXlm(): Promise<string> {
    const reserveAfterTrustline = this.getMinReserveXlm(1); // 1.5 XLM
    const baseFee = await this.getCurrentBaseFeeXlm();
    const safetyMargin = 0.05; // absorbs brief fee surges
    const total = reserveAfterTrustline + baseFee * FEE_SAFETY_MULTIPLIER + safetyMargin;
    return total.toFixed(7);
}
\`\`\`

Too little and the wallet can't open its trustline. Too much and we're locking up capital for no reason. The goal is exactly enough, sized at runtime against the live network fee.

### Deposit Detection Without Per-Account Polling

Watching Horizon's \`/accounts/{id}/payments\` endpoint for thousands of individual addresses at a 10-second interval means thousands of HTTP requests per tick. The math on that fan-out is bad, and it gets worse linearly as users grow.

Instead, we watch a single global feed. It's the same idea behind change-data-capture tools like Debezium: tail one ordered log instead of polling every source individually, and let the log tell you what changed.

Horizon exposes a cursor-paginated \`/payments\` stream: every payment operation executed anywhere on the Stellar network, in chronological order. We maintain a cursor position, advance it every 10 seconds, and check each payment record against two questions: is the destination address one of our known child wallets, and is the asset USDC? One indexed lookup against the unique-constrained \`StellarAddressPool.address\` column answers both at once. The overwhelming majority of records, every payment on the entire network that isn't addressed to one of our wallets, gets rejected in a single cheap indexed miss. The ones that match trigger a deposit credit and potentially an automatic sweep.

\`\`\`
Global Payments Feed (cursor advances every 10s)
             │
             ▼
  filter: type=payment, asset=USDC
             │
             ▼
  findByAddress(record.to)
       ├── MISS → skip (>99.9% of records)
       └── HIT
               │
               ▼
         credit user balance
         markDeposited(row)          ← permanently exempt from idle reclaim
               │
               ▼
         maybeAutoSweep(row)         ← consolidate to treasury if above threshold
\`\`\`

One non-obvious guard: an artifact from the old shared-treasury-and-memo model left the treasury's own public key sitting in \`StellarAddressPool\`. Without an explicit check, any payment landing on the treasury itself, whether an internal transfer or a legacy client, would get misattributed as a deposit for that specific user. The fix is simple: fetch the treasury public key once per poll tick and skip any payment whose destination matches it, before touching the database. Finding the bug in the first place meant understanding exactly what the old model had left behind.

### The Sweep System

Keeping USDC distributed across hundreds of individual child wallets is operationally fragmented. The sweep system consolidates it.

When a deposit is detected and the wallet's balance crosses a configurable threshold (set by admins at runtime, no restart needed), an automatic sweep triggers, and the child wallet's full USDC balance moves to the treasury in a single \`Payment\` operation.

The fee problem: the sweep transaction is signed and paid by the child wallet. If the child has spent all its spendable XLM on previous fees, it has nothing left to pay the sweep fee and the transaction fails. We top it up first, sized precisely:

\`\`\`typescript
// Only top up the exact shortfall, never more
if (spendableXlm < requiredFeeXlm) {
    const deficit = requiredFeeXlm - spendableXlm;
    const topUpAmount = Math.max(deficit, this.stellarProvider.getMinXlmTopUp());
    await this.sendTopUp(row.address, topUpAmount);
}
// Then sweep the full USDC balance
await this.sendSweep(row);
\`\`\`

The USDC leg always sweeps the full balance, since USDC isn't subject to the XLM reserve requirement and there's no minimum to preserve. Every attempt, successful or failed, writes an audit record to \`StellarSweepLog\`. Admins can also trigger sweeps manually, either a single wallet or in bulk, bypassing the threshold entirely.

### The Reserve Cost Problem

Here's the issue that took the longest to articulate clearly.

Every child wallet requires 1.5 XLM locked up as a network reserve, permanently, for as long as the account exists on the ledger. When a user requests a deposit address and then never actually sends anything, that 1.5 XLM stays locked in their wallet forever. At scale this becomes a real capital cost that grows with every curious user who clicked "Get my deposit address" but never followed through.

Stellar's protocol rules out the obvious fix: you can't defer provisioning until after a deposit arrives. A \`Payment\` to an unprovisioned account fails immediately with \`op_no_destination\` or \`op_no_trust\` at submission. The depositor's transaction gets rejected before it ever reaches the chain, and there's no way to detect a failed deposit attempt, because it simply doesn't produce a record.

The solution is an idle-wallet reclaim system. It runs hourly and targets wallets meeting three conditions: fully provisioned, never received a single deposit (\`everDeposited = false\`), and idle since provisioning past a configurable threshold (default 24 hours, admin-tunable at runtime).

For each eligible wallet, we run a single atomic transaction: \`ChangeTrust(limit='0')\` to close the USDC trustline (only legal when the balance is exactly zero, which is a safety guarantee the network enforces, not us), followed immediately by \`AccountMerge(destination=treasury)\`. The merge sends the account's entire remaining XLM balance to the treasury and removes the account from the ledger, recovering the full reserve.

\`\`\`
User requests address
       │
       ▼
Wallet created + provisioned (1.5 XLM locked)
       │
[24 hours, no deposit]
       │
       ▼
Idle reclaim cron:
  ChangeTrust(limit=0) + AccountMerge → treasury recovers ~1.55 XLM
  reset: reserveFunded=false, trustlineEstablished=false, fundedAt=null
       │
[User comes back]
       │
       ▼
Same address shown → ensureProvisioned() re-funds → wallet exists again
\`\`\`

The row in the database doesn't get deleted, and the keypair isn't discarded. When the user comes back, \`ensureProvisioned()\` runs \`CreateAccount\` and \`ChangeTrust\` against that same stored keypair, so it's the same public key and the same address from the user's perspective, and the wallet blinks back into existence. The user never sees a different address, and in the meantime the treasury has recovered its capital.

Wallets that have ever received a deposit (\`everDeposited = true\`, set by the poller on first credit, never reset) are permanently excluded from auto-reclaim. Repeatedly merging and re-provisioning an actively used account would cost more in network fees than the reserve it frees.

---

## Security as Infrastructure

Taking direct custody of user funds, even briefly during the sweep window, raises the stakes considerably. That was the trigger for stepping back and auditing the whole codebase, not just the new Stellar module.

Early in the codebase's life, a number of decisions had been made quickly: a hardcoded OTP bypass left in for "testing," a TOTP window configured to accept tokens for a full hour instead of the standard 30 seconds, an OAuth flow that accepted self-signed JWTs instead of verifying them against Google's public keys, and a balance endpoint with an IDOR vulnerability, the kind OWASP now classifies under Broken Access Control, where any valid JWT could query any user's balance by ID.

We ran a structured security audit across the entire codebase and worked through everything systematically, triaged by severity with critical findings first. The IDOR fix, the TOTP window fix, the OAuth verification fix, and a TOCTOU race condition in the fee sweep logic all landed in the same sprint.

The bigger lesson: security issues in financial systems rarely show up in isolation. The IDOR in the balance endpoint is also an information leak for social engineering a support team. A TOTP window an hour wide is also a stolen-device risk. Each finding is a symptom of a pattern, and we used the audit to surface the patterns, not just the bugs.

What we ended up with: rate limiting on every public endpoint, CORS restricted to an explicit allowlist, API keys compared against stored hashes, JWTs with proper expiry and refresh token revocation, and real-time SSE streams behind a custom \`SseJwtGuard\` that reads the token from a query parameter, since the browser's native \`EventSource\` API can't set an \`Authorization\` header.

---

## Merchant Infrastructure

The same rigor extends to the parts of the system other businesses touch directly. The merchant layer lets them embed Flipeet Pay's rails without building their own, and it's built around three primitives.

- **Virtual accounts**: a pool of provisioned deposit addresses assigned to merchants on request, monitored for incoming deposits, and reclaimed when they expire unused. A background job reclaims stale, undeposited virtual accounts on a configurable schedule, which turned out to be functionally identical to the idle-wallet reclaim pattern we later built for Stellar. We arrived at both independently, from the same underlying problem.
- **Webhooks**: every significant event (payment received, withdrawal settled, ramp confirmed) gets delivered to a merchant-configured URL with a signed payload, logged to \`WebhookLog\` with retry semantics. A merchant whose endpoint was temporarily down doesn't silently lose events.
- **API keys**: each merchant has rotatable keys verified on every request. The guard resolves merchant identity from the key, so controllers receive a typed \`AuthMerchant\` object instead of extracting credentials themselves.

The merchant and consumer systems share the same \`TransactionService\`, \`LedgerService\`, and \`FeeService\`. A merchant payment and a consumer off-ramp both create \`Transaction\` records, both debit ledger entries, and both compute fees through the same abstraction. Only the parts that actually differ, auth mechanism, webhook delivery, virtual account assignment, live in the merchant module. The financial logic gets tested once and runs consistently, whether the initiator is a human using the consumer app or a business calling the API.

---

## What Engineering Payment Infrastructure Actually Teaches You

- **Make the invisible explicit.** The hardest bugs in a payment system aren't the ones that throw errors. They're the ones that do the wrong thing silently. \`ensureProvisioned()\` is idempotent not because idempotency is a design principle we recited, but because we spent real time debugging half-funded wallets that had no way to signal their own broken state. Every provisioning step has a flag now. Every sweep attempt writes a log row regardless of outcome.
- **Operational levers matter as much as correct code.** A sweep threshold you can change without restarting the server beats one perfectly calculated at startup. An idle-wallet reclaim window you can tune beats one hardcoded. A manual override for admin-triggered sweeps means support can fix a user issue without a code deploy. Build the knobs early. You'll need them sooner than you expect.
- **The database schema is your changelog.** Once we adopted explicit migrations with proper \`up()\` and \`down()\` implementations, we could read the history of the product straight from a file listing. The two migrations mentioned earlier, the move to per-user child wallets and the reserve cost fix, are good examples: they aren't infrastructure paperwork, they're a precise record of architectural decisions.
- **One global feed beats N individual feeds.** Watching a single cursor-paged stream and filtering locally is always cheaper than watching N individual endpoints when N is large and growing. The approach needs more careful cursor management and a well-indexed lookup, but the fan-out math is simple: one Horizon request per tick instead of one per user per tick.
- **The right tradeoff depends on what you can control.** Shared treasury with memo routing is cheaper. Per-user child wallets are more reliable. Claimable balances would sidestep the provisioning problem entirely, but they require depositors to use an uncommon operation type that most wallets and exchanges don't support. Every decision we made came down to what we could actually control: our own infrastructure, not the behavior of third-party depositors.

---

## State of the System

The system runs on AWS with PostgreSQL on RDS across staging and production. The Stellar integration runs on mainnet in staging, gated behind a feature flag so activation per environment is deliberate and operator-controlled rather than automatic on deployment. The consumer ramp flows are already in production across multiple providers, and the merchant API is serving its first external integrations.

The architecture is a monolith, intentionally, and in reasonable company. Shopify has written at length about running a majority-monolith long past the point where conventional wisdom says to split it up, for the same reason we did: payment and commerce systems don't get much benefit from microservices at early scale. What they need is correctness, auditability, and the ability to make changes with confidence. The module boundaries here are the domain boundaries, enforced by TypeScript's module system instead of a network. If scale ever demands distribution, the domain boundaries are already drawn.

What's left isn't especially clever. It's the steady application of the same discipline: operational visibility, explicit state, small surfaces. Most of what makes a payment system trustworthy isn't interesting to write about. It's just doing the unglamorous things reliably, for a long time, without cutting corners when it's inconvenient.`,
};

// Export all blog posts as an array
export default [flipeetPayCaseStudy];
