export async function fetchGraphQL(query: string, preview: boolean): Promise<unknown> {
  let apiKey: string = process.env.DELIVERY_API_KEY || '';
  let endpointUrl: string = process.env.DELIVERY_ENDPOINT_URL || '';

  if (preview) {
    apiKey = process.env.PREVIEW_API_KEY || '';
    endpointUrl = process.env.PREVIEW_ENDPOINT_URL || '';
  }

  console.log(endpointUrl);

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
