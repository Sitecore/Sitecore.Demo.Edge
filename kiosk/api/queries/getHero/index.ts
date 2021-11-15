import { fetchGraphQL } from '../..';
import { HeroResponse, HeroResult, Image } from '../../../interfaces/hero';

export const getHeroes = async (): Promise<{
  heroes: HeroResult[];
}> => {
  let id: string = process.env.NEXT_PUBLIC_CMP_HERO_CONTENT_ID || '';
  if (id === '') id = 'jnZOQnEVhUyWn1le6m5FyQ';
  const heroQuery = `
    query {
      allM_Content_Advertisement(where:{id_eq:"${id}"}) {
        results {
          advertisement_Title
          advertisement_Body
          advertisement_Slogan
          advertisement_Eyebrow
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
          advertisement_Image: cmpContentToMasterLinkedAsset{
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

  if (process.env.CI === 'true') {
    return { heroes: [] as HeroResult[] };
  }

  const results: HeroResponse = (await fetchGraphQL(heroQuery)) as HeroResponse;
  const heroes: HeroResult[] = results?.data.allM_Content_Advertisement.results;

  return {
    heroes: heroes,
  };
};

export const getHero = async (): Promise<{ hero: HeroResult }> => {
  const { heroes } = await getHeroes();
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

  if (heroes?.length > 0) {
    return {
      hero: heroes[0],
    };
  } else {
    return {
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
  }
};
