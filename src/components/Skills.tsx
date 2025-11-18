import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Server, Coins, Cloud, Code, Database } from 'lucide-react';
import { useState } from 'react';
import config from '../../data/config.js';

export function Skills() {
	const { skills } = config;
	const [activeTab, setActiveTab] = useState('backend');

	const skillCategories = [
		{
			id: 'backend',
			title: 'Backend',
			icon: Server,
			skills: skills.backend,
			color: 'bg-primary/10 text-primary border-primary/30',
		},
		{
			id: 'blockchain',
			title: 'Blockchain',
			icon: Coins,
			skills: skills.blockchain,
			color: 'bg-green-500/10 text-green-400 border-green-500/30',
		},
		{
			id: 'devops',
			title: 'DevOps',
			icon: Cloud,
			skills: skills.devops,
			color: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
		},
		{
			id: 'databases',
			title: 'Databases',
			icon: Database,
			skills: skills.databases,
			color: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
		},
		{
			id: 'tools',
			title: 'Tools',
			icon: Code,
			skills: skills.tools,
			color: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
		},
	];

	const activeCategory = skillCategories.find(
		cat => cat.id === activeTab
	);

	return (
		<section id='skills' className='py-20 px-6 bg-muted/30'>
			<div className='max-w-6xl mx-auto'>
				<div className='text-center mb-16'>
					<h2 className='text-4xl md:text-5xl font-bold text-foreground mb-4 font-mono'>
						{'{ Technical Skills }'}
					</h2>
					<div className='w-24 h-1 bg-primary mx-auto neon-glow'></div>
					<p className='text-lg text-muted-foreground mt-6 max-w-2xl mx-auto font-mono'>
						// Expertise across the full
						backend development stack
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
												category.id
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
							}
						)}
					</div>

					{/* Active Skills Display */}
					{activeCategory && (
						<Card className='bg-card/50 backdrop-blur border-primary/20 hover-glow'>
							<CardHeader>
								<CardTitle className='flex items-center gap-3 text-foreground font-mono'>
									<activeCategory.icon className='h-6 w-6 text-primary' />
									{'// ' +
										activeCategory.title +
										' Technologies'}
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className='terminal-window'>
									<div className='terminal-header'>
										<div className='terminal-dot red'></div>
										<div className='terminal-dot yellow'></div>
										<div className='terminal-dot green'></div>
										<span className='font-mono text-xs text-muted-foreground ml-2'>
											~/
											{
												activeCategory.id
											}
											.js
										</span>
									</div>
									<div className='p-6 font-mono text-sm'>
										<div className='text-primary'>
											const{' '}
											{
												activeCategory.id
											}
											Skills
											=
											[
										</div>
										<div className='ml-4 space-y-1'>
											{activeCategory.skills.map(
												(
													skill,
													index
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
												)
											)}
										</div>
										<div className='text-primary'>
											];
										</div>
										<div className='mt-4 text-muted-foreground'>
											//{' '}
											{
												activeCategory
													.skills
													.length
											}{' '}
											technologies
											mastered
										</div>
									</div>
								</div>

								<div className='mt-6 flex flex-wrap gap-2'>
									{activeCategory.skills.map(
										(
											skill,
											index
										) => (
											<Badge
												key={
													index
												}
												variant='outline'
												className={`${activeCategory.color} hover-glow font-mono cursor-default transition-all duration-300`}>
												{
													skill
												}
											</Badge>
										)
									)}
								</div>
							</CardContent>
						</Card>
					)}

					{/* All Skills Grid */}
					<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12'>
						{skillCategories.map(
							(category, index) => {
								const IconComponent =
									category.icon;
								return (
									<Card
										key={
											index
										}
										className='bg-card/30 backdrop-blur border-primary/10 hover-glow group cursor-pointer'
										onClick={() =>
											setActiveTab(
												category.id
											)
										}>
										<CardHeader className='pb-4'>
											<CardTitle className='flex items-center gap-3 text-foreground font-mono text-sm'>
												<div className='p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors'>
													<IconComponent className='h-4 w-4 text-primary' />
												</div>
												{'{ ' +
													category.title +
													' }'}
											</CardTitle>
										</CardHeader>
										<CardContent>
											<div className='text-xs font-mono text-muted-foreground'>
												//{' '}
												{
													category
														.skills
														.length
												}{' '}
												technologies
											</div>
											<div className='mt-2 text-sm text-muted-foreground'>
												{category.skills
													.slice(
														0,
														3
													)
													.join(
														', '
													)}
												{category
													.skills
													.length >
													3 &&
													'...'}
											</div>
										</CardContent>
									</Card>
								);
							}
						)}
					</div>
				</div>
			</div>
		</section>
	);
}
