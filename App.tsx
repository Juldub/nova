
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import ProjectDetail from './components/ProjectDetail';
import CV from './components/CV';
import Blog from './components/Blog';
import BlogDetail from './components/BlogDetail';
import Footer from './components/Footer';

const HomeInner: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const anchor = (location.state as any)?.anchor || (location.hash ? location.hash.replace('#', '') : '');
    if (anchor) {
      // wait a tick for DOM to render
      setTimeout(() => {
        const el = document.getElementById(anchor);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        // ensure URL contains hash for shareability
        if (!location.hash) {
          navigate(`/#${anchor}`, { replace: true });
        }
      }, 50);
    }
    // Clear state so subsequent navigations don't re-trigger
    // Note: not strictly necessary but avoids repeat behavior
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 selection:bg-purple-500/30">
      <Navbar />
      <main>
        <Hero />
        <Portfolio />
        <CV />
        <Blog />
      </main>
      <Footer />
    </div>
  );
};

const Home: React.FC = () => <HomeInner />;

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:slug" element={
          <div className="bg-slate-950 selection:bg-purple-500/30">
            <Navbar />
            <BlogDetail />
            <Footer />
          </div>
        } />
        <Route path="/portfolio/:slug" element={
          <div className="bg-slate-950 selection:bg-purple-500/30">
            <Navbar />
            <ProjectDetail />
            <Footer />
          </div>
        } />
      </Routes>
    </Router>
  );
};

export default App;
