import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	ExternalLink,
	Github,
	Calendar,
	Filter,
	X,
} from 'lucide-react';
import config from '../../data/config.js';

export function Projects() {
	const { projects } = config;
	const [selectedFilter, setSelectedFilter] = useState('all');

	const allTechnologies = [...new Set(projects.flatMap(p => p.stack))];
	const categories = ['all', 'ai', 'backend', 'fintech'];

	const filteredProjects = projects.filter(project => {
		if (selectedFilter === 'all') return true;
		if (selectedFilter === 'ai')
			return project.stack.some(tech =>
				[
					'AI',
					'Machine Learning',
					'Python',
					'TensorFlow',
					'OpenRouter API',
					'RAG Pipeline',
					'Embeddings',
					'Supabase Vector',
					'FastAPI',
					'LangChain',
					'LlamaIndex',
				].includes(tech)
			);
		if (selectedFilter === 'fintech')
			return (
				project.name.toLowerCase().includes('pay') ||
				project.description.toLowerCase().includes('payment') ||
				project.description.toLowerCase().includes('financial') ||
				project.description.toLowerCase().includes('trading')
			);
		if (selectedFilter === 'backend')
			return project.stack.some(tech =>
				[
					'Node.js',
					'NestJS',
					'Python',
					'Express',
					'FastAPI',
					'MongoDB',
					'PostgreSQL',
					'ASP.NET Core',
					'C#',
				].includes(tech)
			);
		return true;
	});

	const filterLabels: Record<string, string> = {
		all: 'All Projects',
		ai: 'AI & ML',
		backend: 'Backend',
		fintech: 'Fintech',
	};

	return (
		<section id='projects' className='py-20 px-6 bg-muted/30'>
			<div className='max-w-6xl mx-auto'>
				<div className='text-center mb-16'>
					<h2 className='text-4xl md:text-5xl font-bold text-foreground mb-4'>
						Project Portfolio
					</h2>
					<div className='w-16 h-0.5 bg-primary/60 mx-auto rounded-full'></div>
					<p className='text-lg text-muted-foreground mt-6 max-w-2xl mx-auto'>
						AI systems and production applications built to scale.
					</p>

					{/* Filter Controls */}
					<div className='mt-8 flex flex-wrap justify-center gap-2'>
						{categories.map(category => (
							<Button
								key={category}
								variant={selectedFilter === category ? 'default' : 'outline'}
								size='sm'
								onClick={() => setSelectedFilter(category)}
								className={`transition-all duration-300 ${
									selectedFilter === category
										? 'neon-glow'
										: 'border-primary/30 hover:border-primary'
								}`}>
								{selectedFilter === category && (
									<Filter className='h-3 w-3 mr-2' />
								)}
								{filterLabels[category]}
							</Button>
						))}
						{selectedFilter !== 'all' && (
							<Button
								variant='ghost'
								size='sm'
								onClick={() => setSelectedFilter('all')}
								className='text-muted-foreground hover:text-foreground'>
								<X className='h-3 w-3 mr-1' />
								Clear
							</Button>
						)}
					</div>

					<p className='mt-4 text-sm text-muted-foreground'>
						Showing {filteredProjects.length} of {projects.length} projects
					</p>
				</div>

				<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
					{filteredProjects.map((project, index) => (
						<Card
							key={index}
							className='bg-card/50 backdrop-blur border-border hover-glow group hover:-translate-y-2 transition-all duration-300 flex flex-col'>
							<CardHeader className='pb-3'>
								<div className='flex items-start justify-between gap-2 mb-1'>
									<CardTitle className='text-lg font-semibold text-foreground leading-tight'>
										{project.name}
									</CardTitle>
									<span className='text-xs text-green-500 font-medium bg-green-500/10 px-2 py-0.5 rounded-full border border-green-500/20 whitespace-nowrap flex-shrink-0'>
										Live
									</span>
								</div>
								<div className='flex items-center gap-1.5 text-xs text-muted-foreground'>
									<Calendar className='h-3 w-3' />
									{project.period}
								</div>
							</CardHeader>

							<CardContent className='space-y-4 flex-1 flex flex-col pt-0'>
								{/* Description */}
								<p className='text-sm text-muted-foreground leading-relaxed flex-1'>
									{project.description}
								</p>

								{/* Tech Stack */}
								<div>
									<p className='text-xs font-medium text-foreground mb-2 uppercase tracking-wide'>
										Tech Stack
									</p>
									<div className='flex flex-wrap gap-1.5'>
										{project.stack.map((tech, techIndex) => (
											<Badge
												key={techIndex}
												variant='outline'
												className='bg-primary/10 text-primary border-primary/30 hover:border-primary font-mono text-xs transition-colors'>
												{tech}
											</Badge>
										))}
									</div>
								</div>

								{/* Action Buttons */}
								<div className='flex gap-2 pt-1'>
									{project.link && project.link !== '#' && (
										<Button
											variant='outline'
											size='sm'
											asChild
											className='flex-1 border-primary/30 hover:border-primary'>
											<a
												href={project.link}
												target='_blank'
												rel='noopener noreferrer'>
												<ExternalLink className='mr-2 h-3 w-3' />
												Live Demo
											</a>
										</Button>
									)}
									{project.github && project.github !== '#' && (
										<Button
											variant='outline'
											size='sm'
											asChild
											className='flex-1 border-primary/30 hover:border-primary'>
											<a
												href={project.github}
												target='_blank'
												rel='noopener noreferrer'>
												<Github className='mr-2 h-3 w-3' />
												Source Code
											</a>
										</Button>
									)}
								</div>
							</CardContent>
						</Card>
					))}
				</div>

				{/* Most Used Technologies */}
				<div className='mt-16 text-center'>
					<h3 className='text-lg font-semibold text-foreground mb-6'>
						Most Used Technologies
					</h3>
					<div className='flex flex-wrap justify-center gap-3 max-w-4xl mx-auto'>
						{allTechnologies.slice(0, 15).map((tech, index) => {
							const usage = projects.filter(p => p.stack.includes(tech)).length;
							return (
								<Badge
									key={index}
									variant='outline'
									className={`font-mono transition-all duration-300 hover:scale-105 ${
										usage >= 3
											? 'border-yellow-500/50 text-yellow-500 hover:border-yellow-500'
											: usage >= 2
											? 'border-green-500/50 text-green-500 hover:border-green-500'
											: 'border-primary/30 text-primary hover:border-primary'
									}`}>
									{tech} ({usage})
								</Badge>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
}
