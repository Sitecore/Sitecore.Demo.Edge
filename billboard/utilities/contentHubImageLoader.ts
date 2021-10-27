import { Image } from "../interfaces/schema";

interface Props {
  src: string;
}

export const contentHubImageLoader = ({ src }: Props) => {
  const contentHubUrl = "https://playsummit.sitecoresandbox.cloud";

  return `${contentHubUrl}/api/public/content/${src}&t=web`;
};

export function contentHubImageSrcGenerator(src: Image) {
  const contentHubUrl = "https://playsummit.sitecoresandbox.cloud:8443";

  src?.results[0]?.assetToPublicLink?.results[0] &&
    console.log(
      `${contentHubUrl}/api/public/content/${src.results[0].assetToPublicLink.results[0].relativeUrl}?v=${src.results[0].assetToPublicLink.results[0].versionHash}&t=web`
    );

  return (
    src?.results[0]?.assetToPublicLink?.results[0] &&
    `${contentHubUrl}/api/public/content/${src.results[0].assetToPublicLink.results[0].relativeUrl}?v=${src.results[0].assetToPublicLink.results[0].versionHash}&t=web`
  );
}
