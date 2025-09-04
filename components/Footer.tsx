
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-dark text-white">
      <div className="container mx-auto px-6 py-8 text-center">
        <p className="font-semibold">ADS - Projeto de Extensão I - Descomplica - Israel Rodrigues de Jesus</p>
        <p className="text-sm text-gray-400 mt-2">
          Desenvolvido como uma ferramenta para promover a conscientização e ação contra as mudanças climáticas, 
          alinhado aos Objetivos de Desenvolvimento Sustentável da ONU.
        </p>
        <div className="mt-4">
            <p className="text-gray-400">© {new Date().getFullYear()} CarbonCalc. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};
