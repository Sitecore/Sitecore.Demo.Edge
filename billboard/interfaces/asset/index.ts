export interface PublicLink {
  id: string;
  relativeUrl: string;
  versionHash: string;
}

export interface AssetToPublicLink {
  results: PublicLink[];
}

export interface AssetResult {
  title: string;
  assetToPublicLink: AssetToPublicLink;
}

export interface Image {
  results: AssetResult[];
}
