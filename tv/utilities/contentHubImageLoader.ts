interface Props {
  src: string;
}

export const contentHubImageLoader = ({ src }: Props) => {
  const contentHubUrl = 'https://playsummit.sitecoresandbox.cloud';

  return `${contentHubUrl}/api/public/content/${src}`;
};
