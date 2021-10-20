import { getAllSessionsByDay } from '../api/queries/getSessions';
import ScheduleRow from '../components/ScheduleRow';
import { ScheduleSlot } from '../interfaces/session';
import { groupBy } from '../utilities/GroupByArray';

type ScheduleProps = {
  schedule: ScheduleSlot[];
};

const Schedule = (props: ScheduleProps): JSX.Element => {
  return (
    <div className="flex flex-col space-y-2">
      {props.schedule &&
        props.schedule.map((value, index) => (
          <ScheduleRow sessions={value.Sessions} timeslot={value.Timeslot} key={index} />
        ))}
    </div>
  );
};

export const getStaticProps = async () => {
  const { sessions } = await getAllSessionsByDay('Day 1'); //Get hardcoded schedule for first day

  return {
    props: {
      schedule: groupBy(sessions),
    },
    revalidate: 10,
  };
};

export default Schedule;
