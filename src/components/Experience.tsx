import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, Building } from 'lucide-react';
import config from '../../data/config.js';

export function Experience() {
	const { experience } = config;

	return (
		<section id='experience' className='py-20 px-6 bg-background'>
			<div className='max-w-6xl mx-auto'>
				<div className='text-center mb-16'>
					<h2 className='text-4xl md:text-5xl font-bold text-foreground mb-4 font-mono'>
						{'{ Professional Experience }'}
					</h2>
					<div className='w-24 h-1 bg-primary mx-auto neon-glow'></div>
					<p className='text-lg text-muted-foreground mt-6 max-w-2xl mx-auto font-mono'>
						// Building scalable systems and
						leading development teams
					</p>
				</div>

				{/* Timeline Container */}
				<div className='relative'>
					{/* Timeline Line */}
					<div className='absolute left-8 top-8 bottom-8 w-px bg-gradient-to-b from-primary via-primary/70 to-primary/30 hidden md:block'></div>

					{/* Timeline Items */}
					<div className='space-y-12'>
						{experience.map(
							(job, index) => (
								<div
									key={
										index
									}
									className='relative'>
									{/* Timeline Node */}
									<div className='absolute left-6 top-8 w-5 h-5 bg-primary rounded-full border-4 border-background neon-glow z-10 hidden md:block'></div>

									{/* Timeline Card */}
									<Card
										className={`ml-0 md:ml-20 bg-card/50 backdrop-blur border-primary/20 hover-glow group hover:-translate-y-1 transition-all duration-300 ${
											index %
												2 ===
											0
												? 'md:mr-12'
												: 'md:ml-32 md:mr-0'
										}`}>
										<div className='terminal-window'>
											<div className='terminal-header'>
												<div className='terminal-dot red'></div>
												<div className='terminal-dot yellow'></div>
												<div className='terminal-dot green'></div>
												<span className='font-mono text-xs text-muted-foreground ml-2'>
													~/career/
													{job.company
														.toLowerCase()
														.replace(
															/\s+/g,
															'_'
														)}
													.js
												</span>
												<div className='ml-auto text-xs font-mono text-muted-foreground'>
													#
													{index +
														1}
												</div>
											</div>

											<CardHeader className='bg-card/30'>
												{/* Timeline Badge */}
												<div className='absolute -top-3 -left-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-mono font-bold shadow-lg'>
													{
														job.period
													}
												</div>

												<div className='flex flex-col gap-4 pt-4'>
													<div>
														<CardTitle className='text-xl text-foreground font-mono leading-tight'>
															<span className='text-primary'>
																const
															</span>{' '}
															position
															=
															"
															<span className='text-green-400'>
																{
																	job.title
																}
															</span>
															"
														</CardTitle>
														<div className='flex items-center gap-2 mt-3'>
															<Building className='h-4 w-4 text-primary' />
															<h3 className='text-lg font-semibold text-primary font-mono'>
																{
																	job.company
																}
															</h3>
														</div>
													</div>

													<div className='flex items-center gap-4 text-sm'>
														<div className='flex items-center gap-2 text-muted-foreground font-mono'>
															<MapPin className='h-4 w-4' />
															<span>
																{
																	job.location
																}
															</span>
														</div>
														<Badge
															variant='secondary'
															className='font-mono'>
															Role
															#
															{index +
																1}
														</Badge>
													</div>
												</div>
											</CardHeader>

											<CardContent className='space-y-6 p-6'>
												{/* Achievements */}
												<div className='code-block'>
													<div className='font-mono text-sm space-y-2'>
														<div className='text-primary flex items-center gap-2'>
															<span>
																const
																achievements
																=
																[
															</span>
															<Badge
																variant='outline'
																className='text-xs'>
																{
																	job
																		.bullets
																		.length
																}{' '}
																items
															</Badge>
														</div>
														{job.bullets.map(
															(
																bullet,
																bulletIndex
															) => (
																<div
																	key={
																		bulletIndex
																	}
																	className='ml-4 text-muted-foreground leading-relaxed'>
																	<span className='text-yellow-500'>
																		"
																		{
																			bullet
																		}
																		"
																	</span>
																	{bulletIndex <
																	job
																		.bullets
																		.length -
																		1
																		? ','
																		: ''}
																</div>
															)
														)}
														<div className='text-primary'>
															];
														</div>
													</div>
												</div>

												{/* Tech Stack */}
												<div className='space-y-3'>
													<div className='flex items-center gap-2'>
														<span className='font-mono text-sm text-primary'>
															//
															Tech
															Stack:
														</span>
														<Badge
															variant='outline'
															className='text-xs font-mono'>
															{
																job
																	.tech
																	.length
															}{' '}
															technologies
														</Badge>
													</div>
													<div className='flex flex-wrap gap-2'>
														{job.tech.map(
															(
																tech,
																techIndex
															) => (
																<Badge
																	key={
																		techIndex
																	}
																	variant='outline'
																	className='border-primary/30 text-primary hover:border-primary hover:neon-glow font-mono transition-all duration-300 hover:scale-105'>
																	{
																		tech
																	}
																</Badge>
															)
														)}
													</div>
												</div>

												{/* Progress Indicator */}
												{index <
													experience.length -
														1 && (
													<div className='pt-4 border-t border-primary/20'>
														<div className='flex items-center justify-center text-primary font-mono text-xs'>
															<span>
																//
																Next
																role
																↓
															</span>
														</div>
													</div>
												)}
											</CardContent>
										</div>
									</Card>

									{/* Timeline Connector for Mobile */}
									{index <
										experience.length -
											1 && (
										<div className='flex justify-center my-8 md:hidden'>
											<div className='w-px h-8 bg-gradient-to-b from-primary to-primary/50'></div>
										</div>
									)}
								</div>
							)
						)}
					</div>
				</div>
			</div>
		</section>
	);
}
