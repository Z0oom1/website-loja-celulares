import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { ArrowUpRight } from '@phosphor-icons/react';
import MagneticButton from './MagneticButton';
import Modal from './Modal';
import RepairForm from './RepairForm';

const Hero = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  
  const frameCount = 120;
  const currentFrame = (index) => `/images/frames/frame_${index.toString().padStart(5, '0')}.png`;

  // Scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const imagesRef = useRef([]);

  // Preload images
  useEffect(() => {
    const preloadImages = async () => {
      const loadedImages = [];
      const promises = [];

      for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        const promise = new Promise((resolve) => {
          img.onload = resolve;
          img.src = currentFrame(i);
        });
        loadedImages.push(img);
        promises.push(promise);
      }

      await Promise.all(promises);
      imagesRef.current = loadedImages;
      setIsLoaded(true);
      
      // Draw first frame
      renderCanvas(0);
    };

    preloadImages();
  }, []);

  const renderCanvas = (index) => {
    const canvas = canvasRef.current;
    const loadedImages = imagesRef.current;
    
    if (!canvas || loadedImages.length === 0) return;
    
    const context = canvas.getContext('2d');
    const img = loadedImages[index];
    
    if (img) {
      // Set canvas size once based on image
      if (canvas.width !== img.width) {
        canvas.width = img.width;
        canvas.height = img.height;
      }
      
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, 0, 0);
    }
  };

  // Update canvas on scroll
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!isLoaded) return;
    const frameIndex = Math.min(
      frameCount - 1,
      Math.floor(latest * frameCount)
    );
    renderCanvas(frameIndex);
  });

  // Opacity for hero text
  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-zinc-950">
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Background Decor - Blobs moved inside sticky to stay with video */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-orange-600/5 rounded-full blur-[100px] pointer-events-none" />

        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center z-50 bg-zinc-950">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin" />
              <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">Iniciando Sequência...</p>
            </div>
          </div>
        )}
        
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover opacity-60 pt-[120px]"
        />
        
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-transparent to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/20 via-transparent to-zinc-950 z-10" />
        
        {/* Hero Content */}
        <motion.div 
          style={{ opacity: textOpacity, y: textY }}
          className="relative z-20 h-full flex items-start pt-[120px]"
        >
          <div className="max-w-7xl mx-auto w-full px-4 md:px-8 pointer-events-auto">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-start gap-8 max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-sm font-medium text-orange-400">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                </span>
                Reparos no mesmo dia disponíveis
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter leading-[0.95] text-zinc-100">
                Especialista em iPhone.<br />
                <span className="text-zinc-500">Conserto e Vendas.</span>
              </h1>
              
              <p className="text-lg md:text-xl text-zinc-400 max-w-[35ch] leading-relaxed">
                Microssoldagem especializada, peças autênticas e precisão cirúrgica para eletrônicos modernos.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full sm:w-auto">
                <MagneticButton>
                  <button 
                    onClick={() => setModalOpen(true)}
                    className="h-14 px-8 rounded-full bg-zinc-100 text-zinc-950 text-base font-medium hover:bg-orange-500 transition-colors flex items-center justify-center gap-2 w-full sm:w-auto"
                  >
                    Agendar Diagnóstico
                    <ArrowUpRight size={20} weight="bold" />
                  </button>
                </MagneticButton>
                
                <button 
                  onClick={() => {
                    window.scrollTo({
                      top: containerRef.current.offsetHeight,
                      behavior: 'smooth'
                    });
                  }}
                  className="h-14 px-8 rounded-full border border-white/10 bg-transparent text-zinc-300 text-base font-medium hover:bg-white/5 transition-colors flex items-center justify-center w-full sm:w-auto"
                >
                  Explorar Loja
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <Modal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)}
        title="Agendar Diagnóstico"
      >
        <RepairForm />
      </Modal>
    </div>
  );
};

export default Hero;
