import { ScheduleSlot, Session } from '../interfaces/session';

export function groupBy(original: Session[]): ScheduleSlot[] {
  let currentOutputIndex = -1;
  const initialOutput: ScheduleSlot[] = [];
  return original.reduce((output: ScheduleSlot[], currentValue: Session) => {
    // Create a new ScheduleSlot if needed
    if (output.length === 0 || currentValue.timeslot !== output[currentOutputIndex].Timeslot) {
      currentOutputIndex += 1;
      output.push({
        Timeslot: currentValue.timeslot,
        Sessions: [],
      });
    }
    // Add current session to ScheduleSlot
    output[currentOutputIndex].Sessions.push(currentValue);
    return output;
  }, initialOutput);
}
