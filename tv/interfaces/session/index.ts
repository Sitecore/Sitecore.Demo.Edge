import { RoomResults, Speaker, Timeslot } from '../room';
import { SpeakerResults } from '../speaker';
import { Image } from '../asset';

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

export interface DayResult {
  sortOrder: number;
  taxonomyName: string;
  timeslotToDay: Timeslots;
}

export interface Days {
  results: DayResult[];
}

export interface SessionResult {
  id: string;
  name: string;
  description: string;
  room: RoomResults;
  speakers: SpeakerResults;
  roomName: string;
  sessionImage: Image;
  timeslotName: string;
  timeslotOrder: number;
  timeslotToSession: Timeslots;
  dayToSession: Days;
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

export interface AllDaysResponse {
  data: {
    allDemo_Day: {
      results: DayResult[];
    };
  };
}

export interface Session {
  id: string;
  name: string;
  speakers: Speaker[];
  timeslotToSession: Timeslot[];
  sessionImage: {
    urls: string;
  };
  description: string;
  image: string;
  room: string | undefined;
  speaker: string | undefined;
  timeslot: string;
  sortOrder: number;
  Day: string;
}

export interface Day {
  name: string;
  sortOrder: number;
  timeslots: Timeslot[];
}
