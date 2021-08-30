import { fetchGraphQL } from '../..';
import { AllSpeakersResponse, Image, Speaker } from '../../../interfaces/speaker';

export const getSpeakers = async (): Promise<{ speakers: Speaker[] }> => {
  try {
    const speakersQuery = `
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

    const results: AllSpeakersResponse = (await fetchGraphQL(speakersQuery)) as AllSpeakersResponse;
    if (results) {
      const speakers: Speaker[] = [];

      for (const speakerResult of results.data.allDemo_Speaker.results) {
        const speaker = { ...speakerResult } as Speaker;

        const relativeUrl =
          speakerResult.image.results[0]?.assetToPublicLink.results[0]?.relativeUrl;
        const versionHash =
          speakerResult.image.results[0]?.assetToPublicLink.results[0]?.versionHash;
        speaker.photo = `${relativeUrl}?v=${versionHash}`;

        speakers.push(speaker);
      }

      return { speakers: speakers.sort((a, b) => a.name.localeCompare(b.name)) };
    } else {
      return {
        speakers: [
          {
            id: '1',
            name: 'Chris Williams',
            photo: '8b26400441374ea7a15301a6f01d70c1?v=ecc627d8',
            image: {} as Image,
            description:
              'Lorem ipsum dolor sit, amet consectetur adipisicing, elit. Eos, voluptatum dolorum! Laborum blanditiis consequatur, voluptates, sint enim fugiat saepe, dolor fugit, magnam explicabo eaque quas id quo porro dolorum facilis.',
          },
          {
            id: '2',
            name: 'Martin Moore',
            photo: '8b26400441374ea7a15301a6f01d70c1?v=ecc627d8',
            image: {} as Image,
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
    const speakerByIdQuery = `
    query {
      allDemo_Speaker (where:{id_eq:"${id}"}){
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

    const results: AllSpeakersResponse = (await fetchGraphQL(
      speakerByIdQuery
    )) as AllSpeakersResponse;
    if (results) {
      const speaker = { ...results.data.allDemo_Speaker.results[0] } as Speaker;
      const asset = speaker?.image.results[0]?.assetToPublicLink.results[0];
      const relativeUrl = asset?.relativeUrl;
      const versionHash = asset?.versionHash;
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
          image: {} as Image,
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
