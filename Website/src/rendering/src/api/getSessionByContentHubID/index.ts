import { fetchGraphQL } from '..';

type SessionURLResult = {
  url: {
    path: string;
  };
};

type SessionURLResults = {
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
            path
          }
        }
      }
    }
  `;

  const results: SessionURLResults = (await fetchGraphQL(
    sessionByURLContentHubQuery
  )) as SessionURLResults;

  if (!results?.data) {
    return undefined;
  }

  return results?.data?.search?.results[0]?.url?.path || undefined;
};
