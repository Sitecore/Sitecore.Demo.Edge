import { Category } from '../../models/discover/Category';
import { Suggestion } from '../../models/discover/Suggestion';

type PreviewSearchListProps = {
  items: [];
  title: string;
  onMouseEnter: (text: string) => void;
  onMouseLeave: () => void;
  redirectUrl: string;
};

const PreviewSearchList = (props: PreviewSearchListProps): JSX.Element => {
  const { items, title, onMouseEnter, onMouseLeave, redirectUrl } = props;

  return window.RFK.ui.html` <div class="list-container">
    ${
      items.length > 0 &&
      window.RFK.ui.html` <h2 class="list-container-title">${title}</h2>
      <ul>
        ${items.map(
          ({ text, id, url }) => window.RFK.ui.html` <li
            class="list-item"
            id=${id}
            onMouseEnter=${() => onMouseEnter(text)}
            onMouseLeave=${onMouseLeave}
          >
            ${
              url
                ? window.RFK.ui.html`<a href="${url}">${text}</a>`
                : window.RFK.ui.html`<a href="${redirectUrl}${text}">${text}</a>`
            }
          </li>`
        )}
      </ul>`
    }
  </div>`;
};

type LeftColumnProps = {
  categories: Category[];
  trendingCategories: Category[];
  suggestions: Suggestion[];
  loading: boolean;
  loaded: boolean;
  onCategoryChanged: (category: string) => void;
  onTrendingCategoryChanged: (trendingCategory: string) => void;
  onSuggestionChanged: (suggestion: string) => void;
  redirectUrl: string;
};

const LeftColumn = (props: LeftColumnProps): JSX.Element => {
  const {
    categories,
    trendingCategories,
    suggestions,
    loading,
    loaded,
    onCategoryChanged,
    onTrendingCategoryChanged,
    onSuggestionChanged,
    redirectUrl,
  } = props;

  const [lock, setLock] = window.RFK.ui.useState(false);

  const onCategoryEnter = (category: string) => {
    if (!lock) {
      onCategoryChanged(category);
    }
    setLock(true);
  };

  const onTrendingCategoryEnter = (trendingCategory: string) => {
    if (!lock) {
      onTrendingCategoryChanged(trendingCategory);
    }
    setLock(true);
  };

  const onSuggestionEnter = (suggestion: string) => {
    if (!lock) {
      onSuggestionChanged(suggestion);
    }
    setLock(true);
  };

  const onMouseLeave = () => {
    setLock(false);
  };

  const shouldShowTrendingCategories =
    trendingCategories?.length > 0 && categories?.length === 0 && suggestions?.length === 0;

  return window.RFK.ui.html`
    <div class="left-section">
      <div class="left-section-inner">
        ${
          loaded &&
          !loading &&
          categories?.length > 0 &&
          window.RFK.ui.html`<${PreviewSearchList}
          onMouseEnter=${onCategoryEnter}
          onMouseLeave=${onMouseLeave}
          title="Categories"
          items=${categories}
        />`
        }
        ${
          loaded &&
          !loading &&
          shouldShowTrendingCategories &&
          window.RFK.ui.html`<${PreviewSearchList}
          onMouseEnter=${onTrendingCategoryEnter}
          onMouseLeave=${onMouseLeave}
          title="Trending Categories"
          items=${trendingCategories}
        />`
        }
        ${
          loaded &&
          !loading &&
          suggestions?.length > 0 &&
          window.RFK.ui.html`<${PreviewSearchList}
          onMouseEnter=${onSuggestionEnter}
          onMouseLeave=${onMouseLeave}
          title="Did you mean?"
          items=${suggestions}
          redirectUrl=${redirectUrl}
        />`
        }
      </div>
    </div>
  `;
};

export default LeftColumn;
