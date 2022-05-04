import { useState } from 'react';
import { Category } from '../../models/discover/Category';
import { Suggestion } from '../../models/discover/Suggestion';

type PreviewSearchListProps = {
  items: unknown[];
  title: string;
  redirectUrl: string;
  onMouseEnter: (text: string) => void;
  onMouseLeave: () => void;
};

const PreviewSearchList = ({
  items,
  title,
  /* redirectUrl, */
  onMouseEnter,
  onMouseLeave,
}: PreviewSearchListProps): JSX.Element => {
  return (
    <div className="list-container">
      {items.length > 0 && (
        <div>
          <h2 className="list-container-title">{title}</h2>
          <ul>
            {items.map(({ text, id /*url*/ }) => (
              <li
                className="list-item"
                id={id}
                key={id}
                onMouseEnter={() => onMouseEnter(text)}
                onMouseLeave={onMouseLeave}
              >
                {/* TODO:  - Use this for category pages eventually */}
                {/* {url ? <a href={url}>{text}</a> : <a href={redirectUrl + text}>{text}</a>} */}
                {/* TODO: change for a next/Link component */}
                <a href={'/shop/products?q=' + text}>{text}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
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

const LeftColumn = ({
  categories,
  trendingCategories,
  suggestions,
  loading,
  loaded,
  onCategoryChanged,
  onTrendingCategoryChanged,
  onSuggestionChanged,
  redirectUrl,
}: LeftColumnProps): JSX.Element => {
  const [lock, setLock] = useState(false);

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

  const isLoaded = loaded && !loading;
  const shouldShowSuggestedCategories = isLoaded && categories?.length > 0;
  const shouldShowTrendingCategories =
    isLoaded && !shouldShowSuggestedCategories && trendingCategories?.length > 0;
  const shouldShowDidYouMean = isLoaded && suggestions?.length > 0;

  const suggestedCategoriesList = shouldShowSuggestedCategories && (
    <PreviewSearchList
      onMouseEnter={onCategoryEnter}
      onMouseLeave={onMouseLeave}
      title="Categories"
      items={categories}
      redirectUrl={redirectUrl}
    />
  );

  const trendingCategoriesList = shouldShowTrendingCategories && (
    <PreviewSearchList
      onMouseEnter={onTrendingCategoryEnter}
      onMouseLeave={onMouseLeave}
      title="Trending Categories"
      items={trendingCategories}
      redirectUrl={redirectUrl}
    />
  );

  const didYouMeanList = shouldShowDidYouMean && (
    <PreviewSearchList
      onMouseEnter={onSuggestionEnter}
      onMouseLeave={onMouseLeave}
      title="Did you mean?"
      items={suggestions}
      redirectUrl={redirectUrl}
    />
  );

  return (
    <div className="left-section">
      <div className="left-section-inner">
        {suggestedCategoriesList}
        {trendingCategoriesList}
        {didYouMeanList}
      </div>
    </div>
  );
};

export default LeftColumn;
