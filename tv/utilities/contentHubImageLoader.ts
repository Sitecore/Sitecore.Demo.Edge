interface Props {
  src: string;
}

const contentHubUrl: string =
  process.env.NEXT_PUBLIC_CMP_PREVIEW_ENDPOINT_URL || 'https://playsummit.sitecoresandbox.cloud';
const port = '8443';
const transformation = '';

export const contentHubImageLoader = ({ src }: Props) => {
  return `${contentHubUrl}${port ? ':' + port : ''}/api/public/content/${src}${
    transformation ? '&t=' + transformation : ''
  }`;
};

export function contentHubImageSrcGenerator(src: string) {
  return `${contentHubUrl}${port ? ':' + port : ''}/api/public/content/${src}${
    transformation ? '&t=' + transformation : ''
  }`;
}
