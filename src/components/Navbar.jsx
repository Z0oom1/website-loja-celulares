import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { List, X, Desktop, BatteryFull, Headphones, Wrench } from '@phosphor-icons/react';
import MagneticButton from './MagneticButton';
import Modal from './Modal';
import RepairForm from './RepairForm';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [repairModalOpen, setRepairModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'py-4' : 'py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className={`flex items-center justify-between rounded-[2rem] px-6 py-4 ${
            scrolled ? 'liquid-glass' : 'bg-transparent'
          }`}>
            <div className="flex items-center gap-3">
              <img src="/images/logo.png" alt="LabTec Logo" className="h-12 w-auto object-contain" />
              <span className="text-2xl font-bold tracking-tighter">
                <span className="text-white">Up</span>
                <span className="text-[#FF6900]">Cell</span>
              </span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <a href="#services" className="text-sm font-medium text-zinc-400 hover:text-orange-500 transition-colors">Serviços</a>
              <a href="#products" className="text-sm font-medium text-zinc-400 hover:text-orange-500 transition-colors">Loja</a>
              <a href="#feedbacks" className="text-sm font-medium text-zinc-400 hover:text-orange-500 transition-colors">Feedbacks</a>
              <a href="#about" className="text-sm font-medium text-zinc-400 hover:text-orange-500 transition-colors">Sobre</a>
              <MagneticButton>
                <button 
                  onClick={() => setRepairModalOpen(true)}
                  className="px-6 py-2.5 rounded-full bg-zinc-100 text-zinc-950 text-sm font-medium hover:bg-orange-500 transition-colors"
                >
                  Agendar Reparo
                </button>
              </MagneticButton>
            </div>

            <button 
              className="md:hidden text-zinc-100 p-2"
              onClick={() => setMobileMenuOpen(true)}
            >
              <List size={24} />
            </button>
          </div>
        </div>
      </motion.nav>

      <Modal 
        isOpen={repairModalOpen} 
        onClose={() => setRepairModalOpen(false)}
        title="Agendar Reparo"
      >
        <RepairForm />
      </Modal>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className="fixed inset-0 z-[60] liquid-glass flex flex-col items-center justify-center"
          >
            <button 
              className="absolute top-8 right-8 text-zinc-100 p-4"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X size={32} />
            </button>
            <div className="flex flex-col items-center gap-8 text-2xl font-medium text-zinc-100">
              <a href="#services" onClick={() => setMobileMenuOpen(false)}>Serviços</a>
              <a href="#products" onClick={() => setMobileMenuOpen(false)}>Loja</a>
              <button onClick={() => {
                setMobileMenuOpen(false);
                setRepairModalOpen(true);
              }}>Agendar Reparo</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
