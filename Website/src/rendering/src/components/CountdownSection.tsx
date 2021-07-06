import { Text, Field } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type CountdownSectionProps = ComponentProps & {
  fields: {
    heading: Field<string>;
  };
};

const CountdownSection = (props: CountdownSectionProps): JSX.Element => (
  <section className="section bg-gradient-to-b text-yellow flex text-center">
    <div className="flex-1">
      <h2>298</h2>Day(s)
    </div>
    <div className="flex-1">
      <h2>01</h2>Hour(s)
    </div>
    <div className="flex-1">
      <h2>15</h2>Minute(s)
    </div>
    <div className="flex-1">
      <h2>33</h2>Second(s)
    </div>
  </section>
);

export default CountdownSection;
