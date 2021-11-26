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
