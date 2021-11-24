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

export interface Params {
  id: string;
}

export interface TaxonomyLabel {
  'en-US': string;
}
