import { MapPin, Users, Sailboat, Star, Clock, Sun, CheckCircle } from 'lucide-react';
import { notFound } from 'next/navigation';

// --- Dados de Simulação (Mock Data) ---
// Em uma aplicação real, você faria uma chamada à API aqui para buscar os dados
// Mas para o exemplo, vamos importar os mesmos dados da página de busca
const mockListings = [
    { id: 1, title: 'Passeio Paradisíaco em Angra dos Reis', location: 'Angra dos Reis, RJ', price: 180, priceType: 'pessoa', capacity: 10, type: 'Lancha', rating: 4.9, imageUrl: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?q=80&w=1974&auto=format&fit=crop', description: 'Descubra as águas cristalinas e ilhas deslumbrantes de Angra dos Reis a bordo de uma lancha confortável. Roteiro inclui paradas na Lagoa Azul, Ilha Grande e outras praias secretas. Ideal para famílias e grupos de amigos.', duration: '6 horas', includes: ['Água e Gelo', 'Máscaras de Snorkel', 'Marinheiro Experiente'] },
    { id: 2, title: 'Aluguel de Veleiro em Ilhabela', location: 'Ilhabela, SP', price: 1200, priceType: 'diária', capacity: 6, type: 'Veleiro', rating: 4.8, imageUrl: 'https://images.unsplash.com/photo-1540202409249-b46175b5b5c9?q=80&w=1964&auto=format&fit=crop', description: 'Viva a experiência única de velejar pela costa de Ilhabela. Alugue nosso veleiro para uma diária e explore praias como a do Bonete e Castelhanos no seu próprio ritmo.', duration: '1 dia', includes: ['Combustível', 'Equipamento de segurança', 'Pequena cozinha a bordo'] },
    { id: 3, title: 'Excursão para as Ilhas de Florianópolis', location: 'Florianópolis, SC', price: 150, priceType: 'pessoa', capacity: 12, type: 'Escuna', rating: 4.7, imageUrl: 'https://images.unsplash.com/photo-1594971268398-75ab6338e354?q=80&w=1974&auto=format&fit=crop', description: 'Um tour completo pelas principais ilhas de Florianópolis, incluindo a Ilha do Campeche. Desfrute de paisagens incríveis, mergulho e muita diversão.', duration: '8 horas', includes: ['Guia turístico', 'Almoço (bebidas à parte)', 'Taxas de visitação'] },
    { id: 4, title: 'Pôr do Sol na Baía de Todos-os-Santos', location: 'Salvador, BA', price: 90, priceType: 'pessoa', capacity: 20, type: 'Catamarã', rating: 4.9, imageUrl: 'https://images.unsplash.com/photo-1587042255734-5431616c6000?q=80&w=1935&auto=format&fit=crop', description: 'Navegue pelas águas calmas da Baía de Todos-os-Santos e assista a um pôr do sol inesquecível ao som de música ao vivo. Uma experiência relaxante e romântica.', duration: '2 horas', includes: ['Música ao vivo', '1 Drink de cortesia'] },
    { id: 5, title: 'Aluguel Privado de Lancha em Cabo Frio', location: 'Cabo Frio, RJ', price: 350, priceType: 'hora', capacity: 8, type: 'Lancha', rating: 4.8, imageUrl: 'https://images.unsplash.com/photo-1622557432954-1596541fce13?q=80&w=1964&auto=format&fit=crop', description: 'Alugue uma lancha por hora e monte seu próprio roteiro pelas praias paradisíacas de Cabo Frio e Arraial do Cabo. Perfeito para quem busca flexibilidade e privacidade.', duration: 'Mínimo 2 horas', includes: ['Marinheiro', 'Combustível (para roteiro local)'] },
    { id: 6, title: 'Aventura de Jet Ski em Búzios', location: 'Búzios, RJ', price: 250, priceType: 'hora', capacity: 2, type: 'Jet Ski', rating: 4.6, imageUrl: 'https://images.unsplash.com/photo-1610654859695-e4d642882252?q=80&w=1974&auto=format&fit=crop', description: 'Sinta a adrenalina de pilotar um jet ski de alta performance nas famosas praias de Búzios. Instruções completas e segurança garantida para sua diversão.', duration: '30 min / 1 hora', includes: ['Instrução', 'Coletes salva-vidas'] },
];

// A página recebe 'params' como prop, que contém o ID da URL
export default function TourDetailPage({ params }: { params: { id: string } }) {
  
  // Encontra o passeio específico usando o ID dos parâmetros da URL
  // `params.id` é sempre uma string, por isso a conversão `tour.id.toString()`
  const tour = mockListings.find(t => t.id.toString() === params.id);

  // Se nenhum passeio for encontrado com esse ID, renderiza a página 404
  if (!tour) {
    notFound();
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <main className="container mx-auto px-4 py-10">
        {/* --- Título e Localização --- */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">{tour.title}</h1>
          <div className="flex items-center gap-2 mt-2 text-gray-600">
            <MapPin size={20} />
            <p className="text-lg">{tour.location}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* --- Coluna Principal (Imagem e Detalhes) --- */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <img src={tour.imageUrl} alt={tour.title} className="w-full h-[450px] object-cover"/>
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Sobre este passeio</h2>
                <p className="text-gray-700 leading-relaxed">
                  {tour.description}
                </p>
                
                <hr className="my-6" />

                <h3 className="text-xl font-semibold text-gray-800 mb-4">O que está incluso</h3>
                <ul className="space-y-2">
                  {tour.includes.map((item, index) => (
                    <li key={index} className="flex items-center gap-3 text-gray-700">
                      <CheckCircle size={20} className="text-green-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* --- Coluna Lateral (Card de Reserva) --- */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
              <div className="flex justify-between items-baseline mb-4">
                <span className="text-2xl font-bold text-blue-600">
                  R$ {tour.price}
                </span>
                <span className="text-gray-600">/ {tour.priceType}</span>
              </div>

              <div className="flex justify-between items-center text-sm text-gray-600 border-t border-b py-4 mb-4">
                <span className="flex items-center gap-2"><Users size={18} /> {tour.capacity} Pessoas</span>
                <span className="flex items-center gap-2"><Sailboat size={18} /> {tour.type}</span>
                <span className="flex items-center gap-2"><Clock size={18} /> {tour.duration}</span>
              </div>

              <div className="flex items-center justify-center gap-1 font-bold text-yellow-500 text-lg mb-6">
                <Star size={20} /> {tour.rating}
                <span className="text-sm text-gray-500 font-normal ml-1">(Baseado em avaliações)</span>
              </div>
              
              <button className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors">
                Reservar Agora
              </button>
              <p className="text-xs text-gray-500 text-center mt-2">Confirmação imediata!</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}