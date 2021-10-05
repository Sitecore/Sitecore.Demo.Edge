export interface RoomResult {
  id: string;
  name: string;
}

export interface RoomResults {
  results: RoomResult[];
}

export interface Data {
  allDemo_Room: RoomResults;
}

export interface AllRoomsResponse {
  data: Data;
}

export interface Room {
  id: string;
  name: string;
}

export interface Session {
  id: string;
  name: string;
  speakers: Speaker[];
  timeslots: Timeslot[];
  sessionImage: {
    urls: string;
  };
}

export interface Speaker {
  id: string;
  name: string;
}

export interface Timeslot {
  taxonomyLabel: string;
}
