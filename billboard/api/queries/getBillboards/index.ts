import { fetchGraphQL } from "../..";
import { BillboardResponse, BillboardResult } from "../../../interfaces/schema";

export const getBillboards = async (): Promise<{
  billboards: BillboardResult[];
}> => {
  const billboardQuery = `
    query {
      allM_Content_Advertisement {
        results {
          id
          advertisement_Title
          advertisement_Body
          advertisement_Slogan
          advertisement_Eyebrow
          content_Name
          advertisement_Image: cmpContentToLinkedAsset {
            results{
               assetToPublicLink {
                results {
                  id
                  relativeUrl
                  versionHash
                }
              }
            }
          }
          advertisement_Background {
            results{
              title
              assetToPublicLink {
                results {
                  id
                  relativeUrl
                  versionHash
                }
              }
            }
          }
        }
      }
    }
    `;

  if (process.env.CI === "true") {
    return { billboards: [] as BillboardResult[] };
  }

  const results: BillboardResponse = (await fetchGraphQL(
    billboardQuery
  )) as BillboardResponse;
  const billboards: BillboardResult[] =
    results?.data?.allM_Content_Advertisement?.results;

  if (!billboards) {
    return { billboards: [] };
  }

  return {
    billboards: billboards.filter(
      (result: BillboardResult) =>
        result.advertisement_Background.results.length > 0
    ),
  };
};

export const getBillboardById = async (
  id: string
): Promise<{ billboard: BillboardResult }> => {
  const { billboards } = await getBillboards();

  return {
    billboard: billboards.filter(
      (result: BillboardResult) => result.content_Name == id
    )[0],
  };
};
