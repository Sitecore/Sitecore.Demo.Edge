export interface Post {
  id: string;
  content_name: string;
  socialMediaMessage_Title: string;
  socialMediaMessage_Body: string;
  socialMediaMessage_Date: string;
  socialMediaMessage_Footer: string;
  content_Brief: string;
  socialMediaMessage_Site: {
    id: string;
    taxonomyName: string;
  };
  cmpContentToMasterLinkedAsset: {
    results: {
      assetToPublicLink: {
        results: [
          {
            id: string;
            relativeUrl: string;
            versionHash: string;
          }
        ];
      };
    };
  };
}
