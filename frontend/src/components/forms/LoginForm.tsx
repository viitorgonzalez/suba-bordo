'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/Input';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    // Lógica de submissão para a API
    console.log('Dados de login:', { email, password });
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input id="email" placeholder="Seu email" label="Email" type="email" icon={Mail} value={email} onChange={e => setEmail(e.target.value)} required />
      <Input id="password" placeholder="Sua senha" label="Senha" type={showPassword ? 'text' : 'password'} icon={Lock} value={password} onChange={e => setPassword(e.target.value)} required endIcon={showPassword ? EyeOff : Eye} onEndIconClick={() => setShowPassword(!showPassword)} />
      
      <div className="text-right">
        <Link href="/esqueci-minha-senha" className="text-sm text-blue-600 hover:underline">
          Esqueceu a senha?
        </Link>
      </div>
      
      <div className="pt-2">
        <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-all active:scale-95 disabled:bg-blue-400">
          {isSubmitting ? 'Entrando...' : 'Entrar na Conta'}
        </button>
      </div>
    </form>
  );
}