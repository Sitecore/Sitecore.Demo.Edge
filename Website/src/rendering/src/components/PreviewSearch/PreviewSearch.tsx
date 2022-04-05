import { Product } from '../../models/discover/Product';
import ClickOutside from './ClickOutside';
import LeftColumn from './LeftColumn';
import RightColumn from './RightColumn';
import debounce from '../../helpers/Debounce';
import { Category } from '../../models/discover/Category';
import { Suggestion } from '../../models/discover/Suggestion';
import { PreviewSearchResponse } from '../../models/discover/PreviewSearchResponse';
import { PreviewSearchActions } from '@sitecore-discover/widgets';
import { useRef, useState } from 'react';
import SearchInput from './SearchInput';

type PreviewSearchProps = {
  loaded: boolean;
  loading: boolean;
  products: Product[];
  keyphrase: string;
  trendingCategories: Category[];
  categories: Category[];
  suggestions: Suggestion[];
  selectedKeyword: string;
  redirectUrl: string;
  inputQuerySelector: string;
  dispatch: (keyphraseChanged: string, previewSearchResponse: PreviewSearchResponse) => void;
};

const PreviewSearch = (props: PreviewSearchProps): JSX.Element => {
  const {
    loaded,
    loading,
    products,
    keyphrase,
    trendingCategories,
    categories,
    suggestions,
    selectedKeyword,
    redirectUrl,
    dispatch,
  } = props;

  const changeKeyphrase: (text: string) => void = debounce(
    (text) => {
      dispatch(PreviewSearchActions.KEYPHRASE_CHANGED, {
        keyphrase: text || '',
      });
    },
    500,
    null
  );

  const onFocus = (keyphrase: string) => {
    changeKeyphrase(keyphrase);
  };

  const changeCategory = debounce(
    (category: string) => {
      dispatch(PreviewSearchActions.CATEGORY_CHANGED, { category });
    },
    200,
    null
  );

  const changeTrendingCategory = debounce(
    (trendingCategory: string) => {
      dispatch(PreviewSearchActions.TRENDING_CATEGORY_CHANGED, {
        trendingCategory,
      });
    },
    200,
    null
  );

  const changeSuggestion = debounce(
    (suggestion: string) => {
      dispatch(PreviewSearchActions.SUGGESTION_CHANGED, {
        suggestion,
      });
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
                selectedKeyword={selectedKeyword}
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
