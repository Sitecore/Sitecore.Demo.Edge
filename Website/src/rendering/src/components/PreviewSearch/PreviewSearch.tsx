import { useRef, useState } from 'react';
import { PreviewSearchWidgetProps } from '@sitecore-discover/ui';
import ClickOutside from '../ShopCommon/ClickOutside';
import LeftColumn from './LeftColumn';
import RightColumn from './RightColumn';
import debounce from '../../helpers/Debounce';
import SearchInput from './SearchInput';
import { getCategoryByUrlPath, getCategoryIdByUrlPath } from '../../helpers/CategoriesDataHelper';
import { isDiscoverEnabled } from '../../services/DiscoverService';

export interface PreviewSearchProps extends PreviewSearchWidgetProps {
  rfkId: string; // rfkId must be overriden because of a bug in the Discover SDK due to conflicting types
}

const PreviewSearch = ({
  rfkId,
  loaded,
  loading,
  products,
  keyphrase,
  trendingCategories,
  categories,
  suggestions,
  redirectUrl,
  onKeyphraseChange,
  onCategoryChange,
  onTrendingCategoryChange,
  onSuggestionChange,
}: PreviewSearchProps): JSX.Element => {
  const [viewAllUrl, setViewAllUrl] = useState(keyphrase);

  const changeKeyphrase: (text: string) => void = debounce(
    (text) => {
      onKeyphraseChange({ keyphrase: text, rfkId: rfkId });
      setViewAllUrl(`/shop/products/?q=${text || ''}`);
    },
    500,
    null
  );

  const onFocus = (keyphrase: string) => {
    changeKeyphrase(keyphrase);
  };

  const changeCategory = debounce(
    (categoryUrl: string) => {
      if (isDiscoverEnabled) {
        const category = getCategoryByUrlPath(categoryUrl);
        if (!category) {
          return;
        }
        // HACK: Clear the keyphrase before changing the category to display all the products of that category
        onKeyphraseChange({ keyphrase: '', rfkId: rfkId });
        onCategoryChange({ category: category.ccid, rfkId: rfkId });
        setViewAllUrl(category.url_path);
      } else {
        const categoryID = getCategoryIdByUrlPath(categoryUrl);
        onCategoryChange({ category: categoryID, rfkId: rfkId });
      }
    },
    200,
    null
  );

  const changeTrendingCategory = debounce(
    (categoryUrl: string) => {
      const category = getCategoryByUrlPath(categoryUrl);
      if (!category) {
        return;
      }

      // TODO: This event does not currently trigger a suggested product fetch call. Set the viewAll URL when it will update the products.
      onTrendingCategoryChange({ trendingCategory: category.name, rfkId: rfkId });
    },
    200,
    null
  );

  const changeSuggestion = debounce(
    (suggestion: string) => {
      onSuggestionChange({ suggestion, rfkId: rfkId });
      setViewAllUrl(`/shop/products/?q=${suggestion}`);
    },
    200,
    null
  );

  const [open, setOpen] = useState(false);
  const popupRef = useRef(null);
  const inputRef = useRef(null);

  const closePopup = () => setOpen(false);
  ClickOutside([popupRef, inputRef], closePopup);

  const openedPopup = open && (
    <div className="preview-search-modal-container">
      <LeftColumn
        categories={categories}
        suggestions={suggestions}
        trendingCategories={trendingCategories}
        loading={loading}
        loaded={loaded}
        onCategoryChanged={changeCategory}
        onTrendingCategoryChanged={changeTrendingCategory}
        onSuggestionChanged={changeSuggestion}
        redirectUrl={redirectUrl}
        onNavigatingAway={closePopup}
      />
      <RightColumn
        viewAllUrl={viewAllUrl}
        products={products}
        loading={loading}
        loaded={loaded}
        onNavigatingAway={closePopup}
      />
    </div>
  );

  return (
    <div>
      <div className="preview-search-container">
        <div className="preview-search" ref={popupRef}>
          {openedPopup}
        </div>
      </div>
      <div ref={inputRef}>
        <SearchInput
          redirectUrl={redirectUrl}
          keyphrase={keyphrase}
          setSearchString={changeKeyphrase}
          placeholder="I am shopping for..."
          onFocus={onFocus}
          setOpen={setOpen}
        />
      </div>
    </div>
  );
};

export default PreviewSearch;
