import Link from 'next/link';
import { Text, Field, LinkField, RichText } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { GraphQLSpeaker } from 'src/types/speaker';
import React from 'react';

export type FeaturedSpeakersProps = ComponentProps & {
  fields: {
    data: {
      source: {
        title: Field<string>;
        content: Field<string>;
        callToActionLink: LinkField;
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
    .slice(0, parseInt(props.fields.data.source.numberOfSpeakers.value))
    .map((speaker, index) => (
      <Link key={index} href={`/speakers/${speaker.itemName}`}>
        <a className="grid-item">
          <div className="item-image">
            <img
              src={
                'https://playsummit.sitecoresandbox.cloud:8443/api/public/content/4deed22efd2a4835b0d624db0ae3792f?v=1b14d29a'
              }
              alt={speaker.name.value}
              width={265}
              height={265}
            />
            {/* <Image
            field={speaker.picture.jsonValue}
            alt={speaker.name}
            width={265}
            height={265}
            loading="lazy"
          /> */}
          </div>
          <div className="item-details">
            <Text tag="strong" field={speaker.name} />
            <Text tag="p" field={speaker.role} />
          </div>
        </a>
      </Link>
    ));

  return (
    <section className="section">
      <div className="section__content container featured-speakers">
        {props.fields.data.source.title && (
          <Text
            tag="h2"
            field={props.fields.data.source.title}
            className="section__content__title"
          />
        )}
        {props.fields.data.source.content && (
          <RichText
            tag="div"
            field={props.fields.data.source.content}
            className="section__content__p"
          />
        )}
        <div className="item-grid">
          <div className="grid-content">{speakers}</div>
        </div>
        {/* TODO: Add Call to action here */}
      </div>
    </section>
  );
};

export default FeaturedSpeakers;
