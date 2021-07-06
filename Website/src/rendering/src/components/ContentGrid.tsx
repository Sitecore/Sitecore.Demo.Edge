import { RichText, Link } from '@sitecore-jss/sitecore-jss-nextjs';

const ContentBlocks = ({ contentBlocks }) => (
  <div className="grid grid-cols-3 gap-4 p-10">
    {contentBlocks.map((listItem: unknown, index) => (
      <div key={index} className="h-60 text-center space-y-6 align-bottom">
        {/* <figure className="">
          <img src={listItem.fields.bgimage} alt="" />
        </figure> */}
        <RichText className="h2" field={listItem.fields.title} />
        <RichText className="p" field={listItem.fields.subtitle} />
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

const ContentGrid = ({ fields }) => (
  <section>
    <ContentBlocks contentBlocks={fields.contentBlocks} />
  </section>
);

export default ContentGrid;
