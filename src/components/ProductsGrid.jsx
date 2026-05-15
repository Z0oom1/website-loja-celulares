import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { DeviceMobile, Headset, BatteryCharging, ArrowRight, Desktop, MagnifyingGlass, Funnel, Tag } from '@phosphor-icons/react';
import ProductModal from './ProductModal';

const products = [
  { 
    id: 1, 
    name: 'iPhone 15 Pro Max', 
    category: 'iPhone', 
    price: 'R$ 7.499', 
    status: 'disponivel',
    date: '2024-05-14',
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
    category: 'Mac', 
    price: 'R$ 8.999', 
    status: 'disponivel',
    date: '2024-05-12',
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
    category: 'Watch', 
    price: 'R$ 3.299', 
    status: 'vendido',
    date: '2024-05-10',
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
    category: 'Audio', 
    price: 'R$ 1.599', 
    status: 'disponivel',
    date: '2024-05-15',
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
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todos');
  const containerRef = useRef(null);

  const categories = ['Todos', 'iPhone', 'Mac', 'Watch', 'Audio'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'Todos' || product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const blobY1 = useTransform(scrollYProgress, [0, 1], [-150, 150]);
  const blobY2 = useTransform(scrollYProgress, [0, 1], [150, -150]);

  return (
    <section ref={containerRef} id="products" className="py-32 relative overflow-hidden">
      {/* Decoração de Fundo Dinâmica */}
      <motion.div 
        style={{ y: blobY1 }}
        className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange-600/5 rounded-full blur-[130px] pointer-events-none" 
      />
      <motion.div 
        style={{ y: blobY2 }}
        className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[110px] pointer-events-none" 
      />

      <div className="max-w-7xl mx-auto w-full px-4 md:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div>
            <h2 className="text-sm font-mono text-orange-500 uppercase tracking-widest mb-4">Estoque de Renovados</h2>
            <h3 className="text-4xl md:text-5xl font-medium tracking-tight text-zinc-100">Hardware premium.<br/>Sem concessões.</h3>
          </div>
          
          <div className="flex flex-col gap-4 w-full md:w-auto">
            {/* Barra de Busca */}
            <div className="relative group max-w-md">
              <MagnifyingGlass size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-orange-500 transition-colors" />
              <input 
                type="text" 
                placeholder="Buscar modelo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-12 pl-12 pr-4 bg-zinc-900/50 border border-zinc-800 rounded-2xl text-zinc-100 focus:outline-none focus:border-orange-500/50 transition-all placeholder:text-zinc-600"
              />
            </div>

            {/* Botões de Filtro (Chips) */}
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                    activeCategory === cat 
                      ? 'bg-orange-500 text-zinc-950' 
                      : 'bg-zinc-900 text-zinc-400 hover:text-zinc-100 border border-zinc-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className={`group cursor-pointer ${product.status === 'vendido' ? 'grayscale opacity-70' : ''}`}
            onClick={() => setSelectedProduct(product)}
          >
            <div className="aspect-[4/5] w-full rounded-[2.5rem] bg-zinc-900 border border-zinc-800/50 overflow-hidden relative mb-4 transition-all duration-500 group-hover:border-orange-500/30 flex items-center justify-center">
              {/* Imagem do Produto */}
              <div className="absolute inset-0 opacity-60 mix-blend-luminosity group-hover:opacity-100 group-hover:scale-105 transition-all duration-700">
                <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
              </div>

              {/* Container de Tags */}
              <div className="absolute top-6 left-6 right-6 flex justify-between items-start z-20">
                <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest backdrop-blur-md border ${
                  product.status === 'disponivel' 
                    ? 'bg-orange-500/20 text-orange-400 border-orange-500/20' 
                    : 'bg-zinc-800/80 text-zinc-400 border-white/5'
                }`}>
                  {product.status}
                </div>
                
                {product.status === 'vendido' && (
                  <div className="bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded rotate-12 shadow-xl border-2 border-white/20">
                    SOLD OUT
                  </div>
                )}
              </div>
              
              {/* Vidro de Sobreposição (Glass Effect) */}
              <div className="absolute bottom-6 left-6 right-6 liquid-glass rounded-2xl p-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 z-20">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-white">Ver Especificações</span>
                  <ArrowRight size={18} className="text-orange-500" />
                </div>
              </div>

              {/* Efeito de sobreposição para itens vendidos */}
              {product.status === 'vendido' && (
                <div className="absolute inset-0 bg-zinc-950/40 backdrop-grayscale flex items-center justify-center z-10">
                  <div className="border-4 border-zinc-500/30 p-4 rounded-full opacity-20">
                    <Tag size={80} weight="thin" className="text-zinc-100" />
                  </div>
                </div>
              )}
            </div>
            
            <div className="px-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-tighter flex items-center gap-1">
                  <div className={`w-1 h-1 rounded-full ${product.status === 'disponivel' ? 'bg-orange-500' : 'bg-zinc-600'}`} />
                  Postado em: {new Date(product.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
                </span>
                <p className="text-xs font-medium text-zinc-400">{product.category}</p>
              </div>
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-medium text-zinc-100 group-hover:text-orange-500 transition-colors">{product.name}</h4>
                <p className="text-lg font-mono font-bold text-zinc-100">{product.price}</p>
              </div>
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
