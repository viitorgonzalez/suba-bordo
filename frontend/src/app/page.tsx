import AboutSection from '@/components/homepage/AboutSection';
import ContactSection from '@/components/homepage/ContactSection';
import HeroSection from '@/components/homepage/HeroSection';
import ServicesSection from '@/components/homepage/ServicesSection';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">

      <main className="flex-grow">
        <HeroSection />

        <ServicesSection />

        <AboutSection />

        <ContactSection />
      </main>
    </div>
  );
}