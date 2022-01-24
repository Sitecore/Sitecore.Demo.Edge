import { useContext, useEffect, useState } from 'react';
import { FeatureFlagContext } from '../contexts/FeatureFlagContext';

type GraphQLResponseWithErrors = {
  errors: unknown[];
};

async function getData(query: string, endpointUrl: string, apiKey: string) {
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

export function useGraphQL(query: string) {
  const featureFlagContext = useContext(FeatureFlagContext);
  const [status, setStatus] = useState('idle');
  const [data, setData] = useState({});

  useEffect(() => {
    let apiKey = process.env.NEXT_PUBLIC_CMP_DELIVERY_API_KEY || '';
    let endpointUrl = process.env.NEXT_PUBLIC_CMP_DELIVERY_ENDPOINT_URL || '';

    if (featureFlagContext.featureFlags.isPreviewApiEnabled) {
      apiKey = process.env.NEXT_PUBLIC_CMP_PREVIEW_API_KEY || '';
      endpointUrl =
        process.env.NEXT_PUBLIC_CMP_PREVIEW_ENDPOINT_URL + '/api/graphql/preview/v1' || '';
    }

    if (!query) return;
    const fetchData = async () => {
      setStatus('fetching');
      setData(await getData(query, endpointUrl, apiKey));
      setStatus('fetched');
    };

    fetchData();
  }, [query, featureFlagContext.featureFlags.isPreviewApiEnabled]);

  return { status, data };
}

export async function fetchGraphQL(query: string, previewApiEnabled: boolean): Promise<unknown> {
  let apiKey = process.env.NEXT_PUBLIC_CMP_DELIVERY_API_KEY || '';
  let endpointUrl = process.env.NEXT_PUBLIC_CMP_DELIVERY_ENDPOINT_URL || '';

  if (previewApiEnabled) {
    apiKey = process.env.NEXT_PUBLIC_CMP_PREVIEW_API_KEY || '';
    endpointUrl =
      process.env.NEXT_PUBLIC_CMP_PREVIEW_ENDPOINT_URL + '/api/graphql/preview/v1' || '';
  }

  return getData(query, endpointUrl, apiKey);
}
