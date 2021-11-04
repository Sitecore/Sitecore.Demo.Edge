import { Session } from '../session';

export type ScheduleSlot = {
  Timeslot: string;
  Sessions: Session[];
};
