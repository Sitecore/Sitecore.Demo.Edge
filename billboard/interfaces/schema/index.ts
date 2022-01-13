import { AssetResult } from "../asset";

export interface BillboardResult {
  id: string;
  advertisement_Title: string;
  advertisement_Body: string;
  advertisement_Slogan: string;
  advertisement_Eyebrow: string;
  content_Name: string;
  advertisement_Image: Image;
  advertisement_Background: Image;
}

export interface Image {
  results: AssetResult[];
}

export interface BillboardResults {
  results: BillboardResult[];
}

export interface Data {
  allM_Content_Advertisement: BillboardResults;
}

export interface BillboardResponse {
  data: Data;
}
