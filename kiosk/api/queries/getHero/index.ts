import { fetchGraphQL } from '../..';
import { HeroResponse, HeroResult } from '../../../interfaces/hero';
import { Image } from '../../../interfaces';

export const getHero = async (heroId: string): Promise<{ hero: HeroResult }> => {
  const dummyImage: Image = {
    results: [
      {
        id: 'dummy',
        fileName: 'dummy.jpg',
        assetToPublicLink: {
          results: [
            {
              id: 'dummy',
              relativeUrl: '',
              versionHash: '',
            },
          ],
        },
      },
    ],
  };
  const dummyResult = {
    hero: {
      advertisement_Slogan: '',
      advertisement_Eyebrow: '',
      advertisement_Title: '',
      advertisement_Body: '',
      advertisement_Logo: dummyImage,
      advertisement_Image: dummyImage,
      advertisement_Background: dummyImage,
    },
  };

  if (process.env.CI === 'true') {
    return dummyResult;
  }

  const heroQuery = `
    query {
      allM_Content_Advertisement(where: {id_eq:"${heroId}"}) {
        results {
          advertisement_Title
          advertisement_Body
          advertisement_Slogan
          advertisement_Eyebrow
          advertisement_Logo {
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
          advertisement_Image: cmpContentToMasterLinkedAsset {
            results {
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

  const results: HeroResponse = (await fetchGraphQL(heroQuery)) as HeroResponse;
  const heroes: HeroResult[] = results?.data.allM_Content_Advertisement.results;

  if (heroes?.length > 0) {
    return {
      hero: heroes[0],
    };
  } else {
    return dummyResult;
  }
};
