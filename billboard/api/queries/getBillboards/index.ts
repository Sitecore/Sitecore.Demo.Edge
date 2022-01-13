import { fetchGraphQL } from "../..";
import { BillboardResponse, BillboardResult } from "../../../interfaces/schema";
import { normalizeString } from "../../../utilities/stringConverter";

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
      (result: BillboardResult) => normalizeString(result.content_Name) == id
    )[0],
  };
};

export const getBillboardBySlug = async (
  name: string,
  backgroundId: string
): Promise<{ billboard: BillboardResult }> => {
  const { billboards } = await getBillboards();

  let theBillboard: BillboardResult = billboards.filter(
    (result: BillboardResult) => normalizeString(result.content_Name) == name
  )[0];

  const bgIndex = parseInt(backgroundId as string, 10);

  theBillboard.advertisement_Background.results =
    theBillboard.advertisement_Background.results.filter(
      (value, index, array) => {
        return array.indexOf(value) === bgIndex;
      }
    );

  return {
    billboard: theBillboard,
  };
};
