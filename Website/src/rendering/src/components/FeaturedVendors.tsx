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

type FeaturedVendorsProps = ComponentProps & {
  fields: {
    Title: Field<string>;
    Subtitle: Field<string>;
    Vendors: Vendor[];
  };
};

const FeaturedVendors = (props: FeaturedVendorsProps): JSX.Element => (
  <section className="section section--bg-white">
    <div className="section__content">
      <Text
        className="section__content__title section__content__title--light"
        tag="h1"
        field={props.fields?.Title}
      ></Text>
      <Text
        className="section__content__subtitle--center"
        tag="p"
        field={props.fields?.Subtitle}
      ></Text>

      <div className="item-grid">
        <div className="grid-content">
          {props.fields?.Vendors &&
            props.fields.Vendors.map((vendor, index) => (
              <Link
                key={index}
                href={'/vendors/' + vendor.fields.Name.value.replace(/ /g, '')}
                passHref
              >
                <a className="grid-item">
                  <Image
                    field={vendor.fields.Logo}
                    alt={vendor.fields.Name}
                    width={265}
                    height={265}
                  />
                  <div className="item-details">
                    <Text tag="p" field={vendor.fields.Name}></Text>
                  </div>
                </a>
              </Link>
            ))}
        </div>
      </div>
    </div>
  </section>
);

export type { Vendor };
export default FeaturedVendors;
