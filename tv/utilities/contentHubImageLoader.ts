interface ContentHubImageLoaderProps {
  src: string;
}

export function contentHubImageSrcGenerator(src: string) {
  const contentHubUrl: string =
    process.env.NEXT_PUBLIC_CMP_PREVIEW_ENDPOINT_URL || 'https://playsummit.sitecoresandbox.cloud';

  return `${contentHubUrl}:8443/api/public/content/${src}`;
}

export const contentHubImageLoader = ({ src }: ContentHubImageLoaderProps) => {
  return contentHubImageSrcGenerator(src);
};
