import BackgroundShapes from '@/components/ui/backgroundShapes';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/reports');
    } catch (err: any) {
      setError("Credenciales inválidas o error de conexión.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      <BackgroundShapes color="login" backgroundColor="background" />

      <div className="z-10 bg-white rounded-md overflow-hidden w-full max-w-5xl flex flex-col md:flex-row min-h-[500px]" style={{ boxShadow: '0 30px 70px -12px rgba(0, 0, 0, 0.4)' }}>
        {/* Formulario */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-login-600 mb-2">🐶 MaPet - PetFinder</h2>
          <p className="text-gray-600 mb-8">Inicia sesión para continuar</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-login -500"
                required
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-login -500"
                required
              />
            </div>
            <div className="flex items-center justify-between text-sm text-gray-600">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Recordarme
              </label>
              <a href="#" className="text-login -500 hover:underline">
                Recuperar contraseña?
              </a>
            </div>
            <button
              type="submit"
              className="w-full bg-login -600 text-white font-semibold py-2 rounded-lg hover:bg-login -700 transition"
            >
              Iniciar sesión
            </button>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </form>
          <p className="text-sm text-center text-gray-600 mt-4 hover:text-login -600">
            ¿No tienes cuenta?{' '}
            <button
              onClick={() => navigate('/register')}
              className="text-login-600 hover:underline"
            >
              Regístrate
            </button>
          </p>
          <div className="mt-6 flex justify-between text-xs text-gray-400">
            <a href="#" className="hover:underline">Términos y condiciones</a>
            <a href="#" className="hover:underline">Política de privacidad</a>
          </div>
        </div>

        {/* Imagen */}
        <div className="hidden md:block w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('src/assets/dog-login.png')" }}></div>
      </div>
    </div>
  );
};

export default LoginPage;
