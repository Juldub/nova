
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-semibold mb-8 animate-fade-in">
          Available for new opportunities
        </div>
        <h1 className="text-5xl md:text-8xl font-extrabold tracking-tight mb-8 leading-tight">
          Crafting Digital <br />
          <span className="gradient-text">Experiences.</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-12 leading-relaxed">
          I'm a Frontend Engineer specializing in building immersive, high-performance web applications with modern tech stacks.
        </p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <a href="#portfolio" className="bg-white text-slate-950 px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform">
            View My Work
          </a>
          <a href="#studio" className="bg-slate-900 border border-slate-800 text-white px-8 py-4 rounded-full font-bold hover:bg-slate-800 transition-colors">
            Creative Studio
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
