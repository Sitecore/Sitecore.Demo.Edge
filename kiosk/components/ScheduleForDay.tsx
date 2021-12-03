import ScheduleRow from './ScheduleRow';
import { ScheduleSlot } from '../interfaces/schedule';

type ScheduleForDayProps = {
  schedule: ScheduleSlot[][];
};

const ScheduleForDay = (props: ScheduleForDayProps): JSX.Element => {
  return (
    <div className="schedule">
      {props.schedule && props.schedule.length > 0 && (
        <>
          {props.schedule[0].map((session, i) => (
            <div className="schedule-row" key={i}>
              <ScheduleRow sessions={session.Sessions} timeslot={session.Timeslot} />
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default ScheduleForDay;
