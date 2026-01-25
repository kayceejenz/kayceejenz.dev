import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	BrainCircuit, // New icon for AI
	Server,
	Coins,
	Cloud,
	Database,
	Code,
} from 'lucide-react';
import { useState } from 'react';
import config from '../../data/config.js';

export function Skills() {
	const { skills } = config;
	// Start with 'ai' as the default active tab to signal your new focus
	const [activeTab, setActiveTab] = useState('ai_ml');

	const skillCategories = [
		{
			id: 'ai_ml',
			title: 'AI & Machine Learning',
			icon: BrainCircuit,
			skills: skills.ai_ml,
			color: 'bg-primary/10 text-primary border-primary/30',
		},
		{
			id: 'distributed_systems',
			title: 'Distributed Systems',
			icon: Server,
			skills: skills.distributed_systems,
			color: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
		},
		{
			id: 'blockchain_web3',
			title: 'Blockchain & Web3',
			icon: Coins,
			skills: skills.blockchain_web3,
			color: 'bg-green-500/10 text-green-400 border-green-500/30',
		},
		{
			id: 'devops_infra',
			title: 'DevOps & Cloud',
			icon: Cloud,
			skills: skills.devops_infra,
			color: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
		},
		{
			id: 'databases',
			title: 'Databases',
			icon: Database,
			skills: skills.databases,
			color: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
		},
	];

	const activeCategory = skillCategories.find(
		cat => cat.id === activeTab,
	);

	return (
		<section id='skills' className='py-20 px-6 bg-muted/30'>
			<div className='max-w-6xl mx-auto'>
				<div className='text-center mb-16'>
					<h2 className='text-4xl md:text-5xl font-bold text-foreground mb-4 font-mono'>
						{'{ Technical Expertise }'}
					</h2>
					<div className='w-24 h-1 bg-primary mx-auto neon-glow'></div>
					<p className='text-lg text-muted-foreground mt-6 max-w-3xl mx-auto font-mono leading-relaxed'>
						// Bridging 5+ years of systems
						engineering with advanced
						Artifical Intelligence
					</p>
				</div>

				<div className='space-y-8'>
					{/* Tab Navigation */}
					<div className='flex flex-wrap justify-center gap-2'>
						{skillCategories.map(
							category => {
								const IconComponent =
									category.icon;
								return (
									<button
										key={
											category.id
										}
										onClick={() =>
											setActiveTab(
												category.id,
											)
										}
										className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-sm transition-all duration-300 hover-glow ${
											activeTab ===
											category.id
												? 'bg-primary text-primary-foreground neon-glow'
												: 'bg-card border border-border hover:border-primary/50'
										}`}>
										<IconComponent className='h-4 w-4' />
										{'{ ' +
											category.title +
											' }'}
									</button>
								);
							},
						)}
					</div>

					{/* Active Skills Display */}
					{activeCategory && (
						<Card className='bg-card/50 backdrop-blur border-primary/20 hover-glow'>
							<CardHeader>
								<CardTitle className='flex items-center gap-3 text-foreground font-mono text-xl'>
									<activeCategory.icon className='h-6 w-6 text-primary' />
									{'// ' +
										activeCategory.title}
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className='terminal-window'>
									<div className='terminal-header'>
										<div className='terminal-dot red'></div>
										<div className='terminal-dot yellow'></div>
										<div className='terminal-dot green'></div>
										<span className='font-mono text-xs text-muted-foreground ml-2'>
											~/expertise/
											{
												activeCategory.id
											}
											.ts
										</span>
									</div>
									<div className='p-6 font-mono text-sm'>
										<div className='text-primary'>
											export
											const{' '}
											{activeCategory.id.replace(
												'_',
												'',
											)}
											Stack
											:
											string[]
											=
											[
										</div>
										<div className='ml-4 space-y-1'>
											{activeCategory.skills.map(
												(
													skill,
													index,
												) => (
													<div
														key={
															index
														}
														className='text-muted-foreground'>
														"
														<span className='text-foreground hover:text-primary transition-colors cursor-default'>
															{
																skill
															}
														</span>

														"
														{index <
														activeCategory
															.skills
															.length -
															1
															? ','
															: ''}
													</div>
												),
											)}
										</div>
										<div className='text-primary'>
											];
										</div>
									</div>
								</div>

								<div className='mt-6 flex flex-wrap gap-2'>
									{activeCategory.skills.map(
										(
											skill,
											index,
										) => (
											<Badge
												key={
													index
												}
												variant='outline'
												className={`${activeCategory.color} hover-glow font-mono px-3 py-1`}>
												{
													skill
												}
											</Badge>
										),
									)}
								</div>
							</CardContent>
						</Card>
					)}
				</div>
			</div>
		</section>
	);
}
