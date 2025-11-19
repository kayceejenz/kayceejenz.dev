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
		summary: 'Backend Software Engineer & CTO with 5+ years of experience architecting scalable systems across fintech, blockchain, healthtech, edtech, and entertainment. I specialize in transforming product ideas into resilient architectures, leading engineering teams, and building platforms that handle complex integrations, high transaction volumes, and diverse user needs.',
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

	education: [
		{
			degree: 'Master in Artifical Intelligence',
			field: 'Artifical Intelligence',
			institution: 'University of Salford',
			location: 'Manchester, United Kingdom',
			period: '2026 - 2027',
			grade: 'N/A',
			achievements: [],
			courses: [
				'Machine Learning',
				'Big Data',
				'Natural Language Processing',
				'Deep Learning',
			],
			status: 'in_process',
			blur: true,
		},
		{
			degree: 'Bachelor of Science in Computer Science',
			field: 'Computer Science',
			institution:
				'Enugu State University of Science and Technology',
			location: 'Enugu, Nigeria',
			period: '2016 - 2020',
			grade: 'Second Class Upper',
			achievements: [
				'Built campus management system used by 5000+ students',
				'Won Best Final Year Project award',
				'President of Computer Science Society',
			],
			courses: [
				'Software Engineering',
				'Data Structures and Alogrithms',
				'System Analysis and Design',
				'Web Development',
				'Database Design and Optimization',
				'Computer Networking',
			],
			status: 'completed',
			blur: false,
		},
	],

	certifications: [
		{
			name: 'The AI Engineer Course 2025: Complete AI Engineer Bootcamp',
			issuer: 'Udemy',
			date: 'Nov 2025',
			credentialId: 'UC-7d8e4b36-2be9-4792-9e3e-4a60e53b1145',
			skills: ['Artificial Intelligence (AI)'],
			achievements: [
				'Completed linear algebra foundations for ML and Data Science',
			],
			link: 'https://www.udemy.com/certificate/UC-7d8e4b36-2be9-4792-9e3e-4a60e53b1145/',
			logo: 'Udemy',
		},
		{
			name: 'Linear Algebra for Data Science and Machine Learning',
			issuer: 'Udemy',
			date: 'Sep 2025',
			credentialId: 'UC-49ebbe90-8130-4899-841f-10f8c734e907',
			skills: ['Artificial Intelligence (AI)'],
			achievements: [
				'Completed linear algebra foundations for ML and Data Science',
			],
			link: 'https://www.udemy.com/certificate/UC-49ebbe90-8130-4899-841f-10f8c734e907/',
			logo: 'Udemy',
		},
		{
			name: 'Software Engineer Certificate',
			issuer: 'HackerRank',
			date: 'Nov 2023',
			credentialId: '7c605c872fc3',
			skills: ['ASP.NET Core', 'NestJS'],
			achievements: [
				'Passed HackerRank software engineering assessments',
			],
			link: 'https://www.hackerrank.com/certificates/7c605c872fc3',
			logo: 'HackerRank',
		},
		{
			name: 'SQL (Advanced) Certificate',
			issuer: 'HackerRank',
			date: 'May 2023',
			credentialId: '2e1f667dc216',
			skills: ['SQL', 'Database Query Optimization'],
			achievements: [
				'Demonstrated advanced SQL querying and analytics skills',
			],
			link: 'https://www.hackerrank.com/certificates/2e1f667dc216',
			logo: 'HackerRank',
		},
		{
			name: 'Problem Solving (Basic) Certificate',
			issuer: 'HackerRank',
			date: 'Mar 2023',
			credentialId: '1e338eb6d3b0',
			skills: ['Logical Reasoning', 'Algorithms'],
			achievements: [
				'Completed foundational problem-solving challenges',
			],
			link: 'https://www.hackerrank.com/certificates/1e338eb6d3b0',
			logo: 'HackerRank',
		},
		{
			name: 'Problem Solving (Intermediate) Certificate',
			issuer: 'HackerRank',
			date: 'Mar 2023',
			credentialId: 'a42592d1f289',
			skills: ['Algorithms', 'Data Structures'],
			achievements: [
				'Solved intermediate-level algorithmic problems',
			],
			link: 'https://www.hackerrank.com/certificates/a42592d1f289',
			logo: 'HackerRank',
		},
		{
			name: 'REST API (Intermediate) Certificate',
			issuer: 'HackerRank',
			date: 'Mar 2023',
			credentialId: '36990c1b5f95',
			skills: [
				'REST API Development',
				'ASP.NET Core',
				'NestJS',
			],
			achievements: [
				'Built and optimized API endpoints in challenges',
			],
			link: 'https://www.hackerrank.com/certificates/36990c1b5f95',
			logo: 'HackerRank',
		},
		{
			name: 'SQL (Basic) Certificate',
			issuer: 'HackerRank',
			date: 'Mar 2023',
			credentialId: '57329ad5e38b',
			skills: ['SQL'],
			achievements: [
				'Completed basic SQL operations and queries',
			],
			link: 'https://www.hackerrank.com/certificates/57329ad5e38b',
			logo: 'HackerRank',
		},
		{
			name: 'SQL (Intermediate) Certificate',
			issuer: 'HackerRank',
			date: 'Mar 2023',
			credentialId: 'a3701a66f8f1',
			skills: ['SQL', 'Database Joins & Aggregation'],
			achievements: ['Completed intermediate SQL challenges'],
			link: 'https://www.hackerrank.com/certificates/a3701a66f8f1',
			logo: 'HackerRank',
		},
		{
			name: "Ethereum and Solidity: The Complete Developer's Guide",
			issuer: 'Udemy',
			date: 'Feb 2023',
			credentialId: 'UC-08017e60-01b0-4f67-abf2-d4aaa9f7be5f',
			skills: [
				'Solidity',
				'Ethereum',
				'Smart Contracts',
				'Web3',
				'Blockchain',
			],
			achievements: [
				'Built full-stack dApps and deployed smart contracts',
			],
			link: 'https://www.udemy.com/certificate/UC-08017e60-01b0-4f67-abf2-d4aaa9f7be5f/',
			logo: 'Udemy',
		},
		{
			name: 'JavaScript (Basic) Certificate',
			issuer: 'HackerRank',
			date: 'Nov 2022',
			credentialId: 'E318F3565002',
			skills: ['JavaScript', 'API Development', 'NestJS'],
			achievements: [
				'Completed fundamental JavaScript challenges',
			],
			link: 'https://www.hackerrank.com/certificates/E318F3565002',
			logo: 'HackerRank',
		},
		{
			name: 'JavaScript (Intermediate) Certificate',
			issuer: 'HackerRank',
			date: 'Nov 2022',
			credentialId: 'D54ADA727140',
			skills: ['JavaScript', 'API Development', 'NestJS'],
			achievements: [
				'Solved intermediate JavaScript problems',
			],
			link: 'https://www.hackerrank.com/certificates/d54ada727140',
			logo: 'HackerRank',
		},
		{
			name: 'Node.js (Basic) Certificate',
			issuer: 'HackerRank',
			date: 'Nov 2022',
			credentialId: 'FC9761816854',
			skills: ['Node.js', 'API Development', 'NestJS'],
			achievements: [
				'Completed basic server-side programming challenges',
			],
			link: 'https://www.hackerrank.com/certificates/FC9761816854',
			logo: 'HackerRank',
		},
		{
			name: 'Cloud Computing Basics (Cloud 101)',
			issuer: 'Coursera',
			date: 'Apr 2022',
			credentialId: 'MDRF34BPET26',
			skills: [
				'Cloud Computing Fundamentals',
				'Networking Basics',
			],
			achievements: [
				'Completed foundational cloud computing training',
			],
			link: 'https://coursera.org/verify/MDRF34BPET26',
			logo: 'Coursera',
		},
		{
			name: 'Jobberman Soft-Skills Training',
			issuer: 'Jobberman Nigeria',
			date: 'Jun 2021',
			credentialId: 'SH-IT-08061',
			skills: [
				'Communication',
				'Teamwork',
				'Professional Skills',
			],
			achievements: [
				'Completed Jobberman employability training',
			],
			link: 'https://onedrive.live.com/?redeem=aHR0cHM6Ly8xZHJ2Lm1zL2IvcyFBcnc5SC1aS3BvSXNncTVVOGZlT1MwcFQxb20xblE%5FZT1YeFZPZFM&cid=2C82A64AE61F3DBC&id=2C82A64AE61F3DBC%2138740&parId=2C82A64AE61F3DBC%2138739&o=OneUp',
			logo: 'Jobberman',
		},
	],
};
