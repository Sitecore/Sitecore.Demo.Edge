import { RoomResults } from '../room';
import { SpeakerResults } from '../speaker';
import { Image } from '../asset';
import { Timeslot, Timeslots } from '../timeslot';
import { Days } from '../day';

export interface SessionResult {
  id: string;
  name: string;
  description: string;
  room: RoomResults;
  speakers: SpeakerResults;
  roomName: string;
  sessionToMasterAsset: Image;
  timeslotName: string;
  timeslotOrder: number;
  timeslotToSession: Timeslots;
  dayToSession: Days;
  sessionsTypeToSessions: {
    taxonomyName: string;
  };
  isPremium: boolean;
}

export interface AllSessionsResponse {
  data: {
    allDemo_Session: {
      results: SessionResult[];
    };
  };
}

export interface SessionsByDayResponse {
  data: {
    allDemo_Day: {
      results: [
        {
          sortOrder: string;
          taxonomyName: string;
          dayToSession: {
            results: SessionResult[];
          };
        }
      ];
    };
  };
}

export interface SessionsByRoomResponse {
  data: {
    allDemo_Room: {
      results: [
        {
          id: string;
          name: string;
          venue: {
            name: string;
          };
          session: {
            results: SessionResult[];
          };
        }
      ];
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
  roomId: string | undefined;
  speaker: string | undefined;
  timeslot: string;
  sortOrder: number;
  day: string;
  shortDay: string;
  type: string;
  isPremium: boolean;
}
