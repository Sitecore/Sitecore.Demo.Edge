import Link from 'next/link';
//import Image from 'next/image';

import vendor1 from '../../data/media/img/vendors/RobinFitness.jpg';
import vendor2 from '../../data/media/img/vendors/Gameday.jpg';
import vendor3 from '../../data/media/img/vendors/Outrace.jpg';
import vendor4 from '../../data/media/img/vendors/RunRightThrough.jpg';
import vendor5 from '../../data/media/img/vendors/OnTheGreen.jpg';
import { Text, Field, ImageField, Image } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { faCommentDollar } from '@fortawesome/free-solid-svg-icons';

type Vendor = {
  fields: {
    Name: Field<string>;
    Level: Field<string>;
    Logo: ImageField;
  };
};

type FeaturedVendorsProps = ComponentProps & {
  fields: {
    Title: Field<string>;
    Subtitle: Field<string>;
    Vendors: Vendor[];
  };
};

const FeaturedVendors = (props: FeaturedVendorsProps): JSX.Element => (
  <section className="pt-10">
    <div className="max-w-screen-2xl mx-auto box-border overflow-hidden bg-white">
      <Text
        className="text-center uppercase text-blue pt-10 text-4xl font-semibold"
        tag="h1"
        field={props.fields.Title}
      ></Text>
      <Text className="text-center" tag="p" field={props.fields.Subtitle}></Text>
      <div className="p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {props.fields.Vendors &&
          props.fields.Vendors.map((vendor, index) => (
            <Link
              key={index}
              href={'/vendors/' + vendor.fields.Name.value.replace(/ /g, '')}
              passHref
            >
              <a className="rounded overflow-hidden">
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
              </a>
            </Link>
          ))}
      </div>
    </div>
  </section>
);

export default FeaturedVendors;
