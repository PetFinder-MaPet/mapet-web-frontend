export interface Report {
  id: string;
  type: 'Perdida' | 'Avistamiento';
  colors: string[]; // array de colores
  size: 'Mini' | 'Pequeño' | 'Mediano' | 'Grande';
  weightKg?: number; // solo en perdidas
  name?: string;     // solo en perdidas
  description: string;
  dateTime: string;
  imageUrl: string;
  location: string;
}

export const dummyReports: Report[] = [
  {
    id: 'rpt001',
    type: 'Perdida',
    name: 'Luna',
    colors: ['Negro', 'Blanco'],
    size: 'Mediano',
    weightKg: 12,
    description: 'Se perdió cerca del parque central. Es muy amigable.',
    dateTime: '2025-06-09 18:30',
    imageUrl: 'https://picsum.photos/300?random=1',
    location: 'Chapinero, Bogotá',
  },
  {
    id: 'rpt002',
    type: 'Avistamiento',
    colors: ['Gris'],
    size: 'Pequeño',
    description: 'Visto en la esquina de la calle 85. Parecía asustado.',
    dateTime: '2025-06-08 10:45',
    imageUrl: 'https://picsum.photos/300?random=2',
    location: 'Usaquén, Bogotá',
  },
  {
    id: 'rpt003',
    type: 'Perdida',
    name: 'Rocky',
    colors: ['Café'],
    size: 'Grande',
    weightKg: 22,
    description: 'Se escapó por la reja en la noche. Tiene collar azul.',
    dateTime: '2025-06-07 23:00',
    imageUrl: 'https://picsum.photos/300?random=3',
    location: 'Teusaquillo, Bogotá',
  },
];