type GraphQLResponseWithErrors = {
  errors: unknown[];
};

export async function fetchGraphQL(query: string, previewApiEnabled: boolean): Promise<unknown> {
  let apiKey = process.env.NEXT_PUBLIC_CMP_DELIVERY_API_KEY || '';
  let endpointUrl = process.env.NEXT_PUBLIC_CMP_DELIVERY_ENDPOINT_URL || '';

  if (previewApiEnabled) {
    apiKey = process.env.NEXT_PUBLIC_CMP_PREVIEW_API_KEY || '';
    endpointUrl = process.env.NEXT_PUBLIC_CMP_PREVIEW_ENDPOINT_URL || '';
  }

  try {
    return await fetch(endpointUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-GQL-Token': apiKey,
      },
      body: JSON.stringify({ query }),
    })
      .then((response: Response) => {
        try {
          const jsonResponsePromise = response.json();
          jsonResponsePromise.then((jsonResponse: unknown) => {
            const responseWithErrors = jsonResponse as GraphQLResponseWithErrors;
            if (responseWithErrors.errors && responseWithErrors.errors.length > 0) {
              console.error(
                'An error was returned by a GraphQL query. See the associated logged object for details.',
                responseWithErrors
              );
            }
          });
          return jsonResponsePromise;
        } catch (error) {
          console.log(error);
        }
      })
      .catch((error) => {
        return console.log(error);
      });
  } catch (error) {
    return console.log(error);
  }
}
