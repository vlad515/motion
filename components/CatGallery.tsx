import React from 'react';
import { CatProfile } from '../types';

const cats: CatProfile[] = [
  { id: 101, name: "Пиксель", role: "Арт-директор", image: "https://picsum.photos/id/40/600/600" },
  { id: 102, name: "Рендер", role: "Спит на клавиатуре", image: "https://picsum.photos/id/219/600/600" },
  { id: 103, name: "Глитч", role: "Ловец багов", image: "https://picsum.photos/id/237/600/600" },
  { id: 104, name: "Фрейм", role: "Модель", image: "https://picsum.photos/id/433/600/600" },
];

const CatGallery: React.FC = () => {
  return (
    <section id="cats" className="py-20 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-display font-bold mb-12 text-center">
          Команда <span className="text-motion-blue">Укротителя</span>
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cats.map((cat) => (
            <div key={cat.id} className="group relative overflow-hidden rounded-2xl cursor-pointer">
              <div className="aspect-square bg-gray-800">
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <h3 className="text-xl font-bold text-white">{cat.name}</h3>
                <p className="text-motion-blue text-sm">{cat.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CatGallery;