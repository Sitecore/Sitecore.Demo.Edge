import { useState } from 'react';
import { Category } from '../../models/discover/Category';
import { Suggestion } from '../../models/discover/Suggestion';

type PreviewSearchListProps = {
  items: unknown[];
  title: string;
  onMouseEnter: (text: string) => void;
  onMouseLeave: () => void;
  redirectUrl: string;
};

const PreviewSearchList = (props: PreviewSearchListProps): JSX.Element => {
  const { items, title, onMouseEnter, onMouseLeave /*redirectUrl */ } = props;

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
                {/* TO-DO - Use this for category pages eventually */}
                {/* {url ? <a href={url}>{text}</a> : <a href={redirectUrl + text}>{text}</a>} */}
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

  const shouldShowTrendingCategories = trendingCategories?.length > 0 && categories?.length === 0;

  return (
    <div className="left-section">
      <div className="left-section-inner">
        {((loaded && !loading) || categories?.length > 0) && (
          <PreviewSearchList
            onMouseEnter={onCategoryEnter}
            onMouseLeave={onMouseLeave}
            title="Categories"
            items={categories}
            redirectUrl={redirectUrl}
          />
        )}
        {loaded && !loading && shouldShowTrendingCategories && (
          <PreviewSearchList
            onMouseEnter={onTrendingCategoryEnter}
            onMouseLeave={onMouseLeave}
            title="Trending Categories"
            items={trendingCategories}
            redirectUrl={redirectUrl}
          />
        )}
        {((loaded && !loading) || suggestions?.length > 0) && (
          <PreviewSearchList
            onMouseEnter={onSuggestionEnter}
            onMouseLeave={onMouseLeave}
            title="Did you mean?"
            items={suggestions}
            redirectUrl={redirectUrl}
          />
        )}
      </div>
    </div>
  );
};

export default LeftColumn;
