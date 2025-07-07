import { useEffect, useState } from 'react';
import { ReportCard } from '../components/ui/ReportCard';
import { useNavigate } from 'react-router-dom';
import { Report } from '../types/report';

const VisualReports = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    console.log("🌐 Fetching reports from backend...");
    fetch(`${import.meta.env.VITE_API_URL}/pet-reports`)
      .then((response) => response.json())
      .then((data) => {
        console.log("✅ Received reports:", data);
        const mapped: Report[] = data.map((r: any) => ({
          id: r.id,
          type: r.type === "lost" ? "Perdida" : "Avistamiento",
          name: r.name ?? "",
          description: r.description,
          dateTime: r.dateTime ?? r.date_time ?? "",
          imageUrl: `${import.meta.env.VITE_API_URL}${r.imageUrl ?? r.image_url ?? ""}`,
          size: r.size ?? r.approximate_size ?? "",
          weightKg: r.weightKg ?? r.approximate_weight_kg ?? 0,
          colors: r.colors ?? (r.color ? [r.color] : []),
          location: "",
          lat: r.lat ?? r.latitude ?? 0,
          lng: r.lng ?? r.longitude ?? 0
        }));
        setReports(mapped);
      })
      .catch((error) => {
        console.error("❌ Error fetching reports:", error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 relative">
      <h1 className="text-2xl font-bold text-center mb-6 text-blue-800">
        📋 Reportes recientes
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
        {reports.map((report) => (
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
