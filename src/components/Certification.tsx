import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	ExternalLink,
	Award,
	Search,
	Filter,
	X,
	Trophy,
	Star,
	Crown,
	Zap,
	Shield,
} from 'lucide-react';
import config from '../../data/config.js';

export default function Certifications() {
	const { certifications } = config;

	const [selectedCategory, setSelectedCategory] = useState('All');
	const [selectedType, setSelectedType] = useState('All');
	const [searchQuery, setSearchQuery] = useState('');

	const categories = useMemo(() => {
		const cats = [
			...new Set(
				certifications.map(
					(c: { category: string }) => c.category
				)
			),
		];
		return ['All', ...cats.sort()];
	}, [certifications]);

	const types = useMemo(() => {
		const typeList = [
			...new Set(
				certifications.map(
					(c: { type: string }) =>
						c.type || 'Other'
				)
			),
		];
		return ['All', ...typeList.sort()];
	}, [certifications]);

	// Filter certifications
	const filteredCertifications = useMemo(() => {
		return certifications.filter(cert => {
			const matchesCategory =
				selectedCategory === 'All' ||
				cert.category === selectedCategory;
			const matchesType =
				selectedType === 'All' ||
				(cert.type || 'Other') === selectedType;
			const matchesSearch =
				searchQuery === '' ||
				cert.name
					.toLowerCase()
					.includes(searchQuery.toLowerCase()) ||
				cert.issuer
					.toLowerCase()
					.includes(searchQuery.toLowerCase()) ||
				cert.skills.some(skill =>
					skill
						.toLowerCase()
						.includes(
							searchQuery.toLowerCase()
						)
				);

			return matchesCategory && matchesType && matchesSearch;
		});
	}, [certifications, selectedCategory, selectedType, searchQuery]);

	// Calculate stats and achievements
	const totalCerts = certifications.length;
	const uniqueSkills = [...new Set(certifications.flatMap(c => c.skills))]
		.length;
	const platforms = [...new Set(certifications.map(c => c.issuer))]
		.length;

	// Calculate achievement metrics
	const learningPaths = certifications.filter(
		c =>
			c.type === 'Learning Path Completion' ||
			c.type === 'Specialization'
	).length;
	const aiMlCerts = certifications.filter(
		c => c.category === 'AI/ML'
	).length;
	const cloudCerts = certifications.filter(
		c => c.category === 'Cloud Computing'
	).length;
	const totalBadges = certifications.reduce((acc, cert) => {
		// Extract badge count from name if it contains "48+ Badges" or similar
		const badgeMatch = cert.name.match(/(\d+)\+?\s*badges?/i);
		return acc + (badgeMatch ? parseInt(badgeMatch[1]) : 1);
	}, 0);

	// Get tier icon based on certification type
	const getTierIcon = (cert: any) => {
		if (cert.type === 'Learning Path Completion')
			return <Trophy className='h-4 w-4 text-yellow-500' />;
		if (cert.type === 'Professional Certification')
			return <Award className='h-4 w-4 text-blue-500' />;
		if (cert.type === 'Specialization')
			return <Star className='h-4 w-4 text-purple-500' />;
		if (cert.category === 'AI/ML')
			return <Zap className='h-4 w-4 text-green-500' />;
		if (cert.category === 'Cloud Computing')
			return <Shield className='h-4 w-4 text-cyan-500' />;
		return <Award className='h-4 w-4 text-gray-500' />;
	};

	// Get tier color based on certification type
	const getTierColor = (cert: any) => {
		if (cert.type === 'Learning Path Completion')
			return 'border-yellow-500/50 bg-yellow-500/10';
		if (cert.type === 'Professional Certification')
			return 'border-blue-500/50 bg-blue-500/10';
		if (cert.type === 'Specialization')
			return 'border-purple-500/50 bg-purple-500/10';
		return 'border-primary/20 bg-card/50';
	};

	const clearFilters = () => {
		setSelectedCategory('All');
		setSelectedType('All');
		setSearchQuery('');
	};

	const hasActiveFilters =
		selectedCategory !== 'All' ||
		selectedType !== 'All' ||
		searchQuery !== '';

	return (
		<section
			id='certifications'
			className='py-20 px-6 bg-background'>
			<div className='max-w-7xl mx-auto'>
				{/* Header */}
				<div className='text-center mb-12'>
					<h2 className='text-4xl md:text-5xl font-bold text-foreground mb-4 font-mono'>
						{'{ Certifications }'}
					</h2>
					<div className='w-24 h-1 bg-primary mx-auto neon-glow'></div>
					<p className='text-lg text-muted-foreground mt-6 max-w-2xl mx-auto font-mono'>
						// Validated expertise from
						industry-leading platforms
					</p>
				</div>

				{/* Enhanced Achievement Stats */}
				<div className='mb-12'>
					{/* Stats Grid */}
					<div className='grid md:grid-cols-5 gap-4'>
						<div className='code-block text-center p-4 border-2 border-primary/30'>
							<div className='font-mono text-sm space-y-1'>
								<div className='text-primary text-2xl font-bold flex items-center justify-center gap-2'>
									<Trophy className='h-5 w-5' />
									{
										totalBadges
									}
									+
								</div>
								<div className='text-muted-foreground text-xs'>
									Total
									Badges
								</div>
							</div>
						</div>
						<div className='code-block text-center p-4 border-2 border-yellow-500/30'>
							<div className='font-mono text-sm space-y-1'>
								<div className='text-yellow-500 text-2xl font-bold flex items-center justify-center gap-2'>
									<Trophy className='h-5 w-5' />
									{
										learningPaths
									}
								</div>
								<div className='text-muted-foreground text-xs'>
									Learning
									Paths
								</div>
							</div>
						</div>
						<div className='code-block text-center p-4 border-2 border-green-500/30'>
							<div className='font-mono text-sm space-y-1'>
								<div className='text-green-500 text-2xl font-bold flex items-center justify-center gap-2'>
									<Zap className='h-5 w-5' />
									{
										aiMlCerts
									}
								</div>
								<div className='text-muted-foreground text-xs'>
									AI/ML
									Certs
								</div>
							</div>
						</div>
						<div className='code-block text-center p-4 border-2 border-cyan-500/30'>
							<div className='font-mono text-sm space-y-1'>
								<div className='text-cyan-500 text-2xl font-bold flex items-center justify-center gap-2'>
									<Shield className='h-5 w-5' />
									{
										cloudCerts
									}
								</div>
								<div className='text-muted-foreground text-xs'>
									Cloud
									Certs
								</div>
							</div>
						</div>
						<div className='code-block text-center p-4 border-2 border-purple-500/30'>
							<div className='font-mono text-sm space-y-1'>
								<div className='text-purple-500 text-2xl font-bold flex items-center justify-center gap-2'>
									<Star className='h-5 w-5' />
									{
										uniqueSkills
									}
								</div>
								<div className='text-muted-foreground text-xs'>
									Skills
									Validated
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Filters */}
				<div className='mb-8 space-y-4'>
					{/* Search Bar */}
					<div className='relative max-w-md'>
						<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none' />
						<input
							type='text'
							placeholder='Search certifications, skills, or issuers...'
							value={searchQuery}
							onChange={e =>
								setSearchQuery(
									e.target
										.value
								)
							}
							className='w-full pl-10 pr-4 py-2 font-mono text-sm bg-card/50 border border-primary/20 rounded-md focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors'
						/>
					</div>

					{/* Category Tabs */}
					<div className='space-y-3'>
						<div className='flex items-center gap-2'>
							<Filter className='h-4 w-4 text-primary' />
							<span className='font-mono text-sm text-muted-foreground'>
								Category:
							</span>
						</div>
						<div className='flex flex-wrap gap-2'>
							{categories.map(
								(
									category: string
								) => (
									<Button
										key={
											category
										}
										variant={
											selectedCategory ===
											category
												? 'default'
												: 'outline'
										}
										size='sm'
										onClick={() =>
											setSelectedCategory(
												category
											)
										}
										className={`font-mono transition-all duration-300 ${
											selectedCategory ===
											category
												? 'bg-primary text-primary-foreground neon-glow'
												: 'border-primary/30 hover:border-primary'
										}`}>
										{
											category
										}
									</Button>
								)
							)}
						</div>
					</div>

					{/* Type Filter */}
					<div className='space-y-3'>
						<div className='flex items-center gap-2'>
							<Award className='h-4 w-4 text-primary' />
							<span className='font-mono text-sm text-muted-foreground'>
								Type:
							</span>
						</div>
						<div className='flex flex-wrap gap-2'>
							{types.map(
								(
									type: string
								) => (
									<Button
										key={
											type
										}
										variant={
											selectedType ===
											type
												? 'default'
												: 'outline'
										}
										size='sm'
										onClick={() =>
											setSelectedType(
												type
											)
										}
										className={`font-mono transition-all duration-300 ${
											selectedType ===
											type
												? 'bg-primary text-primary-foreground neon-glow'
												: 'border-primary/30 hover:border-primary'
										}`}>
										{
											type
										}
									</Button>
								)
							)}
						</div>
					</div>

					{/* Clear Filters */}
					{hasActiveFilters && (
						<div className='flex items-center gap-2'>
							<Button
								variant='ghost'
								size='sm'
								onClick={
									clearFilters
								}
								className='font-mono text-muted-foreground hover:text-foreground'>
								<X className='h-4 w-4 mr-2' />
								Clear all
								filters
							</Button>
							<span className='font-mono text-sm text-muted-foreground'>
								Showing{' '}
								{
									filteredCertifications.length
								}{' '}
								of {totalCerts}
							</span>
						</div>
					)}
				</div>

				{/* Certifications Grid */}
				<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
					{filteredCertifications.length > 0 ? (
						filteredCertifications.map(
							(cert, index) => (
								<Card
									key={
										index
									}
									className={`backdrop-blur hover-glow group hover:-translate-y-2 transition-all duration-300 ${getTierColor(
										cert
									)}`}>
									<div className='terminal-window'>
										<div className='terminal-header'>
											<div className='terminal-dot red'></div>
											<div className='terminal-dot yellow'></div>
											<div className='terminal-dot green'></div>
											<span className='font-mono text-xs text-muted-foreground ml-2'>
												~/certs/
												{cert.category
													?.toLowerCase()
													.replace(
														/\//g,
														'-'
													)}
												.cert
											</span>
											<div className='ml-auto flex items-center gap-1'>
												{getTierIcon(
													cert
												)}
												{cert.type ===
													'Expert Certification' && (
													<span className='text-xs font-mono text-yellow-500 font-bold'>
														EXPERT
													</span>
												)}
												{cert.name.includes(
													'🏆'
												) && (
													<Trophy className='h-3 w-3 text-yellow-500' />
												)}
											</div>
										</div>

										<CardHeader className='bg-card/30 relative'>
											{/* Achievement badges for special certs */}
											{cert.achievements && (
												<div className='absolute -top-2 -right-2 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded-full shadow-lg'>
													{
														cert
															.achievements
															.length
													}{' '}
													ACHIEVEMENTS
												</div>
											)}

											<div className='flex items-start justify-between gap-2 mb-2'>
												<CardTitle className='text-base text-foreground font-mono leading-tight flex-1'>
													{
														cert.name
													}
												</CardTitle>
											</div>

											<div className='flex items-center gap-2 flex-wrap'>
												<Badge
													variant='secondary'
													className='font-mono text-xs flex items-center gap-1'>
													{getTierIcon(
														cert
													)}
													{
														cert.category
													}
												</Badge>
												<Badge
													variant='outline'
													className={`font-mono text-xs ${
														cert.type ===
														'Expert Certification'
															? 'border-yellow-500/50 text-yellow-300'
															: cert.type ===
															  'Professional Certification'
															? 'border-blue-500/50 text-blue-300'
															: cert.type ===
															  'Specialization'
															? 'border-purple-500/50 text-purple-300'
															: 'border-primary/30'
													}`}>
													{cert.type ||
														'Other'}
												</Badge>
												{/* Badge count indicator */}
												{cert.name.includes(
													'48+'
												) && (
													<Badge className='bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold text-xs'>
														48+
														BADGES
													</Badge>
												)}
											</div>

											{/* Special description for expert certs */}
											{cert.description && (
												<p className='text-xs text-muted-foreground mt-3 font-mono italic'>
													{
														cert.description
													}
												</p>
											)}
										</CardHeader>

										<CardContent className='space-y-4 p-6'>
											{/* Achievement highlights for expert certs */}
											{cert.achievements && (
												<div>
													<div className='font-mono text-xs text-yellow-500 mb-3 flex items-center gap-2'>
														<Trophy className='h-4 w-4' />
														//
														Key
														Achievements
													</div>
													<div className='space-y-2 max-h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-primary/20'>
														{cert.achievements
															.slice(
																0,
																4
															)
															.map(
																(
																	achievement: string,
																	idx: number
																) => (
																	<div
																		key={
																			idx
																		}
																		className='flex items-center gap-2 text-xs'>
																		<div className='w-1 h-1 bg-yellow-500 rounded-full flex-shrink-0'></div>
																		<span className='font-mono text-muted-foreground'>
																			{
																				achievement
																			}
																		</span>
																	</div>
																)
															)}
														{cert
															.achievements
															.length >
															4 && (
															<div className='text-xs text-yellow-500 font-mono'>
																+
																{cert
																	.achievements
																	.length -
																	4}{' '}
																more
																achievements...
															</div>
														)}
													</div>
												</div>
											)}

											{/* Specializations for expert certs */}
											{cert.specializations && (
												<div>
													<div className='font-mono text-xs text-blue-500 mb-3 flex items-center gap-2'>
														<Star className='h-4 w-4' />
														//
														Specializations
													</div>
													<div className='space-y-1 max-h-24 overflow-y-auto scrollbar-thin scrollbar-thumb-primary/20'>
														{cert.specializations
															.slice(
																0,
																3
															)
															.map(
																(
																	spec: string,
																	idx: number
																) => (
																	<div
																		key={
																			idx
																		}
																		className='flex items-center gap-2 text-xs'>
																		<div className='w-1 h-1 bg-blue-500 rounded-full flex-shrink-0'></div>
																		<span className='font-mono text-muted-foreground'>
																			{
																				spec
																			}
																		</span>
																	</div>
																)
															)}
														{cert
															.specializations
															.length >
															3 && (
															<div className='text-xs text-blue-500 font-mono'>
																+
																{cert
																	.specializations
																	.length -
																	3}{' '}
																more
																specializations...
															</div>
														)}
													</div>
												</div>
											)}

											{/* Certification metadata */}
											<div className='code-block'>
												<div className='font-mono text-xs space-y-1'>
													<div className='text-primary'>
														const
														cert
														={' '}
														{
															'{'
														}
													</div>
													<div className='ml-2 text-muted-foreground'>
														issuer:{' '}
														<span className='text-foreground'>
															"
															{
																cert.issuer
															}

															"
														</span>

														,
													</div>
													<div className='ml-2 text-muted-foreground'>
														issued:{' '}
														<span className='text-primary'>
															"
															{
																cert.date
															}

															"
														</span>

														,
													</div>
													<div className='ml-2 text-muted-foreground'>
														id:{' '}
														<span className='text-green-400'>
															"
															{
																cert.credentialId
															}

															"
														</span>

														,
													</div>
													<div className='ml-2 text-muted-foreground'>
														verified:{' '}
														<span className='text-green-400'>
															true
														</span>
													</div>
													<div className='text-primary'>
														{
															'}'
														}
													</div>
												</div>
											</div>

											{/* Skills badges */}
											<div>
												<div className='font-mono text-xs text-primary mb-2 flex items-center gap-2'>
													<Zap className='h-3 w-3' />
													//
													Skills
													Validated
												</div>
												<div className='flex flex-wrap gap-2'>
													{cert.skills.map(
														(
															skill: string,
															skillIndex: number
														) => (
															<Badge
																key={
																	skillIndex
																}
																variant='outline'
																className='bg-primary/10 text-primary border-primary/30 hover:border-primary hover:neon-glow font-mono text-xs transition-all duration-300'>
																{
																	skill
																}
															</Badge>
														)
													)}
												</div>
											</div>

											{/* Action button */}
											{cert.link &&
												cert.link !==
													'#' && (
													<Button
														variant='outline'
														size='sm'
														asChild
														className='w-full font-mono border-primary/30 hover:border-primary hover:neon-glow'>
														<a
															href={
																cert.link
															}
															target='_blank'
															rel='noopener noreferrer'>
															<ExternalLink className='mr-2 h-3 w-3' />
															verify()
														</a>
													</Button>
												)}
										</CardContent>
									</div>
								</Card>
							)
						)
					) : (
						<div className='col-span-full text-center py-12'>
							<div className='code-block inline-block p-6'>
								<p className='font-mono text-muted-foreground'>
									// No
									certifications
									match
									your
									filters
								</p>
								<Button
									variant='outline'
									size='sm'
									onClick={
										clearFilters
									}
									className='mt-4 font-mono border-primary/30 hover:border-primary'>
									Clear
									filters
								</Button>
							</div>
						</div>
					)}
				</div>
			</div>
		</section>
	);
}
