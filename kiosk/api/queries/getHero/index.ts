import { fetchGraphQL } from '../..';
import { HeroResponse, HeroResult, Image } from '../../../interfaces/hero';

export const getHeroes = async (): Promise<{
  heroes: HeroResult[];
}> => {
  const id: string = process.env.NEXT_PUBLIC_CMP_HERO_CONTENT_ID || 'jnZOQnEVhUyWn1le6m5FyQ';
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
        id: '',
        fileName: '',
        assetToPublicLink: {
          results: [
            {
              id: '',
              relativeUrl: '',
              versionHash: '',
            },
          ],
        },
      },
    ],
  };
  console.log(heroes);
  if (heroes?.length == 0) {
    return {
      hero: {
        id: 'dummy',
        content_name: 'dummy',
        advertisement_slogan: 'READY | STEADY | PLAY!',
        advertisement_eyebrow: 'Sports and Recreation Expo',
        advertisement_title: 'RAISE YOUR GAME',
        advertisement_body: 'Join us in person or online for the fifth annual PLAY! Summit.',
        advertisement_logo: dummyImage,
        advertisement_image: dummyImage,
        advertisement_background: dummyImage,
      },
    };
  } else {
    return {
      hero: heroes[0],
    };
  }
};
