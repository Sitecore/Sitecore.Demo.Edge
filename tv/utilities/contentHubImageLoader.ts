interface Props {
  src: string;
}

export const contentHubImageLoader = ({ src }: Props) => {
  const contentHubUrl: string =
    process.env.NEXT_PUBLIC_CMP_PREVIEW_ENDPOINT_URL || 'https://playsummit.sitecoresandbox.cloud';

  return `${contentHubUrl}/api/public/content/${src}&t=web`;
};
