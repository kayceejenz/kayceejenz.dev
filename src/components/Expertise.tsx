import { BrainCircuit, CloudCog, ServerCog } from 'lucide-react';

const areas = [
	{ title: 'Backend Engineering', description: 'APIs, data modelling, authentication, payments, and distributed workflows.', icon: ServerCog },
	{ title: 'AI & ML Engineering', description: 'RAG systems, evaluation, NLP pipelines, and production model integration.', icon: BrainCircuit },
	{ title: 'Platform & Infrastructure', description: 'PostgreSQL, messaging, containers, cloud deployment, and observability.', icon: CloudCog },
];

export function Expertise() {
	return <section aria-labelledby='expertise-heading' className='border-b border-border bg-background px-6 py-14'>
		<div className='max-w-6xl mx-auto'>
			<h2 id='expertise-heading' className='text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-6'>Engineering focus</h2>
			<div className='grid md:grid-cols-3 border border-border divide-y md:divide-y-0 md:divide-x divide-border bg-card'>
				{areas.map(({ title, description, icon: Icon }) => <div key={title} className='p-6'>
					<Icon className='h-6 w-6 text-primary mb-4' aria-hidden='true' />
					<h3 className='text-lg font-semibold text-foreground'>{title}</h3>
					<p className='mt-2 text-sm leading-relaxed text-muted-foreground'>{description}</p>
				</div>)}
			</div>
		</div>
	</section>;
}
