import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import config from '../../data/config.js';

export function Contact() {
	return (
		<section id='contact' className='border-t border-border bg-background px-6 py-20'>
			<div className='max-w-6xl mx-auto grid lg:grid-cols-[1fr_auto] gap-8 items-end'>
				<div>
					<p className='text-sm font-semibold uppercase tracking-wide text-primary mb-3'>Contact</p>
					<h2 className='text-3xl md:text-4xl font-semibold tracking-tight text-foreground'>Interested in working together?</h2>
					<p className='mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground'>For roles, engineering collaborations, or questions about these systems, email me or connect on LinkedIn.</p>
				</div>
				<div className='flex flex-wrap gap-3'>
					<Button size='lg' asChild><a href='mailto:kayceejenz@gmail.com'><Mail className='mr-2 h-4 w-4' />Email me<ArrowRight className='ml-2 h-4 w-4' /></a></Button>
					<Button size='lg' variant='outline' asChild><a href={config.contact.links.linkedin} target='_blank' rel='noopener noreferrer'><Linkedin className='mr-2 h-4 w-4' />LinkedIn</a></Button>
					<Button size='lg' variant='outline' asChild><a href={config.contact.links.github} target='_blank' rel='noopener noreferrer'><Github className='mr-2 h-4 w-4' />GitHub</a></Button>
				</div>
			</div>
		</section>
	);
}
