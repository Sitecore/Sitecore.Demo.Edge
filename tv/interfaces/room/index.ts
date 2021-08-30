export interface Result {
  id: string;
  name: string;
}

export interface AllDemoRoom {
  results: Result[];
}

export interface Data {
  allDemo_Room: AllDemoRoom;
}

export interface AllRoomsResponse {
  data: Data;
}

export interface Room {
  id: string;
  name: string;
}
