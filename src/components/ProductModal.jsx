import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CaretLeft, CaretRight, ShoppingCartSimple, CheckCircle, PaperPlaneTilt } from '@phosphor-icons/react';

const ProductModal = ({ isOpen, onClose, product }) => {
  const [currentStep, setCurrentStep] = useState('detail'); // 'detail' (detalhe) ou 'checkout' (finalização)
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  if (!product) return null;

  const images = product.images || [product.image];

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleClose = () => {
    setCurrentStep('detail');
    setSubmitted(false);
    setCurrentImageIndex(0);
    onClose();
  };

  const renderDetail = () => (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Slider de Imagem */}
      <div className="w-full lg:w-1/2 aspect-square relative rounded-3xl overflow-hidden bg-zinc-800">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImageIndex}
            src={images[currentImageIndex]}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className={`w-full h-full object-cover transition-all duration-700 ${product.status === 'vendido' ? 'grayscale' : ''}`}
          />
        </AnimatePresence>

        {product.status === 'vendido' && (
          <div className="absolute inset-0 bg-zinc-950/20 flex items-center justify-center pointer-events-none z-10">
            <div className="bg-red-500 text-white text-xs font-black px-4 py-2 rounded-lg rotate-12 shadow-2xl border-2 border-white/20 scale-150">
              VENDIDO
            </div>
          </div>
        )}
        
        {images.length > 1 && (
          <>
            <button 
              onClick={handlePrevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-zinc-950/40 backdrop-blur-md text-white hover:bg-zinc-950/60 transition-colors"
            >
              <CaretLeft size={24} />
            </button>
            <button 
              onClick={handleNextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-zinc-950/40 backdrop-blur-md text-white hover:bg-zinc-950/60 transition-colors"
            >
              <CaretRight size={24} />
            </button>
          </>
        )}

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, i) => (
            <div 
              key={i} 
              className={`w-1.5 h-1.5 rounded-full transition-all ${i === currentImageIndex ? 'w-4 bg-orange-500' : 'bg-white/30'}`}
            />
          ))}
        </div>
      </div>

      {/* Conteúdo de Informação */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between">
        <div>
          <h3 className="text-3xl font-medium text-zinc-100 mb-2">{product.name}</h3>
          <p className="text-zinc-500 font-mono text-sm mb-6 uppercase tracking-widest">{product.category}</p>
          
          <div className="space-y-4">
            {product.details?.map((detail, index) => (
              <div key={index} className="flex items-center gap-3 p-4 rounded-2xl bg-zinc-800/50 border border-zinc-800">
                <span className="text-xl">{detail.icon}</span>
                <div>
                  <p className="text-xs text-zinc-500 uppercase font-mono tracking-tighter">{detail.label}</p>
                  <p className="text-zinc-100 font-medium">{detail.value} <span className="text-zinc-500 text-xs font-normal">({detail.status})</span></p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-zinc-800 flex items-center justify-between">
          <div>
            <p className="text-sm text-zinc-500 mb-1">Valor à vista</p>
            <p className="text-3xl font-mono font-medium text-orange-500">{product.price}</p>
          </div>
          <button 
            disabled={product.status === 'vendido'}
            onClick={() => setCurrentStep('checkout')}
            className={`h-14 px-8 rounded-full font-medium transition-all flex items-center gap-2 ${
              product.status === 'vendido'
                ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700'
                : 'bg-zinc-100 text-zinc-950 hover:bg-orange-500'
            }`}
          >
            {product.status === 'vendido' ? 'Produto Indisponível' : 'Comprar Agora'}
            <ShoppingCartSimple size={20} weight="bold" />
          </button>
        </div>
      </div>
    </div>
  );

  const renderCheckout = () => {
    if (submitted) {
      return (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 bg-orange-500/20 text-orange-500 rounded-full flex items-center justify-center mb-6"
          >
            <CheckCircle size={48} weight="fill" />
          </motion.div>
          <h4 className="text-2xl font-medium text-zinc-100 mb-2">Pedido Recebido!</h4>
          <p className="text-zinc-400">Caio Rodrigues entrará em contato com você em instantes para finalizar a entrega do seu {product.name}.</p>
          <button 
            onClick={handleClose}
            className="mt-8 px-8 py-3 rounded-full border border-zinc-800 text-zinc-400 hover:text-zinc-100 transition-colors"
          >
            Voltar para a loja
          </button>
        </div>
      );
    }

    return (
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/3 aspect-square rounded-2xl overflow-hidden bg-zinc-800">
          <img src={product.images?.[0] || product.image} className="w-full h-full object-cover" />
        </div>
        
        <form 
          onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
          className="flex-1 flex flex-col gap-5"
        >
          <h4 className="text-xl font-medium text-zinc-100">Finalizar Interesse</h4>
          
          <div className="p-4 rounded-2xl bg-orange-500/5 border border-orange-500/20">
            <p className="text-orange-400 text-sm italic italic">
              "Olá! Tenho interesse em comprar o {product.name}."
            </p>
          </div>

          <div className="space-y-4">
            <input 
              required
              type="text" 
              placeholder="Seu Nome Completo"
              className="w-full h-12 px-4 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-100 focus:outline-none focus:border-orange-500 transition-colors"
            />
            <input 
              required
              type="tel" 
              placeholder="WhatsApp para contato"
              className="w-full h-12 px-4 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-100 focus:outline-none focus:border-orange-500 transition-colors"
            />
          </div>

          <button 
            type="submit"
            className="h-14 w-full rounded-full bg-orange-500 text-zinc-950 font-medium hover:bg-orange-400 transition-colors flex items-center justify-center gap-2 mt-2"
          >
            Confirmar Pedido
            <PaperPlaneTilt size={20} weight="bold" />
          </button>
        </form>
      </div>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-zinc-950/80 backdrop-blur-xl"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            className="relative w-full max-w-5xl bg-zinc-900 border border-zinc-800 rounded-[3rem] overflow-hidden shadow-2xl z-10"
          >
            <button 
              onClick={handleClose}
              className="absolute top-6 right-6 z-20 p-2 rounded-full bg-zinc-950/40 text-zinc-400 hover:text-zinc-100 transition-colors"
            >
              <X size={24} />
            </button>

            <div className="p-6 md:p-12 overflow-y-auto max-h-[90vh]">
              {currentStep === 'detail' ? renderDetail() : renderCheckout()}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProductModal;
