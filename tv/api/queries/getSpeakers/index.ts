import { fetchGraphQL } from '../..';
import { Speaker } from '../../../interfaces/index';

export const getSpeakers = async (preview: boolean): Promise<{ speakers: Speaker[] }> => {
  try {
    const speakersQuery: any = `
    query {
      allDemo_Speaker {
        results {
          id      
          name
          description
          image {
            results {
              id
              fileName
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

    const results: any = await fetchGraphQL(speakersQuery, preview);
    if (results) {
      const speakers: Speaker[] = results.data.allDemo_Speaker.results;

      for (const speaker of speakers) {
        const relativeUrl = speaker.image.results[0]?.assetToPublicLink.results[0]?.relativeUrl;
        const versionHash = speaker.image.results[0]?.assetToPublicLink.results[0]?.versionHash;
        speaker.photo = `${relativeUrl}?v=${versionHash}`;
      }

      return { speakers: speakers.sort((a, b) => a.name.localeCompare(b.name)) };
    } else {
      return {
        speakers: [
          {
            id: '1',
            name: 'Chris Williams',
            photo: '8b26400441374ea7a15301a6f01d70c1?v=ecc627d8',
            image: '',
            description:
              'Lorem ipsum dolor sit, amet consectetur adipisicing, elit. Eos, voluptatum dolorum! Laborum blanditiis consequatur, voluptates, sint enim fugiat saepe, dolor fugit, magnam explicabo eaque quas id quo porro dolorum facilis.',
          },
          {
            id: '2',
            name: 'Martin Moore',
            photo: '8b26400441374ea7a15301a6f01d70c1?v=ecc627d8',
            image: '',
            description:
              'Lorem ipsum dolor sit, amet consectetur adipisicing, elit. Eos, voluptatum dolorum! Laborum blanditiis consequatur, voluptates, sint enim fugiat saepe, dolor fugit, magnam explicabo eaque quas id quo porro dolorum facilis.',
          },
        ],
      };
    }
  } catch (err) {
    console.log(err);
    return {
      speakers: [],
    };
  }
};

export const getSpeakerById = async (id: string): Promise<{ speaker: Speaker }> => {
  try {
    const speakerByIdQuery: any =
      `
    query {
      allDemo_Speaker (where:{id_eq:"` +
      id +
      `"}){
        results {
          id      
          name
          description
          image{
            results {
              id
              fileName
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

    const results: any = await fetchGraphQL(speakerByIdQuery, false);
    if (results) {
      const speaker: Speaker = results.data.allDemo_Speaker.results[0];

      const relativeUrl = speaker?.image.results[0]?.assetToPublicLink.results[0]?.relativeUrl;
      const versionHash = speaker?.image.results[0]?.assetToPublicLink.results[0]?.versionHash;
      speaker.photo = `${relativeUrl}?v=${versionHash}`;

      return {
        speaker: speaker,
      };
    } else {
      return {
        speaker: {
          id: '1',
          name: 'Chris Williams',
          photo: '8b26400441374ea7a15301a6f01d70c1?v=ecc627d8',
          image: '',
          description:
            'Lorem ipsum dolor sit, amet consectetur adipisicing, elit. Eos, voluptatum dolorum! Laborum blanditiis consequatur, voluptates, sint enim fugiat saepe, dolor fugit, magnam explicabo eaque quas id quo porro dolorum facilis.',
        },
      };
    }
  } catch (err) {
    console.log(err);
    return {
      speaker: {} as Speaker,
    };
  }
};
