import { Sailboat, Anchor, Compass } from 'lucide-react';

export default function ServicesSection() {
  return (
    <section id="servicos" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4">Aventura Náutica Sob Medida</h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Oferecemos uma variedade de serviços para tornar sua jornada no mar perfeita.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card de Serviço 1 */}
          <div className="bg-gray-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex justify-center mb-4">
              <Sailboat size={48} className="text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-blue-700 mb-3 text-center">Aluguel de Embarcações</h3>
            <p className="text-gray-600 text-sm leading-relaxed text-center">
              Lanchas e motos aquáticas bem equipados para sua aventura ou relaxamento.
            </p>
          </div>
          {/* Card de Serviço 2 */}
          <div className="bg-gray-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex justify-center mb-4">
              <Compass size={48} className="text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-blue-700 mb-3 text-center">Passeios e Excursões</h3>
            <p className="text-gray-600 text-sm leading-relaxed text-center">
              Roteiros guiados pelos melhores pontos turísticos, com segurança e conforto.
            </p>
          </div>
          {/* Card de Serviço 3 */}
          <div className="bg-gray-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex justify-center mb-4">
              <Anchor size={48} className="text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-blue-700 mb-3 text-center">Manutenção e Docagem</h3>
            <p className="text-gray-600 text-sm leading-relaxed text-center">
              Serviços especializados para manter sua embarcação sempre pronta para navegar.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}