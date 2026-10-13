import { useParams, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
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
import { ThemeToggle } from '@/components/ThemeToggle';
import { useEffect, useState } from 'react';
import config from '../../data/config.js';
import { renderMarkdown } from '@/lib/markdown';

const statusConfig: Record<string, { label: string; className: string }> = {
	production: {
		label: 'Production',
		className: 'bg-green-500/10 text-primary border-green-500/30',
	},
	prototype: {
		label: 'Prototype',
		className: 'bg-yellow-500/10 text-primary border-primary',
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


function getYouTubeEmbedUrl(url: string | null) {
 if (!url) return null;
 try {
  const parsedUrl = new URL(url);
  const host = parsedUrl.hostname.replace(/^www\./, '');
  let videoId = '';
  if (host === 'youtu.be') videoId = parsedUrl.pathname.slice(1).split('/')[0];
  else if (host === 'youtube.com' || host === 'm.youtube.com') {
   if (parsedUrl.pathname === '/watch') videoId = parsedUrl.searchParams.get('v') || '';
   else {
    const match = parsedUrl.pathname.match(/^\/(?:embed|shorts)\/([^/]+)/);
    videoId = match?.[1] || '';
   }
  }
  return /^[a-zA-Z0-9_-]{11}$/.test(videoId) ? `https://www.youtube-nocookie.com/embed/${videoId}` : null;
 } catch { return null; }
}

export default function ProjectDetail() {
	const { slug } = useParams<{ slug: string }>();
	const navigate = useNavigate();
	const project = config.projects.find(p => p.slug === slug);
	const [activeSection, setActiveSection] = useState('overview');

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [slug]);

	useEffect(() => {
		const observer = new IntersectionObserver(entries => {
			const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
			if (visible?.target.id) setActiveSection(visible.target.id);
		}, { rootMargin: '-20% 0px -65% 0px', threshold: 0 });
		['overview', 'demo', 'impact', 'problem', 'approach', 'architecture', 'decisions', 'lessons'].forEach(id => {
			const element = document.getElementById(id);
			if (element) observer.observe(element);
		});
		return () => observer.disconnect();
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
 const demoVideoUrl = getYouTubeEmbedUrl(project.demoVideo);
 const sections = [
  { id: 'overview', label: 'Overview', visible: true },
  { id: 'demo', label: 'Project demo', visible: !!demoVideoUrl },
  { id: 'impact', label: 'Impact', visible: !!project.impact?.length },
  { id: 'problem', label: 'Problem', visible: !!project.problem },
  { id: 'approach', label: 'Approach', visible: !!project.approach },
  { id: 'architecture', label: 'Architecture', visible: !!project.architecture },
  { id: 'decisions', label: 'Decisions & trade-offs', visible: !!project.tradeoffs?.length },
  { id: 'lessons', label: 'Lessons learned', visible: !!project.lessons?.length },
 ].filter(section => section.visible);
	const projectIndex = config.projects.findIndex(item => item.slug === project.slug);
	const previousProject = projectIndex > 0 ? config.projects[projectIndex - 1] : null;
	const nextProject = projectIndex < config.projects.length - 1 ? config.projects[projectIndex + 1] : null;


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

	const pageTitle = `${project.name}: ${project.tagline} | Precious Okolo`;
	const pageDesc = project.description.slice(0, 160);
	const pageUrl = `https://kayceejenz.dev/projects/${project.slug}`;

	return (
		<>
			<Helmet>
				<title>{pageTitle}</title>
				<meta name='description' content={pageDesc} />
				<meta property='og:title' content={`${project.name}: ${project.tagline}`} />
				<meta property='og:description' content={pageDesc} />
				<meta property='og:url' content={pageUrl} />
				<meta name='twitter:title' content={`${project.name}: ${project.tagline}`} />
				<meta name='twitter:description' content={pageDesc} />
				<link rel='canonical' href={pageUrl} />
			</Helmet>
			<div className='min-h-screen bg-background'>
			{/* Top nav bar */}
			<nav role='navigation' aria-label='Project navigation' className='sticky top-0 z-40 bg-background border-b border-border'>
				<div className='max-w-[1440px] mx-auto px-6 h-16 flex items-center justify-between'>
					<Button
						variant='ghost'
						size='sm'
						onClick={() => navigate('/#projects')}
						className='text-muted-foreground hover:text-foreground'>
						<ArrowLeft className='h-4 w-4 mr-2' />
						All Projects
					</Button>
					<div className='flex items-center gap-2'>
<ThemeToggle />
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

			<div className='max-w-[1440px] mx-auto px-6 grid lg:grid-cols-[220px_minmax(0,1fr)] xl:grid-cols-[220px_minmax(0,1fr)_180px] gap-10'>
 <aside className='hidden lg:block py-10'>
  <nav aria-label='Project case studies' className='sticky top-24'>
   <h2 className='text-sm font-semibold mb-4'>Project case studies</h2>
   <ul className='space-y-1'>{config.projects.map(item => <li key={item.slug}><Link to={`/projects/${item.slug}`} aria-current={item.slug === slug ? 'page' : undefined} className={`block border-l-2 px-3 py-2 text-sm leading-snug ${item.slug === slug ? 'border-primary bg-accent text-primary font-semibold' : 'border-transparent text-muted-foreground hover:bg-muted hover:text-foreground'}`}>{item.name}</Link></li>)}</ul>
  </nav>
 </aside>
 <article id='main-content' className='learn-article min-w-0 max-w-[800px] w-full py-10' aria-label={`${project.name} project details`}>
				{/* Header */}
				<header id='overview' className='mb-10 border-b border-border pb-8'>
 <p className='text-sm text-muted-foreground mb-6'><Link to='/#projects'>Projects</Link><span aria-hidden='true'> / </span>Case study</p>
 <details className='xl:hidden border border-border bg-muted p-4 mb-6'>
  <summary className='font-semibold cursor-pointer'>On this page</summary>
  <ul className='mt-3 space-y-2'>{sections.map(section => <li key={section.id}><a href={`#${section.id}`}>{section.label}</a></li>)}</ul>
 </details>
					<div className='flex flex-wrap items-center gap-3 mb-4'>
						<Badge
							variant='outline'
							className='rounded-sm bg-muted text-foreground border-border'>
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

					<h1 className='text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-3'>
						{project.name}
					</h1>
					<p className='text-xl text-foreground font-normal mb-4'>
						{project.tagline}
					</p>
					<p className='text-lg text-muted-foreground leading-relaxed max-w-3xl'>
						{project.description}
					</p>

					<dl className='grid sm:grid-cols-3 gap-5 bg-muted border border-border p-5 mt-6 mb-6'>
 <div><dt className='text-sm text-muted-foreground'>My contribution</dt><dd className='font-semibold mt-1'>{project.role}</dd></div>
 <div><dt className='text-sm text-muted-foreground'>Project status</dt><dd className='font-semibold mt-1'>{status.label}</dd></div>
 <div><dt className='text-sm text-muted-foreground'>Team</dt><dd className='font-semibold mt-1'>{project.teamSize === 1 ? 'Solo project' : `${project.teamSize} people`}</dd></div>
 </dl>
 <div className='flex flex-wrap gap-1.5 mt-6'>
						{project.stack.map(tech => (
							<Badge
								key={tech}
								variant='outline'
								className='rounded-sm bg-muted text-foreground border-transparent text-xs font-normal'>
								{tech}
							</Badge>
						))}
					</div>
					<div className='flex flex-wrap gap-3 mt-6'>
						{project.github && project.github !== '#' && <Button asChild><a href={project.github} target='_blank' rel='noopener noreferrer'><Github className='mr-2 h-4 w-4' />View source</a></Button>}
						{project.link && project.link !== '#' && <Button variant='outline' asChild><a href={project.link} target='_blank' rel='noopener noreferrer'><ExternalLink className='mr-2 h-4 w-4' />Visit live project</a></Button>}
						{demoVideoUrl && <Button variant='outline' asChild><a href='#demo'>Watch demo</a></Button>}
					</div>
				</header>

				{/* Embedded project demo */}
 {demoVideoUrl && (
  <section id='demo' className='mb-10'>
   <h2 className='text-2xl font-semibold text-foreground tracking-tight mb-4'>Project Demo</h2>
   <div className='aspect-video overflow-hidden rounded-sm border border-border bg-card'>
    <iframe className='h-full w-full' src={demoVideoUrl} title={`${project.name} project demo`} loading='lazy'
     allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
     referrerPolicy='strict-origin-when-cross-origin' allowFullScreen />
   </div>
  </section>
 )}
 {/* Impact Metrics */}
				{project.impact && project.impact.length > 0 && (
					<section id='impact' className='mb-10'>
						<h2 className='text-2xl font-semibold text-foreground tracking-tight mb-4'>
							Impact & capabilities
						</h2>
						<div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
							{project.impact.map((item, i) => (
								<Card
									key={i}
									className='rounded-sm bg-muted border-border shadow-none'>
									<CardContent className='p-4 text-center'>
										<div className='text-2xl font-bold text-foreground'>
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
					<section id='problem' className='mb-10'>
						<div className='flex items-center gap-2 mb-4'>
							<AlertTriangle className='h-4 w-4 text-primary' />
							<h2 className='text-2xl font-semibold text-foreground tracking-tight'>
								Problem
							</h2>
						</div>
						<div className='pl-4 border-l-2 border-primary'>
							<p className='text-muted-foreground leading-relaxed text-lg'>
								{project.problem}
							</p>
						</div>
					</section>
				)}

				{/* Approach */}
				{project.approach && (
					<section id='approach' className='mb-10'>
						<div className='flex items-center gap-2 mb-4'>
							<CheckCircle className='h-4 w-4 text-primary' />
							<h2 className='text-2xl font-semibold text-foreground tracking-tight'>
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
					<section id='architecture' className='mb-10'>
						<div className='flex items-center gap-2 mb-4'>
							<BookOpen className='h-4 w-4 text-primary' />
							<h2 className='text-2xl font-semibold text-foreground tracking-tight'>
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
								[&_li]:text-foreground
								[&_p]:text-foreground
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
					<section id='decisions' className='mb-10'>
						<h2 className='text-2xl font-semibold text-foreground tracking-tight mb-6'>
							Key Decisions & Tradeoffs
						</h2>
						<div className='space-y-6'>
							{project.tradeoffs.map((t, i) => (
								<Card
									key={i}
									className='rounded-sm bg-card border-border shadow-none'>
									<CardContent className='p-6 space-y-3'>
										<h3 className='font-semibold text-foreground'>
											{t.decision}
										</h3>
										<dl className='space-y-4 text-base'>
 <div className='grid sm:grid-cols-[100px_1fr] gap-1 sm:gap-5 border-t border-border pt-4'><dt className='font-semibold text-foreground'>Decision</dt><dd className='text-foreground'>{t.what}</dd></div>
 <div className='grid sm:grid-cols-[100px_1fr] gap-1 sm:gap-5 border-t border-border pt-4'><dt className='font-semibold text-foreground'>Reason</dt><dd className='text-foreground'>{t.why}</dd></div>
 <div className='grid sm:grid-cols-[100px_1fr] gap-1 sm:gap-5 border-t border-border pt-4'><dt className='font-semibold text-foreground'>Trade-off</dt><dd className='text-foreground'>{t.cost}</dd></div>
 </dl>
									</CardContent>
								</Card>
							))}
						</div>
					</section>
				)}

				{/* Lessons Learned */}
				{project.lessons && project.lessons.length > 0 && (
					<section id='lessons' className='mb-10'>
						<h2 className='text-2xl font-semibold text-foreground tracking-tight mb-6'>
							Lessons Learned
						</h2>
						<ol className='space-y-3'>
							{project.lessons.map((lesson, i) => (
								<li
									key={i}
									className='flex items-start gap-3 text-muted-foreground'>
									<span className='text-foreground font-bold mt-0.5 shrink-0'>
										{i + 1}.
									</span>
									<span>{lesson}</span>
								</li>
							))}
						</ol>
					</section>
				)}
				<nav aria-label='Adjacent projects' className='grid sm:grid-cols-2 gap-4 border-t border-border pt-8 mt-14'>
					{previousProject ? <Link to={`/projects/${previousProject.slug}`} className='border border-border p-5 hover:border-primary hover:bg-muted'><span className='block text-xs uppercase tracking-wide text-muted-foreground mb-2'>Previous project</span><span className='font-semibold text-primary'>← {previousProject.name}</span></Link> : <span />}
					{nextProject && <Link to={`/projects/${nextProject.slug}`} className='border border-border p-5 text-right hover:border-primary hover:bg-muted'><span className='block text-xs uppercase tracking-wide text-muted-foreground mb-2'>Next project</span><span className='font-semibold text-primary'>{nextProject.name} →</span></Link>}
				</nav>
			</article>
 <aside className='hidden xl:block py-10'>
  <nav aria-label='On this page' className='sticky top-24 border-l border-border pl-5'>
   <h2 className='text-sm font-semibold mb-3'>On this page</h2>
   <ul className='space-y-1'>{sections.map(section => <li key={section.id}><a href={`#${section.id}`} aria-current={activeSection === section.id ? 'location' : undefined} className={`block border-l-2 -ml-[21px] pl-5 py-1.5 text-sm ${activeSection === section.id ? 'border-primary text-primary font-semibold' : 'border-transparent text-muted-foreground hover:text-primary'}`}>{section.label}</a></li>)}</ul>
  </nav>
 </aside>
 </div>
		</div>
		</>
	);
}
