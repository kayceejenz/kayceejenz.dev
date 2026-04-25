import { Button } from '@/components/ui/button';
import { Mail, Terminal } from 'lucide-react';
import { useEffect, useState } from 'react';
import config from '../../data/config.js';

export function Hero() {
	const { hero } = config;
	const [displayText, setDisplayText] = useState('');
	const [currentIndex, setCurrentIndex] = useState(0);

	const fullText =
		'AI Engineer building LLM systems, RAG pipelines, and the production infrastructure that makes them scale.';

	useEffect(() => {
		if (currentIndex < fullText.length) {
			const timeout = setTimeout(() => {
				setDisplayText(
					prev => prev + fullText[currentIndex],
				);
				setCurrentIndex(prev => prev + 1);
			}, 100);
			return () => clearTimeout(timeout);
		}
	}, [currentIndex, fullText]);

	const scrollToContact = () => {
		document.getElementById('contact')?.scrollIntoView({
			behavior: 'smooth',
		});
	};

	return (
		<section className='min-h-screen flex items-center justify-center gradient-bg relative overflow-hidden px-6'>
			<div className='max-w-4xl mx-auto text-center space-y-8 relative z-10'>
				<div className='space-y-6'>
					<h1 className='text-5xl md:text-7xl font-bold bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent'>
						{hero.name}
					</h1>

					<p className='text-xl md:text-2xl font-medium text-primary tracking-wide'>
						{hero.headline.split(' | ')[0]}
					</p>

					<div className='terminal-window max-w-2xl mx-auto'>
						<div className='terminal-header'>
							<div className='terminal-dot red'></div>
							<div className='terminal-dot yellow'></div>
							<div className='terminal-dot green'></div>
							<span className='font-mono text-xs text-muted-foreground ml-2'>
								kayceejenz.dev
							</span>
						</div>
						<div className='p-6 font-mono text-left'>
							<div className='text-primary'>
								const developer
								= {'{'}
							</div>
							<div className='ml-4 text-muted-foreground'>
								specializes:{' '}
								<span className='text-foreground'>
									["
									{
										hero.headline.split(
											' | ',
										)[1]
									}
									"]
								</span>
								,
							</div>
							<div className='ml-4 text-muted-foreground'>
								description:{' '}
								<span className='text-primary'>
									"
									{
										displayText
									}
									<span className='animate-pulse'>
										|
									</span>
									"
								</span>
							</div>
							<div className='text-primary'>
								{'}'}
							</div>
						</div>
					</div>

					<p className='text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed'>
						{hero.subheadline}
					</p>
				</div>

				<div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
					<Button
						asChild
						size='lg'
						className='bg-primary hover:bg-primary/90 text-primary-foreground hover-glow'>
						<a
							href={hero.ctas[0].href}
							target='_blank'
							rel='noopener noreferrer'>
							<Terminal className='mr-2 h-4 w-4' />
							Download Resume
						</a>
					</Button>

					<Button
						variant='outline'
						size='lg'
						onClick={scrollToContact}
						className='border-primary/40 text-foreground hover:border-primary hover-glow'>
						<Mail className='mr-2 h-4 w-4' />
						Get in Touch
					</Button>
				</div>
			</div>
		</section>
	);
}
