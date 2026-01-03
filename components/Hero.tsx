
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-semibold mb-8 animate-fade-in">
          Bienvenue sur mon site
        </div>
        <h1 className="text-5xl md:text-8xl font-extrabold tracking-tight mb-8 leading-tight">
          Hey <span role="img" aria-label="wave">👋🏽</span>
        </h1>
        <div className="w-full max-w-md h-1 rounded-full mb-8" aria-hidden>
          <div className="h-1 rounded-full" style={{ background: 'linear-gradient(90deg,#60a5fa,#a855f7,#ec4899)' }} />
        </div>
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-12 leading-relaxed">
          Je suis Julien, <span className="text-purple-400 font-semibold">PM</span> basé à Montpellier, spécialisé dans la <span className="text-green-400 font-semibold">santé</span> et passionné par l'<span className="text-pink-400 font-semibold">IA</span>.
          <br />
          Vous trouverez ici certaines de mes réalisations passées, des articles de blog ainsi que mon CV.
        </p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <a href="#portfolio" className="bg-white text-slate-950 px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform">
            Portfolio
          </a>
          <a href="#cv" className="bg-slate-900 border border-slate-800 text-white px-8 py-4 rounded-full font-bold hover:bg-slate-800 transition-colors">
            CV
          </a>
          <a href="#blog" className="bg-transparent border border-slate-700 text-white px-8 py-4 rounded-full font-bold hover:bg-slate-800 transition-colors">
            Blog
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
