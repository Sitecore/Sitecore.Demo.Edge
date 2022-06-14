import Link from 'next/link';
import { ComponentProps } from 'lib/component-props';
import { withDatasourceCheck, Field, ImageField, Text } from '@sitecore-jss/sitecore-jss-nextjs';
import { Speaker } from '../../types/speaker';

type SessionPromoProps = ComponentProps & {
  fields: {
    Name: Field<string>;
    Image: ImageField;
    Speakers: Speaker[];
    Premium: Field<boolean>;
  };
};

const SessionPromo = (props: SessionPromoProps): JSX.Element => {
  const premiumSessionQualificative = props.fields.Premium.value ? 'premium' : '';

  const speakers = props.fields.Speakers.map((speaker) => (
    <p key={speaker.url}>
      <span className="section-title">{speaker.fields.Name.value}</span>
      <span className="event-subtitle">, {speaker.fields.JobTitle.value}</span>
    </p>
  ));

  return (
    <section
      className={`session-promo ${premiumSessionQualificative}`}
      style={{
        backgroundImage: `url(${props.fields.Image.value?.src})`,
      }}
    >
      <div className="content">
        <div className="triangle-area">
          <div className="text-area">
            <h1 className="section-title">Featured Event</h1>
            <Text field={props.fields.Name} tag="h3" className="event-title" />
            {speakers}
          </div>
          <div className="btn__area">
            <Link href="/tickets">
              <a className="btn--main btn--main--round">Book Tickets</a>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default withDatasourceCheck()<SessionPromoProps>(SessionPromo);
