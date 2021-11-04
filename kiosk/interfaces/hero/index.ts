export interface HeroResult {
  id: string;
  advertisement_Title: string;
  advertisement_Body: string;
  advertisement_Slogan: string;
  advertisement_Eyebrow: string;
  content_Name: string;
  advertisement_Logo: Image;
  advertisement_Image: Image;
  advertisement_Background: Image;
}

export interface Image {
  results: AssetResult[];
}

export interface HeroResults {
  results: HeroResult[];
}

export interface Data {
  allM_Content_Advertisement: HeroResults;
}

export interface HeroResponse {
  data: Data;
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
