// Security Incident Story Post
const securityIncidentPost = {
	title: 'The Night a Hacker Taught Me More Than Any Tutorial Ever Could',
	slug: 'night-a-hacker-taught-me',
	date: '2025-12-11',
	readTime: '10 min',
	author: 'Precious Okolo',
	excerpt: 'A late-night incident exposed our secrets and forced us to fix Docker image hygiene, email authentication, and clickjacking protections—fast. Here’s what happened and exactly how we solved it.',
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

I pulled up our Docker Hub page, and there it was — our image, sitting proudly in the public section like a billboard saying: “Hey hackers, free goodies inside!”

I did the same thing any attacker would do:

\`\`\`
 docker pull our-image
 docker inspect our-image
\`\`\`

And there it was.

Our environment variables. Our secrets. Our keys. Just sitting there.

A hacker didn’t need to break in. We had left the door wide open and taped the keys to the frame.

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

Users were getting emails that looked like they came from us… but didn’t. Classic impersonation.

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

It wasn’t the night we planned, but it’s the night the system needed.

---

## Lessons That Will Outlive This Incident

1. Private by default. Public images and repos are liabilities unless you’re certain they’re scrubbed.
2. Secrets never belong in images. Inject at runtime. Verify with tools like Trivy and Docker history.
3. Pipelines are part of the attack surface. Audit credentials, scopes, and artifact exposure.
4. Email auth isn’t optional. SPF + DKIM + DMARC save your reputation and your users.
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

Because sometimes the best lessons come from the mistakes you didn’t know you were making — until a hacker shows you.
`,
};

// Export all blog posts as an array
export default [securityIncidentPost];
