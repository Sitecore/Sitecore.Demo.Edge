import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const ScheduleHeader = (): JSX.Element => {
  return (
    <div className="schedule-header">
      <div className="flex-auto flex">
        <Image
          src="https://playsummit.sitecoresandbox.cloud/api/public/content/c78f4095acc746a98146aaa38f57a04f?v=cf5688ab"
          width={200}
          height={40}
          className="left float"
          alt="Logo"
        />
      </div>
      <div className="btn__area--minimal flex-auto flex">
        <Link href="/signup">
          <a className="btn--main btn--main--round btn--main--round--secondary btn--main--big">
            Day 1
          </a>
        </Link>
        <Link href="/signup">
          <a className="btn--main btn--main--round btn--main--round--secondary btn--main--big">
            Day 2
          </a>
        </Link>
        <Link href="/signup">
          <a className="btn--main btn--main--round btn--main--round--secondary btn--main--big">
            Day 3
          </a>
        </Link>
      </div>
      <div className="flex-auto justify-end flex">
        <Link href="/signup">
          <a className="btn--main btn--main--round btn--main--round--primary btn--main--big btn-right">
            Book tickets
          </a>
        </Link>
      </div>
    </div>
  );
};

export default ScheduleHeader;
