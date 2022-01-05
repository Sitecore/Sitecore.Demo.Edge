import { Image } from "../interfaces/schema";

interface Props {
  src: string;
}

export const contentHubImageLoader = ({ src }: Props) => {
  const contentHubUrl = "https://playsummit-demo.sitecoresandbox.cloud";

  return `${contentHubUrl}/api/public/content/${src}&t=web`;
};

export function contentHubImageSrcGenerator(src: Image) {
  const contentHubUrl = "https://playsummit-demo.sitecoresandbox.cloud";

  if (src?.results[0]?.assetToPublicLink?.results[0]) {
    return `${contentHubUrl}/api/public/content/${src.results[0].assetToPublicLink.results[0].relativeUrl}?v=${src.results[0].assetToPublicLink.results[0].versionHash}&t=web`;
  } else {
    return "/background.jpg";
  }
}
