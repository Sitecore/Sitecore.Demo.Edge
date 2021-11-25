import { Session } from '../session';

export type ScheduleSlot = {
  Timeslot: string;
  SortOrder: number;
  Sessions: Session[];
};
