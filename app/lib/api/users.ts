import { api } from './client';

export interface RegisterData {
  email: string;
  password: string;
  full_name: string;
  phone: string;
  address: string;
}

interface ApiResponse<T> {
  data: T;
}

interface VerificationResponse {
  exists: boolean;
}

export const register = async (data: RegisterData) => {
  // Validaciones de seguridad
  const validations = {
    email: {
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Email no válido'
    },
    phone: {
      pattern: /^\(\d{2}\)\s\d{3}\s\d{3}\s\d{4}$/, // Formato (55) XXX XXX XXXX
      message: 'Teléfono no válido. Usa el formato (55) XXX XXX XXXX'
    },
    password: {
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, // Mínimo 8 caracteres, una mayúscula, una minúscula y un número
      message: 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número'
    }
  };

  // Validar cada campo
  for (const [field, validation] of Object.entries(validations)) {
    if (!validation.pattern.test(data[field as keyof RegisterData])) {
      throw new Error(validation.message);
    }
  }

  // Validar que el email no exista ya
  const existingUser = await api.get<ApiResponse<VerificationResponse>>(`/users/email/${encodeURIComponent(data.email)}`);
  if (existingUser.data.exists) {
    throw new Error('Este email ya está registrado');
  }

  // Validar que el teléfono no exista ya
  const existingPhone = await api.get<ApiResponse<VerificationResponse>>(`/users/phone/${encodeURIComponent(data.phone)}`);
  if (existingPhone.data.exists) {
    throw new Error('Este teléfono ya está registrado');
  }

  return api.post('/users/register', data);
};
