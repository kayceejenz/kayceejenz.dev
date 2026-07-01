import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Building } from 'lucide-react';
import config from '../../data/config.js';

export function Experience() {
	const { experience } = config;

	return (
		<section id='experience' className='py-20 px-6 bg-background'>
			<div className='max-w-6xl mx-auto'>
				<div className='text-center mb-16'>
					<h2 className='text-4xl md:text-5xl font-bold text-foreground mb-4'>
						Professional Experience
					</h2>
					<div className='w-16 h-0.5 bg-primary/60 mx-auto rounded-full'></div>
					<p className='text-lg text-muted-foreground mt-6 max-w-2xl mx-auto'>
						Building scalable systems and leading development teams across fintech, AI, and enterprise.
					</p>
				</div>

				{/* Timeline Container */}
				<div className='relative'>
					{/* Timeline Line */}
					<div className='absolute left-8 top-8 bottom-8 w-px bg-gradient-to-b from-primary via-primary/50 to-primary/10 hidden md:block'></div>

					{/* Timeline Items */}
					<div className='space-y-10'>
						{experience.map((job, index) => (
							<div key={index} className='relative'>
								{/* Timeline Node */}
								<div className='absolute left-6 top-8 w-5 h-5 bg-primary rounded-full border-4 border-background shadow-[0_0_10px_hsl(var(--primary)/0.4)] z-10 hidden md:block'></div>

								{/* Card */}
								<Card
									className={`ml-0 md:ml-20 bg-card/50 backdrop-blur border-border hover-glow group transition-all duration-300 ${
										index % 2 === 0 ? 'md:mr-12' : 'md:ml-32 md:mr-0'
									}`}>
									<CardHeader className='pb-4'>
										<div className='flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3'>
											<div>
												<CardTitle className='text-xl font-semibold text-foreground leading-tight'>
													{job.positions ? job.positions[0].title : job.title}
												</CardTitle>
												<div className='flex items-center gap-2 mt-1.5'>
													<Building className='h-4 w-4 text-primary flex-shrink-0' />
													<span className='text-primary font-medium'>
														{job.company}
													</span>
												</div>
											</div>
											<Badge variant='outline' className='font-mono text-xs whitespace-nowrap self-start border-primary/30 text-muted-foreground'>
												{job.period}
											</Badge>
										</div>
										<div className='flex items-center gap-2 text-sm text-muted-foreground mt-1'>
											<MapPin className='h-3.5 w-3.5 flex-shrink-0' />
											<span>{job.location}</span>
											{job.employment && (
												<span className='text-xs text-muted-foreground/70'>· {job.employment}</span>
											)}
										</div>
									</CardHeader>

									{job.positions ? (
										<CardContent className='space-y-6 pt-0'>
											{job.positions.map((pos, posIndex) => (
												<div
													key={posIndex}
													className={
														posIndex > 0
															? 'space-y-3 pt-5 border-t border-border/60'
															: 'space-y-3'
													}>
													<div className='flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2'>
														<h4 className='text-base font-semibold text-foreground'>
															{pos.title}
														</h4>
														<Badge
															variant='outline'
															className='font-mono text-[11px] whitespace-nowrap self-start border-primary/20 text-muted-foreground'>
															{pos.period}
														</Badge>
													</div>
													<div className='flex items-center gap-2 text-xs text-muted-foreground'>
														<MapPin className='h-3 w-3 flex-shrink-0' />
														<span>{pos.location}</span>
														{pos.employment && (
															<span className='text-muted-foreground/70'>· {pos.employment}</span>
														)}
													</div>

													<ul className='space-y-2.5'>
														{pos.bullets.map((bullet, bulletIndex) => (
															<li
																key={bulletIndex}
																className='flex items-start gap-3 text-sm text-muted-foreground leading-relaxed'>
																<div className='w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0'></div>
																{bullet}
															</li>
														))}
													</ul>

													<div className='flex flex-wrap gap-2'>
														{pos.tech.map((tech, techIndex) => (
															<Badge
																key={techIndex}
																variant='outline'
																className='border-primary/30 text-primary hover:border-primary font-mono text-xs transition-colors'>
																{tech}
															</Badge>
														))}
													</div>
												</div>
											))}
										</CardContent>
									) : (
										<CardContent className='space-y-5 pt-0'>
											{/* Bullet points */}
											<ul className='space-y-2.5'>
												{job.bullets.map((bullet, bulletIndex) => (
													<li
														key={bulletIndex}
														className='flex items-start gap-3 text-sm text-muted-foreground leading-relaxed'>
														<div className='w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0'></div>
														{bullet}
													</li>
												))}
											</ul>

											{/* Tech Stack */}
											<div>
												<p className='text-xs font-medium text-foreground mb-2 uppercase tracking-wide'>
													Tech Stack
												</p>
												<div className='flex flex-wrap gap-2'>
													{job.tech.map((tech, techIndex) => (
														<Badge
															key={techIndex}
															variant='outline'
															className='border-primary/30 text-primary hover:border-primary font-mono text-xs transition-colors'>
															{tech}
														</Badge>
													))}
												</div>
											</div>
										</CardContent>
									)}
								</Card>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
