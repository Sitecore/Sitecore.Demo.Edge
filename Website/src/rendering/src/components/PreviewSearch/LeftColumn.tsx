/* eslint-disable @typescript-eslint/no-empty-function */
const PreviewSearchList = ({
  items = [],
  title = '',
  onMouseEnter = (text: string) => {
    console.log(text);
  },
  onMouseLeave = () => {},
  redirectUrl = '',
}): JSX.Element => {
  return window.RFK.ui.html` <div class="list-wrapper">
    ${
      items.length > 0 &&
      window.RFK.ui.html` <h2 class="list-wrapper__title">${title}</h2>
      <ul>
        ${items.map(
          ({ text, id, url }) => window.RFK.ui.html` <li
            class="list-wrapper__item"
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

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const LeftColumn = ({
  categories = [],
  trendingCategories = [],
  suggestions = [],
  loading = false,
  loaded = false,
  onCategoryChanged = (category: string): void => {
    console.log(category);
  },
  onTrendingCategoryChanged = (trendingCategory: string): void => {
    console.log(trendingCategory);
  },
  onSuggestionChanged = (suggestion: string): void => {
    console.log(suggestion);
  },
  redirectUrl = '',
}): JSX.Element => {
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
    trendingCategories.length > 0 && categories.length === 0 && suggestions.length === 0;

  return window.RFK.ui.html`
    <div class="leftSection">
      ${
        ((loaded && !loading) || categories.length > 0) &&
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
        ((loaded && !loading) || suggestions.length > 0) &&
        window.RFK.ui.html`<${PreviewSearchList}
        onMouseEnter=${onSuggestionEnter}
        onMouseLeave=${onMouseLeave}
        title="Did you mean?"
        items=${suggestions}
        redirectUrl=${redirectUrl}
      />`
      }
    </div>
  `;
};

export default LeftColumn;
