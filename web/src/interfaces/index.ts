export interface Tag {
  id: number;
  name: string;
  slug: string;
}

export interface Restaurant {
  id: number;
  name: string;
  logo_url: string;
  latitude: number;
  longitude: number;
  tags?: Tag[];
}
