import { MapContainer, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import { useEffect, useState } from 'react';
import { Report } from '../types/report';
import { useNavigate } from 'react-router-dom';
import ReportMarker from '@/components/ui/reportMarker';

// Configuración para que los íconos se vean bien¿// Configuración de íconos
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapView = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/reports`)
      .then((res) => res.json())
      .then((data) => {
              console.log("✅ Datos crudos:", data); // <-- Agrega esto
        const mapped: Report[] = data.map((r: any) => ({
          id: r.id,
          type: r.type === 'lost' ? 'Perdida' : 'Avistamiento',
          name: r.name ?? '',
          description: r.description,
          dateTime: r.dateTime ?? r.date_time ?? '',
          imageUrl: r.imageUrl
  ? `${import.meta.env.VITE_API_URL}${r.imageUrl}`
  : r.image_url
  ? `${import.meta.env.VITE_API_URL}${r.image_url}`
  : '',
          size: r.size ?? r.approximate_size ?? '',
          weightKg: r.weightKg ?? r.approximate_weight_kg ?? 0,
          colors: r.colors ?? (r.color ? [r.color] : []),
          location: '',
    lat: r.location?.latitude ?? 0,
lng: r.location?.longitude ?? 0,

        }));
         console.log("📍 Reportes mapeados:", mapped);
        setReports(mapped);
      })
      .catch((err) => console.error('❌ Error loading reports:', err));
  }, []);

  return (
    <div className="min-h-screen bg-green-50 p-4">
      <h2 className="text-2xl font-bold mb-4 text-center text-green-800">Mapa de Reportes</h2>

      <MapContainer
        center={[4.65, -74.06]}
        zoom={12}
        scrollWheelZoom={true}
        className="h-[80vh] w-full rounded-lg shadow-xl"
      >
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {reports.map((report: Report) => (
          <ReportMarker key={report.id} report={report} />        
        ))}
      </MapContainer>

      <button
        onClick={() => navigate('/reports')}
        className="fixed bottom-6 left-6 bg-green-700 hover:bg-green-800 text-white py-2 px-4 rounded-lg shadow-lg"
      >
        Cambiar visualización
      </button>
    </div>
  );
};

export default MapView;
