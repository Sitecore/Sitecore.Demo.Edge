import { withDatasourceCheck, Field } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type LeftColumnProps = ComponentProps & {
  fields: {
    exampleToRemove: Field<string>;
  };
};

// const LeftColumn = (props: LeftColumnProps): JSX.Element => (
//   <div>
//     <p>{props.params.name} Component</p>
//   </div>
// );

// const { html, useState } = window.RFK.ui;

const PreviewSearchList = ({
  items = [],
  title,
  onMouseEnter,
  onMouseLeave,
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

const LeftColumn = ({
  categories = [],
  trendingCategories = [],
  suggestions = [],
  loading,
  loaded,
  onCategoryChanged = () => {},
  onTrendingCategoryChanged = () => {},
  onSuggestionChanged = () => {},
  redirectUrl = '',
}): JSX.Element => {
  const [lock, setLock] = window.RFK.ui.useState(false);

  const onCategoryEnter = (category) => {
    if (!lock) {
      onCategoryChanged(category);
    }
    setLock(true);
  };

  const onTrendingCategoryEnter = (trendingCategory) => {
    if (!lock) {
      onTrendingCategoryChanged(trendingCategory);
    }
    setLock(true);
  };

  const onSuggestionEnter = (suggestion) => {
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

// export default withDatasourceCheck()<LeftColumnProps>(LeftColumn);
