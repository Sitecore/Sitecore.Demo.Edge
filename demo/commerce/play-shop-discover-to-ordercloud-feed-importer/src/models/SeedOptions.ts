export interface SeedOptions {
  username: string;
  password: string;
  template: 'playsummit';
  productFilePath?: string;
  categoryFilePath?: string;
  prefixImageUrls: boolean;
  buyerID?: string;
  catalogID?: string;
  marketplaceID: string;
  environment: 'sandbox' | 'staging' | 'production';
}
