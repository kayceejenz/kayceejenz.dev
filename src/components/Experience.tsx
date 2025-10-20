import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Building } from "lucide-react";
import config from "../../data/config.js";

export function Experience() {
  const { experience } = config;

  return (
    <section id="experience" className="py-20 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 font-mono">
            {'{ Professional Experience }'}
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto neon-glow"></div>
          <p className="text-lg text-muted-foreground mt-6 max-w-2xl mx-auto font-mono">
            // Building scalable systems and leading development teams
          </p>
        </div>

        <div className="space-y-8">
          {experience.map((job, index) => (
            <Card key={index} className="bg-card/50 backdrop-blur border-primary/20 hover-glow group">
              <div className="terminal-window">
                <div className="terminal-header">
                  <div className="terminal-dot red"></div>
                  <div className="terminal-dot yellow"></div>
                  <div className="terminal-dot green"></div>
                  <span className="font-mono text-xs text-muted-foreground ml-2">
                    ~/experience/{job.company.toLowerCase().replace(/\s+/g, '_')}.js
                  </span>
                </div>
                
                <CardHeader className="bg-card/30">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <CardTitle className="text-xl text-foreground font-mono">
                        const role = "
                        <span className="text-primary">{job.title}</span>"
                      </CardTitle>
                      <h3 className="text-lg font-semibold text-primary mt-2 font-mono">
                        // @{job.company}
                      </h3>
                    </div>
                    <div className="flex flex-col md:items-end gap-2">
                      <div className="flex items-center gap-2 text-muted-foreground font-mono text-sm">
                        <Calendar className="h-4 w-4" />
                        <span>{job.period}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground font-mono text-sm">
                        <MapPin className="h-4 w-4" />
                        <span>{job.location}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6 p-6">
                  <div className="code-block">
                    <div className="font-mono text-sm space-y-2">
                      <div className="text-primary">const achievements = [</div>
                      {job.bullets.map((bullet, bulletIndex) => (
                        <div key={bulletIndex} className="ml-4 text-muted-foreground">
                          "<span className="text-foreground">{bullet}</span>"{bulletIndex < job.bullets.length - 1 ? ',' : ''}
                        </div>
                      ))}
                      <div className="text-primary">];</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="font-mono text-sm text-primary">// Tech Stack:</div>
                    <div className="flex flex-wrap gap-2">
                      {job.tech.map((tech, techIndex) => (
                        <Badge 
                          key={techIndex} 
                          variant="outline"
                          className="border-primary/30 text-primary hover:border-primary hover:neon-glow font-mono transition-all duration-300"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        {/* Timeline visualization */}
        <div className="mt-16 relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-gradient-to-b from-primary via-primary/50 to-transparent"></div>
          <div className="text-center">
            <div className="inline-block bg-primary text-primary-foreground px-4 py-2 rounded-full font-mono text-sm neon-glow">
              {'{ timeline.length } === ' + experience.length + ' roles'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}