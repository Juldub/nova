
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'CV', href: '#cv' },
    { name: 'Blog', href: '#blog' },
  ];

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    const anchor = href.replace('#', '');
    // If already on home, do native scroll
    if (location.pathname === '/') {
      e.preventDefault();
      const el = document.getElementById(anchor);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        // update hash for shareability without adding history entry
        window.history.replaceState(null, '', `/#${anchor}`);
      }
      return;
    }

    // If not on home, navigate to home and pass the anchor in state
    e.preventDefault();
    navigate('/', { state: { anchor } });
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass-morphism py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a
          href="/"
          aria-label="Aller à l'accueil"
          title="Aller à l'accueil"
          onClick={(e) => {
            e.preventDefault();
            if (location.pathname === '/') {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
              navigate('/');
            }
          }}
          className="text-2xl font-bold tracking-tighter"
        >
          Juldub
        </a>
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={`/#${link.href.replace('#', '')}`}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>
        <a
          href="https://www.linkedin.com/in/julien-dubois/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-slate-950 px-5 py-2 rounded-full text-sm font-bold hover:bg-purple-500 hover:text-white transition-all"
        >
          Mon LinkedIn
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
