export interface Session {
  id: string;
  name: string;
  description: string;
  room: string;
  timeslot: string;
  sortOrder: number;
}

export interface Room {
  id: string;
  name: string;
}

export interface Timeslot {
  id: string;
  name: string;
}
