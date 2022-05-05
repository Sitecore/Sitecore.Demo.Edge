import { Product } from 'ordercloud-javascript-sdk';

export type DProduct = Product<DProductXp>;

export interface DProductXp {
  // add custom xp properties required for this project here
  ProductType?: string;
  ProductGroup?: string;
  Facets?: Record<string, string | string[]>[];
  Images?: {
    ThumbnailUrl?: string;
    Url?: string;
  }[];
  Breadcrumbs?: string[];
  ShortDescription?: string;
}
