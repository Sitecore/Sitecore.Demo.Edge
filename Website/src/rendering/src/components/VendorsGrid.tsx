import Link from 'next/link';
import { Text, Field, ImageField, Image } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type Vendor = {
  fields: {
    Name: Field<string>;
    Level: Field<string>;
    Logo: ImageField;
  };
};
type VendorsGridProps = ComponentProps & {
  fields: {
    items: Vendor[];
  };
};
const VendorsGrid = (props: VendorsGridProps): JSX.Element => {
  console.log(props.fields);
  return (
    <section className="section">
      <div className="section__content">
        <div className="max-w-screen-2xl mx-auto box-border overflow-hidden">
          <h1 className="text-center uppercase text-blue pt-10 text-3xl md:text-4xl font-semibold">
            ALL EVENT VENDORS
          </h1>
          <p></p>

          <div className="mx-auto gap-5 md:gap-10 w-2/3 grid grid-cols-1 md:grid-cols-5 pt-10">
            <span>Filter by</span>
            <button
              type="button"
              className="inline-flex justify-center w-30 border border-white-dark shadow-sm px-4 py-1 bg-white-light text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
              id="menu-button"
              aria-expanded="true"
              aria-haspopup="true"
              aria-label="scheduled"
            >
              Schedule
              <img className="h-5" src="/assets/img/icons/down-arrow.svg" alt="^" />
            </button>
            <button
              type="button"
              className="inline-flex justify-center w-30 border border-white-dark shadow-sm px-4 py-1 bg-white-light text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
              id="menu-button"
              aria-expanded="true"
              aria-haspopup="true"
              aria-label="speakers"
            >
              Speakers
              <img className="h-5" src="/assets/img/icons/down-arrow.svg" alt="^" />
            </button>
            <button
              type="button"
              className="inline-flex justify-center w-30 border border-white-dark shadow-sm px-4 py-1 bg-white-light text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
              id="menu-button"
              aria-expanded="true"
              aria-haspopup="true"
              aria-label="category"
            >
              Category
              <img className="h-5" src="/assets/img/icons/down-arrow.svg" alt="^" />
            </button>
            <button
              type="button"
              className="inline-flex justify-center w-30 border border-white-dark shadow-sm px-4 py-1 bg-white-light text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
              id="menu-button"
              aria-expanded="true"
              aria-haspopup="true"
              aria-label="sport"
            >
              Sport
              <img className="h-5" src="/assets/img/icons/down-arrow.svg" alt="^" />
            </button>
          </div>

          <div className="p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {props.fields.items &&
              props.fields.items.map((vendor, index) => (
                <Link
                  key={index}
                  href={'/vendors/' + vendor.fields.Name.value.replace(/ /g, '')}
                  passHref
                >
                  <div className="rounded overflow-hidden">
                    <Image
                      field={vendor.fields.Logo}
                      alt={vendor.fields.Name}
                      width={265}
                      height={265}
                    />
                    <div className="px-6 py-4">
                      <Text
                        tag="p"
                        className="text-gray-700 text-base text-center"
                        field={vendor.fields.Name}
                      ></Text>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default VendorsGrid;
