import Link from 'next/link';

const SessionList = (): JSX.Element => (
  <div className="session-list">
    <div className="session-info premium">
      <div className="session-info-col-date">
        <span className="session-info-ticket">premium</span>
        <div className="session-info-month">aug</div>
        <div className="session-info-date">24</div>
      </div>
      <div className="session-info-col-title">
        <span className="session-info-time">Friday | 09:45 AM</span>
        <div className="session-info-title">Fuel For Life: Nutrition 101</div>
        <div className="speaker-name">
          <a href="/">Elle Smith</a>
        </div>
        <div className="session-info-col-calendar">
          <Link href="/tickets/attendee">
            <a className="btn--main btn--main--round">Add to Calendar</a>
          </Link>
        </div>
      </div>
    </div>

    <div className="session-info premium">
      <div className="session-info-col-date">
        <span className="session-info-ticket">premium</span>
        <div className="session-info-month">aug</div>
        <div className="session-info-date">24</div>
      </div>
      <div className="session-info-col-title">
        <span className="session-info-time">Friday | 10:15 AM</span>
        <div className="session-info-title">Mountain Biking: Tales From The Trail</div>
        <div className="speaker-name">
          <a href="/">Chris Williams</a>
        </div>
        <div className="speaker-name">
          <a href="/">Chris Williams</a>
        </div>
        <div className="speaker-name">
          <a href="/">Chris Williams</a>
        </div>
        <div className="speaker-name">
          <a href="/">Chris Williams</a>
        </div>
        <div className="session-info-col-calendar">
          <Link href="/tickets/attendee">
            <a className="btn--main btn--main--round">Add to Calendar</a>
          </Link>
        </div>
      </div>
    </div>

    <div className="session-info">
      <div className="session-info-col-date">
        <div className="session-info-month">aug</div>
        <div className="session-info-date">24</div>
      </div>
      <div className="session-info-col-title">
        <span className="session-info-time">Friday | 10:45 AM</span>
        <div className="session-info-title">7 Mindset Strategies To Raise Your Game</div>
        <div className="speaker-name">
          <a href="/">Tom Hudson</a>
        </div>
        <div className="session-info-col-calendar">
          <Link href="/tickets/attendee">
            <a className="btn--main btn--main--round">Add to Calendar</a>
          </Link>
        </div>
      </div>
    </div>

    <div className="session-info">
      <div className="session-info-col-date">
        <div className="session-info-month">aug</div>
        <div className="session-info-date">24</div>
      </div>
      <div className="session-info-col-title">
        <span className="session-info-time">Friday | 09:00 AM</span>
        <div className="session-info-title">Train Smarted, not harder</div>
        <div className="speaker-name">
          <a href="/">John Johnson</a>
        </div>
        <div className="speaker-name">
          <a href="/">John Johnson</a>
        </div>
        <div className="speaker-name">
          <a href="/">John Johnson</a>
        </div>
        <div className="speaker-name">
          <a href="/">John Johnson</a>
        </div>
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
