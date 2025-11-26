import React from 'react';

const StatCard: React.FC<{ number: string; label: string; subtext?: string }> = ({ number, label, subtext }) => (
  <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-md hover:bg-white/10 transition-colors duration-300">
    <div className="text-4xl md:text-5xl font-display font-bold text-motion-blue mb-2">{number}</div>
    <div className="text-xl font-bold text-white mb-1">{label}</div>
    {subtext && <div className="text-sm text-gray-400">{subtext}</div>}
  </div>
);

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 px-4 bg-motion-dark relative">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          <div className="order-2 md:order-1 space-y-8">
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
              Привет, я <span className="gradient-text">Влад</span>.
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Я создаю движение на экране и в жизни. Веду канал <b>Motion This</b>, где делюсь инсайтами индустрии, генерирую безумные вещи в нейросетях и показываю закулисье жизни моушен-дизайнера.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatCard number="32" label="Года" subtext="В самом расцвете сил" />
              <StatCard number="∞" label="Котиков" subtext="Укротитель со стажем" />
              <StatCard number="0" label="Жен" subtext="Вакансия открыта" />
            </div>
            
            <div className="pt-4">
               <button 
                 onClick={() => document.getElementById('chat')?.scrollIntoView({ behavior: 'smooth' })}
                 className="text-motion-blue underline hover:text-white transition-colors"
               >
                 Узнать больше обо мне через AI &rarr;
               </button>
            </div>
          </div>

          <div className="order-1 md:order-2 relative h-[500px] w-full bg-gradient-to-br from-gray-900 to-black rounded-3xl border border-white/10 overflow-hidden flex items-end justify-center group">
             {/* Abstract Representation of Vlad */}
             <div className="absolute top-10 right-10 text-right opacity-50">
                <div className="text-6xl font-display font-bold">VLAD</div>
                <div className="text-sm">VERSION 1.0</div>
             </div>
             
             {/* Silhouette / Graphic */}
             <div className="w-1/3 h-[90%] bg-white/10 rounded-t-full relative backdrop-blur-sm group-hover:h-[95%] transition-all duration-500 ease-out">
                <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-20 h-2 bg-motion-blue/50 blur-md"></div>
                <div className="absolute bottom-10 left-0 w-full text-center text-xs text-gray-500 font-mono">
                   MODEL: VLAD_MAIN
                </div>
             </div>
             
             {/* Interactive Floating Cats */}
             <div className="absolute top-1/3 left-10 w-16 h-16 bg-orange-500/20 rounded-full blur-xl animate-float"></div>
             <div className="absolute top-1/2 right-20 w-12 h-12 bg-blue-500/20 rounded-full blur-xl animate-float" style={{ animationDelay: '2s'}}></div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;