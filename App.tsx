
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import CV from './components/CV';
import Blog from './components/Blog';
import Footer from './components/Footer';

const App: React.FC = () => {
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

export default App;
