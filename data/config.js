// data/config.js
export default {
	site: {
		title: 'Precious Kosisochukwu (Okolo) — Backend Software Engineer',
		description:
			'Backend Software Engineer with 6+ years of experience designing scalable APIs, blockchain integrations, and secure payment infrastructures. Skilled in .NET, Node.js, and distributed systems, delivering reliable solutions for fintech, AI, and modern web platforms.',
		url: 'https://kayceejenz.dev',
		resume: '/files/Jenz_Resume.pdf',
	},

	hero: {
		name: 'Precious Kosisochukwu (Okolo)',
		headline: 'Backend Software Engineer | AI · Blockchain · Fintech',
		subheadline:
			'I design and scale secure backend systems, crypto payment rails, and data infrastructures powering modern web & mobile products — trusted by startups and enterprises to handle millions of transactions with reliability and speed.',
		ctas: [
			{
				label: 'View Résumé',
				href: '/files/Jenz_Resume.pdf',
			},
			{ label: 'Get in Touch', href: '#contact' },
		],
	},

	about: {
		summary: 'Backend Software Engineer & CTO with 6+ years of experience architecting scalable systems across fintech, blockchain, healthtech, edtech, and entertainment. I specialize in transforming product ideas into resilient architectures, leading engineering teams, and building platforms that handle complex integrations, high transaction volumes, and diverse user needs.',
		highlights: [
			'Flipeet → Flipeet Pay & Flipeet Raise → Scaled stablecoin payments globally and enabled crypto + fiat crowdfunding for nonprofits → Gained expertise in multi-chain integrations, payment infrastructure, and technical leadership.',
			'TradeHouse → Digital trading platform → Enabled wallet funding, P2P orders, crypto loans, staking, and bot-driven SPOT/FUTURES trading across Binance, Coinbase, and Bybit → Deepened knowledge of trading APIs, risk management, and secure financial systems.',
			'Groove Up → Music streaming platform → Delivered artist–fan engagement with wallet integration, real-time chat, and blockchain rewards → Learned to merge media delivery, social interaction, and blockchain incentives into seamless user experiences.',
			'Syncboard Solutions → Laboratory management system → Automated diagnostics, billing, specimen tracking, and reporting → Built expertise in healthcare workflows, compliance, and accuracy-driven backend systems.',
			'School Management System → Education platform → Streamlined admissions, student records, fee payments, and virtual learning center → Strengthened ability to design multi-module platforms balancing administration and student engagement.',
			'KEDU → Social platform → Built mobile-first chat, media sharing, and content feeds optimized for performance → Gained experience in scaling social engagement systems and optimizing backend performance.',
			'CareHive Health → Telemedicine platform → Enabled secure video consultations, scheduling, and role-based access for patients and doctors → Expanded expertise in secure communication, healthcare-grade data handling, and remote service delivery.',
		],
	},

	skills: {
		backend: [
			'C#',
			'ASP.NET Core',
			'ASP.NET MVC',
			'Web API',
			'JavaScript',
			'TypeScript',
			'NestJS',
			'Express.js',
			'Python',
			'FastAPI',
		],
		blockchain: [
			'Solidity',
			'Smart Contracts',
			'Solana',
			'Base',
			'IPFS',
			'HardHat',
			'Remix',
		],
		devops: [
			'Docker',
			'CI/CD Pipelines',
			'AWS',
			'DigitalOcean Spaces',
			'NGINX',
			'CDN',
			'Redis',
		],
		databases: ['MSSQL', 'MongoDB (Atlas & Compass)', 'SQL'],
		tools: [
			'Git/GitHub',
			'Postman',
			'MSSQL Studio',
			'Cloudinary',
			'SendGrid',
			'Mailgun',
			'Sentry',
		],
	},

	experience: [
		{
			company: 'BlueTag Technologies Ltd',
			title: 'Senior Software Engineer (Lead)',
			location: 'Remote · Enugu State, Nigeria',
			period: '2019 - Present',
			bullets: [
				'Led backend architecture and development for enterprise-grade applications, ensuring scalability, security, and performance across diverse client solutions.',
				'Translated complex business requirements into modular service designs, reducing development time and improving maintainability.',
				'Mentored junior developers, established coding standards, and enforced best practices through reviews and pair programming — elevating team productivity and code quality.',
				'Delivered mission-critical systems in fintech and enterprise domains, consistently meeting deadlines and exceeding client expectations.',
			],
			tech: [
				'C#',
				'ASP.NET Core',
				'MVC',
				'Web API',
				'MS SQL Server',
			],
		},
		{
			company: 'Eastside Ventures',
			title: 'Senior Backend Engineer',
			location: 'Remote · Enugu State, Nigeria',
			period: '2023 – 2025 (Part-time)',
			bullets: [
				'Architected backend infrastructure powering media, dating, and crypto platforms, designed for high concurrency and real-time engagement.',
				'Built wallet infrastructure supporting BTC, USDC, and tokenized assets across Solana and Base networks, enabling secure multi-chain asset management.',
				'Collaborated cross-functionally with product and frontend teams to deliver scalable APIs and event-driven systems.',
			],
			tech: ['NestJS', 'Socket.IO', 'MongoDB', 'Blockchain'],
		},
		{
			company: 'Flipeet Labs',
			title: 'Chief Technology Officer (CTO)',
			location: 'Remote',
			period: '2022 – Present',
			bullets: [
				'Directed technology strategy and product roadmap, advancing Flipeet’s position in blockchain-powered fintech solutions.',
				'Designed and launched the NFT marketplace backend, including wallet connections, multi-chain asset sync, smart contract integrations, and decentralized storage with IPFS.',
				'Developed Flipeet Pay — a stablecoin on/off-ramp platform with merchant APIs, token bridging, and consumer utility payments (airtime, data, gift cards).',
				'Supervised engineering teams, streamlined collaboration, and optimized delivery pipelines to accelerate MVP launches while ensuring long-term scalability.',
				'Established technical vision for Flipeet Raise, a crypto + fiat crowdfunding platform, enabling nonprofits to accept donations globally via Paystack, Flutterwave, and Solana Pay.',
			],
			tech: ['NestJS', 'Node.js', 'Solana', 'Base', 'Web3'],
		},
	],

	projects: [
		{
			name: 'Expense Tracker AI',
			period: '2025',
			description:
				'AI-powered personal finance tracker leveraging NLP to categorize expenses, generate summaries, and predict savings trends. Designed for everyday users to gain actionable insights into spending habits.',
			stack: [
				'Next.js',
				'OpenRouter API',
				'Clerk',
				'Supabase',
				'TypeScript',
			],
			link: 'https://expense-tracker.project.kayceejenz.dev',
			github: 'https://github.com/kayceejenz/expense-tracker',
		},
		{
			name: 'Flipeet Pay',
			period: '2025',
			description:
				'Stablecoin fintech platform enabling global on/off-ramp services, token bridging across chains, and merchant APIs. Supports real-time transaction monitoring and consumer utility payments (airtime, data, gift cards) using USDC and other stable assets.',
			stack: [
				'NestJS',
				'USDC',
				'Solana',
				'Base',
				'Web3',
				'MongoDB',
			],
			link: 'https://pay.flipeet.io',
			github: '#',
		},
		{
			name: 'Flipeet Raise',
			period: '2024',
			description:
				'Crypto-powered crowdfunding platform for nonprofits and social impact projects. Integrated fiat gateways (Paystack, Flutterwave) and Solana Pay for seamless donations via web and Twitter, enabling borderless fundraising.',
			stack: ['NestJS', 'MongoDB', 'Solana', 'TypeScript'],
			link: 'https://raise.flipeet.io',
			github: '#',
		},
		{
			name: 'Membership Portal',
			period: '2024',
			description:
				'Institutional membership management system with forensic verification, renewals, and reporting. Streamlined administrative workflows and enhanced security for member data and compliance tracking.',
			stack: ['ASP.NET MVC', 'C#', 'Bootstrap', 'MSSQL'],
			link: 'https://membershipdemo.bluetag-it.com',
			github: '#',
		},
		{
			name: 'Syncboard Solutions',
			period: '2022',
			description:
				'Digital trading platform supporting wallet systems, staking, and automated trading bots. Integrated with Binance, Coinbase, and Bybit APIs to enable SPOT and FUTURES trading, providing users with secure portfolio management tools.',
			stack: ['C#', 'ASP.NET Core', 'MSSQL', 'JavaScript'],
			link: 'https://sandbox.syncboardsolutions.com',
			github: '#',
		},
		{
			name: 'School Portal',
			period: '2020',
			description:
				'Comprehensive school management platform with admissions, fee payments, LMS, academic result processing, and SMS notifications. Improved efficiency for administrators and enhanced learning experiences for students.',
			stack: ['ASP.NET MVC', 'C#', 'Bootstrap', 'MSSQL'],
			link: 'https://staging.schoolport.ng',
			github: '#',
		},
	],

	contact: {
		email: 'kayceejenz@gmail.com',
		location: 'Liverpool, United Kingdom',
		links: {
			linkedin: 'https://www.linkedin.com/in/kayceejenz/',
			github: 'https://github.com/kayceejenz',
			twitter: 'https://twitter.com/kayceejenz',
			hackerrank: 'https://hackerrank.com/kayceejenz',
		},
	},
};
