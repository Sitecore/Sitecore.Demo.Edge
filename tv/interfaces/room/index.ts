export interface Room {
  id: string;
  name: string;
  venue: {
    name: string;
  };
}

export interface RoomResults {
  results: Room[];
}

export interface AllRoomsResponse {
  data: {
    allDemo_Room: RoomResults;
  };
}
