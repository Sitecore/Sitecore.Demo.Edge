import Link from 'next/link';
import { Product } from '../../models/discover/Product';
import ProductList from '../ShopCommon/ProductList';

export type RightColumnProps = {
  products: Product[];
  loaded: boolean;
  loading: boolean;
  viewAllUrl: string;
  onNavigatingAway: () => void;
};

const RightColumn = ({
  products,
  loaded,
  loading,
  viewAllUrl,
  onNavigatingAway,
}: RightColumnProps): JSX.Element => {
  const viewAllLink = loaded && !loading && viewAllUrl && (
    <Link href={viewAllUrl}>
      <a className="view-all-link" onClick={onNavigatingAway}>
        View all
      </a>
    </Link>
  );

  return (
    <div className="right-section">
      <h2 className="right-section-title">Top results</h2>
      {viewAllLink}
      <ProductList
        products={products}
        loaded={loaded}
        loading={loading}
        onProductClick={onNavigatingAway}
      />
    </div>
  );
};

export default RightColumn;
