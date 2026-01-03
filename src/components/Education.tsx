import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Award,
	BookOpen,
	Brain,
	Calendar,
	GraduationCap,
	MapPin,
	Target,
	TrendingUp,
	Trophy,
	Users
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

												<CardHeader className='bg-card/30 relative'>
													{/* Achievement Badge */}
													{edu.status ===
														'Graduated' && (
														<div className='absolute -top-3 -right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-mono font-bold shadow-lg flex items-center gap-1'>
															<Trophy className='h-3 w-3' />
															Completed
														</div>
													)}
													{edu.status ===
														'In Progress' && (
														<div className='absolute -top-3 -right-3 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-mono font-bold shadow-lg flex items-center gap-1'>
															<TrendingUp className='h-3 w-3' />
															Active
														</div>
													)}

													<div className='flex items-start gap-4'>
														<div className='p-3 bg-primary/10 rounded-xl border border-primary/30 neon-glow'>
															<GraduationCap className='h-6 w-6 text-primary' />
														</div>
														<div className='flex-1'>
															<CardTitle className='text-xl text-foreground font-mono leading-tight mb-2'>
																<span className='text-primary'>
																	const
																</span>{' '}
																degree
																=
																"
																<span className='text-green-400'>
																	{
																		edu.degree
																	}
																</span>
																"
															</CardTitle>
															<div className='flex items-center gap-2 mb-2'>
																<Brain className='h-4 w-4 text-primary' />
																<p className='text-base text-muted-foreground font-mono'>
																	{
																		edu.field
																	}
																</p>
															</div>
															<div className='flex items-center gap-2'>
																<Users className='h-4 w-4 text-primary' />
																<p className='text-sm text-primary font-mono font-semibold'>
																	{
																		edu.institution
																	}
																</p>
															</div>
														</div>
													</div>
												</CardHeader>

												<CardContent className='space-y-6 p-6'>
													{/* Academic Details */}
													<div className='code-block'>
														<div className='font-mono text-sm space-y-2'>
															<div className='text-primary flex items-center gap-2'>
																<span>
																	const
																	academicRecord
																	={' '}
																	{
																		'{'
																	}
																</span>
																<Badge
																	variant='outline'
																	className='text-xs'>
																	{
																		edu.status
																	}
																</Badge>
															</div>
															<div className='ml-4 text-muted-foreground space-y-1'>
																<div>
																	institution:{' '}
																	<span className='text-yellow-500'>
																		"
																		{
																			edu.institution
																		}
																		"
																	</span>
																	,
																</div>
																<div>
																	location:{' '}
																	<span className='text-blue-400'>
																		"
																		{
																			edu.location
																		}
																		"
																	</span>
																	,
																</div>
																<div>
																	period:{' '}
																	<span className='text-purple-400'>
																		"
																		{
																			edu.period
																		}
																		"
																	</span>
																	,
																</div>
																<div>
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
																<div>
																	coursesCompleted:{' '}
																	<span className='text-orange-400'>
																		{
																			edu
																				.courses
																				.length
																		}
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

													{/* Enhanced Meta Info */}
													<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
														<div className='flex items-center gap-2 p-3 bg-primary/5 rounded-lg border border-primary/20'>
															<Calendar className='h-4 w-4 text-primary' />
															<div>
																<div className='text-xs text-muted-foreground font-mono'>
																	Duration
																</div>
																<div className='text-sm font-mono font-semibold'>
																	{
																		edu.period
																	}
																</div>
															</div>
														</div>
														<div className='flex items-center gap-2 p-3 bg-green-500/5 rounded-lg border border-green-500/20'>
															<Award className='h-4 w-4 text-green-500' />
															<div>
																<div className='text-xs text-muted-foreground font-mono'>
																	Achievement
																</div>
																<div className='text-sm font-mono font-semibold text-green-500'>
																	{
																		edu.grade
																	}
																</div>
															</div>
														</div>
														<div className='flex items-center gap-2 p-3 bg-blue-500/5 rounded-lg border border-blue-500/20'>
															<MapPin className='h-4 w-4 text-blue-500' />
															<div>
																<div className='text-xs text-muted-foreground font-mono'>
																	Location
																</div>
																<div className='text-sm font-mono font-semibold text-blue-500'>
																	{
																		edu.location
																	}
																</div>
															</div>
														</div>
													</div>

													{/* Key Courses with Enhanced Display */}
													<div>
														<div className='flex items-center justify-between mb-3'>
															<div className='font-mono text-sm text-primary flex items-center gap-2'>
																<BookOpen className='h-4 w-4' />
																//
																Core
																Curriculum
															</div>
															<Badge
																variant='secondary'
																className='text-xs font-mono'>
																{
																	edu
																		.courses
																		.length
																}{' '}
																courses
															</Badge>
														</div>
														<div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
															{edu.courses.map(
																(
																	course,
																	courseIndex
																) => (
																	<div
																		key={
																			courseIndex
																		}
																		className='flex items-center gap-2 p-2 bg-card/30 rounded-md border border-primary/10 hover:border-primary/30 transition-colors'>
																		<Target className='h-3 w-3 text-primary' />
																		<span className='text-sm font-mono text-muted-foreground'>
																			{
																				course
																			}
																		</span>
																	</div>
																)
															)}
														</div>
													</div>

													{/* Educational Impact */}
													{edu.status ===
														'Graduated' && (
														<div className='pt-4 border-t border-primary/20'>
															<div className='flex items-center justify-center gap-2 text-green-500 font-mono text-sm'>
																<Trophy className='h-4 w-4' />
																<span>
																	//
																	Successfully
																	completed
																	academic
																	program
																</span>
															</div>
														</div>
													)}
													{edu.status ===
														'In Progress' && (
														<div className='pt-4 border-t border-primary/20'>
															<div className='flex items-center justify-center gap-2 text-blue-500 font-mono text-sm'>
																<TrendingUp className='h-4 w-4' />
																<span>
																	//
																	Currently
																	pursuing
																	degree
																</span>
															</div>
														</div>
													)}
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
