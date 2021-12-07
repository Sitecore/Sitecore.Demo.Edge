import { Image } from '../asset';

interface SpeakerResult {
  id: string;
  name: string;
  description: string;
  speakerToMasterAsset: Image;
}

export interface SpeakerResults {
  results: SpeakerResult[];
}
