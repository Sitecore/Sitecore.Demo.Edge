import { getHero } from '../api/queries/getHero';
import HeroSection from '../components/HeroSection';
import Screen from '../components/Screen';
import { HeroResult } from '../interfaces/hero';

type HeroSectionProps = {
  hero: HeroResult;
};

const Home = (props: HeroSectionProps): JSX.Element => {
  return (
    <Screen>
      <HeroSection hero={props.hero} />
    </Screen>
  );
};

export const getStaticProps = async () => {
  const { hero } = await getHero();

  return {
    props: {
      hero: hero,
    },
    revalidate: 10,
  };
};

export default Home;
