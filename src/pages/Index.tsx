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
	Mail,
	Github,
	Linkedin,
	Heart,
	Code2,
	Award,
	Calendar,
	BrainCircuit,
	Menu,
	X,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import Certifications from '@/components/Certification';
import Education from '@/components/Education';
import { Blog } from '@/components/Blog';

const navItems = [
	'about',
	'skills',
	'experience',
	'certifications',
	'projects',
	'blog',
	'contact',
];

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

	const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

	return (
		<div className='min-h-screen relative'>
			<MatrixBackground />

			{/* Navigation */}
			<nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
				scrolled
					? 'bg-background/95 backdrop-blur-md shadow-sm border-b border-border'
					: 'bg-background/80 backdrop-blur-sm border-b border-border/50'
			}`}>
				<div className='max-w-6xl mx-auto px-6'>
					<div className='flex justify-between items-center h-16'>
						{/* Brand */}
						<a href='#' className='flex flex-col leading-tight group'>
							<span className='text-base font-bold text-foreground group-hover:text-primary transition-colors'>
								Precious Okolo
							</span>
							<span className='text-xs text-primary font-medium tracking-wide'>
								AI Engineer
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
								onClick={() => setMobileMenuOpen(prev => !prev)}
								aria-label='Toggle menu'>
								{mobileMenuOpen ? (
									<X className='h-5 w-5' />
								) : (
									<Menu className='h-5 w-5' />
								)}
							</button>
						</div>
					</div>

					{/* Mobile dropdown */}
					{mobileMenuOpen && (
						<div className='md:hidden border-t border-border py-3 pb-4'>
							{navItems.map(item => (
								<a
									key={item}
									href={`#${item}`}
									onClick={() => setMobileMenuOpen(false)}
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
				<About />
				<Skills />
				<Experience />
				<Education />
				<Certifications />
				<Projects />
				<Blog />
				<Contact />
			</main>

			{/* Footer */}
			<footer className='bg-card/50 backdrop-blur border-t border-border text-foreground py-14 px-6'>
				<div className='max-w-6xl mx-auto'>
					<div className='grid md:grid-cols-3 gap-10 pb-10 border-b border-border'>

						{/* Brand column */}
						<div className='space-y-4'>
							<div>
								<h3 className='text-lg font-bold text-foreground'>Precious Okolo</h3>
								<p className='text-sm text-primary font-medium mt-0.5'>AI Engineer</p>
							</div>
							<p className='text-sm text-muted-foreground leading-relaxed'>
								Building LLM systems, RAG pipelines, and the production infrastructure behind them.
								Currently pursuing an MSc in Artificial Intelligence at the University of Salford.
							</p>
							<div className='flex items-center gap-2'>
								<div className='w-2 h-2 bg-primary rounded-full animate-pulse'></div>
								<span className='text-sm text-primary font-medium'>Open to AI-focused roles</span>
							</div>
						</div>

						{/* Quick links */}
						<div>
							<h4 className='text-xs font-semibold text-foreground uppercase tracking-widest mb-5'>
								Quick Links
							</h4>
							<div className='space-y-2.5'>
								{['About', 'Skills', 'Experience', 'Certifications', 'Projects', 'Blog', 'Contact'].map(item => (
									<a
										key={item}
										href={`#${item.toLowerCase()}`}
										className='block text-sm text-muted-foreground hover:text-foreground transition-colors'>
										{item}
									</a>
								))}
							</div>
						</div>

						{/* At a glance */}
						<div>
							<h4 className='text-xs font-semibold text-foreground uppercase tracking-widest mb-5'>
								At a Glance
							</h4>
							<div className='space-y-3.5'>
								<div className='flex items-center gap-3'>
									<Code2 className='h-4 w-4 text-primary flex-shrink-0' />
									<span className='text-sm text-muted-foreground'>
										5+ years production engineering
									</span>
								</div>
								<div className='flex items-center gap-3'>
									<BrainCircuit className='h-4 w-4 text-primary flex-shrink-0' />
									<span className='text-sm text-muted-foreground'>
										MSc AI, University of Salford
									</span>
								</div>
								<div className='flex items-center gap-3'>
									<Award className='h-4 w-4 text-primary flex-shrink-0' />
									<span className='text-sm text-muted-foreground'>
										28 professional certifications
									</span>
								</div>
								<div className='flex items-center gap-3'>
									<Calendar className='h-4 w-4 text-primary flex-shrink-0' />
									<span className='text-sm text-muted-foreground'>
										Last updated {new Date().getFullYear()}
									</span>
								</div>
							</div>
						</div>
					</div>

					{/* Bottom bar */}
					<div className='flex flex-col sm:flex-row justify-between items-center gap-4 pt-8'>
						<p className='text-sm text-muted-foreground'>
							© {new Date().getFullYear()} Precious Okolo &nbsp;·&nbsp; Built with{' '}
							<Heart className='inline h-3 w-3 text-red-500 mx-0.5' /> and lots of ☕
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
