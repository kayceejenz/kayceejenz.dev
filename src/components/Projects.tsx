import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Calendar, Code2 } from "lucide-react";
import config from "../../data/config.js";

export function Projects() {
  const { projects } = config;

  return (
    <section id="projects" className="py-20 px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 font-mono">
            {'{ Featured Projects }'}
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto neon-glow"></div>
          <p className="text-lg text-muted-foreground mt-6 max-w-2xl mx-auto font-mono">
            // Showcasing backend architecture and blockchain expertise
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="bg-card/50 backdrop-blur border-primary/20 hover-glow group hover:-translate-y-2 transition-all duration-300">
              <div className="terminal-window">
                <div className="terminal-header">
                  <div className="terminal-dot red"></div>
                  <div className="terminal-dot yellow"></div>
                  <div className="terminal-dot green"></div>
                  <span className="font-mono text-xs text-muted-foreground ml-2">
                    ~/projects/{project.name.toLowerCase().replace(/\s+/g, '_')}.js
                  </span>
                </div>

                <CardHeader className="bg-card/30">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg text-foreground font-mono">
                      {'{ ' + project.name + ' }'}
                    </CardTitle>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span className="text-xs font-mono">{project.period}</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4 p-6">
                  <div className="code-block">
                    <div className="font-mono text-xs space-y-1">
                      <div className="text-primary">const project = {'{'}</div>
                      <div className="ml-2 text-muted-foreground">
                        description: <span className="text-foreground">"{project.description}"</span>,
                      </div>
                      <div className="ml-2 text-muted-foreground">
                        stack: <span className="text-primary">[</span>
                      </div>
                      <div className="ml-4 text-foreground">
                        {project.stack.map((tech, i) => (
                          <span key={i}>
                            "{tech}"{i < project.stack.length - 1 ? ', ' : ''}
                          </span>
                        ))}
                      </div>
                      <div className="ml-2 text-primary">]</div>
                      <div className="text-primary">{'}'}</div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech, techIndex) => (
                      <Badge 
                        key={techIndex}
                        variant="outline"
                        className="bg-primary/10 text-primary border-primary/30 hover:border-primary hover:neon-glow font-mono text-xs transition-all duration-300"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2 pt-2">
                    {project.link && project.link !== "#" && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        asChild
                        className="flex-1 font-mono border-primary/30 hover:border-primary hover:neon-glow"
                      >
                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-3 w-3" />
                          live()
                        </a>
                      </Button>
                    )}
                    {project.github && project.github !== "#" && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        asChild
                        className="flex-1 font-mono border-primary/30 hover:border-primary hover:neon-glow"
                      >
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-2 h-3 w-3" />
                          code()
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        {/* Project stats */}
        <div className="mt-16 text-center">
          <div className="code-block max-w-md mx-auto">
            <div className="font-mono text-sm space-y-1">
              <div className="text-primary">// Project Statistics</div>
              <div className="text-muted-foreground">
                const stats = {'{'} 
              </div>
              <div className="ml-4 text-muted-foreground">
                totalProjects: <span className="text-primary">{projects.length}</span>,
              </div>
              <div className="ml-4 text-muted-foreground">
                technologies: <span className="text-primary">{[...new Set(projects.flatMap(p => p.stack))].length}</span>,
              </div>
              <div className="ml-4 text-muted-foreground">
                status: <span className="text-green-400">"production-ready"</span>
              </div>
              <div className="text-muted-foreground">{'}'}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}