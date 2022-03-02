import { Product } from '../../models/discover/Product';
import { Category } from '../../models/discover/Category';
import { Suggestion } from '../../models/discover/Suggestion';
import ClickOutside from './ClickOutside';
import LeftColumn from './LeftColumn';
import RightColumn from './RightColumn';

function debounce(
  func: (arg: string | { value: string }) => void,
  wait: number,
  immediate: boolean
) {
  let timeout: NodeJS.Timeout;

  return function returnFn(this: unknown, ...rest: unknown[]) {
    const args = rest;

    const later = () => {
      timeout = null;
      if (!immediate) {
        func.apply(this, args);
      }
    };

    const callNow = immediate && !timeout;

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) {
      func.apply(this, args);
    }
  };
}

interface PreviewSearchResponse {
  keyphrase?: string;
  category?: string;
  trendingCategory?: string;
  suggestion?: string;
}

type PreviewSearchWidgetWrapperProps = {
  loaded: boolean;
  loading: boolean;
  products: Product[];
  keyphrase: string;
  trendingCategories: string[];
  categories: string[];
  suggestions: string[];
  selectedKeyword: string;
  redirectUrl: string;
  inputQuerySelector: string;
  dispatch: (keyphraseChanged: string, previewSearchResponse: PreviewSearchResponse) => void;
};

const PreviewSearchWidgetWrapper = (props: PreviewSearchWidgetWrapperProps): JSX.Element => {
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

  const onFocus = (keyphrase: string) => {
    changeKeyphrase({ value: keyphrase });
  };

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

  const inputFocusFn = () => {
    setOpen(true);
    onFocus(keyphrase);
  };

  window.RFK.ui.useEffect(() => {
    const inputRef = document.querySelector(inputQuerySelector);
    inputRef.addEventListener('keyup', (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          setOpen(false);
          break;
        case 'Enter':
          window.location.href = `${redirectUrl}${(e.target as HTMLInputElement).value}`;
          break;
        default:
          setOpen(true);
          changeKeyphrase(e.target);
          break;
      }
    });
    inputRef.addEventListener('focus', inputFocusFn);

    return () => {
      inputRef.removeEventListener('change', changeKeyphrase);
      inputRef.removeEventListener('focus', inputFocusFn);
    };
  }, [inputQuerySelector]);

  const containerRef = window.RFK.ui.useRef(null);

  ClickOutside(containerRef, () => setOpen(false));

  return window.RFK.ui.html`
    <div class="rfksdk-preview-search-container">
      ${
        open &&
        window.RFK.ui.html` <div
        ref=${containerRef}
        class="rfksdk-preview-search-container__modal"
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
  `;
};

export default PreviewSearchWidgetWrapper;
