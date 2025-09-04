
// Fatores de emissão (kg CO2e / unidade).
// Fontes: Baseado em dados do Programa Brasileiro GHG Protocol, IPCC, etc.
// Estes são valores de exemplo e podem necessitar de ajustes para maior precisão.

export const EMISSION_FACTORS = {
  energia: {
    eletricidade: 0.0708, // kg CO2e / kWh (média do SIN, pode variar)
  },
  transporte: {
    gasolina: 0.185, // kg CO2e / km (carro de passeio médio)
    diesel: 0.165, // kg CO2e / km (carro de passeio médio)
    etanol: 0.075, // kg CO2e / km
    gnv: 0.16, // kg CO2e / km
    eletrico: 0.015, // kg CO2e / km (considerando matriz elétrica brasileira)
    aviao: 0.145, // kg CO2e / km por passageiro (voos domésticos)
  },
  residuos: {
    geral: 0.6, // kg CO2e / kg de resíduo sólido urbano
  },
};
