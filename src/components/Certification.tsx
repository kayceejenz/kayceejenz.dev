import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Award, Search, Filter, X } from 'lucide-react';
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

	// Calculate stats
	const totalCerts = certifications.length;
	const uniqueSkills = [...new Set(certifications.flatMap(c => c.skills))]
		.length;
	const platforms = [...new Set(certifications.map(c => c.issuer))]
		.length;

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

				{/* Stats */}
				<div className='grid md:grid-cols-3 gap-6 mb-12'>
					<div className='code-block text-center p-6'>
						<div className='font-mono text-sm space-y-1'>
							<div className='text-primary text-3xl font-bold'>
								{totalCerts}
							</div>
							<div className='text-muted-foreground'>
								Total
								Certifications
							</div>
						</div>
					</div>
					<div className='code-block text-center p-6'>
						<div className='font-mono text-sm space-y-1'>
							<div className='text-primary text-3xl font-bold'>
								{platforms}
							</div>
							<div className='text-muted-foreground'>
								Issuing
								Platforms
							</div>
						</div>
					</div>
					<div className='code-block text-center p-6'>
						<div className='font-mono text-sm space-y-1'>
							<div className='text-primary text-3xl font-bold'>
								{uniqueSkills}
							</div>
							<div className='text-muted-foreground'>
								Skills Validated
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
									className='bg-card/50 backdrop-blur border-primary/20 hover-glow group hover:-translate-y-2 transition-all duration-300'>
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
										</div>

										<CardHeader className='bg-card/30'>
											<div className='flex items-start justify-between gap-2 mb-2'>
												<CardTitle className='text-base text-foreground font-mono leading-tight flex-1'>
													{
														cert.name
													}
												</CardTitle>
											</div>
											<div className='flex items-center gap-2'>
												<Badge
													variant='secondary'
													className='font-mono text-xs'>
													{
														cert.category
													}
												</Badge>
												<Badge
													variant='outline'
													className='font-mono text-xs border-primary/30'>
													{cert.type ||
														'Other'}
												</Badge>
											</div>
										</CardHeader>

										<CardContent className='space-y-4 p-6'>
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
												<div className='font-mono text-xs text-primary mb-2'>
													//
													Skills
												</div>
												<div className='flex flex-wrap gap-2'>
													{cert.skills.map(
														(
															skill,
															skillIndex
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
