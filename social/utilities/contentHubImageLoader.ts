import { Image } from "../interfaces";

const contentHubUrl =
  process.env.NEXT_PUBLIC_CMP_PREVIEW_ENDPOINT_URL ||
  "https://playsummit.sitecoresandbox.cloud";

export const contentHubImageSrcGenerator = (src: Image) => {
  const image = src?.results && src?.results[0] && src.results[0].assetToPublicLink?.results[0];

  return `${contentHubUrl}/api/public/content/${image?.relativeUrl}?v=${image?.versionHash}&t=profile`;
};

export const contentHubImageSrcGeneratorFromString = (src: string) => {
  return `${contentHubUrl}/api/public/content/${src}`;
};
