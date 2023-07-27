import RecommendedProducts from './RecommendedProducts';

interface SimilarProductsProps {
  rfkId: string;
}

const FeaturedProducts = (props: SimilarProductsProps): JSX.Element => (
  <RecommendedProducts {...props} title="Featured products" altTheme={true} />
);

export default FeaturedProducts;
