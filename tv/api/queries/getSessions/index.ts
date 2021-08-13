import { fetchGraphQL } from '../../../api';
import { Session } from '../../../interfaces/index';

export const getSessions = async (preview: boolean, room: string): Promise<{ sessions: Session[] }> => {
  try {
    const sessionsQuery: any = `
    query {
      allDemo_Session{
        results{
          id
          name
          room {
            results{
              id
              name
            }
          }
          
          speakers {
            results {
              id
              name
            }
          }
          
          timeslots {
            results {
              id
              taxonomyName
            }
          }
        }
      }
    }
    `;

    const results: any = await fetchGraphQL(sessionsQuery, preview);
    if (results) {
      const sessions: Session[] = [];

      results.data.allDemo_Session.results.forEach((s: any) => {
        if(s.room && s.room.results && s.room.results.find(e => e.name == room)) {
          console.log(s);

          sessions.push(s);
        }
      });  

      return { sessions: sessions };
    } else {
      return {
        sessions: [
          {
            name: 'Fuel for life: nutrition 101',
            description:
              'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.',
            id: '1',
          },
          {
            name: '7 mindset strategies to raise your game',
            description:
              'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.',
            id: '1',
          },
          {
            name: 'Mountain biking: tales from the trail',
            description:
              'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.',
            id: '1',
          },
          {
            name: 'Train smarter, not harder',
            description:
              'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.',
            id: '1',
          },
        ],
      };
    }
  } catch (err) {
    console.log(err);
    return {
      sessions: [],
    };
  }
};
