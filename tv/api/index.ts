export async function fetchGraphQL(query: string): Promise<unknown> {
  const apiKey: string = process.env.CMP_PREVIEW_API_KEY || '';
  const endpointUrl: string = process.env.CMP_PREVIEW_ENDPOINT_URL || '';

  try {
    const result = await fetch(endpointUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-GQL-Token': apiKey,
      },
      body: JSON.stringify({ query }),
    }).then((response: Response) => response.json());
    return result;
  } catch (error) {
    return console.log(error);
  }
}
