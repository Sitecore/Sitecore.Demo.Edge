import { Field } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type SponsorsGridProps = ComponentProps & {
  fields: {
    heading: Field<string>;
  };
};

const SponsorsGrid = (props: SponsorsGridProps): JSX.Element => (
  <div className="section__sponsors__grid">
    <a href="#" className="section__sponsors__grid__sponsor">
      <img src="assets/img/sponsors-fitbit.svg" alt="Fitbit" />
    </a>
    <a href="#" className="section__sponsors__grid__sponsor">
      <img src="assets/img/sponsors-sports.svg" alt="Sports" />
    </a>
    <a href="#" className="section__sponsors__grid__sponsor">
      <img src="assets/img/sponsors-fitbit.svg" alt="Fitbit" />
    </a>
    <a href="#" className="section__sponsors__grid__sponsor">
      <img src="assets/img/sponsors-sports.svg" alt="Sports" />
    </a>
    <a href="#" className="section__sponsors__grid__sponsor">
      <img src="assets/img/sponsors-fitbit.svg" alt="Fitbit" />
    </a>
    <a href="#" className="section__sponsors__grid__sponsor">
      <img src="assets/img/sponsors-sports.svg" alt="Sports" />
    </a>
  </div>
);

export default SponsorsGrid;
