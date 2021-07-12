import Link from 'next/link';
import Image from 'next/image';

import session1 from '../../data/media/img/sessions/session-1.jpg';
import session2 from '../../data/media/img/sessions/session-2.jpg';
import session3 from '../../data/media/img/sessions/session-3.jpg';
import session4 from '../../data/media/img/sessions/session-4.jpg';

const SessionsGrid = (): JSX.Element => (
  <section>
    <div className="max-w-screen-2xl mx-auto box-border overflow-hidden">
      <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        <div className="rounded overflow-hidden bg-white">
          <Image src={session1} alt="Session" width={340} height={227} />
          <div className="px-6 py-4">
            <div className="font-bold text-base mb-2 h-20">TRAIN SMARTER, NOT HARDER</div>
            <p className="text-gray-700 text-xs pb-3">Mon, 24th | 11.15 AM –11:45 AM</p>
            <p className="text-gray-700 text-xs pb-3">Duration: 30 minutes</p>
            <p className="text-gray-700 text-xs">ANDRES VILLARES | Professional</p>
          </div>
          <div className="px-6 pt-4 pb-10">
            <Link href="/tickets">
              <a className="btn--main btn--main--round">Get Tickets</a>
            </Link>
          </div>
        </div>

        <div className="rounded overflow-hidden bg-white">
          <Image src={session2} alt="Session" width={340} height={227} />
          <div className="px-6 py-4">
            <div className="font-bold text-base mb-2 h-20">FUEL FOR LIFE: NUTRITION 101</div>
            <p className="text-gray-700 text-xs pb-3">Mon, 24th | 11.15 AM –11:45 AM</p>
            <p className="text-gray-700 text-xs pb-3">Duration: 30 minutes</p>
            <p className="text-gray-700 text-xs">ANDRES VILLARES | Professional</p>
          </div>
          <div className="px-6 pt-4 pb-10">
            <Link href="/tickets">
              <a className="btn--main btn--main--round">Get Tickets</a>
            </Link>
          </div>
        </div>

        <div className="rounded overflow-hidden bg-white">
          <Image src={session3} alt="Session" width={340} height={227} />
          <div className="px-6 py-4">
            <div className="font-bold text-base mb-2 h-20">
              MOUNTAIN BIKING: TALES FROM THE TRAIL
            </div>
            <p className="text-gray-700 text-xs pb-3">Mon, 24th | 11.15 AM –11:45 AM</p>
            <p className="text-gray-700 text-xs pb-3">Duration: 30 minutes</p>
            <p className="text-gray-700 text-xs">ANDRES VILLARES | Professional</p>
          </div>
          <div className="px-6 pt-4 pb-10">
            <Link href="/tickets">
              <a className="btn--main btn--main--round">Get Tickets</a>
            </Link>
          </div>
        </div>

        <div className="rounded overflow-hidden bg-white">
          <Image src={session4} alt="Session" width={340} height={227} />
          <div className="px-6 py-4">
            <div className="font-bold text-base mb-2 h-20">
              7 MINDSET STRATEGIES TO RAISE YOUR GAME
            </div>
            <p className="text-gray-700 text-xs pb-3">Mon, 24th | 11.15 AM –11:45 AM</p>
            <p className="text-gray-700 text-xs pb-3">Duration: 30 minutes</p>
            <p className="text-gray-700 text-xs">ANDRES VILLARES | Professional</p>
          </div>
          <div className="px-6 pt-4 pb-10">
            <Link href="/tickets">
              <a className="btn--main btn--main--round">Get Tickets</a>
            </Link>
          </div>
        </div>

        <div className="rounded overflow-hidden bg-white">
          <Image src={session4} alt="Session" width={340} height={227} />
          <div className="px-6 py-4">
            <div className="font-bold text-base mb-2 h-20">
              7 MINDSET STRATEGIES TO RAISE YOUR GAME
            </div>
            <p className="text-gray-700 text-xs pb-3">Mon, 24th | 11.15 AM –11:45 AM</p>
            <p className="text-gray-700 text-xs pb-3">Duration: 30 minutes</p>
            <p className="text-gray-700 text-xs">ANDRES VILLARES | Professional</p>
          </div>
          <div className="px-6 pt-4 pb-10">
            <Link href="/tickets">
              <a className="btn--main btn--main--round">Get Tickets</a>
            </Link>
          </div>
        </div>

        <div className="rounded overflow-hidden bg-white">
          <Image src={session3} alt="Session" width={340} height={227} />
          <div className="px-6 py-4">
            <div className="font-bold text-base mb-2 h-20">
              MOUNTAIN BIKING: TALES FROM THE TRAIL
            </div>
            <p className="text-gray-700 text-xs pb-3">Mon, 24th | 11.15 AM –11:45 AM</p>
            <p className="text-gray-700 text-xs pb-3">Duration: 30 minutes</p>
            <p className="text-gray-700 text-xs">ANDRES VILLARES | Professional</p>
          </div>
          <div className="px-6 pt-4 pb-10">
            <Link href="/tickets">
              <a className="btn--main btn--main--round">Get Tickets</a>
            </Link>
          </div>
        </div>

        <div className="rounded overflow-hidden bg-white">
          <Image src={session2} alt="Session" width={340} height={227} />
          <div className="px-6 py-4">
            <div className="font-bold text-base mb-2 h-20">FUEL FOR LIFE: NUTRITION 101</div>
            <p className="text-gray-700 text-xs pb-3">Mon, 24th | 11.15 AM –11:45 AM</p>
            <p className="text-gray-700 text-xs pb-3">Duration: 30 minutes</p>
            <p className="text-gray-700 text-xs">ANDRES VILLARES | Professional</p>
          </div>
          <div className="px-6 pt-4 pb-10">
            <Link href="/tickets">
              <a className="btn--main btn--main--round">Get Tickets</a>
            </Link>
          </div>
        </div>

        <div className="rounded overflow-hidden bg-white">
          <Image src={session1} alt="Session" width={340} height={227} />
          <div className="px-6 py-4">
            <div className="font-bold text-base mb-2 h-20">TRAIN SMARTER, NOT HARDER</div>
            <p className="text-gray-700 text-xs pb-3">Mon, 24th | 11.15 AM –11:45 AM</p>
            <p className="text-gray-700 text-xs pb-3">Duration: 30 minutes</p>
            <p className="text-gray-700 text-xs">ANDRES VILLARES | Professional</p>
          </div>
          <div className="px-6 pt-4 pb-10">
            <Link href="/tickets">
              <a className="btn--main btn--main--round">Get Tickets</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default SessionsGrid;
