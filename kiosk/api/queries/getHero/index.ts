import { fetchGraphQL } from '../..';
import { HeroResponse, HeroResult } from '../../../interfaces/hero';

export const getHero = async (heroId: string): Promise<{ hero: HeroResult }> => {
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
  const heroes: HeroResult[] = results?.data?.allM_Content_Advertisement.results;

  return {
    hero: heroes[0],
  };
};
