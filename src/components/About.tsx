import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
	Download,
	CheckCircle,
	Code2,
	Zap,
	Users,
	Award,
	TrendingUp,
	Target,
	Star,
	Rocket,
} from 'lucide-react';
import config from '../../data/config.js';

export function About() {
	const { about, site } = config;

	return (
		<section id='about' className='py-20 px-6 bg-background'>
			<div className='max-w-6xl mx-auto'>
				{/* Enhanced Header */}
				<div className='text-center mb-20'>
					<h2 className='text-4xl md:text-5xl font-bold text-foreground mb-4 font-mono'>
						{'{ About Me }'}
					</h2>
					<div className='w-24 h-1 bg-primary mx-auto neon-glow mb-6'></div>
					<p className='text-lg text-muted-foreground max-w-3xl mx-auto font-mono leading-relaxed'>
						// Backend Software Engineer
						with 5+ years building scalable
						systems
						<br />
						// Transforming fintech,
						blockchain, and AI visions into
						production reality
					</p>
				</div>

				<div className='grid lg:grid-cols-2 gap-12 items-center'>
					{/* Left Column */}
					<div className='space-y-6'>
						{/* Summary */}
						<p className='text-lg text-muted-foreground leading-relaxed'>
							<span className='font-mono text-primary'>
								//{' '}
							</span>
							{about.summary}
						</p>

						{/* Enhanced Professional Achievements */}
						<div className='space-y-4'>
							<h3 className='font-mono text-lg text-primary mb-4'>
								// Key
								Achievements
							</h3>
							{about.highlights.map(
								(
									highlight,
									index
								) => (
									<div
										key={
											index
										}
										className='group p-4 rounded-lg bg-card/30 border border-primary/20 hover:border-primary/40 transition-all duration-300'>
										<div className='flex items-start gap-3'>
											<div className='p-1 bg-primary/10 rounded-full'>
												<CheckCircle className='h-4 w-4 text-primary group-hover:neon-glow transition-all duration-300' />
											</div>
											<div className='flex-1'>
												<p className='text-muted-foreground leading-relaxed'>
													<span className='font-mono text-primary font-semibold'>
														✓{' '}
													</span>
													{
														highlight
													}
												</p>
											</div>
										</div>
									</div>
								)
							)}
						</div>
					</div>

					{/* Enhanced Right Column */}
					<div className='space-y-6'>
						{/* Professional Impact Stats */}
						<Card className='bg-card/50 backdrop-blur border-primary/20 hover-glow'>
							<CardContent className='p-8'>
								<div className='space-y-6'>
									<div className='flex items-center gap-3 mb-6'>
										<Code2 className='h-6 w-6 text-primary' />
										<h3 className='text-xl font-bold text-foreground font-mono'>
											{
												'{ Professional Impact }'
											}
										</h3>
									</div>

									<div className='grid grid-cols-2 gap-6'>
										<div className='text-center p-4 bg-primary/5 rounded-lg border border-primary/20'>
											<div className='text-3xl font-bold text-primary font-mono neon-text mb-2'>
												5+
											</div>
											<div className='text-sm text-muted-foreground font-mono'>
												Years
												Experience
											</div>
										</div>

										<div className='text-center p-4 bg-blue-500/5 rounded-lg border border-blue-500/20'>
											<div className='text-3xl font-bold text-blue-500 font-mono mb-2'>
												3
											</div>
											<div className='text-sm text-muted-foreground font-mono'>
												Companies
											</div>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Expertise Areas */}
						<div className='code-block'>
							<div className='font-mono text-sm space-y-3'>
								<div className='text-primary flex items-center gap-2'>
									<Star className='h-4 w-4' />
									// Core
									Expertise
									Areas
								</div>
								<div className='text-muted-foreground'>
									<span className='text-primary'>
										const
									</span>{' '}
									specializations
									= [
								</div>
								<div className='ml-4 space-y-2'>
									<div className='flex items-center gap-2'>
										<Rocket className='h-3 w-3 text-yellow-500' />
										<span className='text-yellow-500'>
											"AI
											&
											Machine
											Learning
											Engineering"
										</span>

										,
									</div>
									<div className='flex items-center gap-2'>
										<Code2 className='h-3 w-3 text-green-500' />
										<span className='text-green-500'>
											"Backend
											Architecture
											&
											APIs"
										</span>

										,
									</div>
									<div className='flex items-center gap-2'>
										<Zap className='h-3 w-3 text-purple-500' />
										<span className='text-purple-500'>
											"Blockchain
											&
											Web3
											Integration"
										</span>

										,
									</div>
									<div className='flex items-center gap-2'>
										<Award className='h-3 w-3 text-blue-500' />
										<span className='text-blue-500'>
											"Azure
											Cloud
											Solutions"
										</span>

										,
									</div>
									<div className='flex items-center gap-2'>
										<Users className='h-3 w-3 text-orange-500' />
										<span className='text-orange-500'>
											"Technical
											Leadership
											&
											Team
											Building"
										</span>
									</div>
								</div>
								<div className='text-muted-foreground'>
									];
								</div>
							</div>
						</div>

						{/* Current Focus */}
						<Card className='bg-gradient-to-r from-primary/10 to-green-500/10 border-primary/30'>
							<CardContent className='p-6'>
								<div className='space-y-4'>
									<h4 className='font-mono text-primary font-semibold flex items-center gap-2'>
										<Target className='h-4 w-4' />
										Current
										Focus
									</h4>
									<p className='text-sm text-muted-foreground font-mono leading-relaxed'>
										Building
										AI-driven
										fintech
										solutions
										that
										combine
										blockchain
										technology
										with
										traditional
										finance,
										focusing
										on
										scalable
										payment
										systems
										and
										intelligent
										user
										experiences.
									</p>
									<div className='flex items-center gap-2 text-green-500'>
										<div className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></div>
										<span className='text-xs font-mono'>
											Available
											for
											new
											opportunities
										</span>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
}
