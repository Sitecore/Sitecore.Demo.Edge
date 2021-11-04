import { Image } from '../interfaces/hero';

interface Props {
  src: string;
}

const contentHubUrl = process.env.NEXT_PUBLIC_CMP_PREVIEW_ENDPOINT_URL || '';

export const contentHubImageLoader = ({ src }: Props) => {
  return `${contentHubUrl}/api/public/content/${src}`;
};

export function contentHubImageSrcGenerator(src: Image) {
  if (src?.results[0]?.assetToPublicLink?.results[0]) {
    return `${contentHubUrl}/api/public/content/${src.results[0].assetToPublicLink.results[0].relativeUrl}?v=${src.results[0].assetToPublicLink.results[0].versionHash}`;
  } else {
    return '/backgrounds/background.jpg';
  }
}
