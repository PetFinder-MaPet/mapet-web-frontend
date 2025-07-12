import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login:', { email, password });
    // Aquí haces el fetch a tu API de login
    // navigate('/dashboard') si es exitoso
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">

{/* Triangulo con fondo y triangulo blanco tapandolo */}
<div className="relative w-0 h-0">
  <div className="absolute top-[-550px] left-[-410px] w-0 h-0
    border-l-[700px] border-l-transparent
    border-b-[700px] border-b-login -600
    rotate-[235deg] z-0">
  </div>
  <div className="absolute top-[-545px] left-[-405px] w-0 h-0
    border-l-[630px] border-l-transparent
    border-b-[620px] border-b-background
    rotate-[235deg] z-10">
  </div>
</div>

{/* Óvalo con relleno*/}
<div className="absolute top-0 right-0 w-64 h-32 bg-login -600 rounded-full rotate-45 z-0"></div>

{/* Forma 3: Círculo gigante sin relleno*/}
<div className="absolute bottom-[-700px] left-[-300px] w-[1100px] h-[1100px] border-[50px] border-login -600 rounded-full z-0"></div>

{/* Forma 4: Círculo con relleno */}
<div className="absolute bottom-[-64px] right-[-64px] w-64 h-64 bg-login -600 rounded-full z-0"></div>




<div className="z-10 bg-white rounded-md overflow-hidden w-full max-w-5xl flex flex-col md:flex-row min-h-[500px]" style={{ boxShadow: '0 30px 70px -12px rgba(0, 0, 0, 0.4)' }}>        {/* Formulario */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-login-600 mb-2">🐶 MaPet - PetFinder</h2>
          <p className="text-gray-600 mb-8">Inicia sesion para continuar</p>
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
          </form>
          <div className="mt-6 flex justify-between text-xs text-gray-400">
            <a href="#" className="hover:underline">Terminos y condiciones</a>
            <a href="#" className="hover:underline">Politica de privacidad </a>
          </div>
        </div>

        {/* Imagen */}
        <div className="hidden md:block w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('src/assets/dog-login.png')" }}></div>
      </div>
    </div>
  );
};

export default LoginPage;
