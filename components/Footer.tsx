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
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-12 border-t border-slate-900">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Juldub. Vibecodé by Claude (Haiku 4.5 🙏)
          </p>
          <div className="flex space-x-6 text-sm font-medium text-slate-400">
            <a href="https://github.com/Juldub" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
            <a href="https://www.linkedin.com/in/julien-dubois/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;