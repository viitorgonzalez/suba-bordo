import { AnnounceForm } from "@/components/forms/AnnounceForm";

/**
 * Página principal para o anúncio de serviços de barco.
 * A responsabilidade desta página é definir o layout e renderizar o formulário.
 */
export default function AnnounceServicePage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <main className="max-w-4xl mx-auto px-4 py-8 md:py-16">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Anuncie sua Embarcação</h1>
          <p className="text-md text-gray-500 mt-2">Preencha os detalhes abaixo para que milhares de clientes possam te encontrar.</p>
        </div>

        <AnnounceForm />
        
      </main>
    </div>
  );
}