import Link from 'next/link';
import Image from 'next/image';

const SponsorsGrid = (): JSX.Element => (
  <div className="section__sponsors__grid">
    <Link href="/sponsors/fitbit">
      <a className="section__sponsors__grid__sponsor">
        <div className="m-3">
          <Image src="/assets/img/sponsors-fitbit.svg" alt="Fitbit" width={180} height={80} />
        </div>
      </a>
    </Link>
    <Link href="/sponsors/sports">
      <a className="section__sponsors__grid__sponsor">
        <div className="m-3">
          <Image src="/assets/img/sponsors-sports.svg" alt="Sports" width={180} height={80} />
        </div>
      </a>
    </Link>
    <Link href="/sponsors/fitbit">
      <a className="section__sponsors__grid__sponsor">
        <div className="m-3">
          <Image src="/assets/img/sponsors-fitbit.svg" alt="Fitbit" width={180} height={80} />
        </div>
      </a>
    </Link>
    <Link href="/sponsors/sports">
      <a className="section__sponsors__grid__sponsor">
        <div className="m-3">
          <Image src="/assets/img/sponsors-sports.svg" alt="Sports" width={180} height={80} />
        </div>
      </a>
    </Link>
    <Link href="/sponsors/fitbit">
      <a className="section__sponsors__grid__sponsor">
        <div className="m-3">
          <Image src="/assets/img/sponsors-fitbit.svg" alt="Fitbit" width={180} height={80} />
        </div>
      </a>
    </Link>
    <Link href="/sponsors/sports">
      <a className="section__sponsors__grid__sponsor">
        <div className="m-3">
          <Image src="/assets/img/sponsors-sports.svg" alt="Sports" width={180} height={80} />
        </div>
      </a>
    </Link>
  </div>
);

export default SponsorsGrid;
