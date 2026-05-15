import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChatTeardropText, Image as ImageIcon, CheckCircle, X, CaretLeft, CaretRight } from '@phosphor-icons/react';

const feedbacks = [
  {
    id: 1,
    user: "Rodrigo Santos",
    date: "há 2 dias",
    rating: 5,
    text: "O iPhone 15 Pro Max chegou impecável! A bateria está realmente com a saúde que informaram. Atendimento do Caio é diferenciado. Já recomendei para todos os meus amigos que buscam qualidade Apple sem pagar preço de novo.",
    images: ["/images/iphone_front.png", "/images/iphone_back.png"],
    product: "iPhone 15 Pro Max",
    location: "São Paulo - SP"
  },
  {
    id: 2,
    user: "Mariana Oliveira",
    date: "há 1 semana",
    rating: 5,
    text: "Comprei o MacBook M2 e estou apaixonada. Super rápido e sem nenhuma marca de uso. O selo de verificação passa muita confiança. O processo de compra foi super transparente e a entrega via motoboy foi no mesmo dia.",
    images: ["/images/m2/macbookm2.jpg", "/images/m2/macbookm2-2.jpg"],
    product: "MacBook Air M2",
    location: "Regente Feijó - SP"
  },
  {
    id: 3,
    user: "Felipe Almeida",
    date: "há 2 semanas",
    rating: 5,
    text: "Minha primeira compra de um Apple Watch renovado e não me arrependo. Tudo funcionando, sensores ok. Recomendo demais! A tela está perfeita, sem um risco sequer.",
    images: ["/images/watch/watch.jpg", "/images/watch/watch-2.jpg"],
    product: "Apple Watch Series 9",
    location: "Presidente Prudente - SP"
  },
  {
    id: 4,
    user: "Juliana Costa",
    date: "há 1 mês",
    rating: 5,
    text: "AirPods originais e com cancelamento de ruído absurdo. Valeu cada centavo. Entrega foi super rápida aqui em Regente Feijó. O Caio tirou todas as minhas dúvidas antes de fechar.",
    images: ["/images/airpods/airpods1.jpg", "/images/airpods/airpods2.jpg"],
    product: "AirPods Pro 2",
    location: "Regente Feijó - SP"
  }
];

const Feedbacks = () => {
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [scrollX, setScrollX] = useState(0);
  const carouselRef = useRef(null);

  const handleScroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'next' ? 400 : -400;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Lógica para detectar se podemos rolar mais (simplificada para brevidade)
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const onScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  return (
    <section id="feedbacks" className="py-32 bg-zinc-950 relative overflow-hidden">
      {/* Decoração de Fundo */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,105,0,0.05),transparent_70%)]" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-sm font-mono text-orange-500 uppercase tracking-widest mb-4"
            >
              Comunidade UpCell
            </motion.h2>
            <motion.h3 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-medium text-zinc-100 tracking-tight"
            >
              Experiências Reais.<br />
              <span className="text-zinc-500 font-normal italic">Qualidade Comprovada.</span>
            </motion.h3>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => handleScroll('prev')}
              disabled={!canScrollLeft}
              className={`p-4 rounded-full border border-zinc-800 transition-all ${!canScrollLeft ? 'opacity-20 cursor-not-allowed' : 'bg-zinc-900 text-white hover:border-orange-500'}`}
            >
              <CaretLeft size={24} />
            </button>
            <button 
              onClick={() => handleScroll('next')}
              disabled={!canScrollRight}
              className={`p-4 rounded-full border border-zinc-800 transition-all ${!canScrollRight ? 'opacity-20 cursor-not-allowed' : 'bg-zinc-900 text-white hover:border-orange-500'}`}
            >
              <CaretRight size={24} />
            </button>
          </div>
        </div>

        {/* Container do Carrossel */}
        <div 
          ref={carouselRef}
          onScroll={onScroll}
          className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-8 snap-x snap-mandatory"
        >
          {feedbacks.map((item, index) => (
            <motion.div
              key={item.id}
              onClick={() => setSelectedFeedback(item)}
              className="min-w-[85vw] md:min-w-[400px] bg-zinc-900/40 border border-zinc-800 p-6 md:p-8 rounded-[2.5rem] md:rounded-[3rem] hover:border-orange-500/30 transition-all group relative overflow-hidden snap-center cursor-pointer"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500 font-bold text-lg">
                    {item.user[0]}
                  </div>
                  <div>
                    <h4 className="text-zinc-100 font-medium text-sm flex items-center gap-1">
                      {item.user}
                      <CheckCircle size={14} weight="fill" className="text-blue-500" />
                    </h4>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-tighter">{item.date}</p>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} size={12} md:size={14} weight="fill" className="text-orange-500" />
                  ))}
                </div>
              </div>

              <p className="text-zinc-300 leading-relaxed mb-8 italic line-clamp-3 text-sm md:text-base">
                "{item.text}"
              </p>

              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-zinc-800 mb-6">
                <img 
                  src={item.images[0]} 
                  alt="Feedback" 
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-0 md:group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <span className="text-xs font-medium text-white flex items-center gap-2">
                    Clique para detalhes <ImageIcon size={16} />
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">{item.product}</span>
                <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center md:group-hover:bg-orange-500 transition-colors">
                  <CaretRight size={16} className="text-zinc-500 md:group-hover:text-zinc-950" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Botão de Ação */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 flex justify-center"
        >
          <button className="h-14 px-10 rounded-full border border-zinc-800 bg-zinc-900/50 text-zinc-100 font-medium hover:bg-orange-500 hover:text-zinc-950 transition-all text-sm md:text-base">
            Fazer parte da Comunidade
          </button>
        </motion.div>
      </div>

      {/* Modal de Feedback */}
      <AnimatePresence>
        {selectedFeedback && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedFeedback(null)}
              className="absolute inset-0 bg-zinc-950/90 backdrop-blur-xl"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-zinc-900 border border-zinc-800 rounded-[2rem] md:rounded-[3rem] overflow-y-auto shadow-2xl z-10 p-6 md:p-12 custom-scrollbar"
            >
              <button 
                onClick={() => setSelectedFeedback(null)}
                className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full bg-zinc-800 text-zinc-400 hover:text-white transition-colors z-20"
              >
                <X size={24} />
              </button>

              <div className="flex flex-col lg:flex-row gap-8 md:gap-12">
                <div className="flex-1 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500 font-bold text-xl md:text-2xl">
                      {selectedFeedback.user[0]}
                    </div>
                    <div>
                      <h4 className="text-xl md:text-2xl font-medium text-white flex items-center gap-2">
                        {selectedFeedback.user}
                        <CheckCircle size={18} weight="fill" className="text-blue-500" />
                      </h4>
                      <p className="text-zinc-500 text-xs md:text-sm">{selectedFeedback.location} • {selectedFeedback.date}</p>
                    </div>
                  </div>

                  <div className="flex gap-1">
                    {[...Array(selectedFeedback.rating)].map((_, i) => (
                      <Star key={i} size={16} md:size={20} weight="fill" className="text-orange-500" />
                    ))}
                  </div>

                  <p className="text-zinc-300 text-base md:text-lg lg:text-xl leading-relaxed italic">
                    "{selectedFeedback.text}"
                  </p>

                  <div className="pt-6 md:pt-8 border-t border-zinc-800">
                    <p className="text-[10px] md:text-xs text-zinc-500 uppercase tracking-widest mb-4">Produto Adquirido</p>
                    <div className="inline-flex items-center gap-4 p-3 md:p-4 rounded-2xl bg-zinc-800/50 border border-zinc-800">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                        <ImageIcon size={20} md:size={24} />
                      </div>
                      <span className="text-sm md:text-base font-medium text-zinc-100">{selectedFeedback.product}</span>
                    </div>
                  </div>
                </div>

                <div className="w-full lg:w-1/2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
                  {selectedFeedback.images.map((img, idx) => (
                    <div key={idx} className="rounded-2xl md:rounded-3xl overflow-hidden border border-zinc-800 aspect-square lg:aspect-auto">
                      <img src={img} alt="Product Detail" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Feedbacks;

