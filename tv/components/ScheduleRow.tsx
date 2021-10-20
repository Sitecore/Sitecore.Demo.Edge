import { Session } from '../interfaces/session';

type ScheduleRowProps = {
  sessions: Session[];
  timeslot: string;
};

const ScheduleRow = (props: ScheduleRowProps): JSX.Element => {
  console.table(props);
  return (
    <div className="flex gap-4">
      <div className="bg-blue text-white p-4">{props.timeslot}</div>
      {props.sessions.map((session, index) => (
        <div className="bg-gray p-2 flex-1" key={index}>
          {session.name}
        </div>
      ))}
    </div>
  );
};

export default ScheduleRow;
