import { useEffect, useState } from 'react';
import { ReportCard } from '../components/ui/ReportCard';
import { useNavigate } from 'react-router-dom';

// Tipo del reporte para TypeScript
interface Reporte {
  id: string;
  tipo: string;
  nombre?: string;
  colors: string[];
  size: string;
  weightKg: number;
  description: string;
  fecha: string;
  image_url?: string;
  location: string;
  lat: number;
  lon: number;
  titulo?: string;
}

const VisualReports = () => {
  const [reportes, setReportes] = useState<Reporte[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReportes = async () => {
      try {
        const response = await fetch('http://localhost:8000/visualizacion/muro');
        const data = await response.json();
        setReportes(data);
      } catch (error) {
        console.error('Error al obtener reportes:', error);
      }
    };

    fetchReportes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 relative">
      <h1 className="text-2xl font-bold text-center mb-6 text-blue-800">📋 Reportes recientes</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
        {reportes.map((report) => (
          <ReportCard key={report.id} report={report} />
        ))}
      </div>

      <button
        onClick={() => navigate('/map')}
        className="fixed bottom-4 left-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full shadow-md transition"
      >
        Cambiar visualización
      </button>
      <button
        onClick={() => navigate('/')}
        className="fixed bottom-4 right-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full shadow-md transition"
      >
        Reportar
      </button>
    </div>
  );
};

export default VisualReports;