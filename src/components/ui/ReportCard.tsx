import { Report } from '../../dummy_data/Reports';

interface Props {
  report: Report;
}

export const ReportCard = ({ report }: Props) => {
  const isLost = report.type === 'Perdida';

  return (
    <div className="report-card bg-white rounded-xl shadow-md overflow-hidden w-full max-w-sm">
      <img src={report.imageUrl} alt="Foto mascota" className="w-full h-48 object-cover" />
      <div className="p-4">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold text-white px-2 py-1 rounded bg-red-400">
            {report.type}
          </span>
          <span className="text-sm text-gray-500">{report.dateTime}</span>
        </div>

        <h3 className="mt-2 font-semibold text-lg">
          {isLost && report.name ? `🐾 ${report.name}` : `🐾 Mascota ${report.type}`}
        </h3>

        <p className="text-sm text-gray-700">
          <strong>Color(es):</strong> {report.colors.join(', ')}
        </p>
        <p className="text-sm text-gray-700">
          <strong>Tamaño:</strong> {report.size}
        </p>

        {isLost && report.weightKg && (
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