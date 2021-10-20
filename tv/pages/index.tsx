import Link from 'next/link';
import React from 'react';

export default function Home() {
  return (
    <div className="flex flex-col">
      <div>
        <Link href="/schedule">Conference hall</Link>
      </div>
      <div>
        <Link href="/speakers">Speakers</Link>
      </div>
      <div>
        <Link href="/rooms">Rooms</Link>
      </div>
    </div>
  );
}
