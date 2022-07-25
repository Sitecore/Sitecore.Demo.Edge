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
import { AsyncThunk } from '@reduxjs/toolkit';
import { DBuyerProduct } from '../../models/ordercloud/DBuyerProduct';
import { AppDispatch, AppThunkApi } from '../../redux/store';
import { RequiredDeep } from 'ordercloud-javascript-sdk';
import { DCategory } from '../../models/ordercloud/DCategory';
import { isDiscoverEnabled } from '../../helpers/DiscoverHelper';
import { Category } from '../../models/Category';

export interface PreviewSearchProps extends PreviewSearchWidgetProps {
  // We want to use the same component when rendering data from Discover or OrderCloud
  // for OrderCloud to work we need the following two parameters so it aligns with redux-toolkit which is used in this application for ordercloud
  orderCloudChangeKeyPhraseAction?: AsyncThunk<RequiredDeep<DBuyerProduct>[], string, AppThunkApi>;
  orderCloudChangeCategoryAction?: AsyncThunk<
    {
      categories: RequiredDeep<DCategory>[];
      products: RequiredDeep<DBuyerProduct>[];
    },
    DCategory,
    AppThunkApi
  >;
  dispatch: AppDispatch;
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
  orderCloudChangeKeyPhraseAction,
  orderCloudChangeCategoryAction,
}: PreviewSearchProps): JSX.Element => {
  const useOrderCloud = !isDiscoverEnabled;
  const [viewAllUrl, setViewAllUrl] = useState(keyphrase);

  const dispatchChangeKeyPhrase = (keyphrase: string) => {
    // this handles dispatching actions in discover (if enabled) else falls back to the equivalent ordercloud action
    if (useOrderCloud) {
      dispatch(orderCloudChangeKeyPhraseAction(keyphrase));
    } else {
      const action: Action = {
        type: PreviewSearchActions.KEYPHRASE_CHANGED,
        payload: { keyphrase: keyphrase || '' },
      };
      dispatch(action);
    }
  };

  const dispatchChangeCategory = (category: Category) => {
    // this handles dispatching actions in discover (if enabled) else falls back to the equivalent ordercloud action
    if (useOrderCloud) {
      dispatch(orderCloudChangeCategoryAction({ ID: category.ccid, Name: category.name }));
    } else {
      const action: Action = {
        type: PreviewSearchActions.CATEGORY_CHANGED,
        payload: { category: category.name },
      };
      dispatch(action);
    }
  };

  const dispatchChangeTrendingCategory = (categoryName: string) => {
    const changeTrendingCategoryAction: Action = {
      type: PreviewSearchActions.TRENDING_CATEGORY_CHANGED,
      payload: { trendingCategory: categoryName },
    };
    dispatch(changeTrendingCategoryAction);
  };

  const dispatchChangeSuggestion = (suggestion: string) => {
    const changeSuggestionAction: Action = {
      type: PreviewSearchActions.SUGGESTION_CHANGED,
      payload: { suggestion },
    };
    dispatch(changeSuggestionAction);
  };

  const changeKeyphrase: (text: string) => void = debounce(
    (text) => {
      dispatchChangeKeyPhrase(text);
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

      if (!useOrderCloud) {
        // HACK: Clear the keyphrase before changing the category to display all the products of that category
        // not required for ordercloud implementation
        dispatchChangeKeyPhrase('');
      }
      dispatchChangeCategory(category);
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
      dispatchChangeTrendingCategory(category.name);
    },
    200,
    null
  );

  const changeSuggestion = debounce(
    (suggestion: string) => {
      dispatchChangeSuggestion(suggestion);
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
