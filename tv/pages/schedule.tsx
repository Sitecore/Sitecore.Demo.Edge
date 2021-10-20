import { GetAllDays, getAllSessionsByDay } from '../api/queries/getSessions';
import { Day, Session } from '../interfaces/session';

type ScheduleProps = {
  days: Day[];
  schedule: Session[];
};

function groupBy(list: any[], keyGetter: (arg0: any) => any) {
  const map = new Map();
  list.forEach((item) => {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return map;
}

const Schedule = (props: ScheduleProps): JSX.Element => {
  console.log(props.schedule);

  const uniques = props.schedule
    .map((item) => item.timeslot)
    .filter((value, index, self) => self.indexOf(value) === index);
  console.log(uniques);

  const groupedSchedule = groupBy(props.schedule, (ts) => ts.timeslot);
  console.log(groupedSchedule);

  return (
    <div>
      {/* <div>
        {props.days.map((day, index) => (
          <div key={index}>
            {day.name}
            <br />
            {day.timeslots.map((ts, ind) => (
              <div key={ind}>{ts.taxonomyLabel}</div>
            ))}
          </div>
        ))}
      </div> */}
      <div>
        <table>
          {/* {groupedSchedule.forEach(function (key) {
            <tr>
              <td>{groupedSchedule.get(key)}</td>
            </tr>;
          })} */}

          {/* {Object.keys(groupedSchedule).forEach((key) => {
            return <div>{key}</div>;

            groupedSchedule.get(key).forEach((object: Session) => {
              console.log(object);
            });
          })} */}

          {/* {groupedSchedule.forEach((row) => (
            <div>
              <div> {row.key}</div>
            </div>
          ))} */}

          {/* {props.schedule.map((session, index) => {
            return <div key={index}>{session.timeslot + ' ' + session.name}</div>;
          })} */}
        </table>
      </div>
    </div>
  );
};

export const getStaticProps = async () => {
  const { days } = await GetAllDays();
  const { sessions } = await getAllSessionsByDay('Day 1'); //Get hardcoded schedule for first day

  return {
    props: {
      days: days,
      schedule: sessions,
    },
    revalidate: 10,
  };
};

export default Schedule;
