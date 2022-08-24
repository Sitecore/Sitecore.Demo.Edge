import { useRef, useState } from 'react';
import { PreviewSearchWidgetProps } from '@sitecore-discover/ui';
import { Action } from '@sitecore-discover/react';
import { PreviewSearchActions } from '@sitecore-discover/widgets';
import ClickOutside from '../ShopCommon/ClickOutside';
import LeftColumn from './LeftColumn';
import RightColumn from './RightColumn';
import debounce from '../../helpers/Debounce';
import SearchInput from './SearchInput';
import { getCategoryByUrlPath } from '../../helpers/CategoriesDataHelper';

export interface PreviewSearchProps extends PreviewSearchWidgetProps {
  rfkId: string;
}

const PreviewSearch = ({
  loaded,
  loading,
  products,
  keyphrase,
  trendingCategories,
  categories,
  suggestions,
  redirectUrl,
  dispatch,
}: PreviewSearchProps): JSX.Element => {
  const [viewAllUrl, setViewAllUrl] = useState(keyphrase);

  const changeKeyphrase: (text: string) => void = debounce(
    (text) => {
      const changeKeyphraseAction: Action = {
        type: PreviewSearchActions.KEYPHRASE_CHANGED,
        payload: { keyphrase: text || '' },
      };
      dispatch(changeKeyphraseAction);
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
      const category = getCategoryByUrlPath(categoryUrl);
      if (!category) {
        return;
      }

      // HACK: Clear the keyphrase before changing the category to display all the products of that category
      const changeKeyphraseAction: Action = {
        type: PreviewSearchActions.KEYPHRASE_CHANGED,
        payload: { keyphrase: '' },
      };
      dispatch(changeKeyphraseAction);

      const changeCategoryAction: Action = {
        type: PreviewSearchActions.CATEGORY_CHANGED,
        payload: { category: category.name },
      };
      dispatch(changeCategoryAction);
      setViewAllUrl(category.url_path);
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
      const changeTrendingCategoryAction: Action = {
        type: PreviewSearchActions.TRENDING_CATEGORY_CHANGED,
        payload: { trendingCategory: category.name },
      };
      dispatch(changeTrendingCategoryAction);
    },
    200,
    null
  );

  const changeSuggestion = debounce(
    (suggestion: string) => {
      const changeSuggestionAction: Action = {
        type: PreviewSearchActions.SUGGESTION_CHANGED,
        payload: { suggestion },
      };
      dispatch(changeSuggestionAction);
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
