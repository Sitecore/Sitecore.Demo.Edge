import { Image } from '../interfaces/asset';

const contentHubUrl = process.env.NEXT_PUBLIC_CMP_PREVIEW_ENDPOINT_URL || '';

export const contentHubImageSrcGenerator = (src: Image) => {
  const image = src.results[0].assetToPublicLink.results[0];

  return `${contentHubUrl}/api/public/content/${image.relativeUrl}?v=${image.versionHash}`;
};

export const contentHubImageSrcGeneratorFromString = (src: string) => {
  return `${contentHubUrl}/api/public/content/${src}`;
};
