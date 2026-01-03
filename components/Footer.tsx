import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-20 border-t border-slate-900 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="mb-12">
          <h2 className="text-4xl md:text-6xl font-extrabold mb-8 tracking-tighter">
            Let's build something <br />
            <span className="gradient-text">legendary together.</span>
          </h2>
          <a 
            href="mailto:hello@novastudio.com" 
            className="text-2xl md:text-3xl font-medium text-white hover:text-purple-400 transition-colors border-b-2 border-slate-800 pb-2"
          >
            hello@novastudio.com
          </a>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-12 border-t border-slate-900">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Nova Studio. Built with React.
          </p>
          <div className="flex space-x-6 text-sm font-medium text-slate-400">
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">Dribbble</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;