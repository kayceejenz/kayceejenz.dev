import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Download, CheckCircle, Code2 } from 'lucide-react';
import config from '../../data/config.js';

export function About() {
	const { about, site } = config;

	return (
		<section id='about' className='py-20 px-6 bg-background'>
			<div className='max-w-6xl mx-auto'>
				<div className='text-center mb-16'>
					<h2 className='text-4xl md:text-5xl font-bold text-foreground mb-4 font-mono'>
						{'{ About Me }'}
					</h2>
					<div className='w-24 h-1 bg-primary mx-auto neon-glow'></div>
					<p className='text-muted-foreground font-mono mt-4'>
						// Get to know the developer
						behind the code
					</p>
				</div>

				<div className='grid lg:grid-cols-2 gap-12 items-center'>
					<div className='space-y-6'>
						<div className='terminal-window'>
							<div className='terminal-header'>
								<div className='terminal-dot red'></div>
								<div className='terminal-dot yellow'></div>
								<div className='terminal-dot green'></div>
								<span className='font-mono text-xs text-muted-foreground ml-2'>
									~/about.js
								</span>
							</div>
							<div className='p-6 font-mono text-sm'>
								<div className='text-primary'>
									const
									aboutMe
									= {'{'}
								</div>
								<div className='ml-4 text-muted-foreground'>
									experience:{' '}
									<span className='text-foreground'>
										"6+
										years"
									</span>
									,
								</div>
								<div className='ml-4 text-muted-foreground'>
									focus:{' '}
									<span className='text-foreground'>
										"Backend
										Systems"
									</span>
									,
								</div>
								<div className='ml-4 text-muted-foreground'>
									leadership:{' '}
									<span className='text-foreground'>
										true
									</span>
									,
								</div>
								<div className='ml-4 text-muted-foreground'>
									stack:{' '}
									<span className='text-primary'>
										[
									</span>
								</div>
								<div className='ml-8 text-foreground'>
									"C#",
									"Python",
									"Javascript",
									"Typescript",
									<br />
									"ASP.NET",
									"Node.js",
									"NestJS",
									"Blockchain",
									"APIs"
								</div>
								<div className='ml-4 text-primary'>
									]
								</div>
								<div className='text-primary'>
									{'}'}
								</div>
							</div>
						</div>

						<p className='text-lg text-muted-foreground leading-relaxed'>
							<span className='font-mono text-primary'>
								//{' '}
							</span>
							{about.summary}
						</p>

						<div className='space-y-4'>
							{about.highlights.map(
								(
									highlight,
									index
								) => (
									<div
										key={
											index
										}
										className='flex items-start gap-3 group'>
										<CheckCircle className='h-5 w-5 text-primary mt-0.5 flex-shrink-0 group-hover:neon-glow transition-all duration-300' />
										<p className='text-muted-foreground'>
											<span className='font-mono text-primary'>
												✓{' '}
											</span>
											{
												highlight
											}
										</p>
									</div>
								)
							)}
						</div>

						<Button
							asChild
							size='lg'
							className='bg-primary hover:bg-primary/90 text-primary-foreground font-mono hover-glow group'>
							<a
								href={
									site.resume
								}
								target='_blank'
								rel='noopener noreferrer'>
								<Download className='mr-2 h-4 w-4 group-hover:animate-bounce' />
								{
									'> download_resume --format=pdf'
								}
							</a>
						</Button>
					</div>

					<div className='space-y-6'>
						<Card className='bg-card/50 backdrop-blur border-primary/20 hover-glow'>
							<CardContent className='p-8'>
								<div className='space-y-6'>
									<div className='flex items-center gap-3 mb-4'>
										<Code2 className='h-6 w-6 text-primary' />
										<h3 className='text-xl font-bold text-foreground font-mono'>
											{
												'{ stats }'
											}
										</h3>
									</div>

									<div className='grid grid-cols-2 gap-6'>
										<div className='text-center'>
											<div className='text-3xl font-bold text-primary font-mono neon-text'>
												6+
											</div>
											<div className='text-sm text-muted-foreground font-mono'>
												//
												years
											</div>
										</div>
										<div className='text-center'>
											<div className='text-3xl font-bold text-primary font-mono neon-text'>
												20+
											</div>
											<div className='text-sm text-muted-foreground font-mono'>
												//
												projects
											</div>
										</div>
										<div className='text-center'>
											<div className='text-3xl font-bold text-primary font-mono neon-text'>
												4
											</div>
											<div className='text-sm text-muted-foreground font-mono'>
												//
												companies
											</div>
										</div>
										<div className='text-center'>
											<div className='text-3xl font-bold text-primary font-mono neon-text'>
												∞
											</div>
											<div className='text-sm text-muted-foreground font-mono'>
												//
												learning
											</div>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>

						<div className='code-block'>
							<div className='font-mono text-sm space-y-2'>
								<div className='text-primary'>
									//
									Current
									focus
									areas
								</div>
								<div className='text-muted-foreground'>
									<span className='text-primary'>
										const
									</span>{' '}
									expertise
									= [
								</div>
								<div className='ml-4 text-foreground'>
									"AI
									Engineering",
									<br />
									"Backend
									Architecture",
									<br />
									"Blockchain
									Integration",
									<br />
									"API
									Design &
									Security",
									<br />
									"Team
									Leadership"
								</div>
								<div className='text-muted-foreground'>
									];
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
