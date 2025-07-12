import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center p-4">
      
      <div className="bg-white border border-gray-200 p-10 rounded-3xl shadow-lg text-center space-y-6 max-w-md w-full">
        <h1 className="text-4xl font-extrabold text-login-600 flex items-center justify-center gap-2">
  🐾 <span className="tracking-tight">MaPet</span>
</h1>
        <p className="text-gray-600 text-sm">¿Qué deseas reportar?</p>

        <button
  onClick={() => navigate('/lost-report')}
  className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl text-lg font-semibold transition flex items-center justify-center gap-2 shadow"
>
  🐶 Mascota Perdida
</button>

<button
  onClick={() => navigate('/sighted-report')}
  className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl text-lg font-semibold transition flex items-center justify-center gap-2 shadow"
>
  👀 Avistamiento
</button>

<button
  onClick={() => navigate('/login')}
  className="w-full bg-login -500 hover:bg-purple-700 text-white py-3 rounded-xl text-lg font-semibold transition flex items-center justify-center gap-2 shadow"
>
  🔐 Iniciar sesión
</button>

      </div>
      <button
  onClick={() => navigate('/reports')}
  className="fixed bottom-4 right-4 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-full shadow-lg text-sm flex items-center gap-2 transition"
>
  <span>⬅</span> Volver
</button>
    </div>
  );
};

export default Home;
