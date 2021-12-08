import { Timeslot } from '../timeslot';

export interface DayResult {
  sortOrder: string;
  taxonomyName: string;
}

export interface Days {
  results: DayResult[];
}

export interface Day {
  name: string;
  sortOrder: string;
  timeslots: Timeslot[];
}

export interface AllDaysResponse {
  data: {
    allDemo_Day: {
      results: DayResult[];
    };
  };
}
