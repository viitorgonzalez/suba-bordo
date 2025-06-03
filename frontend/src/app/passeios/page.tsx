'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MapPin, Calendar, Users, Search, Sailboat, Star } from 'lucide-react';
import { Input } from '@/components/ui/Input'; // <-- Componente importado

// --- Dados de Simulação (Mock Data) ---
const mockListings = [
  {
    id: 1,
    title: 'Passeio Paradisíaco em Angra dos Reis',
    location: 'Angra dos Reis, RJ',
    price: 180,
    priceType: 'pessoa',
    capacity: 10,
    type: 'Lancha',
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?q=80&w=1974&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Aluguel de Veleiro em Ilhabela',
    location: 'Ilhabela, SP',
    price: 1200,
    priceType: 'diária',
    capacity: 6,
    type: 'Veleiro',
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJhaWF8ZW58MHx8MHx8fDA%3D',
  },
  {
    id: 3,
    title: 'Excursão para as Ilhas de Florianópolis',
    location: 'Florianópolis, SC',
    price: 150,
    priceType: 'pessoa',
    capacity: 12,
    type: 'Escuna',
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJhaWF8ZW58MHx8MHx8fDA%3D-75ab6338e354?q=80&w=1974&auto=format&fit=crop',
  },
  {
    id: 4,
    title: 'Pôr do Sol na Baía de Todos-os-Santos',
    location: 'Salvador, BA',
    price: 90,
    priceType: 'pessoa',
    capacity: 20,
    type: 'Catamarã',
    rating: 4.9,
    imageUrl: 'https://plus.unsplash.com/premium_photo-1669750817438-3f7f3112de8d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJhaWF8ZW58MHx8MHx8fDA%3D',
  },
  {
    id: 5,
    title: 'Aluguel Privado de Lancha em Cabo Frio',
    location: 'Cabo Frio, RJ',
    price: 350,
    priceType: 'hora',
    capacity: 8,
    type: 'Lancha',
    rating: 4.8,
    imageUrl: 'https://plus.unsplash.com/premium_photo-1682629632657-4ac307921295?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cHJhaWF8ZW58MHx8MHx8fDA%3D',
  },
    {
    id: 6,
    title: 'Aventura de Jet Ski em Búzios',
    location: 'Búzios, RJ',
    price: 250,
    priceType: 'hora',
    capacity: 2,
    type: 'Jet Ski',
    rating: 4.6,
    imageUrl: 'https://images.unsplash.com/photo-1520454974749-611b7248ffdb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cHJhaWF8ZW58MHx8MHx8fDA%3D',
  },
];
// --- Fim dos Dados de Simulação ---


/**
 * Página para clientes buscarem e filtrarem passeios de barco disponíveis.
 */
export default function SearchToursPage() {
  // --- Estados dos Filtros ---
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [passengers, setPassengers] = useState('');

  // --- Estados da UI ---
  const [results, setResults] = useState(mockListings);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    handleSearch();
  }, []);

  const handleSearch = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      const filteredResults = mockListings.filter(listing => {
        const matchesLocation = location ? listing.location.toLowerCase().includes(location.toLowerCase()) : true;
        const matchesPassengers = passengers ? listing.capacity >= parseInt(passengers, 10) : true;
        return matchesLocation && matchesPassengers;
      });

      setResults(filteredResults);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        
        {/* --- Barra de Filtros --- */}
        <div className="bg-white p-4 rounded-xl shadow-lg mb-8 sticky top-4 z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
            
            {/* Filtros agora usam o componente Input */}
            <div className="lg:col-span-2">
              <Input 
                id="location"
                label="Localização"
                icon={MapPin}
                type="text"
                placeholder="Cidade ou estado"
                value={location}
                onChange={e => setLocation(e.target.value)}
              />
            </div>

            <div>
              <Input 
                id="date"
                label="Data"
                icon={Calendar}
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
              />
            </div>
            
            <div>
              <Input 
                id="passengers"
                label="Passageiros"
                icon={Users}
                type="number"
                placeholder="Nº de pessoas"
                value={passengers}
                onChange={e => setPassengers(e.target.value)}
              />
            </div>

            {/* Botão de Busca */}
            <button
              onClick={handleSearch}
              disabled={isLoading}
              className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:bg-blue-400 h-11">
              <Search size={20} />
              {isLoading ? 'Buscando...' : 'Buscar'}
            </button>
          </div>
        </div>

        {/* --- Seção de Resultados --- */}
        <main>
          {isLoading ? (
            <div className="text-center py-16">
              <p className="text-gray-600">Carregando passeios...</p>
            </div>
          ) : results.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {results.map(listing => (
                <div key={listing.id} className="bg-white rounded-xl shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
                  <Link href={`/passeios/${listing.id}`}>
                    <div className="relative">
                      <img src={listing.imageUrl} alt={listing.title} className="w-full h-56 object-cover" />
                      <div className="absolute top-2 right-2 bg-blue-600 text-white text-sm font-bold px-3 py-1 rounded-full">
                        R$ {listing.price} / {listing.priceType}
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-gray-500 flex items-center gap-1"><MapPin size={14} /> {listing.location}</p>
                      <h3 className="text-lg font-semibold text-gray-800 mt-1 mb-2 truncate">{listing.title}</h3>
                      <div className="flex justify-between items-center text-sm text-gray-600">
                        <span className="flex items-center gap-1"><Users size={16} /> {listing.capacity} Pessoas</span>
                        <span className="flex items-center gap-1"><Sailboat size={16} /> {listing.type}</span>
                        <span className="flex items-center gap-1 font-bold text-yellow-500"><Star size={16} /> {listing.rating}</span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-700">Nenhum passeio encontrado</h3>
              <p className="text-gray-500 mt-2">Tente ajustar seus filtros para encontrar mais opções.</p>
            </div>
          )}
        </main>

      </div>
    </div>
  );
}