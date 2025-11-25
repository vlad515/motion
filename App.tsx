import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import ChatInterface from './components/ChatInterface';
import CatGallery from './components/CatGallery';
import TelegramFeed from './components/TelegramFeed';

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-black min-h-screen text-white selection:bg-motion-blue selection:text-white">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-md py-4 border-b border-white/10' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="font-display font-bold text-xl tracking-tighter cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            MOTION THIS
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-gray-300">
            <a href="#about" className="hover:text-white transition-colors">Обо мне</a>
            <a href="#feed" className="hover:text-white transition-colors">Блог</a>
            <a href="#chat" className="hover:text-motion-blue transition-colors">AI Чат</a>
            <a href="#cats" className="hover:text-white transition-colors">Котики</a>
          </div>
          <a 
            href="https://t.me/Motion_This"
            target="_blank"
            rel="noreferrer" 
            className="bg-white text-black px-4 py-2 rounded-full font-bold text-sm hover:bg-motion-blue hover:text-white transition-colors"
          >
            Telegram
          </a>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        <Hero />
        <About />
        <TelegramFeed />
        <ChatInterface />
        <CatGallery />
      </main>

      {/* Footer */}
      <footer className="bg-motion-dark py-12 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="font-display font-bold text-2xl mb-2">MOTION THIS</h3>
            <p className="text-gray-500 text-sm">Design. Life. Neural Networks.</p>
          </div>
          <div className="flex gap-6">
            <a href="https://t.me/Motion_This" className="text-gray-400 hover:text-motion-blue transition-colors">Telegram Channel</a>
            <a href="#" className="text-gray-400 hover:text-motion-blue transition-colors">Instagram</a>
            <a href="#" className="text-gray-400 hover:text-motion-blue transition-colors">Behance</a>
          </div>
          <div className="text-gray-600 text-sm">
            © {new Date().getFullYear()} Vlad. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;