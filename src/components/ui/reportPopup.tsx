import { Report } from "src/types/report.ts";

interface Props {
  report: Report;
}

const ReportPopup = ({ report }: Props) => {
  return (
    <div className="text-sm">
      <p className="font-bold">
        {report.type === "Perdida" ? `🐾 ${report.name}` : "Avistamiento"}
      </p>
      {report.imageUrl && (
        <img
          src={report.imageUrl}
          className="w-full h-20 object-cover rounded-md mb-1"
          alt="Foto mascota"
        />
      )}
      <p className="text-xs">{report.description}</p>
      <p className="text-xs text-gray-500 mt-1">{report.dateTime}</p>
      <p className="text-xs text-gray-500">{report.location}</p>
    </div>
  );
};

export default ReportPopup;
