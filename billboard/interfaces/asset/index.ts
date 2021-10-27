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
