import { Product } from '../../models/discover/Product';
import ProductList from '../ShopCommon/ProductList';

type RightColumnProps = {
  products: Product[];
  loaded: boolean;
  loading: boolean;
  selectedKeyword: string;
};

const RightColumn = (props: RightColumnProps): JSX.Element => {
  const { products, loaded, loading, selectedKeyword } = props;

  // TODO: Replace the "View all" link by a link to the search page with the currently typed keyword or the current view of the top results.

  return (
    <>
      <div className="right-section">
        <h2 className="right-section-title">Top results</h2>
        <a href={'/shop/products/?q=' + selectedKeyword} className="view-all-link">
          View all
        </a>
        <ProductList products={products} loaded={loaded} loading={loading} />
      </div>
    </>
  );
};

export default RightColumn;
