import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { DeviceMobile, Headset, BatteryCharging, ArrowRight, Desktop } from '@phosphor-icons/react';
import ProductModal from './ProductModal';

const products = [
  { 
    id: 1, 
    name: 'iPhone 15 Pro Max', 
    category: 'Apple • Titânio Natural', 
    price: 'R$ 7.499', 
    icon: DeviceMobile,
    images: [
      '/images/iphone_front.png',
      '/images/iphone_back.png',
      '/images/iphone_angle.png'
    ],
    details: [
      { label: 'Saúde da Bateria', value: '88%', status: 'Original', icon: '🔋' },
      { label: 'Ciclos da Bateria', value: '526 ciclos', status: 'Verificado', icon: '🔄' },
      { label: 'Tela', value: 'OLED ProMotion', status: 'Trocada Premium', icon: '📱' },
      { label: 'Carcaça', value: 'Titânio Natural', status: 'Original', icon: '🛡️' },
    ]
  },
  { 
    id: 2, 
    name: 'MacBook Air M2', 
    category: 'Portáteis • Meia-noite', 
    price: 'R$ 8.999', 
    icon: Desktop,
    images: [
      '/images/m2/macbookm2.jpg',
      '/images/m2/macbookm2-2.jpg',
      '/images/m2/macbookm2-3.jpg'
    ],
    details: [
      { label: 'Saúde da Bateria', value: '100%', status: 'Original', icon: '🔋' },
      { label: 'Ciclos da Bateria', value: '12 ciclos', status: 'Novo', icon: '🔄' },
      { label: 'Teclado', value: 'ABNT2', status: 'Original', icon: '⌨️' },
      { label: 'Carcaça', value: 'Meia-noite', status: 'Perfeito', icon: '💻' },
    ]
  },
  { 
    id: 3, 
    name: 'Apple Watch Series 9', 
    category: 'Wearables • Estelar', 
    price: 'R$ 3.299', 
    icon: BatteryCharging,
    images: [
      '/images/watch/watch.jpg',
      '/images/watch/watch-2.jpg',
      '/images/watch/watch-3.jpg'
    ],
    details: [
      { label: 'Saúde da Bateria', value: '100%', status: 'Original', icon: '🔋' },
      { label: 'Tela', value: 'Oled Retina', status: 'Original', icon: '📱' },
      { label: 'Sensores', value: 'Todos ativos', status: 'Verificado', icon: '❤️' },
    ]
  },
  { 
    id: 4, 
    name: 'AirPods Pro (2ª Ger)', 
    category: 'Apple • USB-C', 
    price: 'R$ 1.599', 
    icon: Headset,
    images: [
      '/images/airpods/airpods1.jpg',
      '/images/airpods/airpods2.jpg',
      '/images/airpods/airpods3.jpg'
    ],
    details: [
      { label: 'Cancelamento', value: 'Ativo 2x mais', status: 'Original', icon: '🔇' },
      { label: 'Case', value: 'MagSafe (USB-C)', status: 'Original', icon: '⚡' },
      { label: 'Som', value: 'Espacial Personalizado', status: 'Original', icon: '🎧' },
      { label: 'Autenticidade', value: 'Série Verificada', status: 'Original', icon: '✅' },
    ]
  },
];

const ProductsGrid = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const blobY1 = useTransform(scrollYProgress, [0, 1], [-150, 150]);
  const blobY2 = useTransform(scrollYProgress, [0, 1], [150, -150]);

  return (
    <section ref={containerRef} id="products" className="py-32 relative overflow-hidden">
      {/* Dynamic Background Decor */}
      <motion.div 
        style={{ y: blobY1 }}
        className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange-600/5 rounded-full blur-[130px] pointer-events-none" 
      />
      <motion.div 
        style={{ y: blobY2 }}
        className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[110px] pointer-events-none" 
      />

      <div className="max-w-7xl mx-auto w-full px-4 md:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div>
          <h2 className="text-sm font-mono text-orange-500 uppercase tracking-widest mb-4">Estoque de Renovados</h2>
          <h3 className="text-4xl md:text-5xl font-medium tracking-tight text-zinc-100">Hardware premium.<br/>Sem concessões.</h3>
        </div>
        <button className="flex items-center gap-2 text-zinc-400 hover:text-zinc-100 transition-colors group">
          Ver todos os produtos 
          <ArrowRight className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
            className="group cursor-pointer"
            onClick={() => setSelectedProduct(product)}
          >
            <div className="aspect-[4/5] w-full rounded-[2rem] bg-zinc-900 border border-zinc-800/50 overflow-hidden relative mb-4 transition-colors group-hover:border-zinc-700/50 flex items-center justify-center">
              <div className="absolute inset-0 opacity-40 mix-blend-luminosity group-hover:opacity-60 transition-opacity">
                <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
              </div>
              
              <Desktop size={64} weight="thin" className="text-zinc-100/20 group-hover:text-orange-500 group-hover:scale-110 transition-all duration-500 relative z-10" />
              
              <div className="absolute bottom-4 left-4 right-4 liquid-glass rounded-xl p-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                <span className="text-sm font-medium text-zinc-100 flex items-center justify-center gap-2">
                  Ver Detalhes <ArrowRight size={16} />
                </span>
              </div>
            </div>
            
            <div className="flex items-center justify-between px-2">
              <div>
                <p className="text-sm text-zinc-500 mb-1">{product.category}</p>
                <p className="text-lg font-medium text-zinc-100">{product.name}</p>
              </div>
              <p className="text-lg font-mono text-zinc-400">{product.price}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <ProductModal 
        isOpen={!!selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
        product={selectedProduct}
      />
      </div>
    </section>
  );
};

export default ProductsGrid;
