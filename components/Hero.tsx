import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black">
      {/* Background Abstract Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-motion-blue rounded-full mix-blend-screen filter blur-[128px] opacity-20 animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-600 rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="z-10 text-center px-4 max-w-4xl">
        <h2 className="text-motion-blue font-mono mb-4 tracking-widest uppercase text-sm md:text-base">
          Telegram Channel
        </h2>
        <h1 className="font-display text-6xl md:text-9xl font-bold mb-6 tracking-tighter text-white">
          MOTION <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            THIS
          </span>
        </h1>
        <p className="font-sans text-xl md:text-2xl text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
          Моушен-дизайн. Жизнь. Нейросети.
          <br />
          <span className="text-sm text-gray-500 mt-2 block">
             (И немного про поиски жены)
          </span>
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <a 
            href="https://t.me/Motion_This" 
            target="_blank" 
            rel="noreferrer"
            className="group relative px-8 py-4 bg-white text-black font-bold rounded-full overflow-hidden hover:scale-105 transition-transform duration-300"
          >
            <span className="relative z-10 group-hover:text-motion-blue transition-colors">Подписаться на канал</span>
          </a>
          <a 
            href="#chat"
            className="px-8 py-4 border border-white/20 text-white rounded-full hover:bg-white/10 transition-colors backdrop-blur-sm"
          >
            Поговорить с AI Владом
          </a>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-10 animate-bounce text-gray-500">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 13l5 5 5-5M7 6l5 5 5-5"/>
        </svg>
      </div>
    </div>
  );
};

export default Hero;