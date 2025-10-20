// data/config.js
export default {
	site: {
		title: 'Jenz — Backend Engineer',
		description:
			'Backend Engineer building APIs, crypto payments, and scalable systems. 6+ years experience in .NET, Node.js, and blockchain.',
		url: 'https://kayceejenz.dev',
		resume: '/files/Jenz_Resume.pdf',
	},

	hero: {
		name: 'Precious Kosisochukwu (Okolo)',
		headline: 'Software Engineer [Backend] — AI · Blockchain · APIs',
		subheadline:
			'I design and build secure, scalable backend systems, payment rails, and blockchain integrations for web and mobile products.',
		ctas: [
			{
				label: 'Download Résumé',
				href: '/files/Jenz_Resume.pdf',
			},
			{ label: 'Contact Me', href: '#contact' },
		],
	},

	about: {
		summary: 'Backend engineer with 5+ years of experience building enterprise and startup-grade systems. Strong background in C#, ASP.NET Core, Node.js, NestJS, and blockchain integrations. Experienced as a technical lead and CTO, mentoring junior engineers and shipping mission-critical products across fintech, media, and marketplaces.',
		highlights: [
			'Led backend development at BlueTag Technologies as Senior Software Engineer (Lead).',
			'CTO at Flipeet Marketplace — built NFT marketplace backends and Flipeet Pay (stablecoin on/off-ramp).',
			'Built wallet infrastructure for BTC, USDC and tokens on Solana and Base.',
		],
	},

	skills: {
		backend: [
			'C#',
			'ASP.NET Core',
			'ASP.NET MVC',
			'Web API',
			'NestJS',
			'Express',
		],
		blockchain: [
			'Solana',
			'Base',
			'USDC',
			'Smart Contracts',
			'IPFS',
		],
		devops: [
			'Docker',
			'DigitalOcean Spaces',
			'CDN',
			'CI/CD',
			'Plausible Analytics',
		],
		languages: ['TypeScript', 'JavaScript', 'SQL', 'T-SQL'],
		tools: [
			'MongoDB',
			'MSSQL',
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
			period: 'Apr 2024 - Present',
			bullets: [
				'Promoted to lead development on mission-critical modules for internal and client-facing systems.',
				'Translated functional specs into scalable backend services; managed junior developers via code reviews and pair programming.',
			],
			tech: [
				'C#',
				'ASP.NET MVC',
				'ASP.NET Core',
				'API Development',
			],
		},
		{
			company: 'Eastside Ventures',
			title: 'Senior Backend Engineer (Lead)',
			location: 'Remote',
			period: 'Aug 2023 - Present (Part-time)',
			bullets: [
				'Led backend development across media, dating, education and crypto infrastructure.',
				'Built wallet infrastructure for BTC, USDC and native tokens on Solana and Base; integrated payment gateways and KYC APIs.',
			],
			tech: ['NestJS', 'Socket.IO', 'MongoDB'],
		},
		{
			company: 'Flipeet Marketplace',
			title: 'Chief Technology Officer',
			location: 'Remote',
			period: 'Mar 2022 - Present',
			bullets: [
				'Built NFT marketplace backend, wallet connection, multi-chain sync, and event-driven transaction systems.',
				'Led development of Flipeet Pay — a stablecoin-based on/off-ramp and merchant tools.',
			],
			tech: ['Node.js', 'NestJS', 'Blockchain'],
		},
		{
			company: 'CareHive',
			title: 'Backend Engineer (Contract)',
			location: 'Remote',
			period: 'Sep 2022 - Dec 2022',
			bullets: [
				'Delivered an MVP in under 3 days for a telehealth platform; integrated Zoom API; implemented a dynamic queueing system.',
			],
			tech: ['Node.js', 'TypeScript'],
		},
	],

	projects: [
		{
			name: 'Flipeet Pay',
			period: 'Jan 2025 – Present',
			description:
				'Crypto fintech platform for accepting stablecoin payments, on/off-ramp services, token bridging, and merchant payment tools.',
			stack: ['NestJS', 'USDC', 'Solana'],
			link: '#',
			github: '#',
		},
		{
			name: 'TradeHouse',
			period: 'Jan 2025 – Present',
			description:
				'Digital trading platform enabling wallets, P2P orders, crypto loans, staking, and automated trading bots.',
			stack: ['Node.js', 'APIs', 'P2P'],
			link: '#',
			github: '#',
		},
		{
			name: 'Secondary School Portal',
			period: 'MVP delivered 2020',
			description:
				'Full-featured school management portal with admissions, results processing, LMS, and bulk notifications. Built during internship and completed MVP in ~6 months.',
			stack: ['ASP.NET MVC', 'C#', 'Bootstrap'],
			link: '#',
			github: '#',
		},
	],

	education: [
		{
			school: 'Enugu State University of Science and Technology',
			degree: 'B.Sc, Computer Science',
			period: '2016 – 2020',
		},
	],

	certifications: [
		{
			name: 'Software Engineer',
			issuer: 'HackerRank',
			date: 'Nov 2023',
			id: '7c605c872fc3',
		},
		{
			name: 'SQL (Advanced)',
			issuer: 'HackerRank',
			date: 'May 2023',
			id: '2e1f667dc216',
		},
	],

	contact: {
		email: 'kaycee.jenz@example.com',
		phone: '',
		location: 'Enugu State, Nigeria',
		links: {
			linkedin: 'https://www.linkedin.com/in/kayceejenz/',
			github: 'https://github.com/kayceejenz',
			twitter: 'https://twitter.com/kayceejenz',
		},
	},
};
