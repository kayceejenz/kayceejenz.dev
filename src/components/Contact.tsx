import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
	Mail,
	MapPin,
	Terminal,
	Clock,
	CheckCircle,
	MessageSquare,
	Briefcase,
	Code,
	Rocket,
	Star,
} from 'lucide-react';
import {
	FaHackerrank,
	FaGithub,
	FaTwitter,
	FaLinkedinIn,
} from 'react-icons/fa';
import config from '../../data/config.js';

export function Contact() {
	const { contact } = config;
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		message: '',
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const subject = encodeURIComponent(
			`Portfolio Contact from ${formData.name}`
		);
		const body = encodeURIComponent(
			`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
		);
		window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
	};

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setFormData(prev => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const socialLinks = [
		{
			name: 'GitHub',
			url: contact.links.github,
			icon: FaGithub,
			color: 'hover:text-gray-300',
			handle: '@kayceejenz',
		},
		{
			name: 'Hackerrank',
			url: contact.links.hackerrank,
			icon: FaHackerrank,
			color: 'hover:text-blue-400',
			handle: '/kayceejenz',
		},
		{
			name: 'LinkedIn',
			url: contact.links.linkedin,
			icon: FaLinkedinIn,
			color: 'hover:text-blue-400',
			handle: '/kayceejenz',
		},
		{
			name: 'X (Twitter)',
			url: contact.links.twitter,
			icon: FaTwitter,
			color: 'hover:text-blue-400',
			handle: '@kayceejenz',
		},
	];

	return (
		<section id='contact' className='py-20 px-6 bg-background'>
			<div className='max-w-6xl mx-auto'>
				<div className='text-center mb-20'>
					<h2 className='text-4xl md:text-5xl font-bold text-foreground mb-4 font-mono'>
						{'{ Get In Touch }'}
					</h2>
					<div className='w-24 h-1 bg-primary mx-auto neon-glow mb-6'></div>
					<p className='text-lg text-muted-foreground max-w-3xl mx-auto font-mono leading-relaxed'>
						// Ready to build something
						amazing together?
						<br />
						// Let's discuss your next
						fintech, blockchain, or AI
						project
					</p>

					{/* Specialization Areas */}
					<div className='mt-8 max-w-4xl mx-auto'>
						<div className='font-mono text-sm text-primary mb-4'>
							// Specialization Areas
						</div>
						<div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
							<div className='flex items-center justify-center gap-2 p-3 bg-card/30 rounded-lg border border-primary/20'>
								<Code className='w-4 h-4 text-primary' />
								<span className='font-mono text-sm'>
									Backend
									APIs
								</span>
							</div>
							<div className='flex items-center justify-center gap-2 p-3 bg-card/30 rounded-lg border border-primary/20'>
								<Rocket className='w-4 h-4 text-primary' />
								<span className='font-mono text-sm'>
									Blockchain
								</span>
							</div>
							<div className='flex items-center justify-center gap-2 p-3 bg-card/30 rounded-lg border border-primary/20'>
								<Briefcase className='w-4 h-4 text-primary' />
								<span className='font-mono text-sm'>
									Fintech
								</span>
							</div>
							<div className='flex items-center justify-center gap-2 p-3 bg-card/30 rounded-lg border border-primary/20'>
								<MessageSquare className='w-4 h-4 text-primary' />
								<span className='font-mono text-sm'>
									AI
									Solutions
								</span>
							</div>
						</div>
					</div>
				</div>

				<div className='grid lg:grid-cols-2 gap-12'>
					<div className='space-y-8'>
						<Card className='bg-card/50 backdrop-blur border-primary/20 hover-glow'>
							<div className='terminal-window'>
								<div className='terminal-header'>
									<div className='terminal-dot red'></div>
									<div className='terminal-dot yellow'></div>
									<div className='terminal-dot green'></div>
									<span className='font-mono text-xs text-muted-foreground ml-2'>
										~/contact_info.js
									</span>
								</div>
								<CardContent className='p-6 space-y-6'>
									{/* Primary Contact Info */}
									<div className='font-mono text-sm space-y-4'>
										<div className='text-primary flex items-center gap-2'>
											<span>
												const
												contactInfo
												={' '}
												{
													'{'
												}
											</span>
											<Badge
												variant='secondary'
												className='text-xs'>
												Professional
											</Badge>
										</div>

										<div className='ml-4 space-y-3'>
											<div className='flex items-center gap-3 p-3 bg-primary/5 rounded-lg border border-primary/20'>
												<Mail className='h-5 w-5 text-primary' />
												<div>
													<div className='text-xs text-muted-foreground'>
														Email
													</div>
													<a
														href={`mailto:${contact.email}`}
														className='text-foreground hover:text-primary transition-colors font-semibold'>
														{
															contact.email
														}
													</a>
												</div>
											</div>

											<div className='flex items-center gap-3 p-3 bg-blue-500/5 rounded-lg border border-blue-500/20'>
												<MapPin className='h-5 w-5 text-blue-500' />
												<div>
													<div className='text-xs text-muted-foreground'>
														Location
													</div>
													<span className='text-foreground font-semibold'>
														{
															contact.location
														}
													</span>
												</div>
											</div>

											<div className='flex items-center gap-3 p-3 bg-green-500/5 rounded-lg border border-green-500/20'>
												<CheckCircle className='h-5 w-5 text-green-500' />
												<div>
													<div className='text-xs text-muted-foreground'>
														Availability
													</div>
													<span className='text-green-500 font-semibold'>
														Open
														to
														opportunities
													</span>
												</div>
											</div>
										</div>

										<div className='text-primary'>
											{
												'}'
											}
										</div>
									</div>
								</CardContent>
							</div>
						</Card>

						<Card className='bg-card/50 backdrop-blur border-primary/20 hover-glow'>
							<div className='terminal-window'>
								<div className='terminal-header'>
									<div className='terminal-dot red'></div>
									<div className='terminal-dot yellow'></div>
									<div className='terminal-dot green'></div>
									<span className='font-mono text-xs text-muted-foreground ml-2'>
										~/social_networks.js
									</span>
								</div>

								<CardContent className='p-6'>
									{/* Social Links */}
									<div className='space-y-3'>
										{socialLinks.map(
											(
												social,
												index
											) => {
												const IconComponent =
													social.icon;
												return (
													<div
														key={
															index
														}
														className='group relative p-4 bg-card/30 border border-primary/20 rounded-lg hover:border-primary/40 transition-all duration-300 hover:bg-card/50'>
														<div className='flex items-center justify-between'>
															<div className='flex items-center gap-4'>
																<div className='p-2 bg-primary/10 rounded-lg border border-primary/30'>
																	<IconComponent className='h-5 w-5 text-primary' />
																</div>
																<div>
																	<div className='font-mono text-sm font-semibold text-foreground'>
																		{
																			social.name
																		}
																	</div>
																	<div className='font-mono text-xs text-muted-foreground'>
																		{
																			social.handle
																		}
																	</div>
																</div>
															</div>
															<Button
																variant='outline'
																size='sm'
																asChild
																className='border-primary/30 hover:border-primary hover:neon-glow font-mono opacity-70 group-hover:opacity-100 transition-opacity'>
																<a
																	href={
																		social.url
																	}
																	target='_blank'
																	rel='noopener noreferrer'>
																	connect()
																</a>
															</Button>
														</div>
													</div>
												);
											}
										)}
									</div>

									{/* Professional Note */}
									<div className='mt-6 p-4 bg-muted/30 rounded-lg border border-primary/20'>
										<div className='font-mono text-xs text-center space-y-1'>
											<div className='text-primary'>
												//
												Professional
												Network
											</div>
											<div className='text-muted-foreground'>
												Open
												to
												discussing
												backend
												architecture,
												<br />
												blockchain
												projects,
												and
												AI
												solutions
											</div>
										</div>
									</div>
								</CardContent>
							</div>
						</Card>
					</div>

					<Card className='bg-card/50 backdrop-blur border-primary/20 hover-glow'>
						<div className='terminal-window'>
							<div className='terminal-header'>
								<div className='terminal-dot red'></div>
								<div className='terminal-dot yellow'></div>
								<div className='terminal-dot green'></div>
								<span className='font-mono text-xs text-muted-foreground ml-2'>
									~/send_message.js
								</span>
							</div>
							<CardHeader className='bg-card/30 relative'>
								{/* Form Status Badge */}
								<div className='absolute -top-3 -right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-mono font-bold shadow-lg'>
									ACTIVE
								</div>

								<CardTitle className='text-xl text-foreground font-mono'>
									<span className='text-primary'>
										const
									</span>{' '}
									sendMessage
									= ()
									=&gt; "
									<span className='text-green-400'>
										contact_form
									</span>
									"
								</CardTitle>
							</CardHeader>
							<CardContent className='p-6 space-y-6'>
								<form
									onSubmit={
										handleSubmit
									}
									className='space-y-6'>
									<div className='grid md:grid-cols-2 gap-4'>
										<div className='space-y-2'>
											<label className='font-mono text-sm text-primary flex items-center gap-2'>
												<span>
													const
													name
													=
												</span>
												<Badge
													variant='outline'
													className='text-xs'>
													required
												</Badge>
											</label>
											<Input
												name='name'
												placeholder='Full Name'
												value={
													formData.name
												}
												onChange={
													handleInputChange
												}
												required
												className='bg-background/50 border-primary/30 focus:border-primary font-mono'
											/>
										</div>

										<div className='space-y-2'>
											<label className='font-mono text-sm text-primary flex items-center gap-2'>
												<span>
													const
													email
													=
												</span>
												<Badge
													variant='outline'
													className='text-xs'>
													required
												</Badge>
											</label>
											<Input
												name='email'
												type='email'
												placeholder='your.email@company.com'
												value={
													formData.email
												}
												onChange={
													handleInputChange
												}
												required
												className='bg-background/50 border-primary/30 focus:border-primary font-mono'
											/>
										</div>
									</div>

									<div className='space-y-2'>
										<label className='font-mono text-sm text-primary flex items-center justify-between'>
											<span>
												const
												details
												=
											</span>
											<span className='text-xs text-muted-foreground'>
												{
													formData
														.message
														.length
												}{' '}
												characters
											</span>
										</label>
										<Textarea
											name='message'
											placeholder='// Describe your project, requirements, timeline, and budget
// Example topics: API development, blockchain integration, 
// fintech platform, AI implementation, system architecture...'
											value={
												formData.message
											}
											onChange={
												handleInputChange
											}
											required
											rows={
												6
											}
											className='bg-background/50 border-primary/30 focus:border-primary font-mono resize-none leading-relaxed'
										/>
									</div>

									<Button
										type='submit'
										className='w-full bg-primary hover:bg-primary/90 text-primary-foreground font-mono hover-glow group transition-all duration-300'>
										<Terminal className='mr-2 h-4 w-4 group-hover:animate-pulse' />
										sendMessage()
									</Button>
								</form>
							</CardContent>
						</div>
					</Card>
				</div>
			</div>
		</section>
	);
}
