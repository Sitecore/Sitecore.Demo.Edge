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
          id
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
              relativeUrl: 'b1a88e26f6a54a9ea64a5f759c5eea84',
              versionHash: '5aea50fb',
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
        id: 'dummy',
        content_Name: 'dummy',
        advertisement_Slogan: 'READY | STEADY | PLAY!',
        advertisement_Eyebrow: 'Sports and Recreation Expo',
        advertisement_Title: 'RAISE YOUR GAME',
        advertisement_Body: 'Join us in person or online for the fifth annual PLAY! Summit.',
        advertisement_Logo: dummyImage,
        advertisement_Image: dummyImage,
        advertisement_Background: dummyImage,
      },
    };
  }
};
