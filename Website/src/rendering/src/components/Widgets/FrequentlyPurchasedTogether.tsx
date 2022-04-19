import { RecommendationWidgetProps } from '@sitecore-discover/ui';

type Product = {
  image_url: string;
  name: string;
  price: string;
};

export interface FrequentlyPurchasedTogetherProps extends RecommendationWidgetProps {
  rfkId: string;
}

const FrequentlyPurchasedTogether = (props: FrequentlyPurchasedTogetherProps): JSX.Element => {
  return (
    <section>
      Cart Recommendation Widget
      {props.products?.map((product: Product) => {
        return (
          <>
            <img width={200} src={product.image_url} alt={product.name} />
            <div>{product.name}</div>
            <div>{product.price}</div>
          </>
        );
      })}
    </section>
  );
};

export default FrequentlyPurchasedTogether;
