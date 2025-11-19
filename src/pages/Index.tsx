import { ThemeToggle } from '@/components/ThemeToggle';
import { MatrixBackground } from '@/components/MatrixBackground';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Skills } from '@/components/Skills';
import { Experience } from '@/components/Experience';
import { Projects } from '@/components/Projects';
import { Contact } from '@/components/Contact';
import { Button } from '@/components/ui/button';
import { ArrowUp, Terminal } from 'lucide-react';
import { useEffect, useState } from 'react';
import Certifications from '@/components/Certification';
import Education from '@/components/Education';

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
								'projects',
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
				<Contact />
			</main>

			{/* Footer */}
			<footer className='bg-card/50 backdrop-blur border-t border-primary/20 text-foreground py-8 px-6'>
				<div className='max-w-6xl mx-auto'>
					<div className='terminal-window'>
						<div className='terminal-header'>
							<div className='terminal-dot red'></div>
							<div className='terminal-dot yellow'></div>
							<div className='terminal-dot green'></div>
							<span className='font-mono text-xs text-muted-foreground ml-2'>
								~/footer.js
							</span>
						</div>
						<div className='p-6 text-center'>
							<div className='font-mono text-sm space-y-2'>
								<div className='text-primary'>
									const
									footer ={' '}
									{'{'}
								</div>

								<div className='ml-4 text-muted-foreground'>
									catch
									phrase:{' '}
									<span className='text-foreground'>
										"Be
										somebody,
										stay
										Legendary"
									</span>
									,
								</div>
								<div className='ml-4 text-muted-foreground'>
									made by:{' '}
									<span className='text-foreground'>
										"kayceejenz"
									</span>{' '}
								</div>
								<div className='text-primary'>
									{'}'}
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
