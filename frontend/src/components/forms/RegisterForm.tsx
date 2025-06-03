'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Mail, Lock, User, Smartphone, FileText, Eye, EyeOff } from 'lucide-react';
import { formatCPF, formatPhoneNumber, validateRegistrationForm } from '@/lib/utils';

export function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = 'Nome é obrigatório.';
    if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = 'Email inválido.';
    if (cpf.replace(/\D/g, '').length !== 11) newErrors.cpf = 'CPF inválido.';
    if (phone.replace(/\D/g, '').length < 10) newErrors.phone = 'Número de celular inválido.';
    if (password.length < 8) newErrors.password = 'A senha deve ter no mínimo 8 caracteres.';
    if (password !== confirmPassword) newErrors.confirmPassword = 'As senhas não coincidem.';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    // 1. Chama a função de validação centralizada, passando todos os dados
    const validationErrors = validateRegistrationForm({
      name, email, cpf, phone, password, confirmPassword
    });

    // 2. Atualiza o estado de erros com o resultado
    setErrors(validationErrors);
    
    // 3. Verifica se o objeto de erros retornado está vazio. Se não estiver, interrompe.
    if (Object.keys(validationErrors).length > 0) {
      return;
    }
    
    // Se passou na validação, continua com a submissão
    setIsSubmitting(true);
    console.log('Dados de cadastro validados:', { name, email, cpf, phone, password });
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
};

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input id="name" placeholder="Seu nome" label="Nome Completo" type="text" icon={User} value={name} onChange={e => setName(e.target.value)} required />
      {errors.name && <p className="text-xs text-red-600">{errors.name}</p>}

      <Input id="email" placeholder="Seu email" label="Email" type="email" icon={Mail} value={email} onChange={e => setEmail(e.target.value)} required />
      {errors.email && <p className="text-xs text-red-600">{errors.email}</p>}

      <Input id="cpf" placeholder="Seu CPF" label="CPF" type="text" icon={FileText} value={cpf} onChange={e => setCpf(formatCPF(e.target.value))} maxLength={14} required />
      {errors.cpf && <p className="text-xs text-red-600">{errors.cpf}</p>}
      
      <Input id="phone" placeholder="Seu número de celular" label="Celular" type="tel" icon={Smartphone} value={phone} onChange={e => setPhone(formatPhoneNumber(e.target.value))} maxLength={15} required />
      {errors.phone && <p className="text-xs text-red-600">{errors.phone}</p>}

      <Input id="password" placeholder="Sua senha" label="Senha" type={showPassword ? 'text' : 'password'} icon={Lock} value={password} onChange={e => setPassword(e.target.value)} required endIcon={showPassword ? EyeOff : Eye} onEndIconClick={() => setShowPassword(!showPassword)} />
      {errors.password && <p className="text-xs text-red-600">{errors.password}</p>}
      
      <Input id="confirmPassword" placeholder="Confirmar senha" label="Confirmar Senha" type={showPassword ? 'text' : 'password'} icon={Lock} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
      {errors.confirmPassword && <p className="text-xs text-red-600">{errors.confirmPassword}</p>}
      
      <div className="pt-2">
        <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-all active:scale-95 disabled:bg-blue-400">
          {isSubmitting ? 'Criando conta...' : 'Criar Conta'}
        </button>
      </div>
    </form>
  );
}