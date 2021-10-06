import { fetchGraphQL } from '../../../api';
import { Session, AllSessionsResponse, SessionResult } from '../../../interfaces/session';
import { RoomResult } from '../../../interfaces/room';

export const getSessions = async (room: string): Promise<{ sessions: Session[] }> => {
  try {
    const sessionsQuery = `
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

          timeslotToSession {
            results {
              id
              taxonomyLabel
              sortOrder
            }
          }

          speakers {
            results {
              name
            }
          }
        }
      }
    }
    `;

    const results: AllSessionsResponse = (await fetchGraphQL(sessionsQuery)) as AllSessionsResponse;
    if (results) {
      const sessions: Session[] = [];

      results.data.allDemo_Session.results.forEach((s: SessionResult) => {
        if (s.room && s.room.results && s.room.results.find((e: RoomResult) => e.id == room)) {
          const session = {} as Session;
          session.id = s.id;
          session.name = s.name;
          session.description = s.description;

          if (s.room.results.length > 0) {
            session.room = s.room.results[0].name;
          }

          if (s.speakers.results.length > 0) {
            session.speaker = s.speakers.results[0].name;
          }

          if (s.timeslotToSession.results.length > 0) {
            session.timeslot = s.timeslotToSession.results[0].taxonomyLabel['en-US'];
            session.sortOrder = s.timeslotToSession.results[0].sortOrder;
          }

          sessions.push(session);
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
            speaker: "Speaker",
            sortOrder: 0,
          },
          {
            name: '7 mindset strategies to raise your game',
            description:
              'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.',
            id: '1',
            room: 'Room 1001',
            timeslot: '10:00am - 11:00am',
            speaker: "Speaker",
            sortOrder: 1,
          },
          {
            name: 'Mountain biking: tales from the trail',
            description:
              'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.',
            id: '1',
            room: 'Room 1001',
            timeslot: '11:00am - 10:00pm',
            speaker: "Speaker",
            sortOrder: 2,
          },
          {
            name: 'Train smarter, not harder',
            description:
              'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.',
            id: '1',
            room: 'Room 1001',
            timeslot: '02:00pm - 3:00pm',
            speaker: "Speaker",
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
