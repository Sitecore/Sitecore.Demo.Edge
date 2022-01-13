import { PublicLink } from "../interfaces/asset";
import { Image } from "../interfaces/schema";

interface Props {
  src: string;
}

export const contentHubImageLoader = ({ src }: Props) => {
  const contentHubUrl = process.env.NEXT_PUBLIC_CMP_PREVIEW_ENDPOINT_URL || "";

  return `${contentHubUrl}/api/public/content/${src}&t=web`;
};

export function contentHubImageSrcGenerator(src: Image) {
  const contentHubUrl = process.env.NEXT_PUBLIC_CMP_PREVIEW_ENDPOINT_URL || "";

  if (src?.results[0]?.assetToPublicLink?.results[0]) {
    return `${contentHubUrl}/api/public/content/${src.results[0].assetToPublicLink.results[0].relativeUrl}?v=${src.results[0].assetToPublicLink.results[0].versionHash}&t=web`;
  } else {
    return "/background.jpg";
  }
}

export function contentHubPublicLinkSrcGenerator(src: PublicLink) {
  const contentHubUrl = process.env.NEXT_PUBLIC_CMP_PREVIEW_ENDPOINT_URL || "";
  if (src?.relativeUrl) {
    return `${contentHubUrl}/api/public/content/${src?.relativeUrl}?v=${src?.versionHash}&t=web`;
  } else {
    return "/background.jpg";
  }
}
