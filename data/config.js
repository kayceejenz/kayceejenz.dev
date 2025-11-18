// data/config.js
export default {
	site: {
		title: 'Precious Kosisochukwu — Backend Engineer',
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
		summary: 'Backend Engineer with 6+ years of experience designing and implementing enterprise-grade and startup-scale systems. Skilled in C#, ASP.NET Core, Node.js, NestJS, and blockchain integrations. Known for translating product ideas into scalable architectures and leading engineering teams across fintech, marketplaces, and AI-focused platforms. Currently exploring the world of AI and its intersection with backend automation and intelligent systems.',
		highlights: [
			'Senior Software Engineer (Lead) at BlueTag Technologies — driving backend architecture and mentoring junior developers.',
			'CTO at Flipeet Marketplace — led development of NFT marketplace backend and Flipeet Pay (stablecoin on/off-ramp infrastructure).',
			'Built wallet systems for BTC, USDC, and tokens across Solana and Base networks.',
			'Passionate about building the future of intelligent backend systems — blending AI, automation, and scalable engineering.',
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
			name: 'Expense Tracker AI',
			period: '2025',
			description:
				'AI-powered personal finance tracker using NLP to summarize expenses and predict savings.',
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
				'Stablecoin on/off-ramp infrastructure with merchant APIs and real-time transaction monitoring across Solana and Base.',
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
				'Crypto-powered crowdfunding platform enabling global fundraising via wallet-based authentication and Solana Pay.',
			stack: ['NestJS', 'MongoDB', 'Solana', 'TypeScript'],
			link: 'https://raise.flipeet.io',
			github: '#',
		},
		{
			name: 'Syncboard Solutions',
			period: '2024',
			description:
				'Digital trading platform with wallet systems, staking, and automated trading bots built in C#.',
			stack: ['C#', 'ASP.NET Core', 'MSSQL', 'JavaScript'],
			link: 'https://sandbox.syncboardsolutions.com',
			github: '#',
		},
		{
			name: 'Membership Portal',
			period: '2024',
			description:
				'Institutional membership system with forensic verification, renewals, and reporting tools.',
			stack: ['ASP.NET MVC', 'C#', 'Bootstrap', 'MSSQL'],
			link: 'https://membershipdemo.bluetag-it.com',
			github: '#',
		},
		{
			name: 'School Portal',
			period: '2020',
			description:
				'Comprehensive school management platform with LMS, result processing, and SMS notifications.',
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
		},
	},
};
