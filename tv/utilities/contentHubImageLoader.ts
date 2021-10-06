interface Props {
  src: string;
}

export const contentHubImageLoader = ({ src }: Props) => {
  const contentHubUrl = 'https://playsummit.sitecoresandbox.cloud:8443';

  return `${contentHubUrl}/api/public/content/${src}`;
};
