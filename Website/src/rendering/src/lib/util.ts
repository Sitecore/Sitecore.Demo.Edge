/**
 * Get the publicUrl.
 * This is used primarily to enable compatibility with the Sitecore Experience Editor.
 */
export const getPublicUrl = (): string => {
  return process.env.PUBLIC_URL || '';
};

/**
 * Throws an error when the parameter is omitted.
 */
export function required(): undefined {
  throw new Error('Missing parameter');
}
