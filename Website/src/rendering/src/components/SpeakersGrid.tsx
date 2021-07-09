import Link from 'next/link';

const SpeakersGrid = (): JSX.Element => (
  <div className="section__speakers__grid">
    <Link href="/speakers/mary-asada">
      <a className="section__speakers__grid__speaker">
        <img src="/data/media/img/speakers/mary-asada.jpeg"  height="200px" width="200px" alt="Mary Asada" />
        <p className="speaker__name">Mary Asada</p>
        <p className="speaker__role">Athlete</p>
      </a>
    </Link>
    <Link href="/speakers/martinmoore">
      <a className="section__speakers__grid__speaker">
        <img src="/data/media/img/speakers/martin-moore.jpeg"  height="200px" width="200px" alt="Matin Moore" />
        <p className="speaker__name">Martin Moore</p>
        <p className="speaker__role">Speaker</p>
      </a>
    </Link>
    <Link href="/speakers/jacobgonzalez">
      <a className="section__speakers__grid__speaker">
        <img src="/data/media/img/speakers/jacob-gonzalez.jpeg"  height="200px" width="200px" alt="Jacob Gonzalez" />
        <p className="speaker__name">Jacob Gonzalez</p>
        <p className="speaker__role">Speaker</p>
      </a>
    </Link>
    <Link href="/speakers/edjones">
      <a className="section__speakers__grid__speaker">
        <img src="/data/media/img/speakers/ed-jones.jpeg"  height="200px" width="200px" alt="Ed Jones" />
        <p className="speaker__name">Ed Jones</p>
        <p className="speaker__role">Speaker</p>
      </a>
    </Link>
    <Link href="/speakers/sophiataylor">
      <a className="section__speakers__grid__speaker">
        <img src="/data/media/img/speakers/sophia-taylor.jpeg"  height="200px" width="200px" alt="Sophia Taylor" />
        <p className="speaker__name">Sophia Taylor</p>
        <p className="speaker__role">Speaker</p>
      </a>
    </Link>
    <Link href="/speakers/lixiuying">
      <a className="section__speakers__grid__speaker">
        <img src="/data/media/img/speakers/li-xiu-ying.jpeg"  height="200px" width="200px" alt="Li Xiu Ying" />
        <p className="speaker__name">Li Xiu Ying</p>
        <p className="speaker__role">Speaker</p>
      </a>
    </Link>
    <Link href="/speakers/kategreen">
      <a className="section__speakers__grid__speaker">
        <img src="/data/media/img/speakers/kate-green.jpeg"  height="200px" width="200px" alt="Kate Green" />
        <p className="speaker__name">Kate Green</p>
        <p className="speaker__role">Speaker</p>
      </a>
    </Link>
    <Link href="/speakers/jalenwilliams">
      <a className="section__speakers__grid__speaker">
        <img src="/data/media/img/speakers/jalen-williams.jpeg"  height="200px" width="200px" alt="Jalen Williams" />
        <p className="speaker__name">Jalen Williams</p>
        <p className="speaker__role">Speaker</p>
      </a>
    </Link>
  </div>
);

export default SpeakersGrid;
