import { withDatasourceCheck, Field } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import ClickOutside from './ClickOutside';
import LeftColumn from './LeftColumn';
import RightColumn from './RightColumn';

type PreviewSearchProps = ComponentProps & {
  fields: {
    exampleToRemove: Field<string>;
  };
};

function debounce(func, wait, immediate) {
  let timeout;
  return function returnFn(...rest) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const context = this;
    const args = rest;
    const later = function executeFn() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// const PreviewSearch = (props: PreviewSearchProps): JSX.Element => (
//   <div>
//     <p>{props.params.name} Component</p>
//   </div>
// );

const PreviewSearchWidgetWrapper: JSX.Element = ({
  loaded,
  loading,
  products = [],
  keyphrase,
  trendingCategories,
  categories,
  suggestions,
  selectedKeyword,
  redirectUrl = '',
  inputQuerySelector = '#rfk_input',
  dispatch,
}) => {
  const changeKeyphrase = window.RFK.ui.useCallback(
    debounce(
      (target) =>
        dispatch(window.RFK.widgets.PreviewSearchActions.KEYPHRASE_CHANGED, {
          keyphrase: target.value,
        }),
      500,
      null
    ),
    []
  );

  const onFocus = (keyphrase) => {
    changeKeyphrase({ value: keyphrase });
  };

  const changeCategory = window.RFK.ui.useCallback(
    debounce(
      (category) => {
        dispatch(window.RFK.widgets.PreviewSearchActions.CATEGORY_CHANGED, { category });
      },
      200,
      null
    )
  );

  const changeTrendingCategory = window.RFK.ui.useCallback(
    debounce(
      (trendingCategory) => {
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
      (suggestion) => {
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
    inputRef.addEventListener('keyup', (e: any) => {
      switch (e.key) {
        case 'Escape':
          setOpen(false);
          break;
        case 'Enter':
          window.location.href = `${redirectUrl}${e.target.value}`;
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
// export default withDatasourceCheck()<PreviewSearchProps>(PreviewSearch);
