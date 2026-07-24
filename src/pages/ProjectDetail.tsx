import { useParams, useNavigate, Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	ArrowLeft,
	ExternalLink,
	Github,
	Users,
	Calendar,
	AlertTriangle,
	CheckCircle,
	BookOpen,
} from 'lucide-react';
import { useEffect } from 'react';
import config from '../../data/config.js';
import { renderMarkdown } from '@/lib/markdown';

const statusConfig: Record<string, { label: string; className: string }> = {
	production: {
		label: 'Production',
		className: 'bg-green-500/10 text-green-500 border-green-500/30',
	},
	prototype: {
		label: 'Prototype',
		className: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30',
	},
	experiment: {
		label: 'Experiment',
		className: 'bg-blue-500/10 text-blue-500 border-blue-500/30',
	},
	archived: {
		label: 'Archived',
		className: 'bg-muted text-muted-foreground border-border',
	},
};

export default function ProjectDetail() {
	const { slug } = useParams<{ slug: string }>();
	const navigate = useNavigate();
	const project = config.projects.find(p => p.slug === slug);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [slug]);

	if (!project) {
		return (
			<div className='min-h-screen flex items-center justify-center px-6'>
				<div className='text-center space-y-4'>
					<h1 className='text-4xl font-bold text-foreground'>Project Not Found</h1>
					<p className='text-muted-foreground'>
						The project you're looking for doesn't exist.
					</p>
					<Button asChild variant='outline' className='border-primary/30'>
						<Link to='/#projects'>
							<ArrowLeft className='mr-2 h-4 w-4' />
							Back to Projects
						</Link>
					</Button>
				</div>
			</div>
		);
	}

	const status = statusConfig[project.status] || statusConfig.production;

	// Handle copy button clicks for code blocks
	const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
		const target = e.target as HTMLElement;
		if (target.classList.contains('copy-btn')) {
			const code = target.getAttribute('data-code');
			if (code) {
				navigator.clipboard.writeText(code).then(() => {
					target.textContent = 'copied!';
					setTimeout(() => {
						target.textContent = 'copy';
					}, 2000);
				});
			}
		}
	};

	return (
		<div className='min-h-screen bg-background'>
			{/* Top nav bar */}
			<nav className='sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border'>
				<div className='max-w-4xl mx-auto px-6 h-14 flex items-center justify-between'>
					<Button
						variant='ghost'
						size='sm'
						onClick={() => navigate('/#projects')}
						className='text-muted-foreground hover:text-foreground'>
						<ArrowLeft className='h-4 w-4 mr-2' />
						All Projects
					</Button>
					<div className='flex items-center gap-2'>
						{project.link && project.link !== '#' && (
							<Button variant='ghost' size='sm' asChild>
								<a
									href={project.link}
									target='_blank'
									rel='noopener noreferrer'>
									<ExternalLink className='h-4 w-4 mr-1.5' />
									Live Demo
								</a>
							</Button>
						)}
						{project.github && project.github !== '#' && (
							<Button variant='ghost' size='sm' asChild>
								<a
									href={project.github}
									target='_blank'
									rel='noopener noreferrer'>
									<Github className='h-4 w-4 mr-1.5' />
									Source
								</a>
							</Button>
						)}
					</div>
				</div>
			</nav>

			<article className='max-w-4xl mx-auto px-6 py-12'>
				{/* Header */}
				<header className='mb-12'>
					<div className='flex flex-wrap items-center gap-3 mb-4'>
						<Badge
							variant='outline'
							className={status.className}>
							{status.label}
						</Badge>
						<div className='flex items-center gap-1.5 text-sm text-muted-foreground'>
							<Calendar className='h-3.5 w-3.5' />
							{project.period}
						</div>
					<div className='flex items-center gap-1.5 text-sm text-muted-foreground'>
						<Users className='h-3.5 w-3.5' />
						{project.teamSize === 1
							? 'Solo'
							: `${project.teamSize} people`}
					</div>
					</div>

					<h1 className='text-4xl md:text-5xl font-bold text-foreground mb-3'>
						{project.name}
					</h1>
					<p className='text-xl text-primary font-medium mb-4'>
						{project.tagline}
					</p>
					<p className='text-lg text-muted-foreground leading-relaxed max-w-3xl'>
						{project.description}
					</p>

					<div className='flex flex-wrap gap-1.5 mt-6'>
						{project.stack.map(tech => (
							<Badge
								key={tech}
								variant='outline'
								className='bg-primary/10 text-primary border-primary/30 font-mono text-xs'>
								{tech}
							</Badge>
						))}
					</div>
				</header>

				{/* Impact Metrics */}
				{project.impact && project.impact.length > 0 && (
					<section className='mb-12'>
						<h2 className='text-sm font-semibold text-foreground uppercase tracking-widest mb-4'>
							Impact
						</h2>
						<div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
							{project.impact.map((item, i) => (
								<Card
									key={i}
									className='bg-card/50 border-primary/20'>
									<CardContent className='p-4 text-center'>
										<div className='text-2xl font-bold text-primary font-mono'>
											{item.metric}
										</div>
										<div className='text-xs text-muted-foreground mt-1'>
											{item.label}
										</div>
									</CardContent>
								</Card>
							))}
						</div>
					</section>
				)}

				{/* Problem Statement */}
				{project.problem && (
					<section className='mb-12'>
						<div className='flex items-center gap-2 mb-4'>
							<AlertTriangle className='h-4 w-4 text-yellow-500' />
							<h2 className='text-sm font-semibold text-foreground uppercase tracking-widest'>
								Problem
							</h2>
						</div>
						<div className='pl-4 border-l-2 border-yellow-500/30'>
							<p className='text-muted-foreground leading-relaxed text-lg'>
								{project.problem}
							</p>
						</div>
					</section>
				)}

				{/* Approach */}
				{project.approach && (
					<section className='mb-12'>
						<div className='flex items-center gap-2 mb-4'>
							<CheckCircle className='h-4 w-4 text-green-500' />
							<h2 className='text-sm font-semibold text-foreground uppercase tracking-widest'>
								Approach
							</h2>
						</div>
						<p className='text-muted-foreground leading-relaxed'>
							{project.approach}
						</p>
					</section>
				)}

				{/* Architecture */}
				{project.architecture && (
					<section className='mb-12'>
						<div className='flex items-center gap-2 mb-4'>
							<BookOpen className='h-4 w-4 text-primary' />
							<h2 className='text-sm font-semibold text-foreground uppercase tracking-widest'>
								Architecture
							</h2>
						</div>
						<div
							className='prose prose-lg max-w-none
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
								[&_p]:leading-8'
							onClick={handleContentClick}
							dangerouslySetInnerHTML={{
								__html: renderMarkdown(project.architecture),
							}}
						/>
					</section>
				)}

				{/* Tradeoffs */}
				{project.tradeoffs && project.tradeoffs.length > 0 && (
					<section className='mb-12'>
						<h2 className='text-sm font-semibold text-foreground uppercase tracking-widest mb-6'>
							Key Decisions & Tradeoffs
						</h2>
						<div className='space-y-6'>
							{project.tradeoffs.map((t, i) => (
								<Card
									key={i}
									className='bg-card/50 border-border'>
									<CardContent className='p-6 space-y-3'>
										<h3 className='font-semibold text-foreground'>
											{t.decision}
										</h3>
										<div className='grid md:grid-cols-3 gap-4 text-sm'>
											<div>
												<span className='text-xs font-medium text-primary uppercase tracking-wide'>
													What
												</span>
												<p className='text-muted-foreground mt-1'>
													{t.what}
												</p>
											</div>
											<div>
												<span className='text-xs font-medium text-green-500 uppercase tracking-wide'>
													Why
												</span>
												<p className='text-muted-foreground mt-1'>
													{t.why}
												</p>
											</div>
											<div>
												<span className='text-xs font-medium text-yellow-500 uppercase tracking-wide'>
													Cost
												</span>
												<p className='text-muted-foreground mt-1'>
													{t.cost}
												</p>
											</div>
										</div>
									</CardContent>
								</Card>
							))}
						</div>
					</section>
				)}

				{/* Lessons Learned */}
				{project.lessons && project.lessons.length > 0 && (
					<section className='mb-12'>
						<h2 className='text-sm font-semibold text-foreground uppercase tracking-widest mb-6'>
							Lessons Learned
						</h2>
						<ol className='space-y-3'>
							{project.lessons.map((lesson, i) => (
								<li
									key={i}
									className='flex items-start gap-3 text-muted-foreground'>
									<span className='text-primary font-mono font-bold mt-0.5 shrink-0'>
										{i + 1}.
									</span>
									<span>{lesson}</span>
								</li>
							))}
						</ol>
					</section>
				)}
			</article>
		</div>
	);
}
