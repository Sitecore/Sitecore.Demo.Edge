import { getHero } from '../api/queries/getHero';
import HeroSection from '../components/HeroSection';
import Screen from '../components/Screen';
import { HeroResult } from '../interfaces/hero';

type GetTicketKioskProps = {
  hero: HeroResult;
};

const GetTicketKiosk = (props: GetTicketKioskProps): JSX.Element => {
  return (
    <Screen>
      <HeroSection hero={props.hero} />
    </Screen>
  );
};

export const getStaticProps = async () => {
  const { hero } = await getHero('jnZOQnEVhUyWn1le6m5FyQ');

  return {
    props: {
      hero: hero,
    },
    revalidate: 10,
  };
};

export default GetTicketKiosk;
