import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">      

      <main className="flex-grow"> {/* Conteúdo principal da página */}
        {/* Seção Hero */}
          <HeroSection />

        {/* Seção de Destaques/Serviços */}
        <ServicesSection />

        <AboutSection />

        <ContactSection />
      </main>
    </div>
  );
}