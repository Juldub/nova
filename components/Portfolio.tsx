
import React, { useEffect, useState } from 'react';
import Card from './Card';
import { Project } from '../types';
import { cmsService } from '../services/cmsService';
import { ProjectSkeleton } from './Skeleton';

const Portfolio: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cmsService.getProjects().then(data => {
      // Tri par ordre croissant si présent
      const sorted = [...data].sort((a, b) => (a.ordre ?? 9999) - (b.ordre ?? 9999));
      setProjects(sorted);
      setLoading(false);
    });
  }, []);

  return (
    <section id="portfolio" className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-4xl font-bold mb-4">Portfolio</h2>
            <p className="text-slate-400 max-w-xl">
              Voici une selection de mes derniers projets.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <>
              <ProjectSkeleton />
              <ProjectSkeleton />
              <ProjectSkeleton />
            </>
          ) : (
            projects
              .slice() // copie défensive
              .sort((a, b) => (a.ordre ?? 9999) - (b.ordre ?? 9999))
              .map((project) => {
                const slug = project.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
                return (
                  <Card
                    key={project.id}
                    to={`/portfolio/${slug}`}
                    imageUrl={project.imageUrl}
                    imageAlt={project.title}
                    title={project.title}
                    description={project.description}
                    tags={project.tags}
                  >
                    <span className="inline-flex items-center text-sm font-bold text-white group-hover:text-purple-400 transition-colors">
                      En savoir plus
                      <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </Card>
                );
              })
          )}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
