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

// Simple syntax highlighter for common languages.
//
// This runs as a single tokenizing pass over the code instead of a chain of
// sequential .replace() calls. That matters: a chain of replaces mutates the
// same string over and over, so an earlier replacement (e.g. wrapping the
// keyword `async` in `<span class="text-purple-400 ...">`) can inject text
// (the word "class", as part of the HTML attribute) that a *later* pass
// (e.g. the `class` keyword rule) then matches and wraps again, corrupting
// the markup. A single combined regex avoids that entirely, because
// String.replace(global regex, fn) finds all matches against the original
// string up front, before any replacement text is spliced in.
const highlightCode = (code: string, language: string) => {
	const keywords: Record<string, string[]> = {
		javascript: [
			'const', 'let', 'var', 'function', 'async', 'await', 'return',
			'if', 'else', 'for', 'while', 'class', 'import', 'export',
			'from', 'default', 'new', 'try', 'catch', 'throw', 'typeof',
			'instanceof', 'true', 'false', 'null', 'undefined',
		],
		typescript: [
			'const', 'let', 'var', 'function', 'async', 'await', 'return',
			'if', 'else', 'for', 'while', 'class', 'import', 'export',
			'from', 'default', 'new', 'try', 'catch', 'throw', 'typeof',
			'instanceof', 'interface', 'type', 'enum', 'extends', 'implements',
			'public', 'private', 'protected', 'readonly', 'static', 'abstract',
			'string', 'number', 'boolean', 'void', 'any', 'never', 'unknown',
			'true', 'false', 'null', 'undefined', 'Promise', 'Record',
		],
		sql: [
			'SELECT', 'FROM', 'WHERE', 'INSERT', 'INTO', 'VALUES', 'UPDATE',
			'SET', 'DELETE', 'CREATE', 'TABLE', 'ALTER', 'DROP', 'INDEX',
			'PRIMARY', 'KEY', 'FOREIGN', 'REFERENCES', 'NOT', 'NULL', 'DEFAULT',
			'UNIQUE', 'ON', 'CASCADE', 'JOIN', 'LEFT', 'RIGHT', 'INNER', 'AND',
			'OR', 'IN', 'IS', 'ORDER', 'BY', 'GROUP', 'HAVING', 'LIMIT',
			'OFFSET', 'BEGIN', 'COMMIT', 'ROLLBACK', 'CHECK', 'CONSTRAINT',
			'TIMESTAMPTZ', 'UUID', 'TEXT', 'BOOLEAN', 'DATE', 'SERIAL',
			'RETURNS', 'LANGUAGE', 'AS', 'WITH',
		],
		python: [
			'def', 'class', 'import', 'from', 'if', 'else', 'elif', 'for',
			'while', 'return', 'try', 'except', 'with', 'as', 'and', 'or',
			'not', 'in', 'is', 'True', 'False', 'None', 'lambda', 'yield',
			'raise', 'pass', 'break', 'continue',
		],
		yaml: [
			'apiVersion', 'kind', 'metadata', 'spec', 'containers',
			'image', 'name', 'env', 'value',
		],
		json: ['true', 'false', 'null'],
	};

	const keywordSet = new Set(keywords[language] || []);

	// Escape HTML first so every token below is matched against safe text.
	const escaped = code
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;');

	const hasCStyleComments =
		language === 'javascript' ||
		language === 'typescript' ||
		language === 'java' ||
		language === 'cpp';

	const commentPattern = hasCStyleComments
		? '\\/\\/.*|\\/\\*[\\s\\S]*?\\*\\/'
		: language === 'python'
		? '#.*'
		: '(?!)'; // matches nothing for languages with no comment syntax here

	const stringPattern = `"(?:[^"\\\\]|\\\\.)*"|'(?:[^'\\\\]|\\\\.)*'`;
	const numberPattern = '\\b\\d+(?:\\.\\d+)?\\b';
	const identifierPattern = '\\b[A-Za-z_]\\w*\\b';

	const tokenRegex = new RegExp(
		`(${commentPattern})|(${stringPattern})|(${numberPattern})|(${identifierPattern})`,
		'g'
	);

	return escaped.replace(
		tokenRegex,
		(match, comment, str, num, ident, offset: number, full: string) => {
			if (comment !== undefined) {
				return `<span class="text-gray-500 italic">${comment}</span>`;
			}
			if (str !== undefined) {
				return `<span class="text-green-400">${str}</span>`;
			}
			if (num !== undefined) {
				return `<span class="text-blue-400">${num}</span>`;
			}
			if (ident !== undefined) {
				if (keywordSet.has(ident)) {
					return `<span class="text-purple-400 font-semibold">${ident}</span>`;
				}
				// Function call: an identifier immediately followed by "(".
				if (full[offset + match.length] === '(') {
					return `<span class="text-yellow-400">${ident}</span>`;
				}
				return ident;
			}
			return match;
		}
	);
};

// Advanced markdown renderer with proper code highlighting (inspired by ray.so)
const renderMarkdown = (content: string) => {
	// Step 1: Extract code blocks into a stash and replace with placeholders.
	// This prevents later regex passes from corrupting code block contents.
	const codeBlockStash: string[] = [];
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

			const block = `<div class="code-block-container mb-6 rounded-lg overflow-hidden border border-primary/20 bg-card/30 not-prose">
			<div class="code-header px-4 py-2 bg-primary/10 border-b border-primary/20 flex items-center justify-between">
				<div class="flex items-center gap-2">
					<div class="flex gap-1">
						<div class="w-3 h-3 rounded-full bg-red-500 opacity-60"></div>
						<div class="w-3 h-3 rounded-full bg-yellow-500 opacity-60"></div>
						<div class="w-3 h-3 rounded-full bg-green-500 opacity-60"></div>
					</div>
					<span class="font-mono text-xs text-muted-foreground ml-2">${language}</span>
				</div>
				<button class="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors copy-btn" data-code="${cleanCode.replace(/&/g, '&amp;').replace(/"/g, '&quot;')}">copy</button>
			</div>
			<div class="code-content relative">
				<pre class="p-4 overflow-x-auto bg-card/50 text-sm"><code class="font-mono leading-relaxed language-${language}">${highlightedCode}</code></pre>
			</div>
		</div>`;

			const idx = codeBlockStash.length;
			codeBlockStash.push(block);
			// Surround placeholder with blank lines so it becomes its own paragraph
			return `\n\nCODE_BLOCK_PLACEHOLDER_${idx}\n\n`;
		}
	);

	// Step 2: Inline code
	processedContent = processedContent.replace(
		/`([^`]+)`/g,
		'<code class="inline-code bg-primary/20 text-primary px-1.5 py-0.5 rounded text-sm font-mono border border-primary/30 not-prose">$1</code>'
	);

	// Step 3: Horizontal rules
	processedContent = processedContent.replace(
		/^---$/gm,
		'<hr class="border-border my-8" />'
	);

	// Step 4: Headers
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

	// Step 5: Bold and italic
	processedContent = processedContent.replace(
		/\*\*(.*?)\*\*/g,
		'<strong class="font-bold text-foreground">$1</strong>'
	);
	processedContent = processedContent.replace(
		/(?<!\*)\*([^*]+)\*(?!\*)/g,
		'<em class="italic text-foreground/90">$1</em>'
	);

	// Step 6: Checklist items — must come before the generic bullet rule
	processedContent = processedContent.replace(
		/^- \[x\] (.*$)/gim,
		'<li class="checklist-item ml-4 mb-2 flex items-start gap-2 text-muted-foreground list-none"><span class="text-primary font-bold mt-0.5 shrink-0">✓</span><span class="line-through opacity-60">$1</span></li>'
	);
	processedContent = processedContent.replace(
		/^- \[ \] (.*$)/gim,
		'<li class="checklist-item ml-4 mb-2 flex items-start gap-2 text-muted-foreground list-none"><span class="text-muted-foreground/40 mt-0.5 shrink-0">○</span>$1</li>'
	);

	// Step 7: Numbered list items (tagged so we can wrap them later)
	processedContent = processedContent.replace(
		/^(\d+)\. (.*$)/gm,
		'<li class="ol-item ml-6 mb-2 text-muted-foreground list-decimal marker:text-primary">$2</li>'
	);

	// Step 8: Bullet list items
	processedContent = processedContent.replace(
		/^- (.*$)/gm,
		'<li class="ul-item ml-6 mb-2 text-muted-foreground list-disc marker:text-primary">$1</li>'
	);

	// Step 9: Blockquotes
	processedContent = processedContent.replace(
		/^> (.*$)/gm,
		'<blockquote class="border-l-4 border-primary/50 pl-4 py-2 my-4 bg-primary/5 italic text-muted-foreground rounded-r">$1</blockquote>'
	);

	// Step 10: Wrap consecutive list items in proper container elements.
	// Match runs of adjacent <li> items (same type) and wrap them.
	processedContent = processedContent.replace(
		/((?:<li class="ol-item[^"]*"[^>]*>[\s\S]*?<\/li>\n?)+)/g,
		'<ol class="my-4 pl-4 space-y-1 list-decimal">$1</ol>'
	);
	processedContent = processedContent.replace(
		/((?:<li class="ul-item[^"]*"[^>]*>[\s\S]*?<\/li>\n?)+)/g,
		'<ul class="my-4 pl-4 space-y-1 list-disc">$1</ul>'
	);
	processedContent = processedContent.replace(
		/((?:<li class="checklist-item[^"]*"[^>]*>[\s\S]*?<\/li>\n?)+)/g,
		'<ul class="my-4 pl-2 space-y-2 list-none">$1</ul>'
	);

	// Step 11: Split on blank lines and build final HTML.
	// Any chunk that already starts with '<' is already processed HTML — return as-is.
	// Placeholders are replaced with their stashed code blocks.
	const paragraphs = processedContent.split('\n\n').filter(p => p.trim());

	return paragraphs
		.map(paragraph => {
			const trimmed = paragraph.trim();

			// Restore code blocks from stash
			const placeholderMatch = trimmed.match(/^CODE_BLOCK_PLACEHOLDER_(\d+)$/);
			if (placeholderMatch) {
				return codeBlockStash[parseInt(placeholderMatch[1], 10)];
			}

			// Already-processed HTML — return untouched
			if (trimmed.startsWith('<')) {
				return trimmed;
			}

			// Plain text — wrap in paragraph
			if (trimmed) {
				return `<p class="mb-4 leading-relaxed text-muted-foreground">${trimmed}</p>`;
			}

			return '';
		})
		.join('\n');
};


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
