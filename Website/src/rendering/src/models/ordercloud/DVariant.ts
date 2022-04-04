import { Variant } from 'ordercloud-javascript-sdk';

export type DVariant = Variant<DVariantXp>;

export interface DVariantXp {
  // add custom xp properties required for this project here
  Images?: {
    ThumbnailUrl?: string;
    Url?: string;
  }[];
}
