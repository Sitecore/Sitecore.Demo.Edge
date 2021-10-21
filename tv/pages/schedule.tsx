import { getAllSessionsByDay } from '../api/queries/getSessions';
import ScheduleRow from '../components/ScheduleRow';
import { ScheduleSlot } from '../interfaces/session';
import { groupBy, SplitArray } from '../utilities/arrayUtilities';
import { Carousel } from 'react-responsive-carousel';

type ScheduleProps = {
  schedule: ScheduleSlot[][];
};

const Schedule = (props: ScheduleProps): JSX.Element => {
  return (
    <div id="container">
      <div id="monitor">
        <div id="monitorscreen">
          <div className="schedule">
            <Carousel
              autoPlay={true}
              showThumbs={false}
              axis={'vertical'}
              infiniteLoop={false}
              interval={8000}
            >
              {props.schedule &&
                props.schedule.map((value, index) => (
                  <div key={index}>
                    {value.map((session, i) => (
                      <ScheduleRow
                        sessions={session.Sessions}
                        timeslot={session.Timeslot}
                        key={i}
                      />
                    ))}
                  </div>
                ))}
            </Carousel>
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
      schedule: SplitArray(groupBy(sessions), 3),
    },
    revalidate: 10,
  };
};

export default Schedule;
