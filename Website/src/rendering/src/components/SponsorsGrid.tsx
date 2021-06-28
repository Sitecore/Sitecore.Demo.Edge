import Link from 'next/link';

const SponsorsGrid = (): JSX.Element => (
  <div className="section__sponsors__grid">
    <Link href="/sponsors/fitbit">
      <a className="section__sponsors__grid__sponsor">
        <img src="/assets/img/sponsors-fitbit.svg" alt="Fitbit" />
      </a>
    </Link>
    <Link href="/sponsors/sports">
      <a className="section__sponsors__grid__sponsor">
        <img src="/assets/img/sponsors-sports.svg" alt="Sports" />
      </a>
    </Link>
    <Link href="/sponsors/fitbit">
      <a className="section__sponsors__grid__sponsor">
        <img src="/assets/img/sponsors-fitbit.svg" alt="Fitbit" />
      </a>
    </Link>
    <Link href="/sponsors/sports">
      <a className="section__sponsors__grid__sponsor">
        <img src="/assets/img/sponsors-sports.svg" alt="Sports" />
      </a>
    </Link>
    <Link href="/sponsors/fitbit">
      <a className="section__sponsors__grid__sponsor">
        <img src="/assets/img/sponsors-fitbit.svg" alt="Fitbit" />
      </a>
    </Link>
    <Link href="/sponsors/sports">
      <a className="section__sponsors__grid__sponsor">
        <img src="/assets/img/sponsors-sports.svg" alt="Sports" />
      </a>
    </Link>
  </div>
);

export default SponsorsGrid;
