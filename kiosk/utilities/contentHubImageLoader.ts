interface Props {
  src: string;
}

export const contentHubImageLoader = ({ src }: Props) => {
  const contentHubUrl: string =
    process.env.CONTENT_HUB_URL || 'https://playsummit.sitecoresandbox.cloud';

  return `${contentHubUrl}/api/public/content/${src}`;
};
