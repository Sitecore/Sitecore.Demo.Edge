import { fetchGraphQL } from "../..";
import { BillboardResponse, BillboardResult } from "../../../interfaces/schema";
import { getRandomInt, normalizeString } from "../../../utilities/helper";

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
          advertisement_Code: advertisement_Logo {
            results {
              assetToPublicLink {
                results {
                  id
                  relativeUrl
                  versionHash
                }
              }
            }
          }
          advertisement_Image: cmpContentToLinkedAsset {
            results{
               assetToPublicLink (first: 1) {
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

export const getBillboardByName = async (
  name: string
): Promise<{ billboard: BillboardResult }> => {
  const { billboards } = await getBillboards();

  const billboard = billboards.filter(
    (result: BillboardResult) => normalizeString(result.content_Name) == name
  )[0];

  return {
    billboard: RandomizeBillboardStyle(billboard),
  };
};

const RandomizeBillboardStyle = (billboard: BillboardResult) => {
  const styles = [
    "full-width",
    "image-left",
    "image-right",
    "full-width-minimal",
    "image-left-sixty-forty",
  ];
  billboard.advertisement_Image.results.map(
    (style) => (style.style = styles[getRandomInt(styles.length)])
  );
  return billboard;
};
