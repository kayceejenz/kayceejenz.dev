import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
	Mail,
	MapPin,
	Github,
	Linkedin,
	Twitter,
	Terminal,
} from 'lucide-react';
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
			icon: Github,
			color: 'hover:text-gray-300',
			handle: '@kayceejenz',
		},
		{
			name: 'LinkedIn',
			url: contact.links.linkedin,
			icon: Linkedin,
			color: 'hover:text-blue-400',
			handle: '/kayceejenz',
		},
		{
			name: 'X (Twitter)',
			url: contact.links.twitter,
			icon: Twitter,
			color: 'hover:text-blue-400',
			handle: '@kayceejenz',
		},
	];

	return (
		<section id='contact' className='py-20 px-6 bg-background'>
			<div className='max-w-6xl mx-auto'>
				<div className='text-center mb-16'>
					<h2 className='text-4xl md:text-5xl font-bold text-foreground mb-4 font-mono'>
						{'{ Get In Touch }'}
					</h2>
					<div className='w-24 h-1 bg-primary mx-auto neon-glow'></div>
					<p className='text-lg text-muted-foreground mt-6 max-w-2xl mx-auto font-mono'>
						// Ready to collaborate on your
						next project?
					</p>
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
										~/contact.js
									</span>
								</div>
								<CardContent className='p-6'>
									<div className='font-mono text-sm space-y-4'>
										<div className='text-primary'>
											const
											contactInfo
											={' '}
											{
												'{'
											}
										</div>

										<div className='ml-4 space-y-2'>
											<div className='flex items-center gap-3 text-muted-foreground'>
												<Mail className='h-4 w-4 text-primary' />
												email:{' '}
												<a
													href={`mailto:${contact.email}`}
													className='text-foreground hover:text-primary transition-colors underline'>
													"
													{
														contact.email
													}

													"
												</a>

												,
											</div>
											<div className='flex items-center gap-3 text-muted-foreground'>
												<MapPin className='h-4 w-4 text-primary' />
												location:{' '}
												<span className='text-foreground'>
													"
													{
														contact.location
													}

													"
												</span>

												,
											</div>
											<div className='text-muted-foreground'>
												availability:{' '}
												<span className='text-green-400'>
													"open_to_opportunities"
												</span>
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
							<CardHeader>
								<CardTitle className='text-foreground font-mono'>
									{
										'{ Social Links }'
									}
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className='space-y-4'>
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
													className='flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors'>
													<div className='flex items-center gap-3'>
														<IconComponent className='h-5 w-5 text-primary' />
														<span className='font-mono text-sm text-foreground'>
															{
																social.name
															}
														</span>
														<span className='font-mono text-xs text-muted-foreground'>
															{
																social.handle
															}
														</span>
													</div>
													<Button
														variant='outline'
														size='sm'
														asChild
														className='border-primary/30 hover:border-primary hover:neon-glow font-mono'>
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
											);
										}
									)}
								</div>
							</CardContent>
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
							<CardHeader className='bg-card/30'>
								<CardTitle className='text-foreground font-mono'>
									{
										'// Send Message Function'
									}
								</CardTitle>
							</CardHeader>
							<CardContent className='p-6'>
								<form
									onSubmit={
										handleSubmit
									}
									className='space-y-4'>
									<div className='space-y-2'>
										<label className='font-mono text-sm text-primary'>
											const
											name
											=
										</label>
										<Input
											name='name'
											placeholder='Your Name'
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
										<label className='font-mono text-sm text-primary'>
											const
											email
											=
										</label>
										<Input
											name='email'
											type='email'
											placeholder='your.email@domain.com'
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

									<div className='space-y-2'>
										<label className='font-mono text-sm text-primary'>
											const
											message
											=
										</label>
										<Textarea
											name='message'
											placeholder='// Tell me about your project...'
											value={
												formData.message
											}
											onChange={
												handleInputChange
											}
											required
											rows={
												5
											}
											className='bg-background/50 border-primary/30 focus:border-primary font-mono resize-none'
										/>
									</div>

									<Button
										type='submit'
										className='w-full bg-primary hover:bg-primary/90 text-primary-foreground font-mono hover-glow group'>
										<Terminal className='mr-2 h-4 w-4 group-hover:animate-pulse' />
										{
											'> sendMessage()'
										}
									</Button>
								</form>

								<div className='mt-6 p-4 bg-muted/30 rounded-lg'>
									<div className='font-mono text-xs text-muted-foreground space-y-1'>
										<div className='text-primary'>
											//
											Response
											time
										</div>
										<div>
											Usually
											within
											24
											hours
										</div>
										<div className='text-primary'>
											//
											Preferred
											topics
										</div>
										<div>
											Backend
											architecture,
											API
											design,
											blockchain
											projects
										</div>
									</div>
								</div>
							</CardContent>
						</div>
					</Card>
				</div>
			</div>
		</section>
	);
}
