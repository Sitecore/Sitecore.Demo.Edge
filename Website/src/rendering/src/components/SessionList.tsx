import Link from 'next/link';

const SessionList = (): JSX.Element => (
  <section className="section section__session-list">
    <div className="section__content">
      <h2>Sessions</h2>
      <div className="session-list">
        <div className="session-info">
          <div className="session-info-col-date">
            <span className="session-info-month">AUG</span>
            <br />
            <span className="session-info-date">24</span>
          </div>
          <div className="session-info-col-title">
            <span className="session-info-time">Friday | 09:00 AM</span>
            <br />
            <span className="session-info-title">Train Smarted, not harder</span>
            <br />
            John Johnson
          </div>
          <div className="session-info-col-ticket">
            <span className="session-info-ticket">Standard Pass</span>
          </div>
          <div className="session-info-col-calendar">
            <Link href="/tickets/attendee">
              <a className="btn--main btn--main--round">Add to Calendar</a>
            </Link>
          </div>
        </div>
        <div className="session-info">
          <div className="session-info-col-date">
            <span className="session-info-month">AUG</span>
            <br />
            <span className="session-info-date">24</span>
          </div>
          <div className="session-info-col-title">
            <span className="session-info-time">Friday | 09:45 AM</span>
            <br />
            <span className="session-info-title">FUEL FOR LIFE: NUTRITION 101</span>
            <br />
            Elle Smith
          </div>
          <div className="session-info-col-ticket">
            <span className="session-info-ticket">VIP Pass</span>
          </div>
          <div className="session-info-col-calendar">
            <Link href="/tickets/attendee">
              <a className="btn--main btn--main--round">Add to Calendar</a>
            </Link>
          </div>
        </div>
        <div className="session-info">
          <div className="session-info-col-date">
            <span className="session-info-month">AUG</span>
            <br />
            <span className="session-info-date">24</span>
          </div>
          <div className="session-info-col-title">
            <span className="session-info-time">Friday | 10:15 AM</span>
            <br />
            <span className="session-info-title">MOUNTAIN BIKING: TALES FROM THE TRAIL</span>
            <br />
            Chris Williams
          </div>
          <div className="session-info-col-ticket">
            <span className="session-info-ticket">VIP Pass</span>
          </div>
          <div className="session-info-col-calendar">
            <Link href="/tickets/attendee">
              <a className="btn--main btn--main--round">Add to Calendar</a>
            </Link>
          </div>
        </div>
        <div className="session-info">
          <div className="session-info-col-date">
            <span className="session-info-month">AUG</span>
            <br />
            <span className="session-info-date">24</span>
          </div>
          <div className="session-info-col-title">
            <span className="session-info-time">Friday | 10:45 AM</span>
            <br />
            <span className="session-info-title">7 MINDSET STRATEGIES TO RAISE YOUR GAME</span>
            <br />
            Tom Hudson
          </div>
          <div className="session-info-col-ticket">
            <span className="session-info-ticket">Standard Pass</span>
          </div>
          <div className="session-info-col-calendar">
            <Link href="/tickets/attendee">
              <a className="btn--main btn--main--round">Add to Calendar</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default SessionList;
