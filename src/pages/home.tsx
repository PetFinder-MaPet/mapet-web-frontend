import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center p-4">
      <div className="bg-white p-10 rounded-2xl shadow-xl text-center space-y-6 max-w-md w-full">
        <h1 className="text-3xl font-bold text-green-700">🐾 MaPet</h1>
        <p className="text-gray-600 text-sm">¿Qué deseas reportar?</p>

        <button
          onClick={() => navigate('/lost-report')}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg text-lg transition"
        >
          Mascota Perdida
        </button>

        <button
          onClick={() => navigate('/sighted-report')}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg text-lg transition"
        >
          Avistamiento
        </button>
      </div>
      <button
        onClick={() => navigate('/reports')}
        className="fixed bottom-4 left-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full shadow-md transition"
      >
        ⬅ Volver
      </button>
    </div>
  );
};

export default Home;
