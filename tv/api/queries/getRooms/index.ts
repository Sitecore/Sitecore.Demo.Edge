import { fetchGraphQL } from '../../../api';
import { Room, AllRoomsResponse } from '../../../interfaces/room';

export const getRooms = async (): Promise<{ rooms: Room[] }> => {
  const roomsQuery = `
    query {
      allDemo_Room(orderBy: NAME_ASC, first: 30) {
        results {
          id
          name
        }
      }
    }
    `;

  const results: AllRoomsResponse = (await fetchGraphQL(roomsQuery)) as AllRoomsResponse;

  const rooms: Room[] = results.data.allDemo_Room.results;

  return { rooms: rooms.sort((a, b) => a.name.localeCompare(b.name)) };
};

export const getRoomById = async (id: string): Promise<{ room: Room }> => {
  const roomByIdQuery = `
    query {
      allDemo_Room (where:{id_eq:"${id}"}){
        results {
          id
          name
          venue:rooms{
            name
          }
        }
      }
    }
    `;

  const results: AllRoomsResponse = (await fetchGraphQL(roomByIdQuery)) as AllRoomsResponse;
  return {
    room: { ...results.data.allDemo_Room.results[0] },
  };
};
