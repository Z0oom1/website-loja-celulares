import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Cpu, Drop, ShieldCheck, Lightning } from '@phosphor-icons/react';

const Services = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const blobY1 = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const blobY2 = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={containerRef} id="services" className="py-32 relative bg-zinc-950 overflow-hidden">
      {/* Decoração de Fundo Dinâmica */}
      <motion.div 
        style={{ y: blobY1 }}
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-600/5 rounded-full blur-[120px] pointer-events-none" 
      />
      <motion.div 
        style={{ y: blobY2 }}
        className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-500/5 rounded-full blur-[100px] pointer-events-none" 
      />
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        <div className="mb-20 max-w-2xl">
          <h2 className="text-sm font-mono text-orange-500 uppercase tracking-widest mb-4">Serviços Especializados</h2>
          <h3 className="text-4xl md:text-6xl font-medium tracking-tight text-zinc-100 mb-6">
            Precisão cirúrgica.<br/>Diagnósticos em nível micro.
          </h3>
          <p className="text-xl text-zinc-400 leading-relaxed">
            Não trocamos apenas telas. Diagnosticamos falhas em placas lógicas, recuperamos dados de dispositivos mortos e realizamos reparos de microssoldagem nível 3.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card principal grande */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 rounded-[2.5rem] bg-zinc-900 border border-zinc-800/50 p-8 md:p-12 relative overflow-hidden flex flex-col justify-between min-h-[400px]"
          >
            <div className="absolute inset-0 z-0">
              <img src="/images/team.png" alt="Technician working" className="w-full h-full object-cover opacity-30 mix-blend-luminosity" />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/80 to-transparent" />
            </div>
            
            <div className="relative z-10 flex items-center justify-between w-full">
              <div className="p-3 bg-zinc-800/50 rounded-2xl backdrop-blur-md inline-block w-fit">
                <Cpu size={32} className="text-orange-400" />
              </div>
              <span className="px-3 py-1 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-xs font-mono">CERTIFICADO NÍVEL 3</span>
            </div>
            
            <div className="relative z-10 mt-32 max-w-md">
              <h4 className="text-2xl font-medium text-zinc-100 mb-3">Reparo de Placa Lógica</h4>
              <p className="text-zinc-400 leading-relaxed">
                Reparo em nível de componente para danos por água, curtos-circuitos e placas inativas. Rastreamos os esquemas para encontrar o capacitor exato que falhou.
              </p>
            </div>
          </motion.div>

          {/* Cards laterais */}
          <div className="flex flex-col gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex-1 rounded-[2.5rem] bg-zinc-900 border border-zinc-800/50 p-8 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Drop size={120} weight="fill" className="text-blue-500 -rotate-12 translate-x-8 -translate-y-8" />
              </div>
              <Drop size={28} className="text-zinc-100 mb-6" />
              <h4 className="text-xl font-medium text-zinc-100 mb-2">Danos por Líquido</h4>
              <p className="text-sm text-zinc-400">Limpeza ultrassônica e reflow para resgatar dispositivos expostos à umidade.</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex-1 rounded-[2.5rem] bg-zinc-900 border border-zinc-800/50 p-8 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Lightning size={120} weight="fill" className="text-amber-500 rotate-12 translate-x-8 -translate-y-8" />
              </div>
              <Lightning size={28} className="text-zinc-100 mb-6" />
              <h4 className="text-xl font-medium text-zinc-100 mb-2">Gestão de Energia</h4>
              <p className="text-sm text-zinc-400">Diagnóstico e substituição de PMICs e CIs de carga defeituosos.</p>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Services;
