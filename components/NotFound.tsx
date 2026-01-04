import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-center px-6">
      <div className="max-w-2xl mx-auto flex flex-col items-center">
        <div className="mb-8">
          {/* Illustration SVG 404 futuriste */}
          <svg width="220" height="120" viewBox="0 0 220 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto animate-fade-in">
            <ellipse cx="110" cy="100" rx="90" ry="15" fill="#a855f7" fillOpacity="0.15" />
            <rect x="60" y="30" width="100" height="50" rx="25" fill="#0ea5e9" fillOpacity="0.18" />
            <ellipse cx="110" cy="55" rx="40" ry="20" fill="#a855f7" fillOpacity="0.25" />
            <circle cx="110" cy="55" r="28" fill="#fff" fillOpacity="0.08" />
            <text x="50%" y="60%" textAnchor="middle" fill="#a855f7" fontSize="48" fontWeight="bold" dy=".3em" fontFamily="Inter, sans-serif">404</text>
            <g>
              <circle cx="80" cy="45" r="4" fill="#0ea5e9" />
              <circle cx="140" cy="45" r="4" fill="#0ea5e9" />
              <ellipse cx="110" cy="70" rx="12" ry="4" fill="#a855f7" fillOpacity="0.3" />
            </g>
          </svg>
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold text-purple-400 mb-4 tracking-tight">404</h1>
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Page non trouvée</h2>
        <p className="text-slate-400 mb-8 max-w-md">Oups, la page que vous cherchez n'existe pas ou a été déplacée.<br/>Retournez à l’accueil pour explorer d’autres univers.</p>
        <button
          onClick={() => navigate('/')}
          className="px-8 py-4 rounded-full bg-slate-900 border border-slate-800 text-white font-bold hover:bg-slate-800 transition-colors shadow-lg"
        >
          Retour à l’accueil
        </button>
      </div>
    </section>
  );
};

export default NotFound;
