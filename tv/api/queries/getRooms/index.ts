import { fetchGraphQL } from '../../../api';
import { Room, AllRoomsResponse } from '../../../interfaces/room';

export const getRooms = async (): Promise<{ rooms: Room[] }> => {
  try {
    const roomsQuery = `
    query {
      allDemo_Room(first: 10) {
        results {
          id
          name
        }
      }
    }
    `;

    const results: AllRoomsResponse = (await fetchGraphQL(roomsQuery)) as AllRoomsResponse;

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

export const getRoomById = async (id: string): Promise<{ room: Room }> => {
  try {
    const roomByIdQuery = `
    query {
      allDemo_Room (where:{id_eq:"${id}"}){
        results {
          id
          name
        }
      }
    }
    `;

    const results: AllRoomsResponse = (await fetchGraphQL(roomByIdQuery)) as AllRoomsResponse;
    if (results) {
      return {
        room: { ...results.data.allDemo_Room.results[0] },
      };
    } else {
      return {
        room: {
          id: '1',
          name: 'Room 1001',
        },
      };
    }
  } catch (err) {
    console.log(err);
    return {
      room: {} as Room,
    };
  }
};
