import RecommendedProducts from './RecommendedProducts';

interface GeoBasedProductProps {
  rfkId: string;
}

const GeoBasedProducts = (props: GeoBasedProductProps): JSX.Element => (
  <RecommendedProducts {...props} title="Recommended based on your location" />
);

export default GeoBasedProducts;
