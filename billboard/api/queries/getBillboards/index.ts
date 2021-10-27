import { fetchGraphQL } from "../..";
import { BillboardResponse, BillboardResult } from "../../../interfaces/schema";

export const getRooms = async (): Promise<{
  billboards: BillboardResult[];
}> => {
  const roomsQuery = `
    query {
      allM_Content_Advertisement {
        results {
          advertisement_Title
          advertisement_Body
          advertisement_Slogan
          advertisement_Eyebrow
          content_Name
          advertisement_Logo{
            results{
               assetToPublicLink(first: 1) {
                results {
                  id
                  relativeUrl
                  versionHash
                }
              }
            }
          }
          advertisement_Image{
            results{
               assetToPublicLink(first: 1) {
                results {
                  id
                  relativeUrl
                  versionHash
                }
              }
            }
          }
          advertisement_Background{
            results{
               assetToPublicLink(first: 1) {
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
    roomsQuery
  )) as BillboardResponse;
  const billboards: BillboardResult[] =
    results.data.allM_Content_Advertisement.results;

  return {
    billboards: billboards,
  };
};
