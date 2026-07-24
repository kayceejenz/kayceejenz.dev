// data/config.js
export default {
	site: {
		title: 'Precious Okolo | Software Engineer',
		description:
			'Software Engineer with 5+ years building production backend systems, APIs, and fintech infrastructure. Focused on systems that scale, not just demos.',
		url: 'https://kayceejenz.dev',
		resume: '/files/Precious_Okolo_CV.pdf',
	},
	hero: {
		name: 'Precious Okolo',
		headline: 'Software Engineer building systems that scale',
		subheadline:
			'Backend systems, APIs, and architecture built to work in production, not just in demos.',
		ctas: [
			{ label: 'View Projects', href: '#projects' },
			{ label: 'Get in Touch', href: '#contact' },
		],
	},
	projects: [
		{
			slug: 'flipeet-pay',
			name: 'Flipeet Pay Infrastructure',
			period: '2025',
			status: 'production',
			category: 'fintech',
			tagline: 'Dual-rail stablecoin payment stack for Africa',
			description:
				'A dual-rail stablecoin platform: consumer on/off-ramp to Nigerian banks plus a white-label merchant payment API on the same backend. Includes a multi-provider ramp abstraction, a live MongoDB-to-PostgreSQL migration, and support for multiple blockchain networks.',
			stack: [
				'NestJS',
				'TypeScript',
				'USDC',
				'Solana',

				'BSC',
				'Base',
				'Polygon',
				'PostgreSQL',
				'Docker',
				'AWS',
			],
			link: 'https://pay.flipeet.io',
			github: '#',
			role: 'Co-Founder & CTO',
			teamSize: 5,
			impact: [
				{ metric: '$50k+', label: 'Live transaction volume processed' },
				{ metric: '99.9%', label: 'Uptime across payment services' },
				{ metric: '4', label: 'Blockchain networks supported' },
				{ metric: '35%', label: 'Reduction in deployment lead time' },
			],
			problem:
				'Holding stablecoins is easy. Spending them is hard. Users sit on USDC and USDT with no straightforward way to offramp to their bank, pay for everyday services, or send value to external wallets without leaving the ecosystem. The gap between holding crypto and actually using it in daily life is the real friction.',
			approach:
				'Flipeet Pay is two products sharing one backend: a consumer stablecoin wallet with on/off-ramp to Nigerian banks, and a merchant payment layer that other businesses can build on top of the same rails. Individual users hold USDC and USDT, convert to and from NGN, pay utility bills, buy airtime, and send money denominated in stablecoin but settled wherever the recipient needs it. The merchant layer exposes most of that as a white-label API, with virtual account provisioning, webhook delivery, and API key management.',
			tradeoffs: [
				{
					decision: 'Multi-provider ramp abstraction',
					what: 'Abstract each ramp provider behind a common Strategy pattern interface',
					why: 'No single provider handles stablecoin-to-NGN reliably at scale with good rates. Multiple liquidity sources are needed for fallback and rate optimization.',
					cost: 'Clients need to know providers exist (slightly leaky abstraction), but provider selection becomes a config change instead of a code change.',
				},
				{
					decision: 'MongoDB to PostgreSQL migration',
					what: 'Migrated the live production database from MongoDB to PostgreSQL using the expand-contract pattern',
					why: 'Payment systems accumulate pressures document databases handle poorly: relational integrity across transactions, multi-row atomic operations for balance debits, and complex reporting queries.',
					cost: 'Required running both database connections simultaneously during transition. Every schema change needed explicit up/down migrations.',
				},
			],
			lessons: [
				'Payment abstraction is worth the overhead: switching ramp providers mid-operation without touching business logic saved us multiple times when providers went down or rates shifted.',
				'Live database migrations on a production system are survivable with the expand-contract pattern: run both databases side by side, migrate domain by domain, and never skip the down() migration.',
				'User-facing reliability depends on invisible infrastructure: every provisioning step, every fee calculation, every webhook delivery needs its own audit trail, not just the happy path.',
				'Operator controls matter more than perfect algorithms: a sweep threshold you can tune at runtime beats one hardcoded at startup. Build the knobs before you need them.',
			],
		},
		{
			slug: 'ecommerce-microservices',
			name: 'E-Commerce Microservice Architecture',
			period: '2025',
			status: 'experiment',
			category: 'backend',
			tagline: 'Production-like microservice architecture with event-driven messaging',
			description:
				'A production-like microservice architecture demonstrating how various services interact via multiple communication protocols including event-driven messaging, HTTP/2, and gRPC. Seven services wired together with CQRS, Event Sourcing, Saga orchestration, and full observability.',
			stack: [
				'C#',
				'.NET 8',
				'ASP.NET Core',
				'gRPC',
				'RabbitMQ',
				'MassTransit',
				'PostgreSQL',
				'Redis',
				'EventStoreDB',
				'Docker',
				'Jaeger',
				'Prometheus',
				'Grafana',
			],
			link: '#',
			github: 'https://github.com/kayceejenz/Ecommerce_MircoService_Demo',
			role: 'Solo Developer',
			teamSize: 1,
			impact: [
				{ metric: '7', label: 'Microservices with distinct responsibilities' },
				{ metric: '5', label: 'Communication patterns demonstrated' },
				{ metric: 'Full', label: 'Observability stack (tracing, metrics, logging)' },
			],
			problem:
				'Microservice architecture is widely discussed but rarely implemented end-to-end in a single codebase. Understanding how CQRS, Event Sourcing, Saga orchestration, gRPC, and event-driven messaging actually interact requires building the whole system, not just reading about the patterns in isolation.',
			approach:
				'Built seven cooperating services: ApiGateway (Polly resilience, correlation IDs), CatalogService (REST + gRPC + Redis cache), OrderService (CQRS + Event Sourcing + Saga orchestrator), InventoryService (event-driven consumer), PaymentService (saga participant), NotificationService (pure event consumer), and Shared.Contracts (event definitions). Each service demonstrates a different architectural pattern while the system as a whole shows how they compose.',
			architecture:
				'![E-Commerce Microservice Architecture](https://raw.githubusercontent.com/kayceejenz/Ecommerce_MircoService_Demo/master/resources/overview-architecture.png)\n\nSeven services wired together with multiple communication protocols. The ApiGateway routes requests with Polly resilience policies. The OrderService drives the core workflow through CQRS and Event Sourcing, with a MassTransit Saga orchestrating the full order lifecycle across InventoryService, PaymentService, and NotificationService. RabbitMQ handles event-driven messaging, gRPC handles internal binary communication, and Redis provides caching for the CatalogService.',
			tradeoffs: [
				{
					decision: 'MassTransit over raw RabbitMQ.Client',
					what: 'Use MassTransit as the service bus abstraction instead of working directly with the RabbitMQ client library',
					why: 'Type-safe message handling, built-in saga state machines, automatic retry and error queues, and provider-agnostic abstraction allows switching to Azure Service Bus without code changes.',
					cost: 'Abstraction overhead makes low-level debugging harder. Version coupling with MassTransit updates. Steeper learning curve for MassTransit-specific patterns.',
				},
				{
					decision: 'Event Sourcing for OrderService write model',
					what: 'Every state change stored as an immutable event in EventStoreDB instead of mutable rows in a relational database',
					why: 'Complete audit trail for orders, temporal queries to reconstruct state at any point, and the ability to replay events to reproduce bugs.',
					cost: 'Complexity in event schema evolution and projections. Storage grows over time. Querying current state requires replaying events (mitigated by CQRS read model).',
				},
				{
					decision: 'Saga Orchestrator over Choreography',
					what: 'Central state machine (MassTransit) coordinates the order workflow instead of decentralized event chains',
					why: 'Clear workflow visibility, easier debugging, and explicit compensating actions for failure handling.',
					cost: 'Single point of failure for the orchestrator. Tighter coupling (orchestrator knows about all participants). More complex state machine logic.',
				},
				{
					decision: 'Docker Compose over Kubernetes',
					what: 'Use Docker Compose for local development instead of a Kubernetes cluster',
					why: 'Single command to start everything, lower resource requirements, sufficient for a learning/demo project.',
					cost: 'No auto-scaling, no service discovery, no rolling updates. Not production-ready by design.',
				},
			],
			lessons: [
				'CQRS is not free: eventual consistency between read and write models is a real tradeoff you have to design around, not just accept.',
				'Event Sourcing shines for audit trails but adds real complexity: event schema evolution, projections, and the storage growth curve are all things you have to plan for.',
				'Saga orchestration is easier to debug than choreography, but the orchestrator becomes a critical component that needs its own resilience strategy.',
				'gRPC is genuinely faster than JSON REST for internal service-to-service calls, but the debugging experience is noticeably worse.',
				'Correlation IDs propagated through every layer (HTTP headers, message metadata, logs) are the single most useful debugging tool in a distributed system.',
				'A shared contracts library prevents the most painful class of integration bugs but creates a coupling point that needs versioning discipline.',
			],
		},
		{
			slug: 'syncboard',
			name: 'Syncboard Solutions',
			period: '2024',
			status: 'production',
			category: 'backend',
			tagline: 'Multi-tenant laboratory management platform',
			description:
				'A multi-tenant laboratory management platform designed to streamline operations across diagnostics and billing. Supports payment collection, discounts, waivers, installment plans, specimen tracking, and automated test result computation and reporting.',
			stack: ['C#', 'ASP.NET Core', 'MSSQL', 'JavaScript'],
			link: 'https://sandbox.syncboardsolutions.com',
			github: '#',
			role: 'Lead Engineer',
			teamSize: 2,
			impact: [
				{ metric: '5', label: 'Clients using the platform' },
				{ metric: 'Automated', label: 'Test result computation' },
				{ metric: 'Multi-tenant', label: 'Architecture supporting isolated data' },
			],
			problem:
				'Laboratories juggle multiple disconnected systems: one for specimen tracking, another for billing, spreadsheets for test results, and manual processes for payment plans. This creates data silos, transcription errors, and slow turnaround times for patients waiting on results.',
			approach:
				'Built an integrated platform that unifies specimen tracking, test result computation, billing with flexible payment options (discounts, waivers, installments), and automated reporting. The system handles the full lab workflow from specimen collection to result delivery.',
			architecture:
				'ASP.NET Core MVC with a modular service layer. Each domain (specimen, billing, results, reporting) has its own service and repository, communicating through typed interfaces. MSSQL handles all persistence with stored procedures for complex result computation.',
			tradeoffs: [
				{
					decision: 'Stored procedures for result computation',
					what: 'Complex test result calculations implemented as MSSQL stored procedures instead of application code',
					why: 'Lab result computation involves complex formulas that benefit from database-level execution. Performance and atomicity guarantees at the database level.',
					cost: 'Harder to version control and test. Mitigated by keeping stored procedures focused and well-documented.',
				},
				{
					decision: 'Monolithic deployment',
					what: 'Single deployment unit instead of microservices',
					why: 'Small team, tight coupling between billing and lab operations. Microservices overhead would have been disproportionate.',
					cost: 'Scaling is vertical only. Acceptable for the current user base and deployment model.',
				},
			],
			lessons: [
				'Domain-specific computation (like lab results) often lives naturally in the database layer, and that\'s okay.',
				'Payment flexibility (discounts, waivers, installments) is a core business requirement, not a nice-to-have. Design the billing model to accommodate all payment types from day one.',
				'Integrated systems eliminate entire categories of data inconsistency errors that plague disconnected tools.',
			],
		},
		{
			slug: 'school-portal',
			name: 'School Portal',
			period: '2020',
			status: 'production',
			category: 'backend',
			tagline: 'Full-cycle school management platform',
			description:
				'Comprehensive school management platform with admissions, fee payments, LMS, academic result processing, and SMS notifications. Improved efficiency for administrators and enhanced learning experiences for students.',
			stack: ['ASP.NET MVC', 'C#', 'Bootstrap', 'MSSQL'],
			link: 'https://staging.schoolport.ng',
			github: '#',
			role: 'Lead Developer',
			teamSize: 3,
			impact: [
				{ metric: '5', label: 'Schools using the platform' },
				{ metric: '500k+', label: 'Students served' },
			],
			problem:
				'Schools in the target market relied on paper-based records, manual result processing, and disconnected communication channels. Administrators spent hours on tasks that should take minutes, and students had no centralized access to learning materials or academic progress.',
			approach:
				'Built the entire platform solo from scratch: admissions workflow, student records management, automated result processing, integrated LMS with online classes, event management, fee payments, and SMS notifications. Delivered a production-ready MVP within 6 months.',
			architecture:
				'Standard ASP.NET MVC pattern: Controllers, Views (Bootstrap), Services, and MSSQL database. Monolithic deployment with clear module separation for each school function (admissions, academics, finance, communication).',
			tradeoffs: [
				{
					decision: 'Monolithic ASP.NET MVC',
					what: 'Single application handling all school functions',
					why: 'Solo developer, tight timeline. A monolith was the fastest path to a working product with all features integrated.',
					cost: 'Scaling and team handoff became harder as the codebase grew. Refactored into modular services over time.',
				},
				{
					decision: 'SMS integration over email',
					what: 'Primary notifications via SMS instead of email',
					why: 'Target market has high mobile penetration but low email usage. SMS reaches parents and students more reliably.',
					cost: 'Per-message cost adds up at scale. Worth it for the reach.',
				},
			],
			lessons: [
				'Building for the actual user base (low-bandwidth, mobile-first, SMS-reliant) means making different technical choices than building for a Silicon Valley audience.',
				'The best project to learn software engineering is one real users depend on daily.',
				'Shipping a complete MVP with a small team taught more about prioritization and scope management than any course could.',
			],
		},
	],
	contact: {
		location: 'United Kingdom',
		links: {
			linkedin: 'https://linkedin.com/in/kayceejenz/',
			github: 'https://github.com/kayceejenz',
			leetcode: 'https://leetcode.com/kayceejenz',
			hackerrank: 'https://hackerrank.com/kayceejenz',
		},
	},
};
