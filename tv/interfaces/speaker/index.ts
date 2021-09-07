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

export interface SpeakerResult {
  id: string;
  name: string;
  description: string;
  image: Image;
}

export interface AllDemoSpeaker {
  results: SpeakerResult[];
}

export interface Data {
  allDemo_Speaker: AllDemoSpeaker;
}

export interface AllSpeakersResponse {
  data: Data;
}

export interface Speaker {
  id: string;
  name: string;
  photo: string;
  description: string;
  image: Image;
}
