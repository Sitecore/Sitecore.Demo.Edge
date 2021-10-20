import { GetAllDays, getAllSessionsByDay } from '../api/queries/getSessions';
import { Day, Session } from '../interfaces/session';

type ScheduleProps = {
  days: Day[];
  schedule: Session[];
};

function groupBy(list: unknown[], keyGetter: (arg0: unknown) => unknown) {
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
  const groupedSchedule = groupBy(props.schedule, (ts) => ts.timeslot);
  console.log(groupedSchedule);

  const tableData: string[] = [];
  groupedSchedule.forEach(function (item) {
    let htmlBuilder = '';
    console.log('------------foreach-----------');
    console.log(item);
    htmlBuilder = '<div class="bg-blue text-white p-4">' + item[0].timeslot + '</div>';

    item.forEach((element: Session) => {
      htmlBuilder += '<div class="bg-gray p-2 flex-1">' + element.name + '</div>';
    });

    tableData.push(htmlBuilder);
  });

  console.log(tableData);

  return (
    <div className="flex flex-col space-y-2">
      {tableData.map((row, index) => {
        return <div className="flex gap-4" key={index} dangerouslySetInnerHTML={{ __html: row }} />;
      })}
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
