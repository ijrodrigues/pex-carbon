
import React, { useEffect } from 'react';
import type { CalculationResult } from '../types';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ResultsProps {
    results: CalculationResult;
    onReset: () => void;
}

const COLORS = ['#16a34a', '#3b82f6', '#f59e0b'];

const CustomTooltip: React.FC<any> = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-2 border border-gray-200 rounded shadow-lg">
                <p className="font-bold">{`${payload[0].name}: ${payload[0].value.toFixed(2)} kg CO2e`}</p>
            </div>
        );
    }
    return null;
};

export const Results: React.FC<ResultsProps> = ({ results, onReset }) => {
    
    useEffect(() => {
      const element = document.getElementById('results');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, []);

    const data = Object.keys(results.categories)
        .map(key => ({
            name: key.charAt(0).toUpperCase() + key.slice(1),
            value: results.categories[key]
        }))
        .filter(item => item.value > 0);

    const totalInTonnes = (results.total / 1000).toFixed(2);
    
    const getRecommendation = (total: number) => {
        if (total < 500) return "Sua pegada de carbono é relativamente baixa. Continue com as boas práticas e busque otimizar ainda mais!";
        if (total < 2000) return "Sua pegada de carbono é moderada. Existem oportunidades significativas para redução, especialmente nas categorias de maior emissão.";
        return "Sua pegada de carbono é alta. É crucial implementar um plano de ação robusto para reduzir as emissões e mitigar seu impacto ambiental.";
    }

    return (
        <section id="results" className="py-20 bg-white animate-fade-in-up">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-brand-dark">Resultados da sua Pegada de Carbono</h2>
                    <p className="text-brand-gray mt-2">Visualize o impacto da sua empresa e entenda os próximos passos.</p>
                </div>

                <div className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="text-center md:text-left">
                            <h3 className="text-xl text-brand-gray font-semibold">Total de Emissões (Anual Estimado)</h3>
                            <p className="text-5xl font-extrabold text-brand-green my-2">{totalInTonnes}
                                <span className="text-3xl font-bold text-brand-gray ml-2">tCO2e</span>
                            </p>
                            <p className="text-brand-gray mb-6">
                               * Estimativa baseada nas atividades mensais fornecidas, multiplicadas por 12.
                            </p>
                            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                               <h4 className="font-bold text-green-800">Recomendação</h4>
                               <p className="text-green-700">{getRecommendation(results.total)}</p>
                            </div>
                        </div>
                        <div className="h-80 w-full">
                           <ResponsiveContainer>
                                <PieChart>
                                    <Pie
                                        data={data}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        outerRadius={120}
                                        fill="#8884d8"
                                        dataKey="value"
                                        nameKey="name"
                                    >
                                        {data.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip content={<CustomTooltip />} />
                                    <Legend />
                                </PieChart>
                           </ResponsiveContainer>
                        </div>
                    </div>
                     <div className="mt-12 text-center">
                        <button
                            onClick={onReset}
                            className="bg-brand-dark hover:bg-gray-700 text-white font-bold py-3 px-12 rounded-full transition-all duration-300 ease-in-out"
                        >
                            Fazer Novo Cálculo
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};
