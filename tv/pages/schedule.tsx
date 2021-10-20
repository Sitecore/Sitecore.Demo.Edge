import { getAllSessionsByDay } from '../api/queries/getSessions';
import ScheduleRow from '../components/ScheduleRow';
import { ScheduleSlot } from '../interfaces/session';
import { groupBy } from '../utilities/GroupByArray';

type ScheduleProps = {
  schedule: ScheduleSlot[];
};

const Schedule = (props: ScheduleProps): JSX.Element => {
  return (
    <div id="container">
      <div id="monitor">
        <div id="monitorscreen">
          <div className="schedule">
            {props.schedule &&
              props.schedule.map((value, index) => (
                <ScheduleRow sessions={value.Sessions} timeslot={value.Timeslot} key={index} />
              ))}
          </div>
        </div>
      </div>
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
