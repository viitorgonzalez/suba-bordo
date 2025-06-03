'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Sailboat, Send } from 'lucide-react';
import { Input } from '@/components/ui/Input'; // Certifique-se que o caminho do seu componente Input está correto

/**
 * Página para usuários solicitarem a redefinição de senha.
 */
export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Estado para exibir uma mensagem de feedback na UI, que é melhor que um `alert`
  const [message, setMessage] = useState('');

  /**
   * Lida com o envio do formulário de recuperação de senha.
   */
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage('');
    setIsSubmitting(true);

    try {
      // Placeholder para a lógica de backend.
      // Aqui você faria a chamada para sua API.
      console.log('Solicitando redefinição de senha para o email:', email);
      // Exemplo: await fetch('/api/auth/request-password-reset', { method: 'POST', body: JSON.stringify({ email }) });

      // Simula um tempo de resposta da API para feedback visual
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Exibe uma mensagem de sucesso genérica por segurança (não confirma se o email existe)
      setMessage('Se uma conta com este e-mail estiver registrada, um link para redefinição de senha foi enviado.');

    } catch (error) {
      console.error("Erro na solicitação de redefinição de senha:", error);
      setMessage('Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        
        {/* Cabeçalho com logo e título */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <Sailboat size={48} className="text-blue-600" />
          </Link>
          <h1 className="text-3xl font-bold text-gray-800 mt-2">
            Esqueceu sua senha?
          </h1>
          <p className="text-gray-500">
            Sem problemas. Digite seu e-mail abaixo e enviaremos um link para você criar uma nova.
          </p>
        </div>

        {/* Card do formulário */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {message ? (
            // --- Exibição da mensagem de feedback após o envio ---
            <div className="text-center">
                <p className="text-gray-700">{message}</p>
                <Link href="/auth/signin" className="text-blue-600 hover:underline font-semibold mt-4 inline-block">
                    &larr; Voltar para o Login
                </Link>
            </div>
          ) : (
            // --- Formulário inicial ---
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                id="email"
                label="Seu Email de Cadastro"
                type="email"
                icon={Mail}
                placeholder="voce@exemplo.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center justify-center gap-2 disabled:bg-blue-400 disabled:cursor-not-allowed"
                >
                  <Send size={18} />
                  {isSubmitting ? 'Enviando...' : 'Enviar Link'}
                </button>
              </div>
            </form>
          )}
        </div>
        
      </div>
    </div>
  );
}