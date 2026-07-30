import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';
import { useEffect, useState } from 'react';
import config from '../../data/config.js';

const fields = [
	{ key: 'role', value: '"Software Engineer"', color: 'text-primary' },
	{ key: 'location', value: '"United Kingdom"', color: 'text-foreground' },
	{ key: 'focus', value: '"Backend Systems & Distributed Platforms"', color: 'text-primary' },
];

export function Hero() {
	const { hero } = config;
	const [displayText, setDisplayText] = useState('');
	const [currentIndex, setCurrentIndex] = useState(0);
	const [showCursor, setShowCursor] = useState(true);

	const fullText = hero.headline;

	useEffect(() => {
		if (currentIndex < fullText.length) {
			const timeout = setTimeout(() => {
				setDisplayText(prev => prev + fullText[currentIndex]);
				setCurrentIndex(prev => prev + 1);
			}, 30);
			return () => clearTimeout(timeout);
		}
	}, [currentIndex, fullText]);

	useEffect(() => {
		const interval = setInterval(() => {
			setShowCursor(prev => !prev);
		}, 530);
		return () => clearInterval(interval);
	}, []);

	const scrollToProjects = () => {
		document.getElementById('projects')?.scrollIntoView({
			behavior: 'smooth',
		});
	};

	const scrollToContact = () => {
		document.getElementById('contact')?.scrollIntoView({
			behavior: 'smooth',
		});
	};

	return (
		<section className='min-h-screen flex items-center justify-center gradient-bg relative overflow-hidden px-6'>
			<div className='max-w-3xl mx-auto text-center space-y-10 relative z-10'>
				<div className='space-y-10'>
					<h1 className='text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-foreground to-primary bg-clip-text text-transparent'>
						{hero.name}
					</h1>

					<div className='terminal-window max-w-xl mx-auto text-left'>
						<div className='terminal-header'>
							<div className='flex gap-1.5'>
								<div className='w-2.5 h-2.5 rounded-full bg-foreground/20' />
								<div className='w-2.5 h-2.5 rounded-full bg-foreground/15' />
								<div className='w-2.5 h-2.5 rounded-full bg-foreground/10' />
							</div>
							<span className='font-mono text-xs text-muted-foreground ml-2'>
								profile.ts
							</span>
						</div>
						<div className='p-4 md:p-6 font-mono text-sm leading-relaxed space-y-1'>
							<div>
								<span className='text-primary'>const</span>{' '}
								<span className='text-foreground'>developer</span>{' '}
								<span className='text-muted-foreground'>= {'{'}</span>
							</div>
							{fields.map((field, i) => (
								<div key={i} className='ml-5 flex'>
									<span className='text-muted-foreground shrink-0'>
										{field.key}:{' '}
									</span>
									<span className={field.color}>
										{field.value}
										<span className='text-muted-foreground'>,</span>
									</span>
								</div>
							))}
							<div className='ml-5 flex'>
								<span className='text-muted-foreground shrink-0'>
									mission:{' '}
								</span>
								<span className='text-primary break-words'>
									"{displayText}
									<span className={showCursor ? 'opacity-100' : 'opacity-0'}>█</span>"
								</span>
							</div>
							<div>
								<span className='text-muted-foreground'>{'};'}</span>
							</div>
						</div>
					</div>
				</div>

				<div className='flex flex-col sm:flex-row gap-4 justify-center'>
					<Button
						size='lg'
						onClick={scrollToProjects}
						className='bg-primary text-primary-foreground font-mono hover-glow hover:shadow-[0_0_24px_hsl(var(--primary)/0.3)] focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2'>
						View Projects
					</Button>

					<Button
						variant='outline'
						size='lg'
						onClick={scrollToContact}
						className='border-primary/40 text-foreground hover:border-primary hover:bg-primary/5 hover-glow hover:shadow-[0_0_20px_hsl(var(--primary)/0.15)] focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2'>
						<Mail className='mr-2 h-4 w-4' />
						Get in Touch
					</Button>
				</div>
			</div>
		</section>
	);
}
