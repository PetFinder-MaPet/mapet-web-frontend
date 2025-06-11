import { dummyReports } from '../dummy_data/Reports';
import { ReportCard } from '../components/ui/ReportCard';
import { useNavigate } from 'react-router-dom';

const VisualReports = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 relative">
      <h1 className="text-2xl font-bold text-center mb-6 text-blue-800">📋 Reportes recientes</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
        {dummyReports.map((report) => (
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