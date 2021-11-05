export interface HeroResult {
  id: string;
  advertisement_title: string;
  advertisement_body: string;
  advertisement_slogan: string;
  advertisement_eyebrow: string;
  content_name: string;
  advertisement_logo: Image;
  advertisement_image: Image;
  advertisement_background: Image;
}

export interface Image {
  results: AssetResult[];
}

export interface HeroResults {
  results: HeroResult[];
}

export interface HeroResponse {
  data: {
    allM_Content_Advertisement: HeroResults;
  };
}

export interface PublicLink {
  id: string;
  relativeUrl: string;
  versionHash: string;
}

export interface AssetToPublicLink {
  results: PublicLink[];
}

export interface AssetResult {
  id: string;
  fileName: string;
  assetToPublicLink: AssetToPublicLink;
}

export interface Image {
  results: AssetResult[];
}
