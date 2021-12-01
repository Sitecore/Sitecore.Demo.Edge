import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Day } from '../interfaces/day';

type ScheduleHeaderProps = {
  days: Day[];
};

const ScheduleHeader = (props: ScheduleHeaderProps): JSX.Element => {
  const router = useRouter();
  const dayId = router.query.id;

  return (
    <div className="schedule-header">
      <div className="schedule-logo">
        <Link href="/start">
          <a>
            <Image
              src="https://playsummit.sitecoresandbox.cloud/api/public/content/c78f4095acc746a98146aaa38f57a04f?v=cf5688ab"
              width={200}
              height={40}
              className="left float"
              alt="Logo"
              title="Tap to go home"
            />
          </a>
        </Link>
      </div>
      <div className="btn__area--minimal">
        {props.days &&
          props.days.map((day, index) => {
            const activeButtonClass = index.toString() == dayId ? 'active' : 'inactive';
            return (
              <Link key={index} href={'/schedule/' + day.sortOrder}>
                <a
                  className={
                    'btn--main btn--main--round btn--main--secondary btn--main--big ' +
                    activeButtonClass
                  }
                >
                  {day.name}
                </a>
              </Link>
            );
          })}
      </div>
      <div className="schedule-ticket">
        <Link href="/tickets">
          <a className="btn--main btn--main--round btn--main--primary btn--main--big btn-right">
            Book tickets
          </a>
        </Link>
      </div>
    </div>
  );
};

export default ScheduleHeader;
