import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	ExternalLink,
	Github,
	Calendar,
	Code2,
	Star,
	Users,
	TrendingUp,
	Zap,
	Award,
	Target,
	Filter,
	X,
} from 'lucide-react';
import config from '../../data/config.js';

export function Projects() {
	const { projects } = config;
	const [selectedFilter, setSelectedFilter] = useState('all');

	// Get unique technologies for filtering
	const allTechnologies = [...new Set(projects.flatMap(p => p.stack))];
	const categories = ['all', 'blockchain', 'fintech', 'ai', 'backend'];

	// Filter projects based on selected filter
	const filteredProjects = projects.filter(project => {
		if (selectedFilter === 'all') return true;
		if (selectedFilter === 'blockchain')
			return project.stack.some(tech =>
				[
					'Solana',
					'Ethereum',
					'Blockchain',
					'Web3',
					'Smart Contracts',
				].includes(tech)
			);
		if (selectedFilter === 'fintech')
			return (
				project.name.toLowerCase().includes('pay') ||
				project.description
					.toLowerCase()
					.includes('payment') ||
				project.description
					.toLowerCase()
					.includes('financial')
			);
		if (selectedFilter === 'ai')
			return project.stack.some(tech =>
				[
					'AI',
					'Machine Learning',
					'Python',
					'TensorFlow',
				].includes(tech)
			);
		if (selectedFilter === 'backend')
			return project.stack.some(tech =>
				[
					'Node.js',
					'Python',
					'Express',
					'FastAPI',
					'MongoDB',
					'PostgreSQL',
				].includes(tech)
			);
		return true;
	});

	return (
		<section id='projects' className='py-20 px-6 bg-muted/30'>
			<div className='max-w-6xl mx-auto'>
				<div className='text-center mb-16'>
					<h2 className='text-4xl md:text-5xl font-bold text-foreground mb-4 font-mono'>
						{'{ Project Portfolio }'}
					</h2>
					<div className='w-24 h-1 bg-primary mx-auto neon-glow'></div>
					<p className='text-lg text-muted-foreground mt-6 max-w-2xl mx-auto font-mono'>
						// Production-ready applications
						built with modern tech stack
					</p>

					{/* Filter Controls */}
					<div className='mt-8 flex flex-wrap justify-center gap-2'>
						{categories.map(category => (
							<Button
								key={category}
								variant={
									selectedFilter ===
									category
										? 'default'
										: 'outline'
								}
								size='sm'
								onClick={() =>
									setSelectedFilter(
										category
									)
								}
								className={`font-mono transition-all duration-300 ${
									selectedFilter ===
									category
										? 'neon-glow'
										: 'border-primary/30 hover:border-primary hover:neon-glow'
								}`}>
								{selectedFilter ===
									category && (
									<Filter className='h-3 w-3 mr-2' />
								)}
								{category ===
									'all' &&
									'all()'}
								{category ===
									'blockchain' &&
									'web3()'}
								{category ===
									'fintech' &&
									'fintech()'}
								{category ===
									'ai' &&
									'ai()'}
								{category ===
									'backend' &&
									'backend()'}
							</Button>
						))}
						{selectedFilter !== 'all' && (
							<Button
								variant='ghost'
								size='sm'
								onClick={() =>
									setSelectedFilter(
										'all'
									)
								}
								className='font-mono text-muted-foreground hover:text-foreground'>
								<X className='h-3 w-3 mr-1' />
								clear()
							</Button>
						)}
					</div>

					{/* Results Counter */}
					<div className='mt-4 font-mono text-sm text-muted-foreground'>
						// Showing{' '}
						{filteredProjects.length} of{' '}
						{projects.length} projects
					</div>
				</div>

				<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
					{filteredProjects.map(
						(project, index) => (
							<Card
								key={index}
								className='bg-card/50 backdrop-blur border-primary/20 hover-glow group hover:-translate-y-2 transition-all duration-300'>
								<div className='terminal-window'>
									<div className='terminal-header'>
										<div className='terminal-dot red'></div>
										<div className='terminal-dot yellow'></div>
										<div className='terminal-dot green'></div>
										<span className='font-mono text-xs text-muted-foreground ml-2'>
											~/projects/
											{project.name
												.toLowerCase()
												.replace(
													/\s+/g,
													'_'
												)}
											.js
										</span>
									</div>

									<CardHeader className='bg-card/30 relative'>
										{/* Project Status Badge */}
										<div className='absolute -top-3 -right-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-mono font-bold shadow-lg'>
											LIVE
										</div>

										<div className='flex flex-col gap-3'>
											<div className='flex items-start justify-between'>
												<CardTitle className='text-xl text-foreground font-mono leading-tight'>
													<span className='text-primary'>
														const
													</span>{' '}
													project
													=
													"
													<span className='text-green-400'>
														{
															project.name
														}
													</span>

													"
												</CardTitle>
											</div>

											{/* Project Metadata */}
											<div className='flex items-center justify-between'>
												<div className='flex items-center gap-2 text-muted-foreground'>
													<Calendar className='h-3 w-3 text-primary' />
													<span className='text-xs font-mono'>
														{
															project.period
														}
													</span>
												</div>
												<div className='flex items-center gap-1'>
													<Code2 className='h-3 w-3 text-primary' />
													<span className='text-xs font-mono text-muted-foreground'>
														{
															project
																.stack
																.length
														}{' '}
														tech
													</span>
												</div>
											</div>
										</div>
									</CardHeader>

									<CardContent className='space-y-6 p-6'>
										{/* Project Description */}
										<div className='code-block'>
											<div className='font-mono text-sm space-y-2'>
												<div className='text-primary'>
													const
													projectInfo
													={' '}
													{
														'{'
													}
												</div>
												<div className='ml-4 text-muted-foreground space-y-1'>
													<div>
														description:{' '}
														<span className='text-yellow-500'>
															"
															{
																project.description
															}

															"
														</span>

														,
													</div>
													<div>
														impact:{' '}
														<span className='text-green-400'>
															"production-ready"
														</span>

														,
													</div>
													<div>
														techStack:{' '}
														<span className='text-blue-400'>
															[
															{
																project
																	.stack
																	.length
															}{' '}
															technologies]
														</span>
													</div>
												</div>
												<div className='text-primary'>
													{
														'}'
													}
												</div>
											</div>
										</div>

										{/* Tech Stack */}
										<div>
											<div className='flex items-center justify-between mb-3'>
												<div className='font-mono text-sm text-primary flex items-center gap-2'>
													<Zap className='h-4 w-4' />
													//
													Tech
													Stack
												</div>
												<Badge
													variant='secondary'
													className='text-xs font-mono'>
													{
														project
															.stack
															.length
													}{' '}
													technologies
												</Badge>
											</div>
											<div className='flex flex-wrap gap-2'>
												{project.stack.map(
													(
														tech,
														techIndex
													) => (
														<Badge
															key={
																techIndex
															}
															variant='outline'
															className='bg-primary/10 text-primary border-primary/30 hover:border-primary hover:neon-glow font-mono text-xs transition-all duration-300 hover:scale-105'>
															{
																tech
															}
														</Badge>
													)
												)}
											</div>
										</div>

										{/* Action Buttons */}
										<div className='flex gap-2 pt-2'>
											{project.link &&
												project.link !==
													'#' && (
													<Button
														variant='outline'
														size='sm'
														asChild
														className='flex-1 font-mono border-primary/30 hover:border-primary hover:neon-glow'>
														<a
															href={
																project.link
															}
															target='_blank'
															rel='noopener noreferrer'>
															<ExternalLink className='mr-2 h-3 w-3' />
															deploy()
														</a>
													</Button>
												)}
											{project.github &&
												project.github !==
													'#' && (
													<Button
														variant='outline'
														size='sm'
														asChild
														className='flex-1 font-mono border-primary/30 hover:border-primary hover:neon-glow'>
														<a
															href={
																project.github
															}
															target='_blank'
															rel='noopener noreferrer'>
															<Github className='mr-2 h-3 w-3' />
															source()
														</a>
													</Button>
												)}
										</div>
									</CardContent>
								</div>
							</Card>
						)
					)}
				</div>

				{/* Enhanced Project Analytics */}
				<div className='mt-20'>
					{/* Top Technologies Used */}
					<div className='mt-12 text-center'>
						<h3 className='font-mono text-lg text-primary mb-6'>
							// Most Used
							Technologies
						</h3>
						<div className='flex flex-wrap justify-center gap-3 max-w-4xl mx-auto'>
							{allTechnologies
								.slice(0, 15)
								.map(
									(
										tech,
										index
									) => {
										const usage =
											projects.filter(
												p =>
													p.stack.includes(
														tech
													)
											).length;
										return (
											<Badge
												key={
													index
												}
												variant='outline'
												className={`font-mono transition-all duration-300 hover:scale-105 ${
													usage >=
													3
														? 'border-yellow-500/50 text-yellow-500 hover:border-yellow-500'
														: usage >=
														  2
														? 'border-green-500/50 text-green-500 hover:border-green-500'
														: 'border-primary/30 text-primary hover:border-primary'
												}`}>
												{
													tech
												}{' '}
												(
												{
													usage
												}

												)
											</Badge>
										);
									}
								)}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
