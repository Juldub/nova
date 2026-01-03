
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import CV from './components/CV';
import Blog from './components/Blog';
import BlogDetail from './components/BlogDetail';
import Footer from './components/Footer';

const Home: React.FC = () => (
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
      </Routes>
    </Router>
  );
};

export default App;
