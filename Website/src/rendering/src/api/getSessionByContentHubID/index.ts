import { fetchGraphQL } from '..';

type SessionURLResult = {
  url: {
    url: string;
  };
};

type SessionURLsResults = {
  data: {
    search: {
      results: SessionURLResult[];
    };
  };
};

export const getSessionURLByContentHubID = async (id: string): Promise<string | undefined> => {
  const sessionByURLContentHubQuery = `
    query {
      search(where: {name:"EntityIdentifier", value:"${id}"}) {
        results {
          url {
            url
          }
        }
      }
    }
  `;

  const results: SessionURLsResults = (await fetchGraphQL(
    sessionByURLContentHubQuery
  )) as SessionURLsResults;

  if (!results?.data) {
    return undefined;
  }

  return results?.data?.search?.results[0]?.url?.url || undefined;
};
