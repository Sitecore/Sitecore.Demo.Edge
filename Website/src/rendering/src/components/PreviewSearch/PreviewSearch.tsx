import { Product } from '../../models/discover/Product';
import ClickOutside from './ClickOutside';
import LeftColumn from './LeftColumn';
import RightColumn from './RightColumn';
import debounce from '../../helpers/Debounce';
import { Category } from '../../models/discover/Category';
import { Suggestion } from '../../models/discover/Suggestion';
import { PreviewSearchResponse } from '../../models/discover/PreviewSearchResponse';

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
    inputQuerySelector,
    dispatch,
  } = props;

  const changeKeyphrase = window.RFK.ui.useCallback(
    debounce(
      (target: { value: string }) =>
        dispatch(window.RFK.widgets.PreviewSearchActions.KEYPHRASE_CHANGED, {
          keyphrase: target.value,
        }),
      500,
      null
    ),
    []
  );

  const changeCategory = window.RFK.ui.useCallback(
    debounce(
      (category: string) => {
        dispatch(window.RFK.widgets.PreviewSearchActions.CATEGORY_CHANGED, { category });
      },
      200,
      null
    )
  );

  const changeTrendingCategory = window.RFK.ui.useCallback(
    debounce(
      (trendingCategory: string) => {
        dispatch(window.RFK.widgets.PreviewSearchActions.TRENDING_CATEGORY_CHANGED, {
          trendingCategory,
        });
      },
      200,
      null
    )
  );

  const changeSuggestion = window.RFK.ui.useCallback(
    debounce(
      (suggestion: string) => {
        dispatch(window.RFK.widgets.PreviewSearchActions.SUGGESTION_CHANGED, {
          suggestion,
        });
      },
      200,
      null
    )
  );

  const [open, setOpen] = window.RFK.ui.useState(false);

  const handleSearchBoxFocus = () => {
    setOpen(true);
    changeKeyphrase({ value: keyphrase });
  };

  const handleSearchBoxKeyUp = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'Escape':
        setOpen(false);
        break;
      case 'Enter':
        // TODO: Change to a Next.js router route push when we have the Discover SDK initialized on every route change.
        window.location.href = `${redirectUrl}${(e.target as HTMLInputElement).value}`;
        break;
      default:
        setOpen(true);
        changeKeyphrase(e.target);
        break;
    }
  };

  window.RFK.ui.useEffect(() => {
    const inputRef = document.querySelector(inputQuerySelector);
    inputRef.addEventListener('keyup', handleSearchBoxKeyUp);
    inputRef.addEventListener('focus', handleSearchBoxFocus);

    return () => {
      inputRef.removeEventListener('keyup', handleSearchBoxKeyUp);
      inputRef.removeEventListener('focus', handleSearchBoxFocus);
    };
  }, [inputQuerySelector]);

  const containerRef = window.RFK.ui.useRef(null);

  ClickOutside(containerRef, () => setOpen(false));

  return window.RFK.ui.html`
  <div class="preview-search-container">
    <div class="preview-search">
      ${
        open &&
        window.RFK.ui.html` <div
        ref=${containerRef}
        class="preview-search-modal-container"
      >
        <${LeftColumn}
          categories=${categories}
          suggestions=${suggestions}
          trendingCategories=${trendingCategories}
          loading=${loading}
          loaded=${loaded}
          onCategoryChanged=${changeCategory}
          onTrendingCategoryChanged=${changeTrendingCategory}
          onSuggestionChanged=${changeSuggestion}
          redirectUrl=${redirectUrl}
        />
        <${RightColumn}
          selectedKeyword=${selectedKeyword}
          products=${products}
          loading=${loading}
        />
      </div>`
      }
    </div>
  </div>
`;
};

export default PreviewSearch;
