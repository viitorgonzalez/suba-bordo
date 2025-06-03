'use client';

import { useState } from 'react';
import { Ship, Anchor, Users, Text, DollarSign, Image as ImageIcon, Wind, Clock, X, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Checkbox } from '@/components/ui/Checkbox';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { brazilianStates } from '@/lib/brazilianStates';

const MAX_PHOTOS = 10;
const MAX_FILE_SIZE_MB = 5;

export function AnnounceForm() {
  // --- Estados do Formulário ---
  const [serviceTitle, setServiceTitle] = useState('');
  const [bookingModel, setBookingModel] = useState('PASSEIO_POR_PESSOA');
  const [description, setDescription] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  // Estados de Preço Condicional
  const [pricePerPerson, setPricePerPerson] = useState('');
  const [minPassengers, setMinPassengers] = useState('');
  const [maxPassengers, setMaxPassengers] = useState('');
  const [pricePerHour, setPricePerHour] = useState('');
  const [packagePrice, setPackagePrice] = useState('');
  const [packageDuration, setPackageDuration] = useState('');

  // Estados da Embarcação
  const [boatName, setBoatName] = useState('');
  const [boatType, setBoatType] = useState('');
  const [boatCapacity, setBoatCapacity] = useState('');
  const [amenities, setAmenities] = useState({
    hasBathroom: false,
    hasGrill: false,
    hasSoundSystem: false,
    hasKitchen: false,
    hasLifeJackets: false,
  });

  // Estados de UI e Erros
  const [photos, setPhotos] = useState<File[]>([]);
  const [errors, setErrors] = useState<{ photos?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- Handlers ---

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(event.target.files || []);
    if (!newFiles.length) return;

    if (photos.length + newFiles.length > MAX_PHOTOS) {
      setErrors({ photos: `Você pode enviar no máximo ${MAX_PHOTOS} fotos.` });
      return;
    }

    const largeFiles = newFiles.filter(file => file.size > MAX_FILE_SIZE_MB * 1024 * 1024);
    if (largeFiles.length > 0) {
      setErrors({ photos: `Cada foto deve ter no máximo ${MAX_FILE_SIZE_MB}MB.` });
      return;
    }

    setPhotos(prevPhotos => [...prevPhotos, ...newFiles]);
    setErrors({});
  };

  const handleRemovePhoto = (indexToRemove: number) => {
    setPhotos(prevPhotos => prevPhotos.filter((_, index) => index !== indexToRemove));
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setAmenities(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      let priceData = {};
      switch (bookingModel) {
        case 'PASSEIO_POR_PESSOA':
          priceData = { pricePerPerson, minPassengers, maxPassengers };
          break;
        case 'ALUGUEL_PRIVADO_HORA':
          priceData = { pricePerHour };
          break;
        case 'ALUGUEL_PRIVADO_PACOTE':
          priceData = { packagePrice, packageDuration };
          break;
      }

      const formData = {
        service: {
          title: serviceTitle,
          bookingModel,
          description,
          city,
          state,
          ...priceData,
        },
        boat: {
          name: boatName,
          type: boatType,
          capacity: boatCapacity,
          amenities,
        },
        photosCount: photos.length,
      };

      await new Promise(resolve => setTimeout(resolve, 1500));
      alert('Serviço cadastrado com sucesso! (Simulação)');

    } catch (error) {
      console.error("Erro ao submeter o formulário:", error);
      alert('Ocorreu um erro. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Lógica de Renderização ---

  const renderPriceFields = () => {
    switch (bookingModel) {
      case 'PASSEIO_POR_PESSOA':
        return (
          <>
            <Input id="price-per-person" label="Preço por Pessoa (R$)" type="number" placeholder="Ex: 150" icon={DollarSign} value={pricePerPerson} onChange={e => setPricePerPerson(e.target.value)} required />
            <Input id="min-passengers" label="Mínimo de Passageiros" type="number" placeholder="Ex: 4" icon={Users} value={minPassengers} onChange={e => setMinPassengers(e.target.value)} required />
            <Input id="max-passengers" label="Máximo de Passageiros" type="number" placeholder="Ex: 10" icon={Users} value={maxPassengers} onChange={e => setMaxPassengers(e.target.value)} required />
          </>
        );
      case 'ALUGUEL_PRIVADO_HORA':
        return <Input id="price-per-hour" label="Preço por Hora de Aluguel (R$)" type="number" placeholder="Ex: 300" icon={Clock} value={pricePerHour} onChange={e => setPricePerHour(e.target.value)} required />;
      case 'ALUGUEL_PRIVADO_PACOTE':
        return (
          <>
            <Input id="package-price" label="Preço do Pacote Fechado (R$)" type="number" placeholder="Ex: 2500" icon={DollarSign} value={packagePrice} onChange={e => setPackagePrice(e.target.value)} required />
            <Input id="package-duration" label="Duração do Pacote (horas)" type="number" placeholder="Ex: 8" icon={Clock} value={packageDuration} onChange={e => setPackageDuration(e.target.value)} required />
          </>
        );
      default:
        return null;
    }
  };

  const stateOptions = brazilianStates.map(s => ({
    value: s.uf,
    label: `${s.name} (${s.uf})`,
  }));

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-xl shadow-md space-y-10">
      {/* Seção 1: Detalhes do Serviço */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">Detalhes do Anúncio</h2>
        <Input id="titulo-servico" label="Título do Anúncio" placeholder="Ex: Passeio Incrível pelas Ilhas de Angra" icon={Text} value={serviceTitle} onChange={e => setServiceTitle(e.target.value)} required />
        <div>
          <label htmlFor="modelo-reserva" className="block text-sm font-medium text-gray-700 mb-1">Modelo de Reserva</label>
          <select id="modelo-reserva" className="w-full text-gray-700 border border-gray-300 rounded-lg p-2.5 transition-colors focus:ring-2 focus:ring-blue-500" value={bookingModel} onChange={e => setBookingModel(e.target.value)}>
            <option value="PASSEIO_POR_PESSOA">Passeio (preço por pessoa)</option>
            <option value="ALUGUEL_PRIVADO_HORA">Aluguel Privado (preço por hora)</option>
            <option value="ALUGUEL_PRIVADO_PACOTE">Aluguel Privado (pacote fechado)</option>
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{renderPriceFields()}</div>
        <Textarea id="descricao" label="Descrição do Serviço" placeholder="Descreva a experiência, o roteiro, o que está incluso e os diferenciais do seu serviço..." rows={5} value={description} onChange={e => setDescription(e.target.value)} required />
      </div>

      {/* Seção 2: Localização */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">Onde o serviço acontece?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input id="cidade" label="Cidade" placeholder="Ex: Angra dos Reis" icon={MapPin} value={city} onChange={e => setCity(e.target.value)} required />
          <Select id="estado" label="Estado (UF)" icon={MapPin} value={state} onChange={e => setState(e.target.value)} options={stateOptions} required />
        </div>
      </div>

      {/* Seção 3: Fotos */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">Fotos da Embarcação ({photos.length}/{MAX_PHOTOS})</h2>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50">
          <label htmlFor="file-upload" className="cursor-pointer">
            <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">Arraste e solte ou clique para selecionar</p>
            <p className="text-xs text-gray-500">Até {MAX_PHOTOS} fotos, {MAX_FILE_SIZE_MB}MB por foto</p>
            <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple accept="image/png, image/jpeg" onChange={handleFileChange} />
          </label>
        </div>
        {errors.photos && <p className="text-sm text-red-600 text-center">{errors.photos}</p>}
        <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
          {photos.map((photo, index) => (
            <div key={index} className="relative group">
              <img src={URL.createObjectURL(photo)} alt={`Preview ${index}`} className="w-full h-24 object-cover rounded-md" />
              <button type="button" onClick={() => handleRemovePhoto(index)} className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"><X size={14} /></button>
            </div>
          ))}
        </div>
      </div>

      {/* Seção 4: Detalhes da Embarcação */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">Detalhes da Embarcação</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input id="nome-barco" label="Nome da Embarcação" placeholder="Ex: Pérola Negra" icon={Ship} value={boatName} onChange={e => setBoatName(e.target.value)} required />
          <Input id="tipo-barco" label="Tipo da Embarcação" placeholder="Ex: Lancha, Veleiro, Catamarã" icon={Anchor} value={boatType} onChange={e => setBoatType(e.target.value)} required />
          <Input id="capacidade" label="Capacidade de Passageiros" type="number" placeholder="Ex: 8" icon={Users} value={boatCapacity} onChange={e => setBoatCapacity(e.target.value)} required />
        </div>
      </div>

      {/* Seção 5: Comodidades */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">Comodidades a Bordo</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Checkbox id="banheiro" name="hasBathroom" label="Banheiro" checked={amenities.hasBathroom} onChange={handleCheckboxChange} />
          <Checkbox id="churrasqueira" name="hasGrill" label="Churrasqueira" checked={amenities.hasGrill} onChange={handleCheckboxChange} />
          <Checkbox id="som" name="hasSoundSystem" label="Sistema de Som" checked={amenities.hasSoundSystem} onChange={handleCheckboxChange} />
          <Checkbox id="cozinha" name="hasKitchen" label="Cozinha" checked={amenities.hasKitchen} onChange={handleCheckboxChange} />
          <Checkbox id="coletes" name="hasLifeJackets" label="Coletes Salva-vidas" checked={amenities.hasLifeJackets} onChange={handleCheckboxChange} />
        </div>
      </div>

      {/* Botão de Submissão */}
      <div className="pt-6">
        <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center justify-center gap-2 disabled:bg-blue-400 disabled:cursor-not-allowed">
          <Wind size={20} />
          {isSubmitting ? 'Enviando Anúncio...' : 'Cadastrar e Anunciar Serviço'}
        </button>
      </div>
    </form>
  );
}