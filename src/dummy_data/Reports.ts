export interface Report {
  id: string;
  type: 'Perdida' | 'Avistamiento';
  colors: string[];
  size: 'Mini' | 'Pequeño' | 'Mediano' | 'Grande';
  weightKg?: number;
  name?: string;
  description: string;
  dateTime: string;
  imageUrl: string;
  location: string;
  lat: number;
  lng: number;
}

export const dummyReports: Report[] = [
  {
    id: 'rpt001',
    type: 'Perdida',
    name: 'Luna',
    colors: ['Negro', 'Blanco'],
    size: 'Mediano',
    weightKg: 12,
    description: 'Se perdió cerca del parque central.',
    dateTime: '2025-06-09 18:30',
    imageUrl: 'https://picsum.photos/300?random=1',
    location: 'Chapinero, Bogotá',
    lat: 4.645,
    lng: -74.065,
  },
  {
    id: 'rpt002',
    type: 'Avistamiento',
    colors: ['Gris'],
    size: 'Pequeño',
    description: 'Visto en la calle 85.',
    dateTime: '2025-06-08 10:45',
    imageUrl: 'https://picsum.photos/300?random=2',
    location: 'Usaquén, Bogotá',
    lat: 4.682,
    lng: -74.030,
  },
];