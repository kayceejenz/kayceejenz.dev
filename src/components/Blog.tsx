import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Calendar,
	Clock,
	ExternalLink,
	Volume2,
	VolumeX,
	Pause,
	Play,
	ArrowLeft,
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import blogPosts from '../../data/blog.js';
import { renderMarkdown } from '@/lib/markdown';


export function Blog() {
	const [selectedPost, setSelectedPost] = useState(null);

	// Handle copy button clicks
	useEffect(() => {
		const handleCopy = (e: Event) => {
			const target = e.target as HTMLElement;
			if (target.classList.contains('copy-btn')) {
				const code = target.getAttribute('data-code');
				if (code) {
					navigator.clipboard
						.writeText(code)
						.then(() => {
							target.textContent =
								'copied!';
							setTimeout(() => {
								target.textContent =
									'copy';
							}, 2000);
						});
				}
			}
		};

		document.addEventListener('click', handleCopy);
		return () => document.removeEventListener('click', handleCopy);
	}, []);
	const [isSpeaking, setIsSpeaking] = useState(false);
	const [isPaused, setIsPaused] = useState(false);
	const [speechSupported, setSpeechSupported] = useState(false);
	const utteranceRef = useRef(null);

	useEffect(() => {
		if ('speechSynthesis' in window) {
			setSpeechSupported(true);

			const loadVoices = () => {
				const voices =
					window.speechSynthesis.getVoices();
				if (voices.length > 0) {
					console.log(
						'Available voices:',
						voices.map(
							v =>
								`${v.name} (${v.lang})`
						)
					);
				}
			};

			loadVoices();
			if (
				window.speechSynthesis.onvoiceschanged !==
				undefined
			) {
				window.speechSynthesis.onvoiceschanged =
					loadVoices;
			}
		}

		return () => {
			if (window.speechSynthesis) {
				window.speechSynthesis.cancel();
			}
		};
	}, []);

	const cleanTextForSpeech = markdown => {
		let text = markdown;

		// Remove code blocks
		text = text.replace(
			/```[\s\S]*?```/g,
			' code example omitted '
		);

		// Remove inline code
		text = text.replace(/`([^`]+)`/g, '$1');

		// Remove headers markers but keep text
		text = text.replace(/^#{1,6}\s+/gm, '');

		// Remove bold/italic markers
		text = text.replace(/\*\*([^*]+)\*\*/g, '$1');
		text = text.replace(/\*([^*]+)\*/g, '$1');

		// Remove links but keep text
		text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

		// Remove list markers
		text = text.replace(/^[-*]\s+/gm, '');

		// Clean up extra whitespace
		text = text.replace(/\n\n+/g, '. ');
		text = text.replace(/\n/g, ' ');
		text = text.trim();

		return text;
	};

	const handleSpeak = () => {
		if (!speechSupported || !selectedPost) return;

		if (isPaused) {
			// Resume speech
			window.speechSynthesis.resume();
			setIsPaused(false);
			setIsSpeaking(true);
			return;
		}

		if (isSpeaking) {
			// Pause speech
			window.speechSynthesis.pause();
			setIsPaused(true);
			setIsSpeaking(false);
			return;
		}

		// Start new speech
		window.speechSynthesis.cancel(); // Cancel any ongoing speech

		const textToSpeak = `${
			selectedPost.title
		}. ${cleanTextForSpeech(selectedPost.content)}`;
		const utterance = new SpeechSynthesisUtterance(textToSpeak);

		// Get available voices
		const voices = window.speechSynthesis.getVoices();

		// Try to find a British English male voice
		// Priority order: GB male voices, then any English male voice
		const britishMaleVoice =
			voices.find(
				voice =>
					voice.lang.includes('en-GB') &&
					voice.name
						.toLowerCase()
						.includes('male')
			) ||
			voices.find(
				voice =>
					voice.lang.includes('en-GB') &&
					!voice.name
						.toLowerCase()
						.includes('female')
			) ||
			voices.find(voice => voice.lang.includes('en-GB')) ||
			voices.find(
				voice =>
					(voice.lang.includes('en-') ||
						voice.lang === 'en') &&
					(voice.name
						.toLowerCase()
						.includes('male') ||
						voice.name
							.toLowerCase()
							.includes('daniel') ||
						voice.name
							.toLowerCase()
							.includes('oliver'))
			);

		if (britishMaleVoice) {
			utterance.voice = britishMaleVoice;
		}

		// Configure speech
		utterance.lang = 'en-GB'; // Set to British English
		utterance.rate = 0.9; // Slightly slower for better comprehension
		utterance.pitch = 0.95; // Slightly lower pitch for male voice
		utterance.volume = 1;

		// Event handlers
		utterance.onstart = () => {
			setIsSpeaking(true);
			setIsPaused(false);
		};

		utterance.onend = () => {
			setIsSpeaking(false);
			setIsPaused(false);
		};

		utterance.onerror = event => {
			console.error('Speech synthesis error:', event);
			setIsSpeaking(false);
			setIsPaused(false);
		};

		utteranceRef.current = utterance;
		window.speechSynthesis.speak(utterance);
	};

	const handleStop = () => {
		if (!speechSupported) return;

		window.speechSynthesis.cancel();
		setIsSpeaking(false);
		setIsPaused(false);
	};

	useEffect(() => {
		return () => {
			if (window.speechSynthesis) {
				window.speechSynthesis.cancel();
			}
			setIsSpeaking(false);
			setIsPaused(false);
		};
	}, [selectedPost]);

	if (selectedPost) {
		return (
			<section id='blog' className='py-20 px-6 bg-muted/30'>
				<div className='max-w-4xl mx-auto'>
					{/* Article toolbar */}
					<div className='flex items-center justify-between mb-8'>
						<Button
							variant='outline'
							onClick={() => setSelectedPost(null)}
							className='border-border hover:border-primary/50'>
							<ArrowLeft className='h-4 w-4 mr-2' />
							Back to Blog
						</Button>

						{speechSupported && (
							<div className='flex items-center gap-2'>
								<Button
									variant='outline'
									size='sm'
									onClick={handleSpeak}
									className='border-border hover:border-primary/50'
									title={isPaused ? 'Resume reading' : isSpeaking ? 'Pause reading' : 'Read aloud'}>
									{isPaused ? (
										<><Play className='h-4 w-4 mr-1.5' />Resume</>
									) : isSpeaking ? (
										<><Pause className='h-4 w-4 mr-1.5' />Pause</>
									) : (
										<><Volume2 className='h-4 w-4 mr-1.5' />Read Aloud</>
									)}
								</Button>
								{(isSpeaking || isPaused) && (
									<Button
										variant='outline'
										size='sm'
										onClick={handleStop}
										className='border-red-500/30 hover:border-red-500 text-red-500'>
										<VolumeX className='h-4 w-4 mr-1.5' />Stop
									</Button>
								)}
							</div>
						)}
					</div>

					{/* Reading indicator */}
					{speechSupported && (isSpeaking || isPaused) && (
						<div className='mb-6 p-3 bg-primary/8 border border-primary/20 rounded-lg flex items-center gap-2 text-sm text-primary'>
							<Volume2 className='h-4 w-4 animate-pulse' />
							{isPaused ? 'Reading paused' : 'Reading article aloud…'}
						</div>
					)}

					{/* Article card */}
					<Card className='bg-card/50 backdrop-blur border-border'>
						<CardHeader className='border-b border-border pb-6'>
							<div className='flex flex-wrap gap-2 mb-4'>
								{selectedPost.tags.map((tag, i) => (
									<Badge key={i} variant='outline' className='bg-primary/10 text-primary border-primary/30 text-xs'>
										{tag}
									</Badge>
								))}
							</div>
							<h1 className='text-2xl md:text-3xl font-bold text-foreground leading-tight mb-4'>
								{selectedPost.title}
							</h1>
							<div className='flex flex-wrap items-center gap-5 text-sm text-muted-foreground'>
								<div className='flex items-center gap-1.5'>
									<Calendar className='h-4 w-4' />
									{selectedPost.date}
								</div>
								<div className='flex items-center gap-1.5'>
									<Clock className='h-4 w-4' />
									{selectedPost.readTime} read
								</div>
							</div>
						</CardHeader>

						<CardContent className='p-6 md:p-8'>
							<div className='prose prose-lg max-w-none'>
								<div
									className='
										[&_.code-block-container]:my-8
										[&_.code-header]:bg-primary/5
										[&_.code-content]:bg-card/30
										[&_.inline-code]:bg-primary/15
										[&_.inline-code]:text-primary
										[&_h1]:text-foreground
										[&_h2]:text-foreground
										[&_h3]:text-foreground
										[&_strong]:text-foreground
										[&_em]:text-foreground/90
										[&_blockquote]:bg-primary/5
										[&_blockquote]:border-primary/30
										[&_li]:text-muted-foreground
										[&_p]:text-muted-foreground
										[&_p]:leading-8
									'
									dangerouslySetInnerHTML={{
										__html: renderMarkdown(selectedPost.content),
									}}
								/>
							</div>
						</CardContent>
					</Card>
				</div>
			</section>
		);
	}

	return (
		<section id='blog' className='py-20 px-6 bg-muted/30'>
			<div className='max-w-7xl mx-auto'>
				<div className='text-center mb-20'>
					<h2 className='text-4xl md:text-5xl font-bold text-foreground mb-4'>
						Technical Blog
					</h2>
					<div className='w-16 h-0.5 bg-primary/60 mx-auto rounded-full mb-6'></div>
					<p className='text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed'>
						Deep dives into AI engineering, backend architecture, and real-world production insights.
					</p>
				</div>

				<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
					{blogPosts.map((post, index) => (
						<Card
							key={index}
							className='bg-card/50 backdrop-blur border-border hover-glow group flex flex-col cursor-pointer transition-all duration-300'
							onClick={() => setSelectedPost(post)}>
							<CardHeader className='pb-4'>
								<div className='flex items-start justify-between gap-3 mb-3'>
									<span className='inline-block px-2.5 py-1 bg-primary/10 text-primary text-xs font-medium rounded-md border border-primary/20'>
										{post.category || 'Technical'}
									</span>
									<div className='flex items-center gap-1 text-xs text-muted-foreground shrink-0'>
										<Clock className='h-3 w-3' />
										<span>{post.readTime}</span>
									</div>
								</div>
								<CardTitle className='text-lg font-semibold text-foreground leading-snug group-hover:text-primary transition-colors'>
									{post.title}
								</CardTitle>
								<div className='flex items-center gap-1 text-xs text-muted-foreground mt-1'>
									<Calendar className='h-3 w-3' />
									<span>{post.date}</span>
								</div>
							</CardHeader>

							<CardContent className='flex flex-col flex-1 gap-4 pt-0'>
								<p className='text-sm text-muted-foreground leading-relaxed line-clamp-3'>
									{post.excerpt}
								</p>

								<div className='flex flex-wrap gap-1.5'>
									{post.tags.map((tag, tagIndex) => (
										<Badge
											key={tagIndex}
											variant='outline'
											className='bg-muted/50 text-muted-foreground border-border text-xs'>
											{tag}
										</Badge>
									))}
								</div>

								<div className='mt-auto pt-2'>
									<Button
										variant='ghost'
										size='sm'
										className='w-full border border-border hover:border-primary/40 hover:bg-muted text-sm transition-all duration-200 group/btn'
										onClick={e => {
											e.stopPropagation();
											setSelectedPost(post);
										}}>
										<ExternalLink className='h-3.5 w-3.5 mr-2 group-hover/btn:translate-x-0.5 transition-transform' />
										Read Article
									</Button>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}
