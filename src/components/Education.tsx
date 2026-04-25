import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Award,
	BookOpen,
	Calendar,
	GraduationCap,
	MapPin,
	TrendingUp,
	Trophy,
} from 'lucide-react';
import config from '../../data/config.js';

export default function Education() {
	const { education } = config;

	return (
		<section id='education' className='py-20 px-6 bg-muted/30'>
			<div className='max-w-6xl mx-auto'>
				<div className='text-center mb-16'>
					<h2 className='text-4xl md:text-5xl font-bold text-foreground mb-4'>
						Education
					</h2>
					<div className='w-16 h-0.5 bg-primary/60 mx-auto rounded-full'></div>
					<p className='text-lg text-muted-foreground mt-6 max-w-2xl mx-auto'>
						Academic foundation and continuous learning.
					</p>
				</div>

				{/* Timeline */}
				<div className='relative'>
					{/* Vertical line */}
					<div className='absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-primary/20 hidden sm:block'></div>

					<div className='space-y-12'>
						{education.map((edu, index) => (
							<div
								key={index}
								className={`relative flex flex-col sm:flex-row gap-8 ${
									index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
								}`}>
								{/* Timeline dot */}
								<div className='absolute left-8 md:left-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-[0_0_10px_hsl(var(--primary)/0.4)] hidden sm:block transform -translate-x-1/2 z-10'></div>

								{/* Spacer for alternating layout */}
								<div className='hidden md:block md:w-1/2'></div>

								{/* Content card */}
								<div className='w-full md:w-1/2'>
									<Card className='bg-card/50 backdrop-blur border-border hover-glow group hover:-translate-y-2 transition-all duration-300'>
										<CardHeader className='pb-4'>
											<div className='flex items-start justify-between gap-3'>
												<div className='flex items-start gap-3 flex-1'>
													<div className='p-2.5 bg-primary/10 rounded-xl border border-primary/20 flex-shrink-0'>
														<GraduationCap className='h-5 w-5 text-primary' />
													</div>
													<div>
														<CardTitle className='text-lg font-semibold text-foreground leading-tight mb-1'>
															{edu.degree}
														</CardTitle>
														<p className='text-sm text-muted-foreground'>
															{edu.field}
														</p>
														<p className='text-sm font-medium text-primary mt-0.5'>
															{edu.institution}
														</p>
													</div>
												</div>
												<Badge
													variant='outline'
													className='text-xs whitespace-nowrap flex-shrink-0 border-primary/40 text-primary'>
													{edu.status === 'in_view' ? (
														<><TrendingUp className='h-3 w-3 mr-1' />In Progress</>
													) : (
														<><Trophy className='h-3 w-3 mr-1' />Completed</>
													)}
												</Badge>
											</div>
										</CardHeader>

										<CardContent className='space-y-5 pt-0'>
											{/* Meta info */}
											<div className='grid grid-cols-3 gap-3'>
												<div className='flex items-center gap-2 p-2.5 bg-primary/5 rounded-lg border border-primary/15'>
													<Calendar className='h-3.5 w-3.5 text-primary flex-shrink-0' />
													<div>
														<p className='text-xs text-muted-foreground'>Period</p>
														<p className='text-xs font-semibold font-mono'>{edu.period}</p>
													</div>
												</div>
												<div className='flex items-center gap-2 p-2.5 bg-primary/5 rounded-lg border border-primary/15'>
													<Award className='h-3.5 w-3.5 text-primary flex-shrink-0' />
													<div>
														<p className='text-xs text-muted-foreground'>Grade</p>
														<p className='text-xs font-semibold text-primary'>{edu.grade || 'N/A'}</p>
													</div>
												</div>
												<div className='flex items-center gap-2 p-2.5 bg-primary/5 rounded-lg border border-primary/15'>
													<MapPin className='h-3.5 w-3.5 text-primary flex-shrink-0' />
													<div>
														<p className='text-xs text-muted-foreground'>Location</p>
														<p className='text-xs font-semibold text-primary leading-tight'>{edu.location.split(',')[0]}</p>
													</div>
												</div>
											</div>

											{/* Key courses */}
											<div>
												<div className='flex items-center justify-between mb-3'>
													<div className='flex items-center gap-2'>
														<BookOpen className='h-4 w-4 text-primary' />
														<p className='text-sm font-medium text-foreground'>Core Curriculum</p>
													</div>
													<Badge variant='secondary' className='text-xs'>
														{edu.courses.length} modules
													</Badge>
												</div>
												<div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
													{edu.courses.map((course, courseIndex) => (
														<div
															key={courseIndex}
															className='flex items-center gap-2 p-2 bg-card/50 rounded-md border border-border hover:border-primary/30 transition-colors'>
															<div className='w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0'></div>
															<span className='text-xs text-muted-foreground'>{course}</span>
														</div>
													))}
												</div>
											</div>

										</CardContent>
									</Card>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
