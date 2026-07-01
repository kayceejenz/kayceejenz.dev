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
					<h2 className='text-4xl md:text-5xl font-bold text-foreground mb-4'>
						About Me
					</h2>
					<div className='w-16 h-0.5 bg-primary/60 mx-auto rounded-full mb-6'></div>
					<p className='text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed'>
						Backend Engineer with 5+ years of production experience, now specializing in AI/ML: LLM systems, RAG pipelines, and the infrastructure behind them.
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
							<h3 className='text-lg font-semibold text-foreground mb-4'>
								Key Highlights
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
										<h3 className='text-xl font-bold text-foreground'>
											Professional Impact
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

										<div className='text-center p-4 bg-primary/5 rounded-lg border border-primary/20'>
											<div className='text-3xl font-bold text-primary font-mono mb-2'>
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
						<div className='p-5 rounded-xl bg-card/50 border border-border'>
							<div className='flex items-center gap-2 mb-4'>
								<Star className='h-4 w-4 text-primary' />
								<h4 className='text-sm font-semibold text-foreground'>Core Expertise</h4>
							</div>
							<div className='space-y-2.5'>
								{[
									{ icon: Rocket, label: 'AI Engineering & LLM Systems' },
									{ icon: Zap, label: 'RAG Architecture & Vector Search' },
									{ icon: Code2, label: 'Backend Architecture & APIs' },
									{ icon: Award, label: 'Azure Cloud & MLOps' },
									{ icon: Users, label: 'Technical Leadership' },
								].map(({ icon: Icon, label }) => (
									<div key={label} className='flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/8'>
										<Icon className='h-3.5 w-3.5 text-primary flex-shrink-0' />
										<span className='text-sm font-medium text-primary'>{label}</span>
									</div>
								))}
							</div>
						</div>

						{/* Current Focus */}
						<Card className='bg-primary/5 border-primary/30'>
							<CardContent className='p-6'>
								<div className='space-y-4'>
									<h4 className='text-sm font-semibold text-foreground flex items-center gap-2'>
										<Target className='h-4 w-4 text-primary' />
										Current Focus
									</h4>
									<p className='text-sm text-muted-foreground font-mono leading-relaxed'>
										Building
										production-grade
										AI
										systems:
										LLM
										orchestration,
										RAG
										pipelines,
										and
										agentic
										architectures.
										Focused
										on
										applied
										NLP,
										real-world
										model
										evaluation,
										and
										the
										backend
										infrastructure
										that
										makes
										AI
										systems
										scale.
									</p>
									<div className='flex items-center gap-2 text-primary'>
										<div className='w-2 h-2 bg-primary rounded-full animate-pulse'></div>
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
