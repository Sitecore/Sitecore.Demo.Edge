import Link from 'next/link';

const SessionList = (): JSX.Element => (
  <div className="session-list">
    <div className="session-info premium female">
      <div className="session-info-col-date">
        <span className="session-info-ticket">PREMIUM</span>
        <span className="session-info-month">AUG</span>
        <span className="session-info-date">24</span>
      </div>
      <div className="session-info-col-title">
        <span className="session-info-time">Friday | 09:45 AM</span>
        <span className="session-info-title">FUEL FOR LIFE: NUTRITION 101</span>
        <span className="speaker-name">
          <a href="/">Elle Smith</a>
        </span>
        <div className="session-info-col-calendar">
          <Link href="/tickets/attendee">
            <a className="btn--main btn--main--round">Add to Calendar</a>
          </Link>
        </div>
      </div>
    </div>

    <div className="session-info premium male">
      <div className="session-info-col-date">
        <span className="session-info-ticket">PREMIUM</span>
        <span className="session-info-month">AUG</span>
        <span className="session-info-date">24</span>
      </div>
      <div className="session-info-col-title">
        <span className="session-info-time">Friday | 10:15 AM</span>
        <span className="session-info-title">MOUNTAIN BIKING: TALES FROM THE TRAIL</span>
        <span className="speaker-name">
          <a href="/">Chris Williams</a>
        </span>
        <div className="session-info-col-calendar">
          <Link href="/tickets/attendee">
            <a className="btn--main btn--main--round">Add to Calendar</a>
          </Link>
        </div>
      </div>
    </div>

    <div className="session-info">
      <div className="session-info-col-date">
        <span className="session-info-ticket">Standard</span>
        <span className="session-info-month">AUG</span>
        <span className="session-info-date">24</span>
      </div>
      <div className="session-info-col-title">
        <span className="session-info-time">Friday | 10:45 AM</span>
        <span className="session-info-title">7 MINDSET STRATEGIES TO RAISE YOUR GAME</span>
        <span className="speaker-name">
          <a href="/">Tom Hudson</a>
        </span>
        <div className="session-info-col-calendar">
          <Link href="/tickets/attendee">
            <a className="btn--main btn--main--round">Add to Calendar</a>
          </Link>
        </div>
      </div>
    </div>

    <div className="session-info">
      <div className="session-info-col-date">
        <span className="session-info-ticket">Standard</span>
        <span className="session-info-month">AUG</span>
        <span className="session-info-date">24</span>
      </div>
      <div className="session-info-col-title">
        <span className="session-info-time">Friday | 09:00 AM</span>
        <span className="session-info-title">Train Smarted, not harder</span>
        <span className="speaker-name">
          <a href="/">John Johnson</a>
        </span>
        <div className="session-info-col-calendar">
          <Link href="/tickets/attendee">
            <a className="btn--main btn--main--round">Add to Calendar</a>
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default SessionList;
