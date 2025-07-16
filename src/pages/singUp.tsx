import BackgroundShapes from '@/components/ui/backgroundShapes';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// 🔑 Importa Firebase Auth y Firestore
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const db = getFirestore();

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  // Validación local
  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.fullName) newErrors.fullName = 'Nombre completo requerido';
    if (!formData.email) newErrors.email = 'Correo requerido';
    if (!formData.password) newErrors.password = 'Contraseña requerida';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Registro y guardado en Firebase y Firestore
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      try {
        // 1. Registro en Auth
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );

        // 2. Actualiza nombre en perfil Firebase Auth
        await updateProfile(userCredential.user, {
          displayName: formData.fullName,
        });

        // 3. Guarda en Firestore (nombre, email y teléfono)
        await setDoc(doc(db, "users", userCredential.user.uid), {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone || null, // guarda null si está vacío
          createdAt: new Date(),
        });

        // 4. Redirige a login tras registro exitoso
        navigate('/reports');
      } catch (error: any) {
        setErrors({ general: error.message });
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white relative overflow-hidden">
      <BackgroundShapes color="blue" backgroundColor="background" />

      {/* Contenido */}
      <div className="z-10 bg-white rounded-md overflow-hidden w-full max-w-5xl flex flex-col md:flex-row min-h-[500px]" style={{ boxShadow: '0 30px 70px -12px rgba(0, 0, 0, 0.4)' }}>
        {/* Formulario */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-black -600 mb-2">🐶 MaPet - Registrarse</h2>
          <p className="text-gray-600 mb-8">Crea tu cuenta para empezar</p>
          <form onSubmit={handleRegister} className="space-y-4">
            <input
              type="text"
              name="fullName"
              placeholder="Nombre completo"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.fullName && <p className="text-sm text-red-500">{errors.fullName}</p>}

            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}

            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirmar contraseña"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}

            <input
              type="tel"
              name="phone"
              placeholder="Teléfono (opcional)"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              className="w-full bg-white-600 text-blue-500 font-semibold py-2 rounded-lg hover:bg-blue-700 transition hover:text-white"
            >
              Registrarse
            </button>
          </form>

          {errors.general && <p className="text-sm text-red-500">{errors.general}</p>}

          <p className="text-sm text-center text-gray-600 mt-4">
            ¿Ya tienes cuenta?{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-blue-600 hover:underline"
            >
              Inicia sesión
            </button>
          </p>
        </div>

        {/* Imagen */}
        <div
          className="hidden md:block w-1/2 bg-cover bg-center"
          style={{ backgroundImage: "url('src/assets/dog-register.png')" }}
        ></div>
      </div>
    </div>
  );
};

export default RegisterPage;
