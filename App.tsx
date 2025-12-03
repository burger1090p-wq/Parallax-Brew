import React from 'react';
import Hero from './components/Hero';
import Menu from './components/Menu';
import About from './components/About';
import AiBarista from './components/AiBarista';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-coffee-950 text-coffee-100 selection:bg-amber-500/30 selection:text-amber-200">
      <Hero />
      
      <div className="relative z-30 bg-coffee-950 shadow-[0_-20px_40px_rgba(0,0,0,0.5)]">
        <Menu />
        
        <About />

        {/* Footer */}
        <footer className="py-12 bg-black text-coffee-600 text-center border-t border-coffee-900">
          <h2 className="font-serif text-2xl text-coffee-500 mb-4">Parallax Brew</h2>
          <div className="flex justify-center gap-6 mb-8 text-sm font-medium">
            <a href="#" className="hover:text-amber-500 transition-colors">Instagram</a>
            <a href="#" className="hover:text-amber-500 transition-colors">Twitter</a>
            <a href="#" className="hover:text-amber-500 transition-colors">Contact</a>
          </div>
          <p className="text-xs">&copy; {new Date().getFullYear()} Parallax Brew. All rights reserved.</p>
        </footer>
      </div>

      <AiBarista />
    </div>
  );
};

export default App;