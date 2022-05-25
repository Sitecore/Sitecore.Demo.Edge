import { RecommendationWidgetProps } from '@sitecore-discover/ui';
import Link from 'next/link';

type Product = {
  image_url: string;
  name: string;
  price: string;
  sku: string;
  product_url: string;
};

interface FrequentlyPurchasedTogetherProps extends RecommendationWidgetProps {
  rfkId: string;
}

const FrequentlyPurchasedTogether = (props: FrequentlyPurchasedTogetherProps): JSX.Element => {
  const { onProductClick, products, rfkID } = props;

  const recommendedProducts = products?.length && (
    <>
      {products.map((product: Product) => {
        return (
          <Link href={product.product_url} key={product.sku}>
            <a onClick={() => onProductClick({ sku: product.sku, rfkId: rfkID })}>
              <div>
                <img width={200} src={product.image_url} alt={product.name} />
                <div>{product.name}</div>
                <div>{product.price}</div>
              </div>
            </a>
          </Link>
        );
      })}
    </>
  );

  return (
    <section>
      Cart Recommendation Widget
      {recommendedProducts}
    </section>
  );
};

export default FrequentlyPurchasedTogether;
