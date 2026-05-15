import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import ProductsGrid from './components/ProductsGrid';
import Feedbacks from './components/Feedbacks';
import CustomCursor from './components/CustomCursor';

function App() {
  useEffect(() => {
    // Forçar modo escuro
    document.documentElement.classList.add('dark');
    document.body.style.backgroundColor = '#09090b';
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-orange-500/30">
      <CustomCursor />
      <div className="grain-overlay" />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <ProductsGrid />
        <Feedbacks />
        <About />
      </main>
      
      <footer className="py-12 border-t border-zinc-900 text-center text-zinc-500 text-sm font-mono mt-20">
        <div>
          <p className="text-zinc-500">
            Desenvolvido por <span className="text-zinc-300 font-medium">Caio Rodrigues</span>
          </p>
          <a 
            href="https://www.instagram.com/caio.riguess" 
            target="_blank" 
            rel="noopener noreferrer"
            className="mt-2 inline-block text-orange-500 hover:text-orange-400 transition-colors"
          >
            @caio.riguess
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
