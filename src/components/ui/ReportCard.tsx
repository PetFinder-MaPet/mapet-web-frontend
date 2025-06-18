interface Props {
  report: {
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
  };
}

export const ReportCard = ({ report }: Props) => {

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden w-full max-w-sm">
      <img src={report.image_url} alt="Foto mascota" className="w-full h-48 object-cover" />
      <div className="p-4">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold text-white px-2 py-1 rounded bg-red-400">
            {report.tipo}
          </span>
          <span className="text-sm text-gray-500">{report.fecha}</span>
        </div>

        <h3 className="mt-2 font-semibold text-lg">
          {report.nombre ? `🐾 ${report.nombre}` : `🐾 Mascota ${report.tipo}`}
        </h3>

        <p className="text-sm text-gray-700">
          <strong>Color(es):</strong> {report.colors?.join(', ') || 'No especificado'}
        </p>
        <p className="text-sm text-gray-700">
          <strong>Tamaño:</strong> {report.size}
        </p>

        {report.weightKg && (
          <p className="text-sm text-gray-700">
            <strong>Peso aprox.:</strong> {report.weightKg} kg
          </p>
        )}

        <p className="text-sm text-gray-700 mt-2">{report.description}</p>
        <p className="mt-2 text-xs text-gray-500">{report.location}</p>
      </div>
    </div>
  );
};
