import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Calendar,
	Clock,
	Tag,
	ExternalLink,
	Volume2,
	VolumeX,
	Pause,
	Play,
	ChevronDown,
	ChevronUp,
	ArrowLeft,
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import blogPosts from '../../data/blog.js';

// Simple syntax highlighter for common languages
const highlightCode = (code: string, language: string) => {
	const keywords = {
		javascript: [
			'const',
			'let',
			'var',
			'function',
			'async',
			'await',
			'return',
			'if',
			'else',
			'for',
			'while',
			'class',
			'import',
			'export',
			'from',
			'default',
			'new',
			'try',
			'catch',
		],
		python: [
			'def',
			'class',
			'import',
			'from',
			'if',
			'else',
			'elif',
			'for',
			'while',
			'return',
			'try',
			'except',
			'with',
			'as',
			'and',
			'or',
			'not',
			'in',
			'is',
			'True',
			'False',
			'None',
		],
		yaml: [
			'apiVersion',
			'kind',
			'metadata',
			'spec',
			'containers',
			'image',
			'name',
			'env',
			'value',
		],
		json: ['true', 'false', 'null'],
	};

	const languageKeywords = keywords[language] || [];
	let highlighted = code;

	// Escape HTML first
	highlighted = highlighted
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;');

	// Highlight strings
	highlighted = highlighted.replace(
		/"([^"\\]|\\.)*"/g,
		'<span class="text-green-400">$&</span>'
	);
	highlighted = highlighted.replace(
		/'([^'\\]|\\.)*'/g,
		'<span class="text-green-400">$&</span>'
	);

	// Highlight numbers
	highlighted = highlighted.replace(
		/\b\d+(\.\d+)?\b/g,
		'<span class="text-blue-400">$&</span>'
	);

	// Highlight keywords
	languageKeywords.forEach(keyword => {
		const regex = new RegExp(`\\b${keyword}\\b`, 'g');
		highlighted = highlighted.replace(
			regex,
			`<span class="text-purple-400 font-semibold">${keyword}</span>`
		);
	});

	// Highlight comments
	if (
		language === 'javascript' ||
		language === 'java' ||
		language === 'cpp'
	) {
		highlighted = highlighted.replace(
			/\/\/.*$/gm,
			'<span class="text-gray-500 italic">$&</span>'
		);
		highlighted = highlighted.replace(
			/\/\*[\s\S]*?\*\//g,
			'<span class="text-gray-500 italic">$&</span>'
		);
	} else if (language === 'python') {
		highlighted = highlighted.replace(
			/#.*$/gm,
			'<span class="text-gray-500 italic">$&</span>'
		);
	}

	// Highlight function calls
	highlighted = highlighted.replace(
		/(\w+)(\()/g,
		'<span class="text-yellow-400">$1</span>$2'
	);

	return highlighted;
};

// Advanced markdown renderer with proper code highlighting (inspired by ray.so)
const renderMarkdown = (content: string) => {
	// First handle code blocks before other processing
	let processedContent = content.replace(
		/```(\w+)?\n([\s\S]*?)```/g,
		(match, lang, code) => {
			const language = lang || 'text';
			const cleanCode = code.trim();
			const highlightedCode =
				language !== 'text'
					? highlightCode(cleanCode, language)
					: cleanCode
							.replace(/&/g, '&amp;')
							.replace(/</g, '&lt;')
							.replace(/>/g, '&gt;');

			// Create ray.so style code block with language header
			return `<div class="code-block-container mb-6 rounded-lg overflow-hidden border border-primary/20 bg-card/30 not-prose">
			<div class="code-header px-4 py-2 bg-primary/10 border-b border-primary/20 flex items-center justify-between">
				<div class="flex items-center gap-2">
					<div class="flex gap-1">
						<div class="w-3 h-3 rounded-full bg-red-500 opacity-60"></div>
						<div class="w-3 h-3 rounded-full bg-yellow-500 opacity-60"></div>
						<div class="w-3 h-3 rounded-full bg-green-500 opacity-60"></div>
					</div>
					<span class="font-mono text-xs text-muted-foreground ml-2">${language}</span>
				</div>
				<button class="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors copy-btn" data-code="${cleanCode.replace(
					/"/g,
					'&quot;'
				)}">
					copy
				</button>
			</div>
			<div class="code-content relative">
				<pre class="p-4 overflow-x-auto bg-card/50 text-sm"><code class="font-mono leading-relaxed language-${language}">${highlightedCode}</code></pre>
			</div>
		</div>`;
		}
	);

	// Handle inline code
	processedContent = processedContent.replace(
		/`([^`]+)`/g,
		'<code class="inline-code bg-primary/20 text-primary px-1.5 py-0.5 rounded text-sm font-mono border border-primary/30 not-prose">$1</code>'
	);

	// Handle headers with proper typography
	processedContent = processedContent.replace(
		/^### (.*$)/gm,
		'<h3 class="text-lg font-bold text-foreground mt-8 mb-4 border-b border-primary/20 pb-2">$1</h3>'
	);
	processedContent = processedContent.replace(
		/^## (.*$)/gm,
		'<h2 class="text-xl font-bold text-foreground mt-10 mb-6 border-b-2 border-primary/30 pb-3">$1</h2>'
	);
	processedContent = processedContent.replace(
		/^# (.*$)/gm,
		'<h1 class="text-2xl font-bold text-foreground mt-8 mb-8 border-b-2 border-primary/40 pb-4">$1</h1>'
	);

	// Handle bold and italic text
	processedContent = processedContent.replace(
		/\*\*(.*?)\*\*/g,
		'<strong class="font-bold text-foreground">$1</strong>'
	);
	processedContent = processedContent.replace(
		/(?<!\*)\*([^*]+)\*(?!\*)/g,
		'<em class="italic text-foreground/90">$1</em>'
	);

	// Handle lists with proper indentation
	processedContent = processedContent.replace(
		/^(\d+)\. (.*$)/gm,
		'<li class="ml-6 mb-2 text-muted-foreground list-decimal marker:text-primary">$2</li>'
	);
	processedContent = processedContent.replace(
		/^- (.*$)/gm,
		'<li class="ml-6 mb-2 text-muted-foreground relative before:content-[\'•\'] before:text-primary before:font-bold before:absolute before:-left-4">$1</li>'
	);

	// Handle blockquotes
	processedContent = processedContent.replace(
		/^> (.*$)/gm,
		'<blockquote class="border-l-4 border-primary/50 pl-4 py-2 my-4 bg-primary/5 italic text-muted-foreground rounded-r">$1</blockquote>'
	);

	// Split into paragraphs and handle properly
	const paragraphs = processedContent.split('\n\n').filter(p => p.trim());

	return paragraphs
		.map(paragraph => {
			const trimmed = paragraph.trim();

			// Skip processing if already contains HTML tags
			if (
				trimmed.includes(
					'<div class="code-block-container">'
				) ||
				trimmed.includes('<h1>') ||
				trimmed.includes('<h2>') ||
				trimmed.includes('<h3>') ||
				trimmed.includes('<li>') ||
				trimmed.includes('<blockquote>')
			) {
				return trimmed;
			}

			// Regular paragraphs
			if (trimmed) {
				return `<p class="mb-4 leading-relaxed text-muted-foreground">${trimmed}</p>`;
			}

			return '';
		})
		.join('\n');
};

// Simple markdown renderer
function MarkdownRenderer({ content }) {
	const renderMarkdown = text => {
		// Headers
		text = text.replace(
			/^### (.*$)/gim,
			'<h3 class="text-lg font-bold text-foreground mt-4 mb-2 font-mono">$1</h3>'
		);
		text = text.replace(
			/^## (.*$)/gim,
			'<h2 class="text-xl font-bold text-foreground mt-6 mb-3 font-mono">$1</h2>'
		);
		text = text.replace(
			/^# (.*$)/gim,
			'<h1 class="text-2xl font-bold text-foreground mt-8 mb-4 font-mono">$1</h1>'
		);

		// Bold
		text = text.replace(
			/\*\*(.*?)\*\*/g,
			'<strong class="text-primary font-semibold">$1</strong>'
		);

		// Italic
		text = text.replace(
			/\*(.*?)\*/g,
			'<em class="text-muted-foreground italic">$1</em>'
		);

		// Inline code
		text = text.replace(
			/`(.*?)`/g,
			'<code class="bg-primary/10 text-primary px-1.5 py-0.5 rounded text-sm font-mono">$1</code>'
		);

		// Code blocks
		text = text.replace(
			/```(.*?)\n([\s\S]*?)```/g,
			'<pre class="bg-card/50 border border-primary/20 rounded p-4 overflow-x-auto my-4"><code class="text-sm font-mono text-foreground">$2</code></pre>'
		);

		// Links
		text = text.replace(
			/\[([^\]]+)\]\(([^)]+)\)/g,
			'<a href="$2" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">$1</a>'
		);

		// Line breaks
		text = text.replace(
			/\n\n/g,
			'</p><p class="mb-3 text-muted-foreground leading-relaxed">'
		);
		text = text.replace(/\n/g, '<br/>');

		// Unordered lists
		text = text.replace(
			/^\- (.*$)/gim,
			'<li class="ml-4 text-muted-foreground">• $1</li>'
		);

		return `<p class="mb-3 text-muted-foreground leading-relaxed">${text}</p>`;
	};

	return (
		<div
			className='prose prose-sm max-w-none'
			dangerouslySetInnerHTML={{
				__html: renderMarkdown(content),
			}}
		/>
	);
}

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
		text = text.replace(/^[\-\*]\s+/gm, '');

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
					<div className='flex items-center justify-between mb-6'>
						<Button
							variant='outline'
							onClick={() =>
								setSelectedPost(
									null
								)
							}
							className='font-mono border-primary/30 hover:border-primary hover:neon-glow'>
							<ArrowLeft className='h-4 w-4 mr-2' />
							back()
						</Button>

						{speechSupported && (
							<div className='flex gap-2'>
								<Button
									variant='outline'
									onClick={
										handleSpeak
									}
									className='font-mono border-primary/30 hover:border-primary hover:neon-glow'
									title={
										isPaused
											? 'Resume reading'
											: isSpeaking
											? 'Pause reading'
											: 'Read aloud'
									}>
									{isPaused ? (
										<>
											<Play className='h-4 w-4 mr-2' />{' '}
											resume()
										</>
									) : isSpeaking ? (
										<>
											<Pause className='h-4 w-4 mr-2' />{' '}
											pause()
										</>
									) : (
										<>
											<Volume2 className='h-4 w-4 mr-2' />{' '}
											speak()
										</>
									)}
								</Button>

								{(isSpeaking ||
									isPaused) && (
									<Button
										variant='outline'
										onClick={
											handleStop
										}
										className='font-mono border-red-500/30 hover:border-red-500 text-red-500'
										title='Stop reading'>
										<VolumeX className='h-4 w-4 mr-2' />{' '}
										stop()
									</Button>
								)}
							</div>
						)}
					</div>

					{speechSupported &&
						(isSpeaking || isPaused) && (
							<div className='mb-4 p-3 bg-primary/10 border border-primary/30 rounded-lg'>
								<div className='flex items-center gap-2 text-sm font-mono text-primary'>
									<Volume2 className='h-4 w-4 animate-pulse' />
									<span>
										{isPaused
											? 'Speech paused'
											: 'Reading article aloud...'}
									</span>
								</div>
							</div>
						)}

					<Card className='bg-card/50 backdrop-blur border-primary/20'>
						<div className='terminal-window'>
							<div className='terminal-header'>
								<div className='terminal-dot red'></div>
								<div className='terminal-dot yellow'></div>
								<div className='terminal-dot green'></div>
								<span className='font-mono text-xs text-muted-foreground ml-2'>
									~/blog/
									{selectedPost.title
										.toLowerCase()
										.replace(
											/\s+/g,
											'_'
										)}
									.md
								</span>
							</div>

							<CardHeader className='bg-card/30'>
								<CardTitle className='text-2xl text-foreground font-mono mb-4'>
									{'{ ' +
										selectedPost.title +
										' }'}
								</CardTitle>
								<div className='flex flex-wrap items-center gap-4 text-sm text-muted-foreground'>
									<div className='flex items-center gap-2'>
										<Calendar className='h-4 w-4' />
										<span className='font-mono'>
											{
												selectedPost.date
											}
										</span>
									</div>
									<div className='flex items-center gap-2'>
										<Clock className='h-4 w-4' />
										<span className='font-mono'>
											{
												selectedPost.readTime
											}{' '}
											read
										</span>
									</div>
								</div>
							</CardHeader>

							<CardContent className='p-6'>
								<div className='flex flex-wrap gap-2 mb-6'>
									{selectedPost.tags.map(
										(
											tag,
											index
										) => (
											<Badge
												key={
													index
												}
												variant='outline'
												className='bg-primary/10 text-primary border-primary/30 font-mono text-xs'>
												{
													tag
												}
											</Badge>
										)
									)}
								</div>

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
											__html: renderMarkdown(
												selectedPost.content
											),
										}}
									/>
								</div>
							</CardContent>
						</div>
					</Card>
				</div>
			</section>
		);
	}

	return (
		<section id='blog' className='py-20 px-6 bg-muted/30'>
			<div className='max-w-7xl mx-auto'>
				<div className='text-center mb-20'>
					<h2 className='text-4xl md:text-5xl font-bold text-foreground mb-4 font-mono'>
						{'{ Technical Blog }'}
					</h2>
					<div className='w-24 h-1 bg-primary mx-auto neon-glow mb-6'></div>
					<p className='text-lg text-muted-foreground max-w-3xl mx-auto font-mono leading-relaxed'>
						// Deep dives into Azure, AI,
						and fintech development
						<br />
						// Real-world solutions and
						architectural insights from
						production systems
					</p>
				</div>

				<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
					{blogPosts.map((post, index) => (
						<Card
							key={index}
							className='bg-card/50 backdrop-blur border-primary/20 hover-glow group hover:-translate-y-2 transition-all duration-300 cursor-pointer'
							onClick={() =>
								setSelectedPost(
									post
								)
							}>
							<div className='terminal-window'>
								<div className='terminal-header'>
									<div className='terminal-dot red'></div>
									<div className='terminal-dot yellow'></div>
									<div className='terminal-dot green'></div>
									<span className='font-mono text-xs text-muted-foreground ml-2'>
										~/blog/
										{post.title
											.toLowerCase()
											.replace(
												/\s+/g,
												'_'
											)}
										.md
									</span>
								</div>

								<CardHeader className='bg-card/30 relative'>
									{/* Category Badge */}
									<div className='absolute -top-3 -right-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-mono font-bold shadow-lg'>
										{post.category ||
											'Technical'}
									</div>

									<CardTitle className='text-xl text-foreground font-mono leading-tight mb-3'>
										<span className='text-primary'>
											const
										</span>{' '}
										article
										=
										"
										<span className='text-green-400'>
											{
												post.title
											}
										</span>

										"
									</CardTitle>

									<div className='flex items-center justify-between text-xs text-muted-foreground'>
										<div className='flex items-center gap-4'>
											<div className='flex items-center gap-1'>
												<Calendar className='h-3 w-3 text-primary' />
												<span className='font-mono'>
													{
														post.date
													}
												</span>
											</div>
											<div className='flex items-center gap-1'>
												<Clock className='h-3 w-3 text-primary' />
												<span className='font-mono'>
													{
														post.readTime
													}
												</span>
											</div>
										</div>
										<div className='text-xs font-mono text-muted-foreground'>
											#
											{blogPosts.indexOf(
												post
											) +
												1}
										</div>
									</div>
								</CardHeader>

								<CardContent className='space-y-6 p-6'>
									{/* Article Preview */}
									<div className='code-block'>
										<div className='font-mono text-sm space-y-2'>
											<div className='text-primary flex items-center gap-2'>
												<span>
													const
													articlePreview
													={' '}
													{
														'{'
													}
												</span>
											</div>
											<div className='ml-4 text-muted-foreground space-y-1'>
												<div>
													summary:{' '}
													<span className='text-yellow-500'>
														"
														{
															post.excerpt
														}

														"
													</span>

													,
												</div>
												<div>
													readingTime:{' '}
													<span className='text-blue-400'>
														"
														{
															post.readTime
														}

														"
													</span>

													,
												</div>
												<div>
													tags:{' '}
													<span className='text-green-400'>
														[
														{
															post
																.tags
																.length
														}{' '}
														topics]
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

									{/* Tags with Enhanced Display */}
									<div>
										<div className='flex items-center justify-between mb-3'>
											<div className='font-mono text-sm text-primary'>
												//
												Article
												Topics
											</div>
											<div className='text-xs font-mono text-muted-foreground'>
												{
													post
														.tags
														.length
												}{' '}
												tags
											</div>
										</div>
										<div className='flex flex-wrap gap-2'>
											{post.tags.map(
												(
													tag,
													tagIndex
												) => (
													<Badge
														key={
															tagIndex
														}
														variant='outline'
														className='bg-primary/10 text-primary border-primary/30 hover:border-primary hover:neon-glow font-mono text-xs transition-all duration-300 hover:scale-105'>
														<Tag className='h-3 w-3 mr-1' />
														{
															tag
														}
													</Badge>
												)
											)}
										</div>
									</div>

									{/* Enhanced Read More Button */}
									<div className='pt-2'>
										<Button
											variant='outline'
											size='sm'
											className='w-full font-mono border-primary/30 hover:border-primary hover:neon-glow transition-all duration-300 group'
											onClick={() =>
												setSelectedPost(
													post
												)
											}>
											<ExternalLink className='h-3 w-3 mr-2 group-hover:translate-x-0.5 transition-transform' />
											read()
										</Button>
									</div>

									{/* Article Footer */}
									<div className='pt-4 border-t border-primary/20'>
										<div className='flex items-center justify-center gap-2 text-primary font-mono text-xs'>
											<span>
												//
												Click
												to
												dive
												deeper
												into{' '}
												{post.category ||
													'technical'}{' '}
												insights
											</span>
										</div>
									</div>
								</CardContent>
							</div>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}
