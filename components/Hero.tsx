
import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section className="bg-white">
      <div className="container mx-auto px-6 py-20 text-center">
        <div className="w-full max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold text-brand-dark mb-4 animate-fade-in-up">
            Calcule a Pegada de Carbono da sua Empresa
          </h2>
          <p className="text-lg text-brand-gray mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Uma ferramenta essencial para um futuro mais sustentável. Entenda o impacto das suas operações e descubra como reduzi-lo.
          </p>
          <a
            href="#calculator"
            className="bg-brand-green hover:bg-brand-dark-green text-white font-bold py-3 px-8 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 animate-fade-in-up"
            style={{ animationDelay: '0.4s' }}
          >
            Começar a Calcular
          </a>
        </div>
      </div>
    </section>
  );
};
