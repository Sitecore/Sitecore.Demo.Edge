export interface HeroResult {
  advertisement_Title: string;
  advertisement_Body: string;
  advertisement_Slogan: string;
  advertisement_Eyebrow: string;
  advertisement_Logo: Image;
  advertisement_Image: Image;
  advertisement_Background: Image;
}

export interface Image {
  results: [
    {
      id: string;
      fileName: string;
      assetToPublicLink: {
        results: [
          {
            id: string;
            relativeUrl: string;
            versionHash: string;
          }
        ];
      };
    }
  ];
}

export interface HeroResponse {
  data: {
    allM_Content_Advertisement: {
      results: HeroResult[];
    };
  };
}
