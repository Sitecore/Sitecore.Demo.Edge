interface ContentHubImageLoaderProps {
  src: string;
}

export function contentHubImageSrcGenerator(src: string) {
  const contentHubUrl: string =
    process.env.DAM_URL || 'https://playsummit.sitecoresandbox.cloud';

  return `${contentHubUrl}/api/public/content/${src}`;
}

export const contentHubImageLoader = ({ src }: ContentHubImageLoaderProps) => {
  return contentHubImageSrcGenerator(src);
};
