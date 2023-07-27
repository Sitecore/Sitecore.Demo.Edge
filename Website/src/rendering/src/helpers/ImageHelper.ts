export const addTransformation = (imageUrl: string, transformation: string): string => {
  if (!imageUrl || !transformation) {
    return imageUrl;
  }

  const queryStringJoinCharacter = imageUrl.includes('?') ? '&' : '?';

  return `${imageUrl}${queryStringJoinCharacter}t=${transformation}`;
};
