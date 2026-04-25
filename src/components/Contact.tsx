import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
	Mail,
	MapPin,
	Send,
	CheckCircle,
	BrainCircuit,
	Server,
	Database,
	Layers,
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
			name: 'X (Twitter)',
			url: contact.links.twitter,
			icon: FaTwitter,
			handle: '@kayceejenz',
		},
	];

	const specializations = [
		{ icon: BrainCircuit, label: 'AI & LLM Systems' },
		{ icon: Database, label: 'RAG Pipelines' },
		{ icon: Server, label: 'Backend APIs' },
		{ icon: Layers, label: 'Fintech Infra' },
	];

	return (
		<section id='contact' className='py-20 px-6 bg-background'>
			<div className='max-w-6xl mx-auto'>
				<div className='text-center mb-16'>
					<h2 className='text-4xl md:text-5xl font-bold text-foreground mb-4'>
						Get in Touch
					</h2>
					<div className='w-16 h-0.5 bg-primary/60 mx-auto rounded-full mb-6'></div>
					<p className='text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed'>
						Open to new opportunities, collaborations, and interesting AI engineering challenges.
					</p>

					{/* Specialization pills */}
					<div className='mt-8 flex flex-wrap justify-center gap-3'>
						{specializations.map(({ icon: Icon, label }) => (
							<div
								key={label}
								className='flex items-center gap-2 px-4 py-2 bg-card/50 rounded-full border border-border text-sm text-muted-foreground'>
								<Icon className='w-4 h-4 text-primary' />
								{label}
							</div>
						))}
					</div>
				</div>

				<div className='grid lg:grid-cols-2 gap-10'>
					{/* Left column */}
					<div className='space-y-6'>
						{/* Contact info */}
						<Card className='bg-card/50 backdrop-blur border-border hover-glow'>
							<CardHeader className='pb-4'>
								<CardTitle className='text-lg font-semibold text-foreground'>
									Contact Info
								</CardTitle>
							</CardHeader>
							<CardContent className='space-y-3 pt-0'>
								<div className='flex items-center gap-3 p-3 bg-primary/5 rounded-lg border border-primary/15'>
									<Mail className='h-4 w-4 text-primary flex-shrink-0' />
									<div>
										<p className='text-xs text-muted-foreground mb-0.5'>Email</p>
										<a
											href={`mailto:${contact.email}`}
											className='text-sm font-medium text-foreground hover:text-primary transition-colors'>
											{contact.email}
										</a>
									</div>
								</div>

								<div className='flex items-center gap-3 p-3 bg-blue-500/5 rounded-lg border border-blue-500/15'>
									<MapPin className='h-4 w-4 text-blue-500 flex-shrink-0' />
									<div>
										<p className='text-xs text-muted-foreground mb-0.5'>Location</p>
										<span className='text-sm font-medium text-foreground'>
											{contact.location}
										</span>
									</div>
								</div>

								
							</CardContent>
						</Card>

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

					{/* Contact form */}
					<Card className='bg-card/50 backdrop-blur border-border hover-glow'>
						<CardHeader className='pb-4'>
							<CardTitle className='text-lg font-semibold text-foreground'>
								Send a Message
							</CardTitle>
							<p className='text-sm text-muted-foreground'>
								Describe your project or idea and I'll get back to you promptly.
							</p>
						</CardHeader>
						<CardContent className='pt-0'>
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
											className='bg-background/50 border-border focus:border-primary'
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
											className='bg-background/50 border-border focus:border-primary'
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
										className='bg-background/50 border-border focus:border-primary resize-none leading-relaxed'
									/>
								</div>

								<Button
									type='submit'
									className='w-full bg-primary hover:bg-primary/90 text-primary-foreground hover-glow transition-all duration-300'>
									<Send className='mr-2 h-4 w-4' />
									Send Message
								</Button>
							</form>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
