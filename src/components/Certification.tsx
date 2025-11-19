import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	ExternalLink,
	Award,
	Calendar,
	CheckCircle2,
	TrendingUp,
} from 'lucide-react';
import config from '../../data/config.js';

export default function Certifications() {
	const { certifications } = config;

	const totalCerts = certifications.length;
	const uniqueSkills = [...new Set(certifications.flatMap(c => c.skills))]
		.length;
	const platforms = [...new Set(certifications.map(c => c.issuer))]
		.length;

	return (
		<section
			id='certifications'
			className='py-20 px-6 bg-background'>
			<div className='max-w-6xl mx-auto'>
				<div className='text-center mb-16'>
					<h2 className='text-4xl md:text-5xl font-bold text-foreground mb-4 font-mono'>
						{'{ Certifications }'}
					</h2>
					<div className='w-24 h-1 bg-primary mx-auto neon-glow'></div>
					<p className='text-lg text-muted-foreground mt-6 max-w-2xl mx-auto font-mono'>
						// Validated expertise from
						industry-leading platforms
					</p>
				</div>

				<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
					{certifications.map((cert, index) => (
						<Card
							key={index}
							className='bg-card/50 backdrop-blur border-primary/20 hover-glow group hover:-translate-y-2 transition-all duration-300'>
							<div className='terminal-window'>
								<div className='terminal-header'>
									<div className='terminal-dot red'></div>
									<div className='terminal-dot yellow'></div>
									<div className='terminal-dot green'></div>
									<span className='font-mono text-xs text-muted-foreground ml-2'>
										~/certifications/
										{cert.logo.toLowerCase()}
										.cert
									</span>
								</div>

								<CardHeader className='bg-card/30'>
									<div className='flex items-start justify-between gap-2'>
										<div className='flex-1'>
											<CardTitle className='text-base text-foreground font-mono leading-tight mb-2'>
												{
													cert.name
												}
											</CardTitle>
											<div className='flex items-center gap-2 text-muted-foreground'>
												<Award className='h-3 w-3 text-primary' />
												<span className='text-xs font-mono'>
													{
														cert.issuer
													}
												</span>
											</div>
										</div>
									</div>
								</CardHeader>

								<CardContent className='space-y-4 p-6'>
									{/* Certification metadata */}
									<div className='code-block'>
										<div className='font-mono text-xs space-y-1'>
											<div className='text-primary'>
												const
												certification
												={' '}
												{
													'{'
												}
											</div>
											<div className='ml-2 text-muted-foreground'>
												issuer:{' '}
												<span className='text-foreground'>
													"
													{
														cert.issuer
													}

													"
												</span>

												,
											</div>
											<div className='ml-2 text-muted-foreground'>
												issued:{' '}
												<span className='text-primary'>
													"
													{
														cert.date
													}

													"
												</span>

												,
											</div>
											<div className='ml-2 text-muted-foreground'>
												credentialId:{' '}
												<span className='text-green-400'>
													"
													{
														cert.credentialId
													}

													"
												</span>

												,
											</div>
											<div className='ml-2 text-muted-foreground'>
												verified:{' '}
												<span className='text-green-400'>
													true
												</span>
											</div>
											<div className='text-primary'>
												{
													'}'
												}
											</div>
										</div>
									</div>

									{/* Skills badges */}
									<div>
										<div className='font-mono text-xs text-primary mb-2'>
											//
											Skills
											Validated
										</div>
										<div className='flex flex-wrap gap-2'>
											{cert.skills.map(
												(
													skill,
													skillIndex
												) => (
													<Badge
														key={
															skillIndex
														}
														variant='outline'
														className='bg-primary/10 text-primary border-primary/30 hover:border-primary hover:neon-glow font-mono text-xs transition-all duration-300'>
														{
															skill
														}
													</Badge>
												)
											)}
										</div>
									</div>

									{/* Achievements */}
									{/* <div>
										<div className='font-mono text-xs text-primary mb-2'>
											//
											Key
											Achievements
										</div>
										<div className='space-y-1.5'>
											{cert.achievements.map(
												(
													achievement,
													achIndex
												) => (
													<div
														key={
															achIndex
														}
														className='flex items-start gap-2'>
														<CheckCircle2 className='h-3 w-3 text-green-400 mt-0.5 flex-shrink-0' />
														<span className='text-xs text-muted-foreground font-mono leading-relaxed'>
															{
																achievement
															}
														</span>
													</div>
												)
											)}
										</div>
									</div> */}

									{/* Action button */}
									{cert.link &&
										cert.link !==
											'#' && (
											<Button
												variant='outline'
												size='sm'
												asChild
												className='w-full font-mono border-primary/30 hover:border-primary hover:neon-glow'>
												<a
													href={
														cert.link
													}
													target='_blank'
													rel='noopener noreferrer'>
													<ExternalLink className='mr-2 h-3 w-3' />
													verify()
												</a>
											</Button>
										)}
								</CardContent>
							</div>
						</Card>
					))}
				</div>

				{/* Certification stats */}
				<div className='mt-16 grid md:grid-cols-3 gap-6'>
					<div className='code-block text-center p-6'>
						<div className='font-mono text-sm space-y-1'>
							<div className='text-primary text-2xl font-bold'>
								{totalCerts}
							</div>
							<div className='text-muted-foreground'>
								Total
								Certifications
							</div>
						</div>
					</div>

					<div className='code-block text-center p-6'>
						<div className='font-mono text-sm space-y-1'>
							<div className='text-primary text-2xl font-bold'>
								{platforms}
							</div>
							<div className='text-muted-foreground'>
								Issuing
								Platforms
							</div>
						</div>
					</div>

					<div className='code-block text-center p-6'>
						<div className='font-mono text-sm space-y-1'>
							<div className='text-primary text-2xl font-bold'>
								{uniqueSkills}
							</div>
							<div className='text-muted-foreground'>
								Skills Validated
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
