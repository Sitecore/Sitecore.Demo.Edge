import Link from 'next/link';
import {
  Text,
  Field,
  ImageField,
  Image,
  RichText,
  DateField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type News = {
  fields: {
    Title: Field<string>;
    Excerpt: Field<string>;
    PublishDate: Field<string>;
    Image: ImageField;
  };
};

type NewsListProps = ComponentProps & {
  fields: {
    items: News[];
  };
};

const NewsList = (props: NewsListProps): JSX.Element => (
  <section>
    <div className="max-w-screen-2xl mx-auto box-border overflow-hidden">
      <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {props.fields.items &&
          props.fields.items.map((news, index) => (
            <div key={index} className="rounded overflow-hidden bg-white">
              <Image field={news.fields.Image} alt={news.fields.Title} width={340} height={227} />
              <div className="px-6 py-4">
                <Text
                  tag="div"
                  className="font-bold text-base mb-2 h-20 uppercase"
                  field={news.fields.Title}
                ></Text>
                <DateField
                  tag="p"
                  className="text-gray-700 text-xs pb-3"
                  field={news.fields.PublishDate}
                  render={(date) =>
                    date?.toLocaleDateString('en-US', {
                      weekday: 'short',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })
                  }
                />
                <RichText
                  tag="p"
                  className="h-36 overflow-hidden"
                  field={news.fields.Excerpt}
                ></RichText>
              </div>
              <div className="px-6 pt-4 pb-10">
                <Link href={'/news/' + news.fields.Title}>
                  <a className="btn--main btn--main--round">Read&nbsp;More</a>
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  </section>
);

export default NewsList;
