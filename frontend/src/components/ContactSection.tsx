export default function ContactSection() {
  return (
    <section id="contato" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-6">Entre em Contato</h2>
        <p className="text-gray-700 max-w-xl mx-auto mb-8">
          Alguma dúvida? Entre em contato com o suporte.
        </p>
        <a
          href="mailto:subabordosupport@gmail.com"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300 ease-in-out transform hover:scale-105"
        >
          Enviar Mensagem
        </a>
      </div>
    </section>
  );
}