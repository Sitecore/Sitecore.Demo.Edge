import { Timeslot, Timeslots } from '../timeslot';

export interface DayResult {
  sortOrder: string;
  taxonomyName: string;
  timeslotToDay: Timeslots;
}

export interface Days {
  results: DayResult[];
}

export interface AllDaysResponse {
  data: {
    allDemo_Day: Days;
  };
}

export interface Day {
  name: string;
  sortOrder: string;
  timeslots: Timeslot[];
}
