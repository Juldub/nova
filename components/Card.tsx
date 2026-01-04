import React from 'react';
import { Link } from 'react-router-dom';

interface CardProps {
  to: string;
  imageUrl: string;
  imageAlt: string;
  title: string;
  description: string;
  tags?: string[];
  meta?: React.ReactNode; // Pour date/catégorie blog
  children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ to, imageUrl, imageAlt, title, description, tags, meta, children }) => {
  return (
    <Link
      to={to}
      className="group glass-morphism rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 block focus:outline-none focus:ring-2 focus:ring-purple-400"
      tabIndex={0}
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={imageUrl}
          alt={imageAlt}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
        />
      </div>
      <div className="p-8">
        {meta && <div className="mb-2">{meta}</div>}
        {tags && (
          <div className="flex gap-2 mb-4">
            {tags.map(tag => (
              <span key={tag} className="text-[10px] font-bold uppercase tracking-widest text-purple-400 bg-purple-500/10 px-2 py-1 rounded">
                {tag}
              </span>
            ))}
          </div>
        )}
        <h3 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">{title}</h3>
        <p className="text-slate-400 text-sm mb-6 leading-relaxed line-clamp-2">{description}</p>
        {children}
      </div>
    </Link>
  );
};

export default Card;
