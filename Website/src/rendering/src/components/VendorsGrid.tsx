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
        <div className="VendorsGrid">
          <h1 className="VendorsGrid__title">ALL EVENT VENDORS</h1>

          <div className="VendorsGrid__filters">
            <span>Filter by</span>
            <button
              type="button"
              className="VendorsGrid__filters__dropdownfilter"
              id="menu-button-schedule"
              aria-expanded="true"
              aria-haspopup="true"
              aria-label="schedule"
            >
              Schedule
              <img src="/assets/img/icons/down-arrow.svg" alt="^" />
            </button>
            <button
              type="button"
              className="VendorsGrid__filters__dropdownfilter"
              id="menu-button-speakers"
              aria-expanded="true"
              aria-haspopup="true"
              aria-label="speakers"
            >
              Speakers
              <img src="/assets/img/icons/down-arrow.svg" alt="^" />
            </button>
            <button
              type="button"
              className="VendorsGrid__filters__dropdownfilter"
              id="menu-button-category"
              aria-expanded="true"
              aria-haspopup="true"
              aria-label="category"
            >
              Category
              <img src="/assets/img/icons/down-arrow.svg" alt="^" />
            </button>
            <button
              type="button"
              className="VendorsGrid__filters__dropdownfilter"
              id="menu-button-sport"
              aria-expanded="true"
              aria-haspopup="true"
              aria-label="sport"
            >
              Sport
              <img src="/assets/img/icons/down-arrow.svg" alt="^" />
            </button>
          </div>

          <div className="VendorsGrid__grid">
            {props.fields.items &&
              props.fields.items.map((vendor, index) => (
                <Link
                  key={index}
                  href={'/vendors/' + vendor.fields.Name.value.replace(/ /g, '')}
                  passHref
                >
                  <div className="VendorsGrid__grid__vendor">
                    <Image
                      field={vendor.fields.Logo}
                      alt={vendor.fields.Name}
                      width={265}
                      height={265}
                    />
                    <div className="VendorsGrid__grid__vendor__namecontainer">
                      <Text
                        tag="p"
                        className="VendorsGrid__grid__vendor__namecontainer__name"
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

export type { Vendor };
export default VendorsGrid;
