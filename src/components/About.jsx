import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Phone, InstagramLogo, WhatsappLogo } from '@phosphor-icons/react';

const About = () => {
  return (
    <section id="about" className="py-32 bg-zinc-950 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-sm font-mono text-orange-500 uppercase tracking-widest mb-4">Sobre a UpCell</h2>
            <h3 className="text-4xl md:text-5xl font-medium text-zinc-100 mb-8 leading-tight">
              Excelência técnica em<br />
              <span className="text-zinc-500 font-normal italic">cada detalhe.</span>
            </h3>
            
            <div className="space-y-6 text-zinc-400 text-lg leading-relaxed mb-12">
              <p>
                A UpCell nasceu da paixão pela engenharia de precisão e pelo desejo de oferecer um serviço de manutenção de eletrônicos que realmente entende a complexidade dos dispositivos Apple.
              </p>
              <p>
                Especializados em microssoldagem, recuperação de Face ID e reparos avançados em placa-mãe, nosso laboratório conta com tecnologia de ponta para garantir que seu dispositivo retorne às especificações de fábrica.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 hover:border-orange-500/30 transition-colors">
                <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500 mb-4">
                  <Clock size={24} />
                </div>
                <h4 className="text-zinc-100 font-medium mb-1">Horário de Atendimento</h4>
                <p className="text-sm text-zinc-500">Seg à Sex: 09h às 18h<br />Sábados: 09h às 12h</p>
              </div>

              <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 hover:border-orange-500/30 transition-colors">
                <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500 mb-4">
                  <MapPin size={24} />
                </div>
                <h4 className="text-zinc-100 font-medium mb-1">Localização</h4>
                <p className="text-sm text-zinc-500">Regente Feijó - SP<br />CEP: 19570-194</p>
              </div>
            </div>

            <div className="mt-10 flex items-center gap-6">
              <a href="#" className="flex items-center gap-2 text-zinc-400 hover:text-orange-500 transition-colors">
                <InstagramLogo size={24} />
                <span className="text-sm font-medium">@upcell.oficial</span>
              </a>
              <a href="#" className="flex items-center gap-2 text-zinc-400 hover:text-orange-500 transition-colors">
                <WhatsappLogo size={24} />
                <span className="text-sm font-medium">Falar com Especialista</span>
              </a>
            </div>
          </motion.div>

          {/* Map Embed */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-square w-full rounded-[3rem] overflow-hidden border border-zinc-800 shadow-2xl relative">
              {/* Overlay for glass effect */}
              <div className="absolute inset-0 pointer-events-none border-[12px] border-zinc-950/40 rounded-[3rem] z-10" />
              
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14781.445214068222!2d-51.3090623!3d-22.2155792!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94943f5544710979%3A0x877660a92f0367d5!2sRegente%20Feij%C3%B3%2C%20SP%2C%2019570-000!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr" 
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: 'grayscale(1) invert(0.9) contrast(1.2)' }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            
            {/* Location Badge */}
            <div className="absolute -bottom-6 -right-6 md:right-12 liquid-glass p-6 rounded-3xl border border-white/10 shadow-2xl z-20 hidden md:block">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-orange-500 flex items-center justify-center text-zinc-950 shadow-lg shadow-orange-500/20">
                  <MapPin size={28} weight="fill" />
                </div>
                <div>
                  <p className="text-zinc-100 font-bold">Venha nos visitar</p>
                  <p className="text-zinc-400 text-sm">Regente Feijó, São Paulo</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;
