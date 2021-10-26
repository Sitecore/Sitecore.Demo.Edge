import { RoomResults } from '../room';
import { Timeslots } from '../session';
import { SpeakerResults } from '../speaker';

export interface SchemaResponse {
  data: SchemaData;
}

export interface SchemaData {
  allDemo_Day: DayResults;
  allDemo_Venue: VenueResults;
  allDemo_Speaker: SpeakerResults;
}

export interface DayResult {
  taxonomyName: string;
  sortOrder: string;
  timeslotToDay: Timeslots;
}

export interface DayResults {
  results: DayResult[];
}

export interface VenueResult {
  name: string;
  rooms: RoomResults;
}

export interface VenueResults {
  results: VenueResult[];
}
