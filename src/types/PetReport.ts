export interface PetReport {
  id: string;
  type: string;
  description: string;
  date_time: string;
  latitude: number;
  longitude: number;
  reporter_id: string;
  image_url?: string;
  name?: string;
  color?: string;
  approximate_size?: string;
  approximate_weight_kg?: number;
}
