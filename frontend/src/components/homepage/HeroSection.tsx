import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="bg-blue-600 text-white py-20 md:py-32 relative">
      <div className="container mx-auto px-6 text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Explore as Águas Conosco
        </h1>
        <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto">
          Descubra destinos incríveis, embarque em embarcações de primeira linha e viva experiências náuticas inesquecíveis.
        </p>
        <div className="lg:col-span-3 md:col-span-2 flex justify-center mt-8">
          <Link href="/passeios" className="bg-yellow-400 hover:bg-yellow-500 text-blue-800 font-bold py-3 px-8 rounded-lg text-lg transition duration-300 ease-in-out transform hover:scale-105">
            Buscar passeios
          </Link>
        </div>
      </div>
    </section >
  );
}