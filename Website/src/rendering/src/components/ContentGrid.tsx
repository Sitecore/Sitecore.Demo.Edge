/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Text, RichText, Link } from '@sitecore-jss/sitecore-jss-nextjs';

const ContentBlocks = ({ ...fields }) => (
  <div className={fields.gridCssClass?.value}>
    {fields.contentBlocks.map((listItem: any) => (
      <div key={listItem.title} className={fields.blockCssClass?.value}>
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

const ContentGrid = ({ ...props }) => (
  <section>
    <ContentBlocks fields={props.fields} />
  </section>
);

export default ContentGrid;
