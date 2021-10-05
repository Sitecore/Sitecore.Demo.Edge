import { fetchGraphQL } from '../../../api';
import { Room, AllRoomsResponse } from '../../../interfaces/room';

export const getRooms = async (): Promise<{ rooms: Room[] }> => {
  try {
    const roomsQuery = `
    query {
      allDemo_Room(first: 30) {
        results {
          id
          name
          sessions: room {
            results {
              name
              speakers:speakers{
                results{
                  name
                }
              }
              timeslots:timeslotToSession{
                results{
                  taxonomyLabel
                }
              }
              image:sessionImage{
                results{
                  urls
                }
              }
            }
          }
        }
      }
    }
    `;

    const results: AllRoomsResponse = (await fetchGraphQL(roomsQuery)) as AllRoomsResponse;

    if (results) {
      console.log(results);
      const rooms: Room[] = results.data.allDemo_Room.results;
      return { rooms: rooms.sort((a, b) => a.name.localeCompare(b.name)) };
    } else {
      console.log('no results');
      return {
        rooms: [
          {
            id: '1',
            name: 'Room 1001',
          },
          {
            id: '2',
            name: 'Room 1002',
          },
          {
            id: '3',
            name: 'Room 1003',
          },
        ],
      };
    }
  } catch (err) {
    console.log(err);
    return {
      rooms: [],
    };
  }
};
