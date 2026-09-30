export type CategoryType = 'shoes' | 'watches' | 'shirts' | 'store';

export interface StoryCardData {
  id: string;
  num: string;
  title: string;
  desc: string;
  position: 'pos-left' | 'pos-right' | 'pos-bottom';
}

export interface ProductConfig {
  id: string;
  name: string;
  tagline: string;
  badge: string;
  subtitle: string;
  dir: string;
  prefix: string;
  ext: string;
  count: number;
  price: string;
  numericPrice?: number;
  cards: StoryCardData[];
}

export interface CatalogItem {
  id: string;
  category: CategoryType;
  badge: string;
  title: string;
  desc: string;
  price: string;
  numericPrice: number;
  buttonText: string;
  iconType: 'shoe' | 'watch' | 'shirt';
  tags: string[];
  dir: string;
}

export interface CartItem {
  id: string;
  title: string;
  price: string;
  numericPrice: number;
  badge: string;
  category: CategoryType;
  quantity: number;
  imageSrc: string;
}
