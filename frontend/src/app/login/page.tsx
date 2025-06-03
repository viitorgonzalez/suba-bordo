'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Sailboat } from 'lucide-react';
import { LoginForm } from '@/components/forms/LoginForm';
import { RegisterForm } from '@/components/forms/RegisterForm';

export default function LoginPage() {
  const [isLoginView, setIsLoginView] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <Sailboat size={48} className="text-blue-600" />
          </Link>
          <h1 className="text-3xl font-bold text-gray-800 mt-2">
            {isLoginView ? 'Bem-vindo de volta!' : 'Crie sua Conta'}
          </h1>
          <p className="text-gray-500">
            {isLoginView ? 'Acesse para gerenciar seus passeios.' : 'Preencha os dados para começar a navegar.'}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
            <button onClick={() => setIsLoginView(true)} className={`w-1/2 py-2 rounded-md font-semibold transition-all ${isLoginView ? 'bg-white shadow text-blue-600' : 'text-gray-600'}`}>
              Entrar
            </button>
            <button onClick={() => setIsLoginView(false)} className={`w-1/2 py-2 rounded-md font-semibold transition-all ${!isLoginView ? 'bg-white shadow text-blue-600' : 'text-gray-600'}`}>
              Cadastrar
            </button>
          </div>
          
          {/* Renderização condicional dos formulários */}
          {isLoginView ? <LoginForm /> : <RegisterForm />}

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-300"></span></div>
            <div className="relative flex justify-center text-sm"><span className="bg-white px-2 text-gray-500">OU</span></div>
          </div>
          
          <div className="space-y-3">
            <button type="button" className="w-full flex items-center justify-center gap-3 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all active:scale-95">
              <img src="https://www.vectorlogo.zone/logos/google/google-icon.svg" alt="Google" className="w-5 h-5" />
              <span className="text-sm font-medium text-gray-700">Entrar com Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}