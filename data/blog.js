// Security Incident Story Post
const securityIncidentPost = {
	title: 'The Night a Hacker Taught Me More Than Any Tutorial Ever Could',
	slug: 'night-a-hacker-taught-me',
	date: '2025-12-11',
	readTime: '10 min',
	author: 'Precious Okolo',
	excerpt: "A late-night incident exposed our secrets and forced us to fix Docker image hygiene, email authentication, and clickjacking protections—fast. Here's what happened and exactly how we solved it.",
	tags: [
		'Security',
		'DevOps',
		'Docker',
		'Email Security',
		'CSP',
		'SPF/DKIM/DMARC',
	],
	featured: true,
	category: 'Security',
	content: `# The Night a Hacker Taught Me More Than Any Tutorial Ever Could

Some engineering stories start with a brilliant idea. Mine started with a hacker… and a very public Docker image.

It was late — the kind of late where your brain is running on caffeine fumes and stubbornness. I was casually reviewing logs when something felt off. A weird request here, a suspicious IP there. Nothing dramatic, but enough to make me squint at the screen.

Then I saw it: a request hitting an internal endpoint that shouldn't be guessable. My stomach dropped.

---

## The Docker Image That Betrayed Us

I pulled up our Docker Hub page, and there it was — our image, sitting proudly in the public section like a billboard saying: "Hey hackers, free goodies inside!"

I did the same thing any attacker would do:

\`\`\`
 docker pull our-image
 docker inspect our-image
\`\`\`

And there it was.

Our environment variables. Our secrets. Our keys. Just sitting there.

A hacker didn't need to break in. We had left the door wide open and taped the keys to the frame.

---

## Fix #1 — Locking Down the Image

Immediate actions:

- Make the image private
- Rotate every exposed secret
- Update the pipeline to authenticate properly
- Remove environment variables from the image entirely (inject at runtime)

It felt like cleaning up a crime scene — except the criminal was us.

---

## Fix #2 — The Pipeline That Needed Therapy

Once the image went private, the pipeline threw a tantrum. Build failed. Deploy failed. Everything failed.

So we rewired the pipeline:

- Added secure registry authentication (least-privilege tokens)
- Updated build steps and removed legacy credentials
- Injected secrets at runtime via the platform (not baked into layers)
- Validated with a clean, reproducible build

Finally, the pipeline turned green again.

---

## Fix #3 — The Email Impersonation Saga

Users were getting emails that looked like they came from us… but didn't. Classic impersonation.

We tightened email authentication (DNS):

- SPF: define who can send mail
- DKIM: cryptographic signatures on outbound mail
- DMARC: policy to quarantine/reject failures

Result: our emails were trusted again; the fakes got blocked.

---

## Fix #4 — The Iframe Trapdoor (Clickjacking)

We discovered our app could be embedded in an iframe — a clickjacking risk. Not tonight.

We slammed the door with headers:

\`\`\`
X-Frame-Options: DENY
Content-Security-Policy: frame-ancestors 'none';
\`\`\`

Bonus: we reviewed CSP generally to reduce XSS blast radius.

---

## What We Shipped Before Sunrise

- Closed a Docker leak that exposed env configuration
- Rebuilt a broken pipeline with proper secret handling
- Stopped email impersonation via SPF/DKIM/DMARC
- Blocked clickjacking with XFO and CSP frame-ancestors
- Rotated secrets and cleaned up old tokens

It wasn't the night we planned, but it's the night the system needed.

---

## Lessons That Will Outlive This Incident

1. Private by default. Public images and repos are liabilities unless you're certain they're scrubbed.
2. Secrets never belong in images. Inject at runtime. Verify with tools like Trivy and Docker history.
3. Pipelines are part of the attack surface. Audit credentials, scopes, and artifact exposure.
4. Email auth isn't optional. SPF + DKIM + DMARC save your reputation and your users.
5. Defense in depth. CSP, X-Frame-Options, and proper headers are cheap insurance.
6. Practice rotation. Make secret rotation boring and frequent.
7. Monitor the boring stuff. Logs and DNS changes often give the earliest signals.

---

## A Quick Hardening Checklist (Copy/Paste)

- [ ] Container registry: private access, scoped tokens
- [ ] CI secrets: masked, rotated, least privilege
- [ ] No secrets in images: verify with \`docker history\`, scanning tools
- [ ] SPF/DKIM/DMARC: enforced and monitored
- [ ] Security headers: X-Frame-Options DENY, CSP frame-ancestors 'none'
- [ ] CSP baseline against XSS, script-src nonces/hashes where possible
- [ ] Incident runbook: who to call, what to rotate, where to look

Because sometimes the best lessons come from the mistakes you didn't know you were making — until a hacker shows you.
`,
};

// MongoDB to PostgreSQL Migration Post
const mongoToPostgresPost = {
	title: 'How We Migrated a Live Fintech API from MongoDB to PostgreSQL — Without Taking It Down',
	slug: 'mongodb-to-postgres-live-fintech-migration',
	date: '2026-05-21',
	readTime: '12 min',
	author: 'Precious Okolo',
	excerpt: "We built a multi-chain crypto payment API on MongoDB. It moved fast — until it didn't. Here's the real story of migrating 15 collections to PostgreSQL with zero downtime: the schema decisions, the TypeORM gotchas that cost us real debugging time, and the dual-write strategy that kept production safe throughout.",
	tags: [
		'PostgreSQL',
		'MongoDB',
		'NestJS',
		'TypeORM',
		'Fintech',
		'Backend Engineering',
		'Zero Downtime',
	],
	featured: true,
	category: 'Backend',
	content: `# How We Migrated a Live Fintech API from MongoDB to PostgreSQL — Without Taking It Down

Some engineering decisions feel obvious in hindsight. Migrating our database from MongoDB to PostgreSQL was one of them — but only after we'd already built a live fintech product on top of documents that desperately wanted to be relations.

This is the real story. Not a sanitised tutorial. The actual schema decisions, the migration code, the TypeORM traps that cost us real debugging hours, and the exact strategy that let us cut over without dropping a single request.

---

## The Problem with MongoDB in Fintech

When we built the first version of our multi-chain crypto payment and ramp API, we moved fast. MongoDB was the obvious choice: flexible schema, easy local setup, no migrations to babysit. We shipped fast.

But as the product matured — handling real money across on-ramps, off-ramps, crypto send/receive, product purchases, and prediction markets — the cracks started to show.

**No referential integrity.** A transaction could reference a user that didn't exist. A ramp order could have a \`network\` field that was \`"base"\`, \`"BASE"\`, or \`"Base"\` depending on which code path created it. All valid in Mongo. All chaos in practice.

**No real transactions.** MongoDB's multi-document transactions exist, but they're painful and carry a performance cost. We had race conditions in our ramp service and commerce handlers because we couldn't atomically write two documents without extra orchestration.

**Schema drift.** Fifteen collections, each with slightly different shapes across documents created at different points in the product's history. Running an aggregation across \`transactions\` and \`statements\` was brittle — you never quite knew what shape a document would have.

**Audit and compliance pressure.** We needed proper double-entry ledger records. Regulators and payment partners want to see a clear money trail. MongoDB's document model made that much harder to enforce.

The decision was made: migrate to PostgreSQL.

---

## Designing the New Schema

Before writing a line of migration code, we spent time getting the schema right. The goal wasn't just "put the same data in Postgres" — it was to fix the underlying data model.

### Enum-first design

Every categorical field that had been a free string in MongoDB became a proper PostgreSQL enum. Transaction types, statuses, network codes, asset codes, provider types — all enums. This meant the database itself would reject invalid states, not just the application layer.

\`\`\`sql
CREATE TYPE transaction_type_enum AS ENUM (
  'deposit', 'withdrawal', 'send', 'receive',
  'onramp', 'offramp', 'swap', 'internal_transfer'
);

CREATE TYPE transaction_status_enum AS ENUM (
  'pending', 'processing', 'completed', 'failed', 'reversed'
);
\`\`\`

One early mistake: we initially defined enum values as uppercase (\`'DEPOSIT'\`, \`'PENDING'\`) to match what we assumed our MongoDB data looked like. When we ran the migration script against real data, we found the actual records were lowercase. We had to rename every enum value in-flight using \`ALTER TYPE ... RENAME VALUE\` — an entirely avoidable lesson in checking your actual data before designing your schema.

### Relation tables, not embedded documents

MongoDB encouraged embedding. In our old model, a transaction had a \`network\` field that was either a string, an object, or \`null\` depending on when it was created. In PostgreSQL, \`network\` became a foreign key to a \`networks\` reference table. Same for \`asset\`, \`provider\`, \`local_bank\`, \`user\`, \`merchant\`.

The \`networks\` and \`assets\` tables are seeded once at startup. The application resolves them in memory via a \`ReferenceService\` — no DB hit every time you need to look up what chain \`"base"\` is.

### Double-entry ledger

We added a \`statements\` table alongside \`transactions\`. Every financial event writes both a \`Transaction\` (the raw operation record) and a \`Statement\` (the user-facing ledger entry with debit/credit semantics). These are written atomically in a single database transaction using TypeORM's \`EntityManager\`. No more "transaction saved, statement failed" split-brain bugs.

---

## The Migration Strategy

With 15 MongoDB collections and a live production API serving real users, we couldn't just shut down, migrate, and restart. The strategy had three phases.

### Phase 1 — Dual-write

We built a \`DatabaseRouter\` service that sat in front of every domain service. New writes went to both MongoDB and PostgreSQL simultaneously. Reads still came from MongoDB. This gave us a growing PostgreSQL dataset to validate against without any user-facing risk.

\`\`\`typescript
// database-router.service.ts
@Injectable()
export class DatabaseRouter {
  constructor(
    private readonly mongoTransactionRepo: MongoTransactionRepository,
    private readonly pgTransactionRepo: Repository<TransactionEntity>,
    private readonly logger: Logger,
  ) {}

  async createTransaction(data: CreateTransactionDto): Promise<Transaction> {
    // Mongo is source of truth during this phase
    const mongoTx = await this.mongoTransactionRepo.create(data);

    // Mirror to Postgres — a failure here must not affect the user
    try {
      await this.pgTransactionRepo.save(this.mapToPgEntity(mongoTx));
    } catch (err) {
      this.logger.error(
        { err, txId: mongoTx._id },
        'PG mirror write failed',
      );
    }

    return mongoTx;
  }
}
\`\`\`

### Phase 2 — Data migration script

We wrote a TypeScript migration script (\`migrate-mongo-to-pg.ts\`) that read every document from MongoDB and upserted it into PostgreSQL. It was idempotent — safe to run multiple times because every insert used \`ON CONFLICT ... DO NOTHING\`.

\`\`\`typescript
// scripts/migrate-mongo-to-pg.ts
async function migrateTransactions(
  mongoDb: Db,
  pgDataSource: DataSource,
  referenceService: ReferenceService,
) {
  const BATCH_SIZE = 500;
  let skip = 0;
  let processed = 0;

  while (true) {
    const batch = await mongoDb
      .collection('transactions')
      .find({})
      .sort({ _id: 1 })
      .skip(skip)
      .limit(BATCH_SIZE)
      .toArray();

    if (batch.length === 0) break;

    for (const doc of batch) {
      try {
        // Resolve string references to FK IDs
        const networkId = await referenceService.resolveNetwork(doc.network);
        const assetId = await referenceService.resolveAsset(doc.asset);

        await pgDataSource
          .createQueryBuilder()
          .insert()
          .into(TransactionEntity)
          .values({
            id: doc._id.toString(),
            userId: doc.userId,
            networkId,
            assetId,
            // Normalise case — Mongo data was inconsistent
            type: doc.type?.toLowerCase() as TransactionType,
            status: doc.status?.toLowerCase() as TransactionStatus,
            amount: doc.amount,
            createdAt: doc.createdAt,
          })
          .orIgnore() // ON CONFLICT DO NOTHING — makes the script idempotent
          .execute();

        processed++;
      } catch (err) {
        logger.error({ err, docId: doc._id }, 'Migration failed for transaction');
      }
    }

    skip += BATCH_SIZE;
    logger.info({ processed, skip }, 'Migration progress');
  }

  logger.info({ processed }, 'Migration complete');
}
\`\`\`

Key challenges we hit:

**Enum case sensitivity.** Many MongoDB documents had uppercase values (\`"PENDING"\`, \`"USDC"\`) that didn't match our new lowercase enums. We added \`.toLowerCase()\` normalisation before every insert.

**Orphaned records.** About 20 transactions had no \`user_id\` or \`merchant_id\`. We investigated each individually rather than silently dropping them.

**Reference resolution.** MongoDB stored network and asset as plain strings. We had to resolve each string to the corresponding FK before inserting — that's the \`ReferenceService\` job above.

### Phase 3 — Cutover

Once PostgreSQL had a full copy of the data and the dual-write layer had been running for several days, we flipped a feature flag to route reads to PostgreSQL and disabled the MongoDB dual-write. Zero downtime.

---

## TypeORM: The Good and the Gotchas

We chose TypeORM because it integrates cleanly with NestJS and handles migrations natively. Overall it was a good call, but there were several non-obvious behaviours that cost us real debugging time.

### \`eager: true\` doesn't work with QueryBuilder

This was the most surprising one. TypeORM lets you mark a relation as \`eager: true\` on the entity:

\`\`\`typescript
@ManyToOne(() => Network, { eager: true })
network: Network;
\`\`\`

With \`find()\` and \`findOne()\`, this automatically joins and loads the relation. But the moment you use \`createQueryBuilder()\`, all \`eager: true\` annotations are **silently ignored**. You have to explicitly \`leftJoinAndSelect\` every relation you need.

We caught this during testing when our statement endpoint was returning \`null\` for \`asset\` and \`network\` fields despite the entity having them marked eager. The fix was adding explicit joins to every QueryBuilder across the codebase:

\`\`\`typescript
// Wrong — network and asset are silently null with QueryBuilder
const txs = await this.txRepo
  .createQueryBuilder('tx')
  .where('tx.userId = :userId', { userId })
  .getMany();

// Correct — explicit joins required
const txs = await this.txRepo
  .createQueryBuilder('tx')
  .leftJoinAndSelect('tx.network', 'network')
  .leftJoinAndSelect('tx.asset', 'asset')
  .where('tx.userId = :userId', { userId })
  .getMany();
\`\`\`

### \`orderBy\` requires TypeScript property names, not column names

Another one that caused runtime crashes. TypeORM's QueryBuilder \`.orderBy()\` takes the TypeScript property name (\`createdAt\`), not the database column name (\`created_at\`). If you use the column name, you get:

\`\`\`
TypeError: Cannot read properties of undefined (reading 'databaseName')
\`\`\`

This crash was appearing in our ramp cron job every five minutes. The fix was a global search-and-replace across all repositories:

\`\`\`typescript
// Wrong — crashes at runtime
.orderBy('tx.created_at', 'DESC')

// Correct — use the TypeScript entity property name
.orderBy('tx.createdAt', 'DESC')
\`\`\`

### Relations in \`find()\` with an explicit \`relations\` array

A subtler issue: when you call \`find()\` with an explicit \`relations: ['localBank']\` array, TypeORM's JOIN-based load can bypass eager relations not listed in that array. To be safe, we made every \`relations\` array exhaustive — listing all relations that need loading rather than relying on the entity-level \`eager\` flag.

---

## Infrastructure

We set up separate GitHub Actions pipelines for staging and production, both deploying Docker containers to EC2 via AWS ECR:

- **Production** (\`main\` branch) → container on port 1000
- **Staging** (\`staging\` branch) → container on port 1001

Each container gets its config from a volume-mounted env file on the host rather than baked into the image. Secrets never touch the container image; config can be updated without a rebuild.

TypeORM's migration CLI runs outside the NestJS context, so it needs to find the config file itself. We wrote a loader with multiple candidate paths that works whether you're running via \`ts-node\` locally, the compiled \`dist/\` in production, or inside Docker:

\`\`\`typescript
const candidates = [
  path.resolve(__dirname, \`../envs/\${filename}\`),
  path.resolve(process.cwd(), \`dist/envs/\${filename}\`),
  path.resolve(__dirname, \`../../envs/\${filename}\`),
  path.resolve(process.cwd(), \`envs/\${filename}\`),
];

const envPath = candidates.find(fs.existsSync);
if (!envPath) throw new Error(\`Env file not found: \${filename}\`);
\`\`\`

Nginx routes the staging and production subdomains to their respective ports via separate upstream blocks, both behind HTTPS.

---

## What We Learned

**Migrations are about data modelling, not just data moving.** The exercise forced us to make a hundred small decisions we'd been deferring — what does a valid network code look like? What statuses can a transaction actually be in? What's the source of truth for an asset's decimal precision? PostgreSQL's strictness made those questions unavoidable.

**Dual-write buys you confidence, not speed.** Running both databases in parallel for several weeks meant we could compare outputs, catch discrepancies, and build trust in the new system before anyone depended on it. The overhead was worth it.

**Enum case sensitivity will bite you.** Check your actual data before you design your enums. \`"PENDING"\` and \`"pending"\` are not the same thing and PostgreSQL will not forgive you.

**TypeORM's eager loading is a footgun at scale.** Document explicitly that QueryBuilder ignores \`eager: true\`. Better yet, ban it and always be explicit with \`relations\` arrays and \`leftJoinAndSelect\` calls.

**The schema design is the hardest part.** Not the migration script, not the infra. Sitting down and thinking clearly about what your data actually is, as relations, is where you earn your pay.

---

## Result

The API is now fully running on PostgreSQL. Referential integrity is enforced at the database level. Financial operations are properly atomic. We have a foundation we can build compliance tooling and proper audit trails on top of — which was never realistic with the MongoDB setup. The next step is decommissioning the MongoDB cluster entirely.

---

## Migration Checklist (Copy/Paste)

- [ ] Audit actual data values before designing enums — case matters
- [ ] Schema designed with proper FK relations, not embedded strings
- [ ] Reference data seeded and resolved in memory (no per-request lookups)
- [ ] Migration script is idempotent — insert with ON CONFLICT DO NOTHING
- [ ] Enum normalisation pass on every insert (lowercase, trim, validate)
- [ ] Orphaned and invalid records investigated, not silently dropped
- [ ] Dual-write deployed and running, old DB still source of truth
- [ ] QueryBuilder joins are explicit — never rely on eager: true
- [ ] orderBy uses TypeScript property names, not column names
- [ ] Feature flag wired for read switchover
- [ ] Old database kept alive in read-only mode for ≥2 weeks post-cutover
`,
};

// Export all blog posts as an array
export default [securityIncidentPost, mongoToPostgresPost];
