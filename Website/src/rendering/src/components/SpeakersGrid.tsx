import Link from 'next/link';
import Image from 'next/image';

import speaker1 from '../../data/media/img/speakers/mary-asada.jpeg';
import speaker2 from '../../data/media/img/speakers/martin-moore.jpeg';
import speaker3 from '../../data/media/img/speakers/jacob-gonzalez.jpeg';
import speaker4 from '../../data/media/img/speakers/ed-jones.jpeg';
import speaker5 from '../../data/media/img/speakers/sophia-taylor.jpeg';
import speaker6 from '../../data/media/img/speakers/li-xiu-ying.jpeg';
import speaker7 from '../../data/media/img/speakers/kate-green.jpeg';
import speaker8 from '../../data/media/img/speakers/jalen-williams.jpeg';

const SpeakersGrid = (): JSX.Element => {
  return (
    <div className="section__speakers__grid">
      <Link href="/speakers/mary-asada">
        <a className="section__speakers__grid__speaker">
          <Image src={speaker1} alt="Speaker" width={260} height={260} />
          <p className="speaker__name">Mary Asada</p>
          <p className="speaker__role">Athlete</p>
        </a>
      </Link>
      <Link href="/speakers/martinmoore">
        <a className="section__speakers__grid__speaker">
          <Image src={speaker2} alt="Speaker" width={260} height={260} />
          <p className="speaker__name">Martin Moore</p>
          <p className="speaker__role">Speaker</p>
        </a>
      </Link>
      <Link href="/speakers/jacobgonzalez">
        <a className="section__speakers__grid__speaker">
          <Image src={speaker3} alt="Speaker" width={260} height={260} />
          <p className="speaker__name">Jacob Gonzalez</p>
          <p className="speaker__role">Speaker</p>
        </a>
      </Link>
      <Link href="/speakers/edjones">
        <a className="section__speakers__grid__speaker">
          <Image src={speaker4} alt="Speaker" width={260} height={260} />
          <p className="speaker__name">Ed Jones</p>
          <p className="speaker__role">Speaker</p>
        </a>
      </Link>
      <Link href="/speakers/sophiataylor">
        <a className="section__speakers__grid__speaker">
          <Image src={speaker5} alt="Speaker" width={260} height={260} />
          <p className="speaker__name">Sophia Taylor</p>
          <p className="speaker__role">Speaker</p>
        </a>
      </Link>
      <Link href="/speakers/lixiuying">
        <a className="section__speakers__grid__speaker">
          <Image src={speaker6} alt="Speaker" width={260} height={260} />
          <p className="speaker__name">Li Xiu Ying</p>
          <p className="speaker__role">Speaker</p>
        </a>
      </Link>
      <Link href="/speakers/kategreen">
        <a className="section__speakers__grid__speaker">
          <Image src={speaker7} alt="Speaker" width={260} height={260} />
          <p className="speaker__name">Kate Green</p>
          <p className="speaker__role">Speaker</p>
        </a>
      </Link>
      <Link href="/speakers/jalenwilliams">
        <a className="section__speakers__grid__speaker">
          <Image src={speaker8} alt="Speaker" width={260} height={260} />
          <p className="speaker__name">Jalen Williams</p>
          <p className="speaker__role">Speaker</p>
        </a>
      </Link>
    </div>
  );
};

export default SpeakersGrid;
