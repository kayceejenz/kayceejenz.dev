import { ThemeToggle } from '@/components/ThemeToggle';
import { MatrixBackground } from '@/components/MatrixBackground';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Skills } from '@/components/Skills';
import { Experience } from '@/components/Experience';
import { Projects } from '@/components/Projects';
import { Contact } from '@/components/Contact';
import { Button } from '@/components/ui/button';
import {
	ArrowUp,
	Terminal,
	Mail,
	Github,
	Linkedin,
	Heart,
	Code2,
	Zap,
	Award,
	Calendar,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import Certifications from '@/components/Certification';
import Education from '@/components/Education';
import { Blog } from '@/components/Blog';

export default function Index() {
	const [showScrollTop, setShowScrollTop] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setShowScrollTop(window.scrollY > 400);
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	return (
		<div className='min-h-screen relative'>
			<MatrixBackground />
			<ThemeToggle />

			{/* Navigation */}
			<nav className='fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b border-primary/20'>
				<div className='max-w-6xl mx-auto px-6 py-4'>
					<div className='flex justify-between items-center'>
						<h1 className='text-xl font-bold text-primary font-mono neon-text'>
							{'{ kayceejenz.dev }'}
						</h1>
						<div className='hidden md:flex space-x-6'>
							{[
								'about',
								'skills',
								'experience',
								'certifications',
								'projects',
								'blog',
								'contact',
							].map(item => (
								<a
									key={
										item
									}
									href={`#${item}`}
									className='text-muted-foreground hover:text-primary transition-colors font-mono text-sm hover:neon-glow'>
									{'{ ' +
										item +
										' }'}
								</a>
							))}
						</div>
						<div className='md:hidden'>
							<Button
								variant='outline'
								size='sm'
								className='font-mono border-primary/30'>
								<Terminal className='h-4 w-4' />
							</Button>
						</div>
					</div>
				</div>
			</nav>

			{/* Main Content */}
			<main>
				<Hero />
				<About />
				<Skills />
				<Experience />
				<Education />
				<Certifications />
				<Projects />
				<Blog />
				<Contact />
			</main>

			{/* Enhanced Footer */}
			<footer className='bg-card/50 backdrop-blur border-t border-primary/20 text-foreground py-12 px-6'>
				<div className='max-w-7xl mx-auto'>
					<div className='grid lg:grid-cols-4 gap-8 mb-8'>
						{/* Main Info */}
						<div className='lg:col-span-2 space-y-6'>
							<div className='terminal-window'>
								<div className='terminal-header'>
									<div className='terminal-dot red'></div>
									<div className='terminal-dot yellow'></div>
									<div className='terminal-dot green'></div>
									<span className='font-mono text-xs text-muted-foreground ml-2'>
										~/developer_info.js
									</span>
								</div>
								<div className='p-6'>
									<div className='font-mono text-sm space-y-3'>
										<div className='text-primary'>
											const
											professional
											={' '}
											{
												'{'
											}
										</div>
										<div className='ml-4 space-y-2 text-muted-foreground'>
											<div>
												name:{' '}
												<span className='text-foreground'>
													"Precious
													Okolo"
												</span>

												,
											</div>
											<div>
												focus:{' '}
												<span className='text-green-400'>
													"Distributed
													Systems
													&
													Applied
													AI"
												</span>

												,
											</div>
											<div>
												expertise:{' '}
												<span className='text-blue-400'>
													[".NET",
													"Node.js",
													"AI-Infra",
													"Web3"]
												</span>

												,
											</div>
											<div>
												motto:{' '}
												<span className='text-yellow-400'>
													"Architecting
													the
													Intelligent
													Backend"
												</span>

												,
											</div>
											<div>
												status:{' '}
												<span className='text-green-400'>
													"Open
													to
													AI-focused
													Roles"
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
							</div>
						</div>

						{/* Quick Links */}
						<div className='space-y-6'>
							<h3 className='font-mono text-lg text-primary'>
								// Quick Links
							</h3>
							<div className='space-y-3'>
								{[
									'About',
									'Skills',
									'Experience',
									'Projects',
									'Blog',
									'Contact',
								].map(item => (
									<a
										key={
											item
										}
										href={`#${item.toLowerCase()}`}
										className='block font-mono text-sm text-muted-foreground hover:text-primary transition-colors hover:neon-glow'>
										{'> ' +
											item.toLowerCase() +
											'()'}
									</a>
								))}
							</div>
						</div>

						{/* Professional Stats */}
						<div className='space-y-6'>
							<h3 className='font-mono text-lg text-primary'>
								// Portfolio
								Stats
							</h3>
							<div className='space-y-4'>
								<div className='flex items-center gap-2'>
									<Code2 className='h-4 w-4 text-primary' />
									<span className='font-mono text-sm text-muted-foreground'>
										5+
										years
										Professional
										Engineering
									</span>
								</div>

								<div className='flex items-center gap-2'>
									<Award className='h-4 w-4 text-green-500' />
									<span className='font-mono text-sm text-muted-foreground'>
										48+
										Azure
										badges
									</span>
								</div>
								<div className='flex items-center gap-2'>
									<Calendar className='h-4 w-4 text-blue-500' />
									<span className='font-mono text-sm text-muted-foreground'>
										Last
										updated{' '}
										{new Date().getFullYear()}
									</span>
								</div>
							</div>
						</div>
					</div>

					{/* Footer Bottom */}
					<div className='border-t border-primary/20 pt-8'>
						<div className='flex flex-col md:flex-row justify-between items-center gap-6'>
							{/* Copyright */}
							<div className='font-mono text-sm text-muted-foreground'>
								<span>
									©{' '}
									{new Date().getFullYear()}{' '}
									kayceejenz.dev{' '}
									{''}
								</span>
								<span>
									Built
									with{' '}
								</span>
								<Heart className='inline h-3 w-3 text-red-500 mx-1' />
								<span>
									{' '}
									and lots
									of ☕
								</span>
							</div>

							{/* Social Links */}
							<div className='flex items-center gap-4'>
								<Button
									variant='outline'
									size='sm'
									className='border-primary/30 hover:border-primary hover:neon-glow font-mono'
									onClick={() =>
										(window.location.href =
											'mailto:kayceejenz@gmail.com')
									}>
									<Mail className='h-3 w-3 mr-2' />
									Email
								</Button>
								<Button
									variant='outline'
									size='sm'
									className='border-primary/30 hover:border-primary hover:neon-glow font-mono'
									onClick={() =>
										window.open(
											'https://github.com/kayceejenz',
											'_blank',
										)
									}>
									<Github className='h-3 w-3 mr-2' />
									GitHub
								</Button>
								<Button
									variant='outline'
									size='sm'
									className='border-primary/30 hover:border-primary hover:neon-glow font-mono'
									onClick={() =>
										window.open(
											'https://linkedin.com/in/kayceejenz',
											'_blank',
										)
									}>
									<Linkedin className='h-3 w-3 mr-2' />
									LinkedIn
								</Button>
							</div>
						</div>

						{/* Final Developer Note */}
						<div className='mt-6 text-center'>
							<div className='code-block inline-block p-4'>
								<div className='font-mono text-xs text-center space-y-1'>
									<div className='text-primary'>
										//
										Thanks
										for
										visiting!
									</div>
									<div className='text-muted-foreground'>
										If
										you
										made
										it
										this
										far,
										you're
										awesome.
										Let's
										build
										something
										amazing
										together!
										🚀
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</footer>

			{/* Scroll to Top Button - Positioned to not overlap with theme toggle */}
			{showScrollTop && (
				<Button
					onClick={scrollToTop}
					size='icon'
					className='fixed bottom-6 right-20 z-50 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover-glow font-mono w-10 h-10 rounded-full'
					style={{
						boxShadow: '0 0 15px rgba(0, 255, 136, 0.2), 0 0 30px rgba(0, 255, 136, 0.1)',
					}}>
					<ArrowUp className='h-4 w-4' />
				</Button>
			)}
		</div>
	);
}
