export interface Treatment {
  id: string;
  name: string;
  description: string;
  available: boolean;
  price_in_euro: number;
  body_part: string;
}
