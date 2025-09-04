
export type TransportType = 'gasolina' | 'diesel' | 'etanol' | 'gnv' | 'eletrico' | 'aviao';

export type ActivityCategory = 'energia' | 'transporte' | 'residuos';

export interface Activity {
  id: number;
  name: string;
  category: ActivityCategory;
  type: string; // e.g., 'eletricidade', 'gasolina', 'geral'
  value: number; // e.g., kWh, km, kg
  unit: string; // e.g., 'kWh', 'km', 'kg'
}

export interface CalculationResult {
  total: number;
  categories: {
    [key: string]: number;
  };
}
