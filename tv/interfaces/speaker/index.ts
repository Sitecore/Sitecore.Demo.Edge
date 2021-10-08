import { Image } from '../asset';

export interface SpeakerResults {
  results: SpeakerResult[];
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
