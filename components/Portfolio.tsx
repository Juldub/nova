
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Project } from '../types';
import { cmsService } from '../services/cmsService';
import { ProjectSkeleton } from './Skeleton';

const Portfolio: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cmsService.getProjects().then(data => {
      setProjects(data);
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
            projects.map((project) => {
              const slug = project.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
              return (
                <Link
                  key={project.id}
                  to={`/portfolio/${slug}`}
                  className="group glass-morphism rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 block focus:outline-none focus:ring-2 focus:ring-purple-400"
                  tabIndex={0}
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img 
                      src={project.imageUrl} 
                      alt={project.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                  </div>
                  <div className="p-8">
                    <div className="flex gap-2 mb-4">
                      {project.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-bold uppercase tracking-widest text-purple-400 bg-purple-500/10 px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">{project.title}</h3>
                    <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                      {project.description}
                    </p>
                    <span className="inline-flex items-center text-sm font-bold text-white group-hover:text-purple-400 transition-colors">
                      En savoir plus
                      <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
