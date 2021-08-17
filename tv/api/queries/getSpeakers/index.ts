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
        }
      }
    }
    `;

    const results: any = await fetchGraphQL(speakersQuery, preview);
    if (results) {
      const speakers: Speaker[] = results.data.allDemo_Speaker.results;
      return { speakers: speakers.sort((a, b) => a.name.localeCompare(b.name)) };
    } else {
      return {
        speakers: [
          {
            id: '1',
            name: 'Chris Williams',
            description:
              'Lorem ipsum dolor sit, amet consectetur adipisicing, elit. Eos, voluptatum dolorum! Laborum blanditiis consequatur, voluptates, sint enim fugiat saepe, dolor fugit, magnam explicabo eaque quas id quo porro dolorum facilis.',
          },
          {
            id: '2',
            name: 'Martin Moore',
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
