import { Image } from '../asset';

export interface HeroResult {
  advertisement_Title: string;
  advertisement_Body: string;
  advertisement_Slogan: string;
  advertisement_Eyebrow: string;
  advertisement_Logo: Image;
  advertisement_Image: Image;
  advertisement_Background: Image;
}

export interface HeroResponse {
  data: {
    allM_Content_Advertisement: {
      results: HeroResult[];
    };
  };
}
