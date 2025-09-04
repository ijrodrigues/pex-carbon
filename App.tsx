
import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { InfoSection } from './components/InfoSection';
import { Calculator } from './components/Calculator';
import { Results } from './components/Results';
import { Footer } from './components/Footer';
import type { Activity, CalculationResult } from './types';
import { EMISSION_FACTORS } from './constants';

const App: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [showResults, setShowResults] = useState(false);

  const addActivity = (activity: Omit<Activity, 'id'>) => {
    setActivities(prev => [...prev, { ...activity, id: Date.now() + Math.random() }]);
  };

  const removeActivity = (id: number) => {
    setActivities(prev => prev.filter(activity => activity.id !== id));
  };

  const calculationResults: CalculationResult = useMemo(() => {
    let total = 0;
    const categoryTotals: { [key: string]: number } = {
      energia: 0,
      transporte: 0,
      residuos: 0,
    };

    activities.forEach(activity => {
      let emission = 0;
      switch (activity.category) {
        case 'energia':
          emission = activity.value * EMISSION_FACTORS.energia.eletricidade;
          break;
        case 'transporte':
          const factor = EMISSION_FACTORS.transporte[activity.type as keyof typeof EMISSION_FACTORS.transporte] || 0;
          emission = activity.value * factor;
          break;
        case 'residuos':
          emission = activity.value * EMISSION_FACTORS.residuos.geral;
          break;
      }
      total += emission;
      categoryTotals[activity.category] += emission;
    });

    return { total, categories: categoryTotals };
  }, [activities]);

  const handleCalculate = () => {
    if (activities.length > 0) {
      setShowResults(true);
      setTimeout(() => {
        document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      alert("Por favor, adicione pelo menos uma atividade para calcular a pegada de carbono.");
    }
  };
  
  const handleReset = () => {
      setActivities([]);
      setShowResults(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="min-h-screen bg-brand-light-gray font-sans text-brand-dark">
      <Header />
      <main>
        <Hero />
        <InfoSection />
        <Calculator 
            activities={activities} 
            addActivity={addActivity} 
            removeActivity={removeActivity}
            onCalculate={handleCalculate}
        />
        {showResults && <Results results={calculationResults} onReset={handleReset} />}
      </main>
      <Footer />
    </div>
  );
};

export default App;
