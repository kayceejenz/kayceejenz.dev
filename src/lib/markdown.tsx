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
		: '(?!)';

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
				if (full[offset + match.length] === '(') {
					return `<span class="text-yellow-400">${ident}</span>`;
				}
				return ident;
			}
			return match;
		}
	);
};

export const renderMarkdown = (content: string) => {
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
			return `\n\nCODE_BLOCK_PLACEHOLDER_${idx}\n\n`;
		}
	);

	processedContent = processedContent.replace(
		/`([^`]+)`/g,
		'<code class="inline-code bg-primary/20 text-primary px-1.5 py-0.5 rounded text-sm font-mono border border-primary/30 not-prose">$1</code>'
	);

	processedContent = processedContent.replace(
		/!\[([^\]]*)\]\(([^)]+)\)/g,
		'<img src="$2" alt="$1" class="max-w-full h-auto rounded-lg border border-border my-6" />'
	);

	processedContent = processedContent.replace(
		/^---$/gm,
		'<hr class="border-border my-8" />'
	);

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

	processedContent = processedContent.replace(
		/\*\*(.*?)\*\*/g,
		'<strong class="font-bold text-foreground">$1</strong>'
	);
	processedContent = processedContent.replace(
		/(?<!\*)\*([^*]+)\*(?!\*)/g,
		'<em class="italic text-foreground/90">$1</em>'
	);

	processedContent = processedContent.replace(
		/^- \[x\] (.*$)/gim,
		'<li class="checklist-item ml-4 mb-2 flex items-start gap-2 text-muted-foreground list-none"><span class="text-primary font-bold mt-0.5 shrink-0">✓</span><span class="line-through opacity-60">$1</span></li>'
	);
	processedContent = processedContent.replace(
		/^- \[ \] (.*$)/gim,
		'<li class="checklist-item ml-4 mb-2 flex items-start gap-2 text-muted-foreground list-none"><span class="text-muted-foreground/40 mt-0.5 shrink-0">○</span>$1</li>'
	);

	processedContent = processedContent.replace(
		/^(\d+)\. (.*$)/gm,
		'<li class="ol-item ml-6 mb-2 text-muted-foreground list-decimal marker:text-primary">$2</li>'
	);

	processedContent = processedContent.replace(
		/^- (.*$)/gm,
		'<li class="ul-item ml-6 mb-2 text-muted-foreground list-disc marker:text-primary">$1</li>'
	);

	processedContent = processedContent.replace(
		/^> (.*$)/gm,
		'<blockquote class="border-l-4 border-primary/50 pl-4 py-2 my-4 bg-primary/5 italic text-muted-foreground rounded-r">$1</blockquote>'
	);

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

	const paragraphs = processedContent.split('\n\n').filter(p => p.trim());

	return paragraphs
		.map(paragraph => {
			const trimmed = paragraph.trim();

			const placeholderMatch = trimmed.match(/^CODE_BLOCK_PLACEHOLDER_(\d+)$/);
			if (placeholderMatch) {
				return codeBlockStash[parseInt(placeholderMatch[1], 10)];
			}

			if (trimmed.startsWith('<')) {
				return trimmed;
			}

			if (trimmed) {
				return `<p class="mb-4 leading-relaxed text-muted-foreground">${trimmed}</p>`;
			}

			return '';
		})
		.join('\n');
};
