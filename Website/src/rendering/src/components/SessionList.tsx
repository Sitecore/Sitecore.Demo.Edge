import Link from 'next/link';

const SessionList = (): JSX.Element => (
  <div className="section session-list">
    <div className="section__content section__content--left">
      <h2>Sessions</h2>
      <div className="space-y-5 w-full">
        <div className="grid grid-cols-3 md:grid-cols-8 gap-5 border border-gray flex item-stretch p-5">
          <div className="session-info-col-1">
            <span className="text-gray-dark font-bold text-2xl">AUG</span>
            <br />
            <span className="text-3xl font-bold">24</span>
          </div>
          <div className="session-info-col-2">
            <span className="text-blue">Friday | 09:00 AM</span>
            <br />
            <span className="font-bold uppercase">Train Smarted, not harder</span>
            <br />
            John Johnson
          </div>
          <div className="session-info-col-3">
            <span className="font-bold uppercase">Standard Pass</span>
          </div>
          <div className="session-info-col-4">
            <Link href="/tickets/attendee">
              <a className="btn--main btn--main--round">Add to Calendar</a>
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-8 gap-5 border border-gray flex item-stretch p-5">
          <div className="session-info-col-1">
            <span className="text-gray-dark font-bold text-2xl">AUG</span>
            <br />
            <span className="text-3xl font-bold">24</span>
          </div>
          <div className="session-info-col-2">
            <span className="text-blue">Friday | 09:45 AM</span>
            <br />
            <span className="font-bold uppercase">FUEL FOR LIFE: NUTRITION 101</span>
            <br />
            Elle Smith
          </div>
          <div className="session-info-col-3">
            <span className="font-bold uppercase">VIP Pass</span>
          </div>
          <div className="session-info-col-4">
            <Link href="/tickets/attendee">
              <a className="btn--main btn--main--round">Add to Calendar</a>
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-8 gap-5 border border-gray flex item-stretch p-5">
          <div className="session-info-col-1">
            <span className="text-gray-dark font-bold text-2xl">AUG</span>
            <br />
            <span className="text-3xl font-bold">24</span>
          </div>
          <div className="session-info-col-2">
            <span className="text-blue">Friday | 10:15 AM</span>
            <br />
            <span className="font-bold uppercase">MOUNTAIN BIKING: TALES FROM THE TRAIL</span>
            <br />
            Chris Williams
          </div>
          <div className="session-info-col-3">
            <span className="font-bold uppercase">VIP Pass</span>
          </div>
          <div className="session-info-col-4">
            <Link href="/tickets/attendee">
              <a className="btn--main btn--main--round">Add to Calendar</a>
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-8 gap-5 border border-gray flex item-stretch p-5">
          <div className="session-info-col-1">
            <span className="text-gray-dark font-bold text-2xl">AUG</span>
            <br />
            <span className="text-3xl font-bold">24</span>
          </div>
          <div className="session-info-col-2">
            <span className="text-blue">Friday | 10:45 AM</span>
            <br />
            <span className="font-bold uppercase">7 MINDSET STRATEGIES TO RAISE YOUR GAME</span>
            <br />
            Tom Hudson
          </div>
          <div className="session-info-col-3">
            <span className="font-bold uppercase">Standard Pass</span>
          </div>
          <div className="session-info-col-4">
            <Link href="/tickets/attendee">
              <a className="btn--main btn--main--round">Add to Calendar</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default SessionList;
