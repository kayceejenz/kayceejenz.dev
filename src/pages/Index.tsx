import { ThemeToggle } from '@/components/ThemeToggle';
import { MatrixBackground } from '@/components/MatrixBackground';
import { Hero } from '@/components/Hero';
import { Projects } from '@/components/Projects';
import { Contact } from '@/components/Contact';
import { Button } from '@/components/ui/button';
import {
	ArrowUp,
	Mail,
	Github,
	Linkedin,
	Heart,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import config from '../../data/config.js';

const navItems = ['projects', 'contact'];

export default function Index() {
	const [showScrollTop, setShowScrollTop] = useState(false);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setShowScrollTop(window.scrollY > 400);
			setScrolled(window.scrollY > 20);
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const scrollToTop = () =>
		window.scrollTo({ top: 0, behavior: 'smooth' });

	return (
		<div className='min-h-screen relative'>
			<MatrixBackground />

			{/* Navigation */}
			<nav
				className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
					scrolled
						? 'bg-background/95 backdrop-blur-md shadow-sm border-b border-border'
						: 'bg-background/80 backdrop-blur-sm border-b border-border/50'
				}`}>
				<div className='max-w-6xl mx-auto px-6'>
					<div className='flex justify-between items-center h-16'>
						{/* Brand */}
						<a
							href='/'
							className='flex flex-col leading-tight group'>
							<span className='text-base font-bold text-foreground group-hover:text-primary transition-colors'>
								Precious Okolo
							</span>
							<span className='text-xs text-primary font-medium tracking-wide'>
								Software Engineer
							</span>
						</a>

						{/* Desktop nav links */}
						<div className='hidden md:flex items-center gap-1'>
							{navItems.map(item => (
								<a
									key={item}
									href={`#${item}`}
									className='px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-muted transition-all duration-150 capitalize'>
									{item}
								</a>
							))}
						</div>

						{/* Right side controls */}
						<div className='flex items-center gap-2'>
							<ThemeToggle />
							<button
								className='md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors'
								onClick={() =>
									setMobileMenuOpen(
										prev =>
											!prev,
									)
								}
								aria-label='Toggle menu'>
								{mobileMenuOpen ? (
									<svg
										xmlns='http://www.w3.org/2000/svg'
										width='20'
										height='20'
										viewBox='0 0 24 24'
										fill='none'
										stroke='currentColor'
										strokeWidth='2'
										strokeLinecap='round'
										strokeLinejoin='round'>
										<path d='M18 6 6 18' />
										<path d='m6 6 12 12' />
									</svg>
								) : (
									<svg
										xmlns='http://www.w3.org/2000/svg'
										width='20'
										height='20'
										viewBox='0 0 24 24'
										fill='none'
										stroke='currentColor'
										strokeWidth='2'
										strokeLinecap='round'
										strokeLinejoin='round'>
										<line
											x1='4'
											x2='20'
											y1='12'
											y2='12'
										/>
										<line
											x1='4'
											x2='20'
											y1='6'
											y2='6'
										/>
										<line
											x1='4'
											x2='20'
											y1='18'
											y2='18'
										/>
									</svg>
								)}
							</button>
						</div>
					</div>

					{/* Mobile dropdown */}
					{mobileMenuOpen && (
						<div className='md:hidden border-t border-border py-3 pb-4'>
							{navItems.map(item => (
								<a
									key={
										item
									}
									href={`#${item}`}
									onClick={() =>
										setMobileMenuOpen(
											false,
										)
									}
									className='block px-2 py-2.5 text-sm text-muted-foreground hover:text-foreground capitalize transition-colors'>
									{item}
								</a>
							))}
						</div>
					)}
				</div>
			</nav>

			{/* Main Content */}
			<main className='pt-16'>
				<Hero />
				<Projects />
				<Contact />
			</main>

			{/* Footer */}
			<footer className='bg-card/50 backdrop-blur border-t border-border text-foreground py-14 px-6'>
				<div className='max-w-6xl mx-auto'>
					<div className='grid md:grid-cols-3 gap-10 pb-10 border-b border-border'>
						{/* Brand column */}
						<div className='space-y-4'>
							<div>
								<h3 className='text-lg font-bold text-foreground'>
									Precious
									Okolo
								</h3>
								<p className='text-sm text-primary font-medium mt-0.5'>
									Software Engineer
								</p>
							</div>
							<p className='text-sm text-muted-foreground leading-relaxed'>
								Software engineer with 5+
								years of production
								experience. I build
								reliable backend systems
								and solve hard problems.
							</p>
							<div className='flex items-center gap-2'>
								<div className='w-2 h-2 bg-primary rounded-full animate-pulse'></div>
								<span className='text-sm text-primary font-medium'>
									Open to Backend /
									AI-ML roles
								</span>
							</div>
						</div>

						{/* Quick links */}
						<div>
							<h4 className='text-xs font-semibold text-foreground uppercase tracking-widest mb-5'>
								Quick Links
							</h4>
							<div className='space-y-2.5'>
								{[
									'Projects',
									'Contact',
								].map(item => (
									<a
										key={
											item
										}
										href={`#${item.toLowerCase()}`}
										className='block text-sm text-muted-foreground hover:text-foreground transition-colors'>
										{
											item
										}
									</a>
								))}
								<a
									href='https://linkedin.com/in/kayceejenz/'
									target='_blank'
									rel='noopener noreferrer'
									className='block text-sm text-muted-foreground hover:text-foreground transition-colors'>
									LinkedIn
								</a>
								<a
									href='https://github.com/kayceejenz'
									target='_blank'
									rel='noopener noreferrer'
									className='block text-sm text-muted-foreground hover:text-foreground transition-colors'>
									GitHub
								</a>
							</div>
						</div>

					</div>

					{/* Bottom bar */}
					<div className='flex flex-col sm:flex-row justify-between items-center gap-4 pt-8'>
						<p className='text-sm text-muted-foreground'>
							©{' '}
							{new Date().getFullYear()}{' '}
							Precious Okolo
							&nbsp;·&nbsp; Built with{' '}
							<Heart className='inline h-3 w-3 text-red-500 mx-0.5' />{' '}
							and lots of ☕
						</p>
						<div className='flex items-center gap-4'>
							<a
								href='mailto:kayceejenz@gmail.com'
								className='text-muted-foreground hover:text-foreground transition-colors'
								title='Email'>
								<Mail className='h-4 w-4' />
							</a>
							<a
								href='https://github.com/kayceejenz'
								target='_blank'
								rel='noopener noreferrer'
								className='text-muted-foreground hover:text-foreground transition-colors'
								title='GitHub'>
								<Github className='h-4 w-4' />
							</a>
							<a
								href='https://linkedin.com/in/kayceejenz'
								target='_blank'
								rel='noopener noreferrer'
								className='text-muted-foreground hover:text-foreground transition-colors'
								title='LinkedIn'>
								<Linkedin className='h-4 w-4' />
							</a>
						</div>
					</div>
				</div>
			</footer>

			{/* Scroll to Top */}
			{showScrollTop && (
				<Button
					onClick={scrollToTop}
					size='icon'
					className='fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover-glow'
					aria-label='Scroll to top'>
					<ArrowUp className='h-4 w-4' />
				</Button>
			)}
		</div>
	);
}
