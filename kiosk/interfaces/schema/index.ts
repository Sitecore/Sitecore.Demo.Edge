import { RoomResults } from '../room';
import { TimeslotResult, Timeslots } from '../timeslot';
import { SpeakerResults } from '../speaker';

export interface SchemaResponse {
  data: SchemaData;
}

export interface VenueResponse {
  data: VenueData;
}

export interface VenueData {
  allDemo_Venue: VenueResults;
}

export interface SchemaData {
  allDemo_Day: DayResults;
  allDemo_Timeslot: TimeslotResults;
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

export interface TimeslotResults {
  results: TimeslotResult[];
}

export interface VenueResult {
  id: string;
  name: string;
  rooms: RoomResults;
}

export interface VenueResults {
  results: VenueResult[];
}
