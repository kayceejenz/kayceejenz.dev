import { Button } from '@/components/ui/button';
import { ArrowRight, Linkedin } from 'lucide-react';
import config from '../../data/config.js';

export function Hero() {
 return (
  <section className='bg-muted border-b border-border px-6 py-12 md:py-16'>
   <div className='max-w-6xl mx-auto'>
    <h1 className='text-4xl md:text-6xl font-semibold tracking-tight leading-[1.12] max-w-4xl text-foreground'>Backend Engineering · Applied AI</h1>
    <p className='max-w-2xl mt-5 text-lg md:text-xl text-muted-foreground leading-relaxed'>I build dependable backend systems and AI applications across enterprise software, education, and payments.</p>
    <div className='flex flex-wrap gap-4 mt-6'>
     <Button size='lg' asChild><a href='#projects'>Explore projects <ArrowRight className='ml-2 h-4 w-4' aria-hidden='true' /></a></Button>
     <Button variant='outline' size='lg' asChild><a href={config.contact.links.linkedin} target='_blank' rel='noopener noreferrer'><Linkedin className='mr-2 h-4 w-4' aria-hidden='true' />Experience on LinkedIn</a></Button>
    </div>
   </div>
  </section>
 );
}
