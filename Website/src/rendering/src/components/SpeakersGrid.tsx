import Link from 'next/link';

const SpeakersGrid = (): JSX.Element => (
  <div className="section__speakers__grid">
    <Link href="/speakers/mary-asada">
      <a className="section__speakers__grid__speaker">
        <img src="/assets/img/speaker-mary-asada.jpeg" alt="Mary Asada" />
        <p className="speaker__name">Mary Asada</p>
        <p className="speaker__role">Athlete</p>
      </a>
    </Link>
    <Link href="/speakers/martinmoore">
      <a className="section__speakers__grid__speaker">
        <img src="/assets/img/speaker-martin-moore.jpeg" alt="Matin Moore" />
        <p className="speaker__name">Martin Moore</p>
        <p className="speaker__role">Speaker</p>
      </a>
    </Link>
    <Link href="/speakers/jacobgonzalez">
      <a className="section__speakers__grid__speaker">
        <img src="/assets/img/speaker-jacob-gonzalez.jpeg" alt="Jacob Gonzalez" />
        <p className="speaker__name">Jacob Gonzalez</p>
        <p className="speaker__role">Speaker</p>
      </a>
    </Link>
    <Link href="/speakers/edjones">
      <a className="section__speakers__grid__speaker">
        <img src="/assets/img/speaker-ed-jones.jpeg" alt="Ed Jones" />
        <p className="speaker__name">Ed Jones</p>
        <p className="speaker__role">Speaker</p>
      </a>
    </Link>
    <Link href="/speakers/sophiataylor">
      <a className="section__speakers__grid__speaker">
        <img src="/assets/img/speaker-sophia-taylor.jpeg" alt="Sophia Taylor" />
        <p className="speaker__name">Sophia Taylor</p>
        <p className="speaker__role">Speaker</p>
      </a>
    </Link>
    <Link href="/speakers/lixiuying">
      <a className="section__speakers__grid__speaker">
        <img src="/assets/img/speaker-li-xiu-ying.jpeg" alt="Li Xiu Ying" />
        <p className="speaker__name">Li Xiu Ying</p>
        <p className="speaker__role">Speaker</p>
      </a>
    </Link>
    <Link href="/speakers/kategreen">
      <a className="section__speakers__grid__speaker">
        <img src="/assets/img/speaker-kate-green.jpeg" alt="Kate Green" />
        <p className="speaker__name">Kate Green</p>
        <p className="speaker__role">Speaker</p>
      </a>
    </Link>
    <Link href="/speakers/jalenwilliams">
      <a className="section__speakers__grid__speaker">
        <img src="/assets/img/speaker-jalen-williams.jpeg" alt="Jalen Williams" />
        <p className="speaker__name">Jalen Williams</p>
        <p className="speaker__role">Speaker</p>
      </a>
    </Link>
  </div>
);

export default SpeakersGrid;
