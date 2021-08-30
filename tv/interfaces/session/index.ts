export interface RoomResult {
  id: string;
  name: string;
}

export interface Room {
  results: RoomResult[];
}

export interface TaxonomyLabel {
  'en-US': string;
}

export interface TimeslotResult {
  sortOrder: number;
  id: string;
  taxonomyLabel: TaxonomyLabel;
}

export interface Timeslots {
  results: TimeslotResult[];
}

export interface SessionResult {
  id: string;
  name: string;
  description: string;
  room: Room;
  roomName: string;
  timeslotName: string;
  timeslotOrder: number;
  timeslots: Timeslots;
}

export interface AllDemoSession {
  results: SessionResult[];
}

export interface Data {
  allDemo_Session: AllDemoSession;
}

export interface AllSessionsResponse {
  data: Data;
}

export interface Session {
  id: string;
  name: string;
  description: string;
  room: string | undefined;
  timeslot: string;
  sortOrder: number;
}
