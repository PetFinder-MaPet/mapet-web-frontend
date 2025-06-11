import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { dummyReports } from '../dummy_data/Reports';
import L from 'leaflet';
import { useNavigate } from 'react-router-dom';

// Asegura que los íconos se vean bien
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapView = () => {
  const navigate = useNavigate();
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

        {dummyReports.map((report) => (
          <Marker key={report.id} position={[report.lat, report.lng]}>
            <Popup>
              <div className="text-sm">
                <p className="font-bold">{report.type === 'Perdida' ? `🐾 ${report.name}` : 'Avistamiento'}</p>
                <img src={report.imageUrl} className="w-full h-20 object-cover rounded-md mb-1" />
                <p className="text-xs">{report.description}</p>
                <p className="text-xs text-gray-500 mt-1">{report.dateTime}</p>
                <p className="text-xs text-gray-500">{report.location}</p>
              </div>
            </Popup>
          </Marker>
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