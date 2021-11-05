import { Image } from '../interfaces/hero';

interface Props {
  src: string;
}

const contentHubUrl =
  process.env.NEXT_PUBLIC_CMP_PREVIEW_ENDPOINT_URL ||
  'https://playsummit.sitecoresandbox.cloud:8443';

export const contentHubImageLoader = ({ src }: Props) => {
  return `${contentHubUrl}/api/public/content/${src}`;
};

export const contenthubimagesrcgenerator = (src: Image) => {
  if (src?.results[0]?.assetToPublicLink?.results[0]) {
    return `${contentHubUrl}/api/public/content/${src.results[0].assetToPublicLink.results[0].relativeUrl}?v=${src.results[0].assetToPublicLink.results[0].versionHash}`;
  } else {
    return '/backgrounds/background.jpg';
  }
};
