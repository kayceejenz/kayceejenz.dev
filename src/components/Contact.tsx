import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Send, CheckCircle2 } from 'lucide-react';
import { FaHackerrank, FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import config from '../../data/config.js';

export function Contact() {
	const { contact } = config;
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		message: '',
	});
	const [submitted, setSubmitted] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const addr = ['kayceejenz', 'gmail.com'].join('@');
		const subject = encodeURIComponent(
			`Portfolio Contact from ${formData.name}`,
		);
		const body = encodeURIComponent(
			`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`,
		);
		window.location.href = `mailto:${addr}?subject=${subject}&body=${body}`;
		setSubmitted(true);
	};

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
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
			handle: '@kayceejenz',
		},
		{
			name: 'LinkedIn',
			url: contact.links.linkedin,
			icon: FaLinkedinIn,
			handle: '/kayceejenz',
		},
		{
			name: 'HackerRank',
			url: contact.links.hackerrank,
			icon: FaHackerrank,
			handle: '/kayceejenz',
		},
		{
			name: 'LeetCode',
			url: contact.links.leetcode,
			icon: SiLeetcode,
			handle: '@kayceejenz',
		},
	];

	return (
		<section id='contact' className='py-20 px-6 bg-background'>
			<div className='max-w-6xl mx-auto'>
				<div className='text-center mb-16'>
					<h2 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-foreground to-primary bg-clip-text text-transparent'>
						Get in Touch
					</h2>
					<div className='w-16 h-0.5 bg-primary/60 mx-auto rounded-full mt-4 mb-8' />
				</div>

				<div className='grid lg:grid-cols-2 gap-10 items-start'>
					{/* Left column */}
					<div className='space-y-6'>
						{/* Social links */}
						<Card className='bg-card/50 backdrop-blur border-border hover-glow'>
							<CardHeader className='pb-4'>
								<CardTitle className='text-lg font-semibold text-foreground'>
									Connect
								</CardTitle>
							</CardHeader>
							<CardContent className='space-y-2 pt-0'>
								{socialLinks.map((social, index) => {
									const IconComponent = social.icon;
									return (
										<a
											key={index}
											href={social.url}
											target='_blank'
											rel='noopener noreferrer'
											className='flex items-center justify-between p-3 rounded-lg border border-border hover:border-primary/40 hover:bg-card transition-all duration-200 group'>
											<div className='flex items-center gap-3'>
												<div className='p-2 bg-primary/10 rounded-lg border border-primary/20'>
													<IconComponent className='h-4 w-4 text-primary' />
												</div>
												<div>
													<p className='text-sm font-medium text-foreground'>
														{social.name}
													</p>
													<p className='text-xs text-muted-foreground font-mono'>
														{social.handle}
													</p>
												</div>
											</div>
											<span className='text-xs text-muted-foreground group-hover:text-primary transition-colors'>
												View profile
											</span>
										</a>
									);
								})}
							</CardContent>
						</Card>
					</div>

					{/* Right column — form */}
					<Card className='bg-card/50 backdrop-blur border-border hover-glow'>
						<CardHeader className='pb-4'>
							<CardTitle className='text-lg font-semibold text-foreground'>
								{submitted ? 'Message Sent' : 'Send a Message'}
							</CardTitle>
							<p className='text-sm text-muted-foreground'>
								{submitted
									? 'Your message has been opened in your default email client, ready to send.'
									: "Describe your project or idea and I'll get back to you promptly."}
							</p>
						</CardHeader>
						<CardContent className='pt-0'>
							{submitted ? (
								<div className='animate-scale-in text-center py-8 space-y-4'>
									<div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border border-primary/30'>
										<CheckCircle2 className='h-8 w-8 text-primary' />
									</div>
									<p className='text-sm text-muted-foreground'>
										Your message draft is open in your email client. Just hit send when you're ready.
									</p>
									<Button
										variant='outline'
										onClick={() => {
											setSubmitted(false);
											setFormData({ name: '', email: '', message: '' });
										}}
										className='border-primary/30 text-foreground hover:bg-primary/5'>
										Send Another Message
									</Button>
								</div>
							) : (
								<form onSubmit={handleSubmit} className='space-y-5'>
									<div className='grid md:grid-cols-2 gap-4'>
										<div className='space-y-1.5'>
											<label className='text-sm font-medium text-foreground'>
												Name <span className='text-primary'>*</span>
											</label>
											<Input
												name='name'
												placeholder='Your full name'
												value={formData.name}
												onChange={handleInputChange}
												required
												className='bg-background/50 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all'
											/>
										</div>

										<div className='space-y-1.5'>
											<label className='text-sm font-medium text-foreground'>
												Email <span className='text-primary'>*</span>
											</label>
											<Input
												name='email'
												type='email'
												placeholder='your@email.com'
												value={formData.email}
												onChange={handleInputChange}
												required
												className='bg-background/50 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all'
											/>
										</div>
									</div>

									<div className='space-y-1.5'>
										<div className='flex items-center justify-between'>
											<label className='text-sm font-medium text-foreground'>
												Message <span className='text-primary'>*</span>
											</label>
											<span className='text-xs text-muted-foreground'>
												{formData.message.length} chars
											</span>
										</div>
										<Textarea
											name='message'
											placeholder='Tell me about your project, what you need, and any relevant timeline or context...'
											value={formData.message}
											onChange={handleInputChange}
											required
											rows={6}
											className='bg-background/50 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none leading-relaxed'
										/>
									</div>

									<Button
										type='submit'
										className='w-full bg-primary text-primary-foreground hover-glow hover:shadow-[0_0_24px_hsl(var(--primary)/0.3)] focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2'>
										<Send className='mr-2 h-4 w-4' />
										Send Message
									</Button>
								</form>
							)}
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
