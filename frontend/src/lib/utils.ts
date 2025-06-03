// --- Funções de Máscara (já existentes) ---

// Remove tudo que não for dígito
const cleanInput = (value: string) => value.replace(/\D/g, '');

// Formata o valor para o padrão de CPF: XXX.XXX.XXX-XX
export const formatCPF = (value: string) => {
    const cleaned = cleanInput(value);
    return cleaned
        .slice(0, 11)
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2');
};

// Formata o valor para o padrão de Celular: (XX) XXXXX-XXXX
export const formatPhoneNumber = (value: string) => {
    const cleaned = cleanInput(value);
    return cleaned
        .slice(0, 11)
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2');
};


// --- NOVAS FUNÇÕES DE VALIDAÇÃO ---

/**
 * Valida um CPF brasileiro usando o algoritmo Módulo 11.
 * @param cpf - O CPF a ser validado (pode conter máscara).
 * @returns `true` se o CPF for válido, `false` caso contrário.
 */
function isCpfValid(cpf: string): boolean {
    const cleanedCpf = cleanInput(cpf);
    if (cleanedCpf.length !== 11 || /^(\d)\1+$/.test(cleanedCpf)) {
        return false;
    }
    let sum = 0;
    let remainder: number;
    for (let i = 1; i <= 9; i++) {
        sum += parseInt(cleanedCpf.substring(i - 1, i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) {
        remainder = 0;
    }
    if (remainder !== parseInt(cleanedCpf.substring(9, 10))) {
        return false;
    }
    sum = 0;
    for (let i = 1; i <= 10; i++) {
        sum += parseInt(cleanedCpf.substring(i - 1, i)) * (12 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) {
        remainder = 0;
    }
    if (remainder !== parseInt(cleanedCpf.substring(10, 11))) {
        return false;
    }
    return true;
}


// Define um tipo para os dados do formulário para garantir a tipagem
interface RegistrationFormData {
    name: string;
    email: string;
    cpf: string;
    phone: string;
    password: string;
    confirmPassword: string;
}

/**
 * Valida os campos do formulário de cadastro.
 * Recebe todos os dados do formulário e retorna um objeto com os erros encontrados.
 * @param data - Objeto com os dados do formulário.
 * @returns Um objeto contendo as mensagens de erro. Se o objeto estiver vazio, os dados são válidos.
 */
export const validateRegistrationForm = (data: RegistrationFormData) => {
    // Inicia um objeto de erros vazio. Adicionaremos erros a ele conforme forem encontrados.
    const errors: Partial<Record<keyof RegistrationFormData, string>> = {};

    // 1. Validação do Nome
    if (!data.name.trim()) {
        errors.name = 'Nome é obrigatório.';
    }

    // 2. Validação do Email
    if (!/^\S+@\S+\.\S+$/.test(data.email)) {
        errors.email = 'Formato de email inválido.';
    }

    // 3. Validação do CPF
    if (!isCpfValid(data.cpf)) {
        errors.cpf = 'CPF inválido.';
    }

    // 4. Validação do Celular
    if (cleanInput(data.phone).length < 10) {
        errors.phone = 'Número de celular inválido.';
    }

    // 5. Validação da Senha
    if (data.password.length < 8) {
        errors.password = 'A senha deve ter no mínimo 8 caracteres.';
    }

    // 6. Validação da Confirmação de Senha
    if (data.password !== data.confirmPassword) {
        errors.confirmPassword = 'As senhas não coincidem.';
    }

    // Retorna o objeto de erros. O componente que chamar esta função
    // verificará se o objeto está vazio para saber se o formulário é válido.
    return errors;
};