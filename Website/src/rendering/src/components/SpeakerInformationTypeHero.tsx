import InformationPageHero, { InformationPageHeroProps } from './InformationPageHero';

const SpeakerInformationTypeHero = (props: InformationPageHeroProps): JSX.Element => (
  <InformationPageHero {...props} type="speaker" />
);

export default SpeakerInformationTypeHero;
