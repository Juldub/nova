import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { cmsService } from '../services/cmsService';
import { Project } from '../types';

const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    cmsService.getProjects().then((projects) => {
      const found = projects.find(p =>
        p.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '') === slug
      );
      setProject(found || null);
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-xl">Chargement…</div>;
  }
  if (!project) {
    return <div className="min-h-screen flex items-center justify-center text-xl text-red-400">Projet introuvable.</div>;
  }

  return (
    <section className="py-24 bg-slate-950 min-h-screen">
      <div className="max-w-3xl mx-auto px-6">
        <button
          onClick={() => navigate('/')}
          className="mb-8 px-6 py-2 rounded-full bg-slate-900 border border-slate-800 text-white font-bold hover:bg-slate-800 transition-colors"
        >
          ← Retour à l’accueil
        </button>
        <div className="aspect-[4/3] overflow-hidden rounded-3xl mb-8 bg-slate-800">
          <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
        </div>
        <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map(tag => (
            <span key={tag} className="text-xs font-bold uppercase tracking-widest text-purple-400 bg-purple-500/10 px-2 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>
        <p className="text-slate-400 text-lg mb-8 leading-relaxed">{project.description}</p>
        {project.link && (
          <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-block bg-white text-slate-950 px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform">
            Voir le projet
          </a>
        )}
      </div>
    </section>
  );
};

export default ProjectDetail;
