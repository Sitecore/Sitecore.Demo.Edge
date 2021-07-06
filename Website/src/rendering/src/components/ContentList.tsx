/* eslint-disable @typescript-eslint/no-explicit-any */
import { Text, Field } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type ContentListProps = ComponentProps & {
  fields: {
    cssClass: Field<string>;
    contentBlocks: [];
  };
};

const ContentList = (props: ContentListProps): JSX.Element => (
  <div className={props.fields.cssClass?.value}>
    {props.fields.contentBlocks.map((listItem: any) => (
      <div key={listItem.id} className={listItem.fields.cssClass?.value}>
        <img className="image h-20 w-20 inline" src={listItem.fields.image?.value} alt=""></img>
        <Text tag="p" className="inline w-4/5" field={listItem.fields.title} />
        {/* <RichText className="p" field={listItem.fields.subtitle} />
        {!!listItem.fields.content && <RichText className="p" field={listItem.fields.content} />}
        <div>
          {!!listItem.fields.callToActionLink && (
            <Link
              field={listItem.fields.callToActionLink}
              className="btn--main btn--main--round btn--main--big"
            ></Link>
          )}
        </div> */}
      </div>
    ))}
  </div>
);

export default ContentList;
