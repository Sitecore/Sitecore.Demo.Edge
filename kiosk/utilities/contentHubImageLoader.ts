import { Image } from '../interfaces';

const contentHubUrl = process.env.NEXT_PUBLIC_CMP_PREVIEW_ENDPOINT_URL || '';

//TODO: Remove the 8443 port number when content hub is fixed
export const contentHubImageSrcGenerator = (src: Image) => {
  const image = src.results[0].assetToPublicLink.results[0];

  return `${contentHubUrl}:8443/api/public/content/${image.relativeUrl}?v=${image.versionHash}`;
};

export const contentHubImageSrcGeneratorFromString = (src: string) => {
  return `${contentHubUrl}/api/public/content/${src}`;
};
