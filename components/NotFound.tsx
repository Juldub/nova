import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-center px-6">
      <h1 className="text-6xl font-extrabold text-purple-400 mb-6">404</h1>
      <h2 className="text-2xl font-bold mb-4">Page non trouvée</h2>
      <p className="text-slate-400 mb-8">Oups, la page que vous cherchez n'existe pas ou a été déplacée.</p>
      <button
        onClick={() => navigate('/')}
        className="px-6 py-3 rounded-full bg-slate-900 border border-slate-800 text-white font-bold hover:bg-slate-800 transition-colors"
      >
        Retour à l’accueil
      </button>
    </section>
  );
};

export default NotFound;
