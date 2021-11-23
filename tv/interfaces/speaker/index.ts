import { Image } from '../asset';

export interface SpeakerResult {
  id: string;
  name: string;
  description: string;
  image: Image;
}

export interface SpeakerResults {
  results: SpeakerResult[];
}

export interface AllSpeakersResponse {
  data: {
    allDemo_Speaker: SpeakerResults;
  };
}

export interface Speaker {
  id: string;
  name: string;
  photo: string;
  description: string;
  image: Image;
}
