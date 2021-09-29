/**
 * Throws an error when the parameter is omitted.
 */
export function required(): undefined {
  throw new Error('Missing parameter');
}
