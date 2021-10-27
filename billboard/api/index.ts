export async function fetchGraphQL(query: string): Promise<unknown> {
  const apiKey: string = process.env.NEXT_PUBLIC_CMP_PREVIEW_API_KEY || 'QmN2bkkvWFdVWlg0Z2NMUE1MRENQZUFWVGF2MS8xWCsvQTlNdTMzeGRWVT18cGxheXN1bW1pdA==';
  const endpointUrl: string = process.env.NEXT_PUBLIC_CMP_PREVIEW_ENDPOINT_URL || 'https://playsummit.sitecoresandbox.cloud';

  try {
    const result = await fetch(endpointUrl + '/api/graphql/preview/v1', {
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
