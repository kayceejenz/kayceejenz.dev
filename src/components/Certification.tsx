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
	const totalBadges = certifications.reduce((acc, cert) => {
		// Extract badge count from name if it contains "48+ Badges" or similar
		const badgeMatch = cert.name.match(/(\d+)\+?\s*badges?/i);
		return acc + (badgeMatch ? parseInt(badgeMatch[1]) : 1);
	}, 0);

	// Get tier icon based on certification type
	const getTierIcon = (cert: any) => {
		if (cert.type === 'Learning Path Completion')
			return <Trophy className='h-4 w-4 text-primary' />;
		if (cert.type === 'Professional Certification')
			return <Award className='h-4 w-4 text-primary' />;
		if (cert.type === 'Specialization')
			return <Star className='h-4 w-4 text-primary' />;
		if (cert.category === 'AI/ML')
			return <Zap className='h-4 w-4 text-primary' />;
		if (cert.category === 'Cloud Computing')
			return <Shield className='h-4 w-4 text-primary' />;
		return <Award className='h-4 w-4 text-primary' />;
	};

	// Get tier color based on certification type
	const getTierColor = (_cert: any) => {
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
					<h2 className='text-4xl md:text-5xl font-bold text-foreground mb-4'>
						Certifications
					</h2>
					<div className='w-16 h-0.5 bg-primary/60 mx-auto rounded-full'></div>
					<p className='text-lg text-muted-foreground mt-6 max-w-2xl mx-auto'>
						Verified credentials from Microsoft, AWS, MongoDB, and other leading platforms.
					</p>
				</div>

				{/* Stats */}
				<div className='mb-12 grid md:grid-cols-5 gap-4'>
					{[
						{ icon: Trophy, value: `${totalBadges}+`, label: 'Total Badges' },
						{ icon: Trophy, value: learningPaths, label: 'Learning Paths' },
						{ icon: Star, value: uniqueSkills, label: 'Skills Validated' },
					].map(({ icon: Icon, value, label }) => (
						<div key={label} className='text-center p-4 rounded-xl bg-card/50 border border-primary/20'>
							<div className='text-2xl font-bold flex items-center justify-center gap-2 mb-1 text-primary'>
								<Icon className='h-5 w-5' />
								{value}
							</div>
							<p className='text-xs text-muted-foreground'>{label}</p>
						</div>
					))}
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
									key={index}
									className={`backdrop-blur hover-glow group hover:-translate-y-2 transition-all duration-300 flex flex-col ${getTierColor(cert)}`}>
									<CardHeader className='pb-3 relative'>
										{/* Achievement count badge */}
										{cert.achievements && (
											<div className='absolute top-3 right-3 bg-primary/10 text-primary text-xs font-semibold px-2 py-0.5 rounded-full border border-primary/30'>
												{cert.achievements.length} achievements
											</div>
										)}

										<div className='flex items-start gap-1 mb-2 pr-24'>
											{getTierIcon(cert)}
											<CardTitle className='text-sm font-semibold text-foreground leading-snug'>
												{cert.name}
											</CardTitle>
										</div>

										<div className='flex items-center gap-2 flex-wrap'>
											<Badge
												variant='secondary'
												className='text-xs'>
												{cert.category}
											</Badge>
											<Badge
												variant='outline'
												className='text-xs border-primary/30 text-primary'>
												{cert.type || 'Training'}
											</Badge>
										</div>

										{cert.description && (
											<p className='text-xs text-muted-foreground mt-2 leading-relaxed'>
												{cert.description}
											</p>
										)}
									</CardHeader>

										<CardContent className='space-y-4 p-6'>
											{/* Achievement highlights for expert certs */}
											{cert.achievements && (
												<div>
													<div className='text-xs text-primary mb-3 flex items-center gap-2 font-semibold'>
														<Trophy className='h-4 w-4' />
														Key Achievements
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
																		<div className='w-1 h-1 bg-primary rounded-full flex-shrink-0'></div>
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
															<div className='text-xs text-primary font-mono'>
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
													<div className='text-xs text-primary mb-3 flex items-center gap-2 font-semibold'>
														<Star className='h-4 w-4' />
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
																		<div className='w-1 h-1 bg-primary rounded-full flex-shrink-0'></div>
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
															<div className='text-xs text-primary font-mono'>
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
											<div className='grid grid-cols-2 gap-3 p-3 rounded-lg bg-muted/30 border border-primary/10'>
												<div>
													<p className='text-xs text-muted-foreground mb-0.5'>Issuer</p>
													<p className='text-xs text-foreground font-medium'>{cert.issuer}</p>
												</div>
												<div>
													<p className='text-xs text-muted-foreground mb-0.5'>Issued</p>
													<p className='text-xs text-foreground font-medium'>{cert.date}</p>
												</div>
												<div className='col-span-2'>
													<p className='text-xs text-muted-foreground mb-0.5'>Credential ID</p>
													<p className='text-xs text-primary font-mono truncate'>{cert.credentialId}</p>
												</div>
											</div>

											{/* Skills badges */}
											<div>
												<div className='text-xs text-primary mb-2 flex items-center gap-2 font-semibold'>
													<Zap className='h-3 w-3' />
													Skills
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
															View Certificate
														</a>
													</Button>
												)}
										</CardContent>
								</Card>
							)
						)
					) : (
						<div className='col-span-full text-center py-12'>
							<div className='inline-block p-6'>
								<p className='text-muted-foreground'>
									No certifications match your current filters.
								</p>
								<Button
									variant='outline'
									size='sm'
									onClick={
										clearFilters
									}
									className='mt-4 border-primary/30 hover:border-primary'>
									Clear filters
								</Button>
							</div>
						</div>
					)}
				</div>
			</div>
		</section>
	);
}
