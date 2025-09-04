
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <i className="fas fa-leaf text-brand-green text-2xl"></i>
          <h1 className="text-xl font-bold text-brand-dark">CarbonCalc</h1>
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <a href="#info" className="text-brand-gray hover:text-brand-green transition-colors">O Que É</a>
          <a href="#calculator" className="text-brand-gray hover:text-brand-green transition-colors">Calculadora</a>
          <a href="#results" className="text-brand-gray hover:text-brand-green transition-colors">Resultados</a>
        </div>
      </nav>
    </header>
  );
};
