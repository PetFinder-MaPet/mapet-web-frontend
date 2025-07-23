import { Marker, Popup } from 'react-leaflet';
import { Report } from '@/types/report';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png';
import L from 'leaflet';
import { useNavigate } from 'react-router-dom';

// Función para formatear fecha y hora
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString('es-CO', {
    dateStyle: 'long',
    timeStyle: 'short',
  });
};

const ReportMarker = ({ report }: { report: Report }) => {
  const navigate = useNavigate();

  const position: [number, number] = [report.lat, report.lng];

  return (
    <Marker
  position={position}
  icon={L.icon({
    iconUrl: markerIconPng,
    shadowUrl: markerShadowPng,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  })}
>
      <Popup minWidth={250}>
        <div>
          <h3 className="font-bold text-lg">{report.name}</h3>
          <img src={report.imageUrl} alt={report.name} className="w-full h-40 object-cover rounded my-2" />
          <p><strong>Tipo:</strong> {report.type}</p>
          <p><strong>Tamaño:</strong> {report.size}</p>
          <p><strong>Peso:</strong> {report.weightKg} kg</p>
          <p><strong>Color(es):</strong> {report.colors.join(', ')}</p>
          <p><strong>Descripción:</strong> {report.description}</p>
          <p><strong>Fecha y hora:</strong> {formatDate(report.dateTime)}</p>

          <button
            onClick={() => navigate(`/sighted-report`)}
            className="mt-2 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
          >
            Reportar avistamiento
          </button>
        </div>
      </Popup>
    </Marker>
  );
};

export default ReportMarker;
