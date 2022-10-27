import { Room } from '../room';
import { SpeakerResults } from '../speaker';
import { Image } from '../asset';
import { Timeslot, Timeslots } from '../timeslot';
import { DayResult } from '../day';

export interface SessionResult {
  id: string;
  name: string;
  description: string;
  room: Room;
  speakers: SpeakerResults;
  roomName: string;
  sessionToMasterAsset: Image;
  timeslotName: string;
  timeslotOrder: number;
  timeslotToSession: Timeslots;
  dayToSession: DayResult;
  sessionsTypeToSessions: {
    taxonomyName: string;
  };
  isPremium: boolean;
}

export interface AllSessionsResponse {
  data: {
    allM_Content_Session: {
      results: SessionResult[];
    };
  };
}

export interface Session {
  id: string;
  name: string;
  speakers: {
    id: string;
    name: string;
  }[];
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
  type: string;
  isPremium: boolean;
}
