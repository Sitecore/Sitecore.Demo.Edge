import Link from 'next/link';
import { Product } from '../../models/discover/Product';
import ProductList from '../ShopCommon/ProductList';

export type RightColumnProps = {
  products: Product[];
  loaded: boolean;
  loading: boolean;
  selectedKeyword: string;
  onNavigatingAway: () => void;
};

const RightColumn = ({
  products,
  loaded,
  loading,
  selectedKeyword,
  onNavigatingAway,
}: RightColumnProps): JSX.Element => (
  <div className="right-section">
    <h2 className="right-section-title">Top results</h2>
    {/* TODO: Replace the "View all" link by a link to the search page with the currently typed keyword or the currently viewed results (based on the hovered item in the left column). */}
    <Link href={'/shop/products/?q=' + selectedKeyword}>
      <a className="view-all-link" onClick={onNavigatingAway}>
        View all
      </a>
    </Link>
    <ProductList
      products={products}
      loaded={loaded}
      loading={loading}
      onProductClick={onNavigatingAway}
    />
  </div>
);

export default RightColumn;
