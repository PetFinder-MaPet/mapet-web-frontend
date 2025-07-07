export interface Report {
  id: string; 
  type: 'Perdida' | 'Avistamiento';
  name: string;
  description: string;
  dateTime: string;
  imageUrl: string;
  size: string;
  weightKg: number;
  colors: string[];
  location: string;
  lat: number;
  lng: number;
}
