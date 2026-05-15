import React, { useState } from 'react';
import { PaperPlaneTilt, CheckCircle } from '@phosphor-icons/react';

const RepairForm = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 bg-orange-500/20 text-orange-500 rounded-full flex items-center justify-center mb-6">
          <CheckCircle size={40} weight="fill" />
        </div>
        <h4 className="text-xl font-medium text-zinc-100 mb-2">Solicitação Enviada!</h4>
        <p className="text-zinc-400">Nossa equipe técnica entrará em contato em breve via WhatsApp para confirmar o diagnóstico.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-zinc-400 ml-1">Seu Nome</label>
        <input 
          required
          type="text" 
          placeholder="Ex: Caio Rodrigues"
          className="w-full h-12 px-4 rounded-2xl bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-orange-500 transition-colors"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-zinc-400 ml-1">WhatsApp / Telefone</label>
        <input 
          required
          type="tel" 
          placeholder="(11) 99999-9999"
          className="w-full h-12 px-4 rounded-2xl bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-orange-500 transition-colors"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-zinc-400 ml-1">Aparelho e Problema</label>
        <textarea 
          required
          placeholder="Ex: iPhone 13 Pro Max - Tela quebrada e bateria descarregando rápido"
          rows={3}
          className="w-full p-4 rounded-2xl bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-orange-500 transition-colors resize-none"
        />
      </div>

      <button 
        type="submit"
        className="h-14 w-full rounded-full bg-orange-500 text-zinc-950 font-medium hover:bg-orange-400 transition-colors flex items-center justify-center gap-2 mt-4"
      >
        Enviar Solicitação
        <PaperPlaneTilt size={20} weight="bold" />
      </button>
      
      <p className="text-[10px] text-center text-zinc-600 uppercase tracking-widest">
        Seus dados estão seguros sob nossa política de privacidade
      </p>
    </form>
  );
};

export default RepairForm;
