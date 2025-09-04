import React, { useState } from 'react';
import type { Activity, ActivityCategory, TransportType } from '../types';

interface CalculatorProps {
  activities: Activity[];
  addActivity: (activity: Omit<Activity, 'id'>) => void;
  removeActivity: (id: number) => void;
  onCalculate: () => void;
}

const CategorySelector: React.FC<{ onSelect: (category: ActivityCategory) => void }> = ({ onSelect }) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <button onClick={() => onSelect('energia')} className="p-6 bg-yellow-100 text-yellow-800 rounded-lg shadow hover:bg-yellow-200 transition-all text-left">
            <i className="fas fa-bolt text-2xl mb-2"></i>
            <h3 className="font-bold text-lg">Energia</h3>
            <p className="text-sm">Consumo de eletricidade.</p>
        </button>
        <button onClick={() => onSelect('transporte')} className="p-6 bg-blue-100 text-blue-800 rounded-lg shadow hover:bg-blue-200 transition-all text-left">
            <i className="fas fa-car text-2xl mb-2"></i>
            <h3 className="font-bold text-lg">Transporte</h3>
            <p className="text-sm">Veículos da frota, viagens, etc.</p>
        </button>
        <button onClick={() => onSelect('residuos')} className="p-6 bg-green-100 text-green-800 rounded-lg shadow hover:bg-green-200 transition-all text-left">
            <i className="fas fa-trash-alt text-2xl mb-2"></i>
            <h3 className="font-bold text-lg">Resíduos</h3>
            <p className="text-sm">Geração de lixo e reciclagem.</p>
        </button>
    </div>
);

const ActivityForm: React.FC<{ category: ActivityCategory; addActivity: (activity: Omit<Activity, 'id'>) => void; closeModal: () => void; }> = ({ category, addActivity, closeModal }) => {
    const [value, setValue] = useState('');
    const [transportType, setTransportType] = useState<TransportType>('gasolina');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const numericValue = parseFloat(value);
        if (!numericValue || numericValue <= 0) {
            alert("Por favor, insira um valor numérico positivo.");
            return;
        }

        let activity: Omit<Activity, 'id'> | null = null;
        if (category === 'energia') {
            activity = { name: 'Consumo de Eletricidade', category: 'energia', type: 'eletricidade', value: numericValue, unit: 'kWh' };
        } else if (category === 'residuos') {
            activity = { name: 'Geração de Resíduos', category: 'residuos', type: 'geral', value: numericValue, unit: 'kg' };
        } else if (category === 'transporte') {
            activity = { name: `Transporte - ${transportType.toUpperCase()}`, category: 'transporte', type: transportType, value: numericValue, unit: 'km' };
        }
        
        if (activity) {
            addActivity(activity);
        }
        closeModal();
    };

    const getFormFields = () => {
        switch (category) {
            case 'energia':
                return { title: 'Adicionar Consumo de Energia', label: 'Consumo Mensal (kWh)', placeholder: 'ex: 1500' };
            case 'transporte':
                return { title: 'Adicionar Deslocamento', label: 'Distância Percorrida (km)', placeholder: 'ex: 500' };
            case 'residuos':
                return { title: 'Adicionar Geração de Resíduos', label: 'Peso Total (kg)', placeholder: 'ex: 100' };
            default:
                return { title: '', label: '', placeholder: '' };
        }
    };
    
    const { title, label, placeholder } = getFormFields();

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
                <h3 className="text-xl font-bold mb-6 text-brand-dark">{title}</h3>
                <form onSubmit={handleSubmit}>
                    {category === 'transporte' && (
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-brand-gray mb-1">Tipo de Combustível</label>
                            <select value={transportType} onChange={(e) => setTransportType(e.target.value as TransportType)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-green bg-white text-brand-dark">
                                <option value="gasolina">Gasolina</option>
                                <option value="diesel">Diesel</option>
                                <option value="etanol">Etanol</option>
                                <option value="gnv">GNV</option>
                                <option value="eletrico">Elétrico</option>
                                <option value="aviao">Avião (por passageiro)</option>
                            </select>
                        </div>
                    )}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-brand-gray mb-1">{label}</label>
                        <input type="number" value={value} onChange={e => setValue(e.target.value)} placeholder={placeholder} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-green bg-white text-brand-dark" required />
                    </div>
                    <div className="flex justify-end space-x-4 mt-6">
                        <button type="button" onClick={closeModal} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors">Cancelar</button>
                        <button type="submit" className="px-4 py-2 bg-brand-green text-white rounded-md hover:bg-brand-dark-green transition-colors">Adicionar Atividade</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export const Calculator: React.FC<CalculatorProps> = ({ activities, addActivity, removeActivity, onCalculate }) => {
  const [selectedCategory, setSelectedCategory] = useState<ActivityCategory | null>(null);

  const categoryIcons: { [key in ActivityCategory]: string } = {
    energia: 'fas fa-bolt',
    transporte: 'fas fa-car',
    residuos: 'fas fa-trash-alt'
  };

  return (
    <section id="calculator" className="py-20 bg-brand-light-gray">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-brand-dark">Calculadora de Emissões</h2>
          <p className="text-brand-gray mt-2">Adicione as atividades da sua empresa para contabilizar as emissões de GEE.</p>
        </div>
        
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-brand-dark">1. Selecione uma categoria para adicionar uma atividade</h3>
          <CategorySelector onSelect={setSelectedCategory} />
          
          {selectedCategory && <ActivityForm category={selectedCategory} addActivity={addActivity} closeModal={() => setSelectedCategory(null)} />}

          <hr className="my-8" />

          <h3 className="text-xl font-semibold mb-4 text-brand-dark">2. Atividades Adicionadas</h3>
          <div className="space-y-3 min-h-[100px] bg-gray-50 p-4 rounded-md">
            {activities.length === 0 ? (
              <p className="text-brand-gray text-center py-4">Nenhuma atividade adicionada ainda.</p>
            ) : (
              activities.map(activity => (
                <div key={activity.id} className="flex justify-between items-center bg-white p-3 rounded-md shadow-sm animate-fade-in-up">
                   <div className="flex items-center">
                        <i className={`${categoryIcons[activity.category]} text-brand-green mr-4`}></i>
                        <div>
                            <p className="font-semibold">{activity.name}</p>
                            <p className="text-sm text-brand-gray">{activity.value} {activity.unit}</p>
                        </div>
                   </div>
                  <button onClick={() => removeActivity(activity.id)} className="text-red-500 hover:text-red-700 transition-colors">
                    <i className="fas fa-times-circle"></i>
                  </button>
                </div>
              ))
            )}
          </div>
          
          <div className="mt-8 text-center">
            <button
              onClick={onCalculate}
              disabled={activities.length === 0}
              className="bg-brand-green hover:bg-brand-dark-green text-white font-bold py-3 px-12 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:scale-100"
            >
              Calcular Pegada de Carbono
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};