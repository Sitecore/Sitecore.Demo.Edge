/* eslint-disable @typescript-eslint/no-explicit-any */
import { Text, Field, RichText, Link } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type ContentGridProps = ComponentProps & {
  fields: {
    gridCssClass: Field<string>;
    blockCssClass: Field<string>;
    contentBlocks: [];
  };
};

const ContentGrid = (props: ContentGridProps): JSX.Element => (
  <div className={props.fields.gridCssClass?.value}>
    {props.fields.contentBlocks.map((listItem: any) => (
      <div key={listItem.id} className={props.fields.blockCssClass?.value}>
        <style jsx>
          {`
            .has-bg-image {
              background-size: cover;
              background-position: center;
              background-image: url(${listItem.fields.bgimage?.value});
            }
          `}
        </style>
        <Text className="h2" field={listItem.fields.title} />
        <RichText className="p" field={listItem.fields.subtitle} />
        {!!listItem.fields.content && <RichText className="p" field={listItem.fields.content} />}
        <div>
          {!!listItem.fields.callToActionLink && (
            <Link
              field={listItem.fields.callToActionLink}
              className="btn--main btn--main--round btn--main--big"
            ></Link>
          )}
        </div>
      </div>
    ))}
  </div>
);

export default ContentGrid;
