// Configuration file for blog data
// Standards: Google Technical Writing (Active Voice), Harvard Scannability, Big Tech Post-Mortem Structure

const securityIncidentPost = {
	title: 'Incident Report: Anatomy of a Secret Leak and the Path to Hardened Production',
	slug: 'night-a-hacker-taught-me',
	date: '2025-12-11',
	readTime: '10 min',
	author: 'Precious Okolo',
	excerpt: 'A critical vulnerability in our Docker registry exposed production secrets. Here is the post-mortem on how we overhauled our container hygiene, email authentication, and clickjacking protections.',
	tags: ['Security', 'DevOps', 'Docker', 'Email Security', 'CSP', 'Post-Mortem'],
	featured: true,
	category: 'Security',
	content: `### SITUATION
During a routine log review, I identified suspicious traffic hitting non-public internal endpoints. The investigation revealed a critical vulnerability: a Docker image containing production environment variables had been set to "Public" on Docker Hub.

### COMPLICATION
A simple \`docker inspect\` revealed our entire secret stack. We hadn't just left the door open; we had baked the keys into the building's foundation. This exposure necessitated an immediate shutdown, rotation, and re-architecture of our deployment pipeline.

---

## Resolution: A 4-Step Hardening Strategy

### 1. Container Hygiene & Runtime Injection
We transitioned to a private registry and decoupled secrets from the build process. 

* **Action:** Removed environment variables from the Dockerfile entirely. 
* **Implementation:** Injected secrets at **runtime** via Azure Key Vault/Secret Manager, ensuring sensitive data never exists in the image layers.
* **Validation:** Integrated **Trivy** into our CI/CD pipeline to scan for secrets before images are pushed.

### 2. DNS & Email Integrity (SPF/DKIM/DMARC)
To prevent brand impersonation discovered during the audit, we enforced a strict DNS trifecta:
* **SPF:** Explicitly defined authorized senders.
* **DKIM:** Added cryptographic signatures to all outbound mail.
* **DMARC:** Set policy to \`p=reject\` to block unauthorized mail.

### 3. Preventing Clickjacking via Security Headers
We identified that our dashboard was vulnerable to UI redressing. We implemented strict security headers to prevent our app from being rendered in malicious iframes.

\`\`\`http
/* Security Header Implementation */
X-Frame-Options: DENY
Content-Security-Policy: frame-ancestors 'none';
\`\`\`

---

## Engineering Lessons Learned
1.  **Private by Default:** Assume all artifacts are public until proven otherwise.
2.  **Runtime over Build-time:** If a secret is in your \`Dockerfile\`, your architecture is compromised. Use \`docker history\` to audit legacy layers.
3.  **Defense in Depth:** Security headers (CSP, XFO) are low-effort, high-impact safeguards that every production app requires.

### Hardening Checklist (Copy/Paste)
- [ ] **Container registry:** Private access with scoped, least-privilege tokens.
- [ ] **CI secrets:** Masked, rotated, and never baked into image layers.
- [ ] **Email Auth:** SPF/DKIM/DMARC enforced and monitored.
- [ ] **Security headers:** XFO DENY and CSP frame-ancestors 'none' implemented.`,
};

const azureJourneyPost = {
	title: 'Scaling Fintech: Lessons from Migrating Flipeet to Azure (AZ-204)',
	slug: 'azure-journey-az204',
	date: '2024-12-15',
	readTime: '12 min',
	author: 'Precious Okolo',
	excerpt: 'How completing the Azure Developer Associate certification transformed our infrastructure from server-bound maintenance to an automated, cloud-native powerhouse.',
	tags: ['Azure', 'Cloud Computing', 'AZ-204', 'Fintech'],
	featured: true,
	category: 'Cloud Computing',
	content: `### THE CHALLENGE
At Flipeet, our payment systems processed millions in transactions, but our infrastructure had become a bottleneck. We were trapped in "maintenance mode"—managing servers instead of shipping features. To solve this, I leveraged the **AZ-204 (Azure Developer Associate)** framework to transition to a cloud-native architecture.

---

## 1. Event-Driven Efficiency with Azure Functions
**The Problem:** Our crypto payment webhooks (Solana Pay) required 24/7 dedicated servers, leading to high idle costs and manual scaling during volatility.
**The Solution:** We migrated to a serverless architecture using Azure Functions.

\`\`\`javascript
// Optimized Logic: Azure Function for Solana Pay Integration
module.exports = async function (context, req) {
    const { transactionHash, amount, publicKey } = req.body;
    
    // Scale-on-demand: Logic executes only upon webhook trigger
    const verification = await verifySolanaTransaction(transactionHash);
    
    if (verification.success) {
        await updatePaymentStatus(publicKey, amount, 'confirmed');
        return { status: 200, body: { verified: true } };
    }
};
\`\`\`

* **Engineering Win:** Reduced operational costs by **70%**.
* **Result:** Maintained 100% uptime during a 10x traffic spike on Black Friday without manual configuration.

## 2. Global Consistency with Cosmos DB
Global trading platforms like **TradeHouse** fail without low-latency data. Traditional relational databases struggle with multi-region synchronization. By implementing **Cosmos DB with Session Consistency**, we achieved:
* **Sub-100ms latency** across three continents.
* **99.99% availability** for P2P trading.
* **Automatic conflict resolution** for concurrent global orders.

## 3. The Container Revolution: Azure Container Apps
We replaced 30-minute "manual" deployments with automated **Blue-Green deployments**. Using Azure Container Apps allowed us to abstract Kubernetes complexity while gaining instant rollbacks.
* **Before:** 30-minute high-risk deployments with manual config.
* **After:** Automated deployments in **under 5 minutes** with blue-green traffic shifting.

---

## The Bottom Line
The AZ-204 path isn't just a certification; it is a blueprint for production-grade engineering. For backend developers in high-stakes sectors like Fintech, mastering these cloud-native patterns provides the reliability and scalability that modern markets demand.

**Next Step:** Integrating these foundations with Azure's AI ecosystem for intelligent payment categorization.`,
};

export default [securityIncidentPost, azureJourneyPost];