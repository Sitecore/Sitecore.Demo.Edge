import InformationPageHero, { InformationPageHeroProps } from './InformationPageHero';

const VendorInformationTypeHero = (props: InformationPageHeroProps): JSX.Element => (
  <InformationPageHero {...props} type="vendor" />
);

export default VendorInformationTypeHero;
