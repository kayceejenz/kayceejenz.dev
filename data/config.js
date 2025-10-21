// data/config.js
export default {
	site: {
		title: 'Jenz — Backend Engineer',
		description:
			'Backend Engineer crafting scalable APIs, blockchain integrations, and payment systems. Over 6 years of experience in .NET, Node.js, and distributed systems.',
		url: 'https://kayceejenz.dev',
		resume: '/files/Jenz_Resume.pdf',
	},

	hero: {
		name: 'Precious Kosisochukwu (Okolo)',
		headline: 'Software Engineer [Backend] — AI · Blockchain · Payments',
		subheadline:
			'I architect and build secure backend systems, crypto payment rails, and data-driven infrastructures for modern web and mobile products.',
		ctas: [
			{
				label: 'Download Résumé',
				href: '/files/Jenz_Resume.pdf',
			},
			{ label: 'Contact Me', href: '#contact' },
		],
	},

	about: {
		summary: 'Backend Engineer with 6+ years of experience designing and implementing enterprise-grade and startup-scale systems. Skilled in C#, ASP.NET Core, Node.js, NestJS, and blockchain integrations. Known for translating product ideas into scalable architectures and leading engineering teams across fintech, marketplaces, and AI-focused platforms.',
		highlights: [
			'Senior Software Engineer (Lead) at BlueTag Technologies — driving backend architecture and mentoring junior developers.',
			'CTO at Flipeet Marketplace — led development of NFT marketplace backend and Flipeet Pay (stablecoin on/off-ramp infrastructure).',
			'Built wallet systems for BTC, USDC, and tokens across Solana and Base networks.',
		],
	},

	skills: {
		backend: [
			'C#',
			'ASP.NET Core',
			'ASP.NET MVC',
			'Web API',
			'Javascript',
			'Typescript',
			'NestJS',
			'Express.js',
			'Python',
			'Fast API',
		],
		blockchain: ['Solana', 'Base', 'Smart Contracts', 'IPFS'],
		devops: [
			'Docker',
			'CI/CD',
			'DigitalOcean Spaces',
			'AWS',
			'NGINX',
			'CDN',
		],
		languages: ['TypeScript', 'JavaScript', 'C#', 'Python', 'SQL'],
		tools: [
			'MSSQL',
			'MongoDB',
			'GitHub',
			'Mailgun',
			'SendGrid',
			'Cloudinary',
		],
	},

	experience: [
		{
			company: 'BlueTag Technologies',
			title: 'Senior Software Engineer (Lead)',
			location: 'Remote · Enugu State, Nigeria',
			period: 'May 2019 – Present',
			bullets: [
				'Lead backend architecture and development for enterprise-grade applications.',
				'Translated business requirements into scalable, modular service designs.',
				'Mentored junior developers and enforced best practices through reviews and pair programming.',
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
			title: 'Senior Backend Engineer (Lead)',
			location: 'Remote',
			period: 'Aug 2023 – Present (Part-time)',
			bullets: [
				'Architected and delivered backend infrastructure across media, dating, and crypto ecosystems.',
				'Built wallet infrastructure supporting BTC, USDC, and tokenized assets on Solana and Base.',
				'Integrated KYC providers and fiat–crypto gateways for on/off-ramp operations.',
			],
			tech: ['NestJS', 'Socket.IO', 'MongoDB', 'Blockchain'],
		},
		{
			company: 'Flipeet Labs',
			title: 'Chief Technology Officer (CTO)',
			location: 'Remote',
			period: 'Mar 2022 – Present',
			bullets: [
				'Designed and launched NFT marketplace backend and decentralized asset sync systems.',
				'Developed Flipeet Pay — a blockchain-based on/off-ramp with merchant API tools.',
				'Supervised product roadmap and developer collaboration to deliver high-performance services.',
			],
			tech: ['NestJS', 'Node.js', 'Solana', 'Base', 'Web3'],
		},
	],

	projects: [
		{
			name: 'Flipeet Pay',
			period: 'Jan 2025 – Present',
			description:
				'Blockchain payment infrastructure providing seamless stablecoin on/off-ramps, merchant APIs, and real-time transaction monitoring across Solana and Base networks.',
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
			period: 'Mar 2024 – Present',
			description:
				'Crowdfunding and startup investment platform powered by crypto payments — enabling global fundraising using stablecoins and wallet-based authentication.',
			stack: [
				'NestJS',
				'MongoDB',
				'Solana',
				'Payment Gateway',
				'TypeScript',
			],
			link: 'https://raise.flipeet.io',
			github: '#',
		},
		{
			name: 'Syncboard Solutions',
			period: 'Dec 2021 – Present',
			description:
				'Enterprise digital trading platform with wallet systems, automated trading bots, staking, and P2P exchange. Built with modular architecture for scalability and performance.',
			stack: ['C#', 'ASP.NET Core', 'MSSQL', 'JavaScript'],
			link: 'https://sandbox.syncboardsolutions.com',
			github: '#',
		},
		{
			name: 'School Portal',
			period: 'MVP delivered 2020',
			description:
				'Comprehensive school management platform integrating admissions, result processing, LMS, and SMS notifications. Delivered MVP within 6 months for pilot institutions.',
			stack: ['ASP.NET MVC', 'C#', 'Bootstrap', 'MSSQL'],
			link: 'https://staging.schoolport.ng',
			github: '#',
		},
		{
			name: 'Expense Tracker AI',
			period: 'MVP delivered 2025',
			description:
				'AI-powered personal finance tracker that categorizes transactions, predicts expenses, and provides savings insights using natural language summaries and analytics.',
			stack: [
				'Next.js',
				'OpenRouter API',
				'Clerk',
				'Superbase',
				'TypeScript',
			],
			link: 'https://expense-tracker.project.kayceejenz.dev',
			github: 'https://github.com/kayceejenz/expense-tracker',
		},
	],

	contact: {
		email: 'kayceejenz@gmail.com',
		location: 'Enugu State, Nigeria',
		links: {
			linkedin: 'https://www.linkedin.com/in/kayceejenz/',
			github: 'https://github.com/kayceejenz',
			twitter: 'https://twitter.com/kayceejenz',
		},
	},
};
