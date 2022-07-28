import { Product } from 'ordercloud-javascript-sdk';

export type DProduct = Product<DProductXp>;

export interface DProductXp {
  // add custom xp properties required for this project here
  ProductType?: string;
  ProductUrl: string;
  ProductGroup?: string;
  Images?: {
    ThumbnailUrl?: string;
    Url?: string;
  }[];
  ShortDescription?: string;
  Brand?: string;
  CCID?: string;
  Price?: string; // using b2c retail price as basis for sorting, may not match real price user sees
  Facets?: {
    color?: string;
    size?: string;
  };
}
