import Link from 'next/link';
import { Text, Field, ImageField, Image } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type Session = {
  fields: {
    Name: Field<string>;
    Level: Field<string>;
    Image: ImageField;
  };
};

type SessionsGridProps = ComponentProps & {
  fields: {
    items: Session[];
  };
};

const SessionsGrid = (props: SessionsGridProps): JSX.Element => {
  console.log(props);
  return (
    <section>
      <div className="max-w-screen-2xl mx-auto box-border overflow-hidden">
        <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {props.fields.items &&
            props.fields.items.map((session, index) => (
              <div key={index} className="rounded overflow-hidden bg-white">
                <Image
                  field={session.fields.Image}
                  alt={session.fields.Name}
                  width={340}
                  height={227}
                />
                <div className="px-6 py-4">
                  <Text
                    tag="div"
                    className="font-bold text-base mb-2 h-20 uppercase"
                    field={session.fields.Name}
                  ></Text>
                  <p className="text-gray-700 text-xs pb-3">Mon, 24th | 11.15 AM –11:45 AM</p>
                  <p className="text-gray-700 text-xs pb-3">Duration: 30 minutes</p>
                  <p className="text-gray-700 text-xs">ANDRES VILLARES | Professional</p>
                </div>
                <div className="px-6 pt-4 pb-10">
                  <Link href="/tickets">
                    <a className="btn--main btn--main--round">Get Tickets</a>
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};
export default SessionsGrid;
