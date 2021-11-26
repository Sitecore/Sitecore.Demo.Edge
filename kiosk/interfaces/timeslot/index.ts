import { TaxonomyLabel } from '..';

export interface TimeslotResult {
  sortOrder: number;
  id: string;
  taxonomyLabel: TaxonomyLabel;
}

export interface Timeslots {
  results: TimeslotResult[];
}

export interface Timeslot {
  taxonomyLabel: string;
}
