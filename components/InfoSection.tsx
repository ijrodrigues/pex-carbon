
import React, { useState } from 'react';

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  icon: string;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, children, icon }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-5 px-6 text-left"
      >
        <div className="flex items-center">
          <i className={`${icon} text-brand-green text-2xl mr-4`}></i>
          <span className="font-semibold text-lg text-brand-dark">{title}</span>
        </div>
        <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <i className="fas fa-chevron-down text-brand-gray"></i>
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-screen' : 'max-h-0'
        }`}
      >
        <div className="p-6 pt-0 text-brand-gray">{children}</div>
      </div>
    </div>
  );
};

export const InfoSection: React.FC = () => {
  return (
    <section id="info" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand-dark">Conhecimento é o Primeiro Passo</h2>
            <p className="text-brand-gray mt-2">Entenda os conceitos chave sobre a pegada de carbono.</p>
        </div>
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <AccordionItem title="O que é Pegada de Carbono?" icon="fas fa-shoe-prints">
            <p>
              A pegada de carbono é uma medida que calcula a emissão de gases de efeito estufa (GEE) — como o dióxido de carbono (CO2), o metano (CH4), entre outros — que são liberados na atmosfera por um indivíduo, empresa, evento ou produto. Ela serve como um indicador do impacto que nossas atividades causam no aquecimento global e nas mudanças climáticas.
            </p>
          </AccordionItem>
          <AccordionItem title="Por que é Importante Calcular?" icon="fas fa-globe-americas">
            <p>
              Calcular a pegada de carbono é fundamental para que empresas possam identificar suas principais fontes de emissão. Com essa informação, é possível traçar estratégias eficazes de redução, otimizar o uso de recursos, diminuir custos operacionais, fortalecer a imagem da marca perante consumidores conscientes e estar em conformidade com regulações ambientais cada vez mais rigorosas.
            </p>
          </AccordionItem>
          <AccordionItem title="Como é Calculada?" icon="fas fa-calculator">
            <p>
              O cálculo envolve a multiplicação dos dados de atividade da sua empresa (como consumo de energia em kWh, distância percorrida em km, etc.) por fatores de emissão específicos. Esses fatores convertem cada atividade em sua equivalência de dióxido de carbono (CO2e). Nossa calculadora utiliza fatores de emissão baseados em metodologias reconhecidas, como o GHG Protocol, para fornecer uma estimativa precisa.
            </p>
          </AccordionItem>
          <AccordionItem title="Como Reduzir a Pegada de Carbono?" icon="fas fa-seedling">
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Eficiência Energética:</strong> Investir em equipamentos mais eficientes, iluminação LED e otimização de processos.</li>
              <li><strong>Energias Renováveis:</strong> Migrar para fontes de energia limpa, como solar ou eólica.</li>
              <li><strong>Transporte Sustentável:</strong> Otimizar rotas de logística, utilizar veículos elétricos e incentivar o transporte coletivo para colaboradores.</li>
              <li><strong>Gestão de Resíduos:</strong> Implementar programas de reciclagem, compostagem e redução do desperdício.</li>
              <li><strong>Compensação de Carbono:</strong> Investir em projetos de reflorestamento ou energias renováveis para neutralizar as emissões que não podem ser evitadas.</li>
            </ul>
          </AccordionItem>
        </div>
      </div>
    </section>
  );
};
