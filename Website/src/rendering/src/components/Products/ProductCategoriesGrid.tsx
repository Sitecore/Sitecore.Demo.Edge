import Link from 'next/link';
import { Text, Field, Image, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { ProductCategory } from '../../types/productCategory';

type ProductCategoriesProps = ComponentProps & {
  fields: {
    Title: Field<string>;
    Subtitle: Field<string>;
    Categories: ProductCategory[];
  };
};

const ProductCategoriesGrid = (props: ProductCategoriesProps): JSX.Element => {
  const categories =
    props.fields.Categories &&
    Array.isArray(props.fields.Categories) &&
    props.fields.Categories.map((category, index) => (
      <div key={index} className="product-categories-grid-product">
        <Link href="/shop/products">
          <a>
            <figure>
              <Image
                field={category.fields.Picture}
                alt="Category"
                width={265}
                height={265}
                loading="lazy"
              />
            </figure>
            <h3 className="product-category">
              <Text field={category.fields.Title} />
            </h3>
          </a>
        </Link>
      </div>
    ));

  return <div className="product-categories-grid">{categories}</div>;
};

export default withDatasourceCheck()<ProductCategoriesProps>(ProductCategoriesGrid);
