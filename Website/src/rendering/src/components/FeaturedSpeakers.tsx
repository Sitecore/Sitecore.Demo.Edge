import Link from 'next/link';
import { Text, Field, RichText, Image } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { GraphQLSpeaker } from 'src/types/speaker';
import React from 'react';

export type FeaturedSpeakersProps = ComponentProps & {
  fields: {
    data: {
      source: {
        title: Field<string>;
        content: Field<string>;
        // callToActionLink: LinkField;
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
  // TODO: remove this when the port number issue is fixed on content hub
  props.fields.data.item.children.results.map((s) => {
    if (s.picture.jsonValue.value) {
      s.picture.jsonValue.value.src = s.picture.jsonValue.value.src?.replace(
        'https://playsummit.sitecoresandbox.cloud',
        'https://playsummit.sitecoresandbox.cloud:8443'
      );
    }
  });
  console.log(props.fields.data.item.children.results);
  const speakers = props.fields.data.item.children.results
    .filter((item) => item.featured.value)
    .sort()
    .slice(0, parseInt(props.fields.data.source.numberOfSpeakers.value))
    .map((speaker, index) => (
      <Link key={index} href={`/speakers/${speaker.itemName}`}>
        <a className="grid-item">
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
