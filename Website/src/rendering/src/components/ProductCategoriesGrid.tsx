import Link from 'next/link';
import Image from 'next/image';
import { Text, Field, ImageField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

export type Category = {
  fields: {
    Title: Field<string>;
    Picture: ImageField;
  };
};

type ProductCategoriesProps = ComponentProps & {
  fields: {
    Title: Field<string>;
    Subtitle: Field<string>;
    Categories: Category[];
  };
};

const ProductCategoriesGrid = (props: ProductCategoriesProps): JSX.Element => {
  return (
    <div className="section__products__grid">
      {props.fields.Categories &&
        props.fields.Categories.map((category) => (
          <div className="section__products__grid__product">
            <Link href="/shop/teamsports">
              <a>
                <figure>
                  <Image
                    src={category.fields.Picture.value?.src}
                    alt="Category"
                    width={350}
                    height={250}
                  />
                </figure>
                <h3 className="product__category">
                  <Text field={category.fields.Title} />
                </h3>
              </a>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default ProductCategoriesGrid;
