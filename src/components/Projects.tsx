import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users, ArrowRight } from 'lucide-react';
import config from '../../data/config.js';

const categoryColors: Record<string, string> = {
	fintech: 'bg-gradient-to-r from-emerald-400/60 via-green-500/30 to-primary/10',
	backend: 'bg-gradient-to-r from-primary/40 via-primary/20 to-transparent',
};

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
	const ref = useRef<HTMLDivElement>(null);
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setVisible(true);
					observer.disconnect();
				}
			},
			{ threshold: 0.1 },
		);
		observer.observe(el);
		return () => observer.disconnect();
	}, []);

	return (
		<div
			ref={ref}
			className={visible ? 'animate-fade-in-up' : 'opacity-0'}>
			{children}
		</div>
	);
}

export function Projects() {
	const { projects } = config;

	return (
		<section id='projects' className='py-20 px-6 bg-muted/30'>
			<div className='max-w-6xl mx-auto'>
				<div className='text-center mb-16'>
					<h2 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-foreground to-primary bg-clip-text text-transparent'>
						Projects
					</h2>
					<div className='w-16 h-0.5 bg-primary/60 mx-auto rounded-full mt-4' />
					<p className='text-base text-muted-foreground mt-6 max-w-2xl mx-auto leading-relaxed'>
						Problems I chose to tackle, systems I built, and the decisions that shaped them.
					</p>
				</div>

				<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
					{projects.map((project, index) => {
						const status = statusConfig[project.status] || statusConfig.production;
						const categoryGradient = categoryColors[project.category] || categoryColors.backend;
						return (
							<AnimatedCard key={index}>
								<Link
									to={`/projects/${project.slug}`}
									className='block group'>
									<Card className='bg-card/50 backdrop-blur border-border hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full overflow-hidden'>
										<div className={`h-1.5 w-full ${categoryGradient}`} />
										<CardHeader className='pb-3'>
											<div className='flex items-start justify-between gap-2 mb-1'>
												<CardTitle className='text-lg font-semibold text-foreground leading-tight group-hover:text-primary transition-colors'>
													{project.name}
												</CardTitle>
												<Badge
													variant='outline'
													className={`text-xs shrink-0 ${status.className}`}>
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
														className='bg-primary/10 text-primary border-primary/30 hover:border-primary font-mono text-xs transition-colors'>
														{tech}
													</Badge>
												))}
												{project.stack.length > 5 && (
													<Badge
														variant='outline'
														className='bg-muted/50 text-muted-foreground border-border font-mono text-xs'>
														+{project.stack.length - 5}
													</Badge>
												)}
											</div>

											<div className='flex items-center justify-between pt-1'>
												<div className='flex items-center gap-2'>
													{project.link && project.link !== '#' && (
														<span className='text-xs text-primary font-medium bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20'>
															Live
														</span>
													)}
												</div>
												<span className='text-xs text-primary flex items-center gap-1 group-hover:gap-2 transition-all'>
													View Details
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
