import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users, ArrowRight } from 'lucide-react';
import config from '../../data/config.js';

const statusConfig: Record<string, { label: string; className: string }> = {
	production: {
		label: 'Production',
		className: 'bg-green-500/10 text-green-500 border-green-500/20',
	},
	prototype: {
		label: 'Prototype',
		className: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
	},
	experiment: {
		label: 'Experiment',
		className: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
	},
	archived: {
		label: 'Archived',
		className: 'bg-muted text-muted-foreground border-border',
	},
};

function AnimatedCard({ children }: { children: React.ReactNode }) {
 return <div className='h-full'>{children}</div>;
}

export function Projects() {
	const { projects } = config;

	return (
		<section id='projects' className='py-20 px-6 bg-muted/30'>
			<div className='max-w-6xl mx-auto'>
				<div className='mb-10 border-b border-border pb-8'>
					<h2 className='text-3xl md:text-4xl font-semibold tracking-tight text-foreground'>
						Projects
					</h2>
					<p className='text-base text-muted-foreground mt-4 max-w-2xl leading-relaxed'>
						Problems I chose to tackle, systems I built, and the decisions that shaped them.
					</p>
				</div>

				<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
					{projects.map((project, index) => {
						const status = statusConfig[project.status] || statusConfig.production;
						return (
							<AnimatedCard key={index}>
								<Link
									to={`/projects/${project.slug}`}
									className='block group h-full rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background'>
									<Card className='rounded-sm bg-card border-foreground/20 shadow-sm hover:border-primary hover:shadow-md transition-[border-color,box-shadow] duration-150 flex flex-col h-full min-h-[340px] overflow-hidden'>
										<CardHeader className='pb-4'>
											<div className='flex items-start justify-between gap-2 mb-1'>
												<CardTitle className='text-xl font-semibold text-primary leading-snug group-hover:underline underline-offset-4'>
													{project.name}
												</CardTitle>
												<Badge
													variant='outline'
													className={`text-xs shrink-0 rounded-sm bg-muted text-muted-foreground border-border`}>
													{status.label}
												</Badge>
											</div>
											<div className='flex items-center gap-3 text-xs text-muted-foreground'>
												<div className='flex items-center gap-1'>
													<Calendar className='h-3 w-3' />
													{project.period}
												</div>
												<div className='flex items-center gap-1'>
													<Users className='h-3 w-3' />
													{project.teamSize === 1 ? 'Solo' : `${project.teamSize} people`}
												</div>
											</div>
										</CardHeader>

										<CardContent className='space-y-4 flex-1 flex flex-col pt-0 min-h-[160px]'>
											<p className='text-sm text-muted-foreground leading-relaxed flex-1'>
												{project.tagline}
											</p>

											<div className='flex flex-wrap gap-1.5'>
												{project.stack.slice(0, 5).map((tech, techIndex) => (
													<Badge
														key={techIndex}
														variant='outline'
														className='rounded-sm bg-muted text-foreground border-transparent text-xs font-normal'>
														{tech}
													</Badge>
												))}
												{project.stack.length > 5 && (
													<Badge
														variant='outline'
														className='rounded-sm bg-muted text-muted-foreground border-transparent text-xs'>
														+{project.stack.length - 5}
													</Badge>
												)}
											</div>

											<div className='flex items-center justify-between border-t border-border pt-4'>
												<div className='flex items-center gap-2'>
													{project.link && project.link !== '#' && (
														<span className='text-xs text-muted-foreground'>
															Live
														</span>
													)}
												</div>
												<span className='text-sm font-semibold text-primary flex items-center gap-2'>
													Read case study
													<ArrowRight className='h-3 w-3' />
												</span>
											</div>
										</CardContent>
									</Card>
								</Link>
							</AnimatedCard>
						);
					})}
 </div>
			</div>
		</section>
	);
}
