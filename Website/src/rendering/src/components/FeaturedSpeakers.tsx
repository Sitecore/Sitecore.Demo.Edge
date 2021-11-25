import { Text, Field, RichText, Image, LinkField, Link } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { GraphQLSpeaker } from 'src/types/speaker';
import React from 'react';

export type FeaturedSpeakersProps = ComponentProps & {
  fields: {
    data: {
      source: {
        title: Field<string>;
        content: Field<string>;
        callToActionLink: {
          jsonValue: LinkField;
        };
        numberOfSpeakers: Field<string>;
      };
      item: {
        children: {
          results: GraphQLSpeaker[];
        };
      };
    };
  };
};

const FeaturedSpeakers = (props: FeaturedSpeakersProps): JSX.Element => {
  const speakers = props.fields.data.item.children.results
    .filter((item) => item.featured.value)
    .sort()
    .slice(
      0,
      parseInt(
        props.fields.data.source.numberOfSpeakers
          ? props.fields.data.source.numberOfSpeakers.value
          : '6'
      )
    )
    .map((speaker, index) => (
      <a key={index} href={`/speakers/${speaker.itemName}`} className="grid-item">
        <div className="item-image">
          <Image
            field={speaker.picture.jsonValue}
            alt={speaker.name}
            width={265}
            height={265}
            loading="lazy"
          />
        </div>
        <div className="item-details">
          <Text tag="strong" field={speaker.name} />
          <Text tag="p" field={speaker.role} />
        </div>
      </a>
    ));

  const titleAndContent = props.fields && (
    <>
      {props.fields.data.source.title && (
        <Text tag="h2" field={props.fields.data.source.title} className="section__content__title" />
      )}
      {props.fields.data.source.content && (
        <RichText
          tag="div"
          field={props.fields.data.source.content}
          className="section__content__p"
        />
      )}
    </>
  );

  const callToAction = !!props.fields?.data.source.callToActionLink.jsonValue?.value?.href && (
    <Link
      field={props.fields.data.source.callToActionLink.jsonValue}
      className="btn--main btn--main--round btn--main--big"
    />
  );

  return (
    <section className="section">
      <div className="section__content container featured-speakers">
        {titleAndContent}
        <div className="item-grid">
          <div className="grid-content">{speakers}</div>
        </div>
        {callToAction}
      </div>
    </section>
  );
};

export default FeaturedSpeakers;
