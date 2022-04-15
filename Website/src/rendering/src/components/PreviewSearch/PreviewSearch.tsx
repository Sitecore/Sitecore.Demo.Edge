import ClickOutside from './ClickOutside';
import LeftColumn from './LeftColumn';
import RightColumn from './RightColumn';
import debounce from '../../helpers/Debounce';
import { PreviewSearchActions } from '@sitecore-discover/widgets';
import { useRef, useState } from 'react';
import SearchInput from './SearchInput';
import { PreviewSearchWidgetProps } from '@sitecore-discover/ui';
import { Action } from '@sitecore-discover/react';

export interface previewSearchResultsWidgetProps extends PreviewSearchWidgetProps {
  rfkId: string;
}

const PreviewSearch = (props: previewSearchResultsWidgetProps): JSX.Element => {
  const {
    loaded,
    loading,
    products,
    keyphrase,
    trendingCategories,
    categories,
    suggestions,
    redirectUrl,
    dispatch,
  } = props;

  const changeKeyphrase: (text: string) => void = debounce(
    (text) => {
      const changeKeyphraseAction: Action = {
        type: PreviewSearchActions.KEYPHRASE_CHANGED,
        payload: { keyphrase: text || '' },
      };
      dispatch(changeKeyphraseAction);
    },
    500,
    null
  );

  const onFocus = (keyphrase: string) => {
    changeKeyphrase(keyphrase);
  };

  const changeCategory = debounce(
    (category: string) => {
      const changeCategoryAction: Action = {
        type: PreviewSearchActions.CATEGORY_CHANGED,
        payload: { category },
      };
      dispatch(changeCategoryAction);
    },
    200,
    null
  );

  const changeTrendingCategory = debounce(
    (trendingCategory: string) => {
      const changeTrendingCategoryAction: Action = {
        type: PreviewSearchActions.TRENDING_CATEGORY_CHANGED,
        payload: { trendingCategory },
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
    },
    200,
    null
  );

  const [open, setOpen] = useState(false);

  const containerRef = useRef(null);

  ClickOutside(containerRef, () => setOpen(false));

  return (
    <>
      <div className="preview-search-container" ref={containerRef}>
        <div className="preview-search">
          {open && (
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
              />
              <RightColumn
                selectedKeyword={keyphrase}
                products={products}
                loading={loading}
                loaded={loaded}
              />
            </div>
          )}
        </div>
      </div>
      <SearchInput
        redirectUrl={redirectUrl}
        keyphrase={keyphrase}
        setSearchString={changeKeyphrase}
        placeholder="I am shopping for..."
        onFocus={() => {
          setOpen(true);
          onFocus(keyphrase);
        }}
        setOpen={setOpen}
      />
    </>
  );
};

export default PreviewSearch;
