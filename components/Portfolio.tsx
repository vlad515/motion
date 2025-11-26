import React from 'react';

const projects = [
  {
    id: 1,
    title: "Neon Genesis",
    category: "3D Animation",
    image: "https://picsum.photos/id/132/800/600",
    description: "Экспериментальная 3D анимация с использованием процедурной генерации и неонового освещения."
  },
  {
    id: 2,
    title: "Cyberpunk City",
    category: "Motion Graphics",
    image: "https://picsum.photos/id/122/800/600",
    description: "Визуализация города будущего для музыкального клипа популярного исполнителя."
  },
  {
    id: 3,
    title: "Abstract Flow",
    category: "Simulation",
    image: "https://picsum.photos/id/20/800/600",
    description: "Симуляция жидкости и частиц в невесомости для заставки конференции."
  },
  {
    id: 4,
    title: "Tech Intro",
    category: "Commercial",
    image: "https://picsum.photos/id/180/800/600",
    description: "Динамичная заставка для технологического YouTube канала с миллионной аудиторией."
  }
];

const Portfolio: React.FC = () => {
  return (
    <section id="portfolio" className="py-20 px-4 bg-motion-dark border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-4">
            Избранные <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Работы</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Визуальные эксперименты, коммерческие проекты и все то, что заставляет пиксели двигаться.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="group relative rounded-2xl overflow-hidden cursor-pointer h-[300px] md:h-[400px]">
              {/* Image Container */}
              <div className="absolute inset-0 bg-gray-800">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300"></div>
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-motion-blue text-xs font-bold uppercase tracking-wider mb-2 block opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {project.category}
                  </span>
                  <h3 className="text-3xl font-display font-bold text-white mb-2">{project.title}</h3>
                  <div className="h-0 overflow-hidden group-hover:h-auto transition-all duration-500">
                     <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200 pt-2 border-t border-white/10 mt-2">
                      {project.description}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Corner Accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-motion-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
        
        <div className="flex flex-col items-center gap-8 mt-16">
            <a href="#" className="group inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm font-medium uppercase tracking-widest">
                <span>Смотреть все работы</span>
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </a>

            <a href="mailto:vlad@motionthis.com" className="px-12 py-4 bg-motion-blue text-white font-display font-bold text-xl rounded-full hover:bg-blue-600 transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(0,163,255,0.3)] hover:shadow-[0_0_50px_rgba(0,163,255,0.5)]">
                Нанять меня
            </a>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;