import { Image } from '../interfaces';

interface Props {
  src: string;
}

const contentHubUrl = process.env.NEXT_PUBLIC_CMP_PREVIEW_ENDPOINT_URL || '';

export const contentHubImageLoader = ({ src }: Props) => {
  return `${contentHubUrl}/api/public/content/${src}`;
};

//TODO: Remove the 8443 port number when content hub is fixed
export const contentHubImageSrcGenerator = (src: Image) => {
  return `${contentHubUrl}:8443/api/public/content/${src.results[0].assetToPublicLink.results[0].relativeUrl}?v=${src.results[0].assetToPublicLink.results[0].versionHash}`;
};
