import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	GraduationCap,
	Calendar,
	MapPin,
	Award,
	BookOpen,
	Eye,
	EyeOff,
} from 'lucide-react';
import config from '../../data/config.js';

export default function Education() {
	const { education } = config;

	return (
		<section id='education' className='py-20 px-6 bg-muted/30'>
			<div className='max-w-6xl mx-auto'>
				<div className='text-center mb-16'>
					<h2 className='text-4xl md:text-5xl font-bold text-foreground mb-4 font-mono'>
						{'{ Education Timeline }'}
					</h2>
					<div className='w-24 h-1 bg-primary mx-auto neon-glow'></div>
					<p className='text-lg text-muted-foreground mt-6 max-w-2xl mx-auto font-mono'>
						// Academic journey and
						continuous learning path
					</p>
				</div>

				{/* Timeline */}
				<div className='relative'>
					{/* Vertical line */}
					<div className='absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/30 hidden sm:block'></div>

					<div className='space-y-12'>
						{education.map((edu, index) => {
							const isBlurred =
								edu.blur;

							return (
								<div
									key={
										index
									}
									className={`relative flex flex-col sm:flex-row gap-8 ${
										index %
											2 ===
										0
											? 'sm:flex-row'
											: 'sm:flex-row-reverse'
									}`}>
									{/* Timeline dot */}
									<div className='absolute left-8 md:left-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background neon-glow hidden sm:block transform -translate-x-1/2 z-10'></div>

									{/* Spacer for alternating layout */}
									<div className='hidden md:block md:w-1/2'></div>

									{/* Content card */}
									<div className='w-full md:w-1/2'>
										<Card className='bg-card/50 backdrop-blur border-primary/20 hover-glow group hover:-translate-y-2 transition-all duration-300 relative'>
											{/* Toggle blur button */}

											<div
												className={`terminal-window transition-all duration-300 ${
													isBlurred
														? 'blur-md select-none'
														: ''
												}`}>
												<div className='terminal-header'>
													<div className='terminal-dot red'></div>
													<div className='terminal-dot yellow'></div>
													<div className='terminal-dot green'></div>
													<span className='font-mono text-xs text-muted-foreground ml-2'>
														~/education/
														{
															edu.degree
																.toLowerCase()
																.split(
																	' '
																)[0]
														}
														.edu
													</span>
												</div>

												<CardHeader className='bg-card/30'>
													<div className='flex items-start gap-3'>
														<div className='p-2 bg-primary/10 rounded-lg border border-primary/30 neon-glow'>
															<GraduationCap className='h-5 w-5 text-primary' />
														</div>
														<div className='flex-1'>
															<CardTitle className='text-lg text-foreground font-mono leading-tight mb-1'>
																{
																	edu.degree
																}
															</CardTitle>
															<p className='text-sm text-muted-foreground font-mono'>
																{
																	edu.field
																}
															</p>
														</div>
													</div>
												</CardHeader>

												<CardContent className='space-y-4 p-6'>
													{/* Institution info */}
													<div className='code-block'>
														<div className='font-mono text-xs space-y-1'>
															<div className='text-primary'>
																const
																education
																={' '}
																{
																	'{'
																}
															</div>
															<div className='ml-2 text-muted-foreground'>
																institution:{' '}
																<span className='text-foreground'>
																	"
																	{
																		edu.institution
																	}

																	"
																</span>

																,
															</div>
															<div className='ml-2 text-muted-foreground'>
																location:{' '}
																<span className='text-foreground'>
																	"
																	{
																		edu.location
																	}

																	"
																</span>

																,
															</div>
															<div className='ml-2 text-muted-foreground'>
																period:{' '}
																<span className='text-primary'>
																	"
																	{
																		edu.period
																	}

																	"
																</span>

																,
															</div>
															<div className='ml-2 text-muted-foreground'>
																grade:{' '}
																<span className='text-green-400'>
																	"
																	{
																		edu.grade
																	}

																	"
																</span>

																,
															</div>
															<div className='ml-2 text-muted-foreground'>
																status:{' '}
																<span className='text-green-400'>
																	"
																	{
																		edu.status
																	}

																	"
																</span>
															</div>
															<div className='text-primary'>
																{
																	'}'
																}
															</div>
														</div>
													</div>

													{/* Meta info badges */}
													<div className='flex flex-wrap gap-3 text-xs font-mono'>
														<div className='flex items-center gap-1.5 text-muted-foreground'>
															<Calendar className='h-3 w-3 text-primary' />
															<span>
																{
																	edu.period
																}
															</span>
														</div>
														<div className='flex items-center gap-1.5 text-muted-foreground'>
															<MapPin className='h-3 w-3 text-primary' />
															<span>
																{
																	edu.location
																}
															</span>
														</div>
														<div className='flex items-center gap-1.5 text-muted-foreground'>
															<Award className='h-3 w-3 text-primary' />
															<span>
																{
																	edu.grade
																}
															</span>
														</div>
													</div>

													{/* Key courses */}
													<div>
														<div className='font-mono text-xs text-primary mb-2 flex items-center gap-2'>
															<BookOpen className='h-3 w-3' />
															//
															Key
															Courses
														</div>
														<div className='flex flex-wrap gap-2'>
															{edu.courses.map(
																(
																	course,
																	courseIndex
																) => (
																	<Badge
																		key={
																			courseIndex
																		}
																		variant='outline'
																		className='bg-primary/10 text-primary border-primary/30 hover:border-primary hover:neon-glow font-mono text-xs transition-all duration-300'>
																		{
																			course
																		}
																	</Badge>
																)
															)}
														</div>
													</div>
												</CardContent>
											</div>
										</Card>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
}
