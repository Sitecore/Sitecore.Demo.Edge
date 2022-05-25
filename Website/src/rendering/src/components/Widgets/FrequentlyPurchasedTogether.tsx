import { RecommendationWidgetProps } from '@sitecore-discover/ui';
import { useState } from 'react';

type Product = {
  image_url: string;
  name: string;
  price: string;
  sku: string;
};

interface FrequentlyPurchasedTogetherProps extends RecommendationWidgetProps {
  rfkId: string;
}

const FrequentlyPurchasedTogether = (props: FrequentlyPurchasedTogetherProps): JSX.Element => {
  const {
    available,
    dispatch,
    loaded,
    loading,
    onNavigationNext,
    onNavigationPrev,
    onProductClick,
    products,
    rfkID,
  } = props;

  const onPrevClick = () => {
    if (index - 1 >= 0) {
      setIndex(index - 1);
    }
    onNavigationPrev({ index, sku: 'PSPGSB', rfkId: 'rfkid_33' });
  };

  const onNextClick = () => {
    if (index + 1 <= products?.length - 1) {
      setIndex(index + 1);
    }
    console.log('calling more');
    onNavigationNext({ index, sku: 'PSPGSB', rfkId: 'rfkid_33' });
  };

  const [index, setIndex] = useState(0);

  const perChunk = 4;

  const productGroupings = products?.reduce((result, item, index) => {
    const chunkIndex = Math.floor(index / perChunk);
    if (!result[chunkIndex]) {
      result[chunkIndex] = [];
    }
    result[chunkIndex].push(item);
    return result;
  }, []);

  return (
    <section>
      Cart Recommendation Widget
      <button onClick={onPrevClick}>Back</button>
      {productGroupings?.length &&
        productGroupings[index].map((product: Product) => {
          return (
            <div
              key={product.name}
              onClick={() => onProductClick({ sku: products[index].sku, rfkId: rfkID })}
            >
              <img width={200} src={product.image_url} alt={product.name} />
              <div>{product.name}</div>
              <div>{product.price}</div>
            </div>
          );
        })}
      <button onClick={onNextClick}>Next</button>
    </section>
  );
};

export default FrequentlyPurchasedTogether;
