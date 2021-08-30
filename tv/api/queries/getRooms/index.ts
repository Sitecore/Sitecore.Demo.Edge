import { fetchGraphQL } from '../../../api';
import { Room } from '../../../interfaces/index';

export const getRooms = async (): Promise<{ rooms: Room[] }> => {
  try {
    const roomsQuery: any = `
    query {
      allDemo_Room {
        results {
          id      
          name
        }
      }
    }
    `;

    const results: any = await fetchGraphQL(roomsQuery);
    if (results) {
      const rooms: Room[] = results.data.allDemo_Room.results;
      return { rooms: rooms.sort((a, b) => a.name.localeCompare(b.name)) };
    } else {
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
