import { fetchGraphQL } from '../../../api';
import { Session } from '../../../interfaces/index';

export const getSessions = async (
  preview: boolean,
  room: string
): Promise<{ sessions: Session[] }> => {
  try {
    const sessionsQuery: any = `
    query {
      allDemo_Session{
        results{
          id
          name
          description
          room {
            results{
              id
              name
            }
          }
                    
          timeslots {
            results {
              id
              taxonomyLabel
              sortOrder
            }
          }
        }
      }
    }
    `;

    const results: any = await fetchGraphQL(sessionsQuery, preview);
    if (results) {
      const sessions: Session[] = [];
      console.log(results);

      results.data.allDemo_Session.results.forEach((s: any) => {
        if (s.room && s.room.results && s.room.results.find((e: any) => e.id == room)) {
          s.room = s.room.results.find((e: any) => e.id == room).name;

          if (s.timeslots.results.length > 0) {
            s.timeslot = s.timeslots.results[0].taxonomyLabel['en-US'];
            s.sortOrder = s.timeslots.results[0].sortOrder;
          }

          sessions.push(s);
        }
      });

      return { sessions: sessions.sort((a, b) => a.sortOrder - b.sortOrder) };
    } else {
      return {
        sessions: [
          {
            name: 'Fuel for life: nutrition 101',
            description:
              'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.',
            id: '1',
            room: 'Room 1001',
            timeslot: '09:00am - 10:00am',
            sortOrder: 0,
          },
          {
            name: '7 mindset strategies to raise your game',
            description:
              'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.',
            id: '1',
            room: 'Room 1001',
            timeslot: '10:00am - 11:00am',
            sortOrder: 1,
          },
          {
            name: 'Mountain biking: tales from the trail',
            description:
              'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.',
            id: '1',
            room: 'Room 1001',
            timeslot: '11:00am - 10:00pm',
            sortOrder: 2,
          },
          {
            name: 'Train smarter, not harder',
            description:
              'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.',
            id: '1',
            room: 'Room 1001',
            timeslot: '02:00pm - 3:00pm',
            sortOrder: 3,
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
