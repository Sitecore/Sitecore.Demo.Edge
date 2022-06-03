import Link from 'next/link';
import { getCategoryByUrlPath } from '../../helpers/CategoriesDataHelper';
import { Category } from '../../models/discover/Category';
import { Suggestion } from '../../models/discover/Suggestion';

type PreviewSearchListProps = {
  items: unknown[];
  title: string;
  redirectUrl: string;
  onMouseEnter: (text: string) => void;
  onMouseLeave: () => void;
  onNavigatingAway: () => void;
};

const PreviewSearchList = ({
  items,
  title,
  redirectUrl,
  onMouseEnter,
  onMouseLeave,
  onNavigatingAway,
}: PreviewSearchListProps): JSX.Element => {
  return (
    <div className="list-container">
      {items.length > 0 && (
        <div>
          <h2 className="list-container-title">{title}</h2>
          <ul>
            {items.map(({ text, id, url }) => {
              const href = url ? url : `${redirectUrl}${text}`;

              return (
                <li
                  className="list-item"
                  id={id}
                  key={id}
                  onMouseEnter={() => onMouseEnter(url ? url : text)}
                  onMouseLeave={onMouseLeave}
                >
                  <Link href={href}>
                    <a onClick={onNavigatingAway}>{text}</a>
                  </Link>
                </li>
              );
            })}
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
  onNavigatingAway: () => void;
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
  onNavigatingAway,
}: LeftColumnProps): JSX.Element => {
  // TODO Investigate if we can remove lock completely
  let lock = false;

  const onCategoryEnter = (category: string) => {
    if (!lock) {
      onCategoryChanged(category);
    }
    lock = true;
  };

  const onTrendingCategoryEnter = (trendingCategory: string) => {
    if (!lock) {
      onTrendingCategoryChanged(trendingCategory);
    }
    lock = true;
  };

  const onSuggestionEnter = (suggestion: string) => {
    if (!lock) {
      onSuggestionChanged(suggestion);
    }
    lock = true;
  };

  const onMouseLeave = () => {
    lock = false;
  };

  const isLoaded = loaded && !loading;
  const shouldShowSuggestedCategories = isLoaded && categories?.length > 0;
  const shouldShowTrendingCategories =
    isLoaded && !shouldShowSuggestedCategories && trendingCategories?.length > 0;
  const shouldShowDidYouMean = isLoaded && suggestions?.length > 0;

  // HACK: We receive all lowercase category names from Discover. Sending back these lowercase category names in events leads to no results. We must send the correctly capitalized category names as they are set in our catalog. Workaround: Update category names with the correct casing.
  const transformCategoryToDisplay = (categorySuggestion: Category): Category => {
    const category = getCategoryByUrlPath(categorySuggestion.url);
    const text = category?.name ? category.name : categorySuggestion.text;

    return {
      ...categorySuggestion,
      text,
    };
  };
  const categoriesToDisplay = shouldShowSuggestedCategories
    ? categories.map((categorySuggestion) => transformCategoryToDisplay(categorySuggestion))
    : [];
  const trendingCategoriesToDisplay = shouldShowTrendingCategories
    ? trendingCategories.map((categorySuggestion) => transformCategoryToDisplay(categorySuggestion))
    : [];

  const suggestedCategoriesList = shouldShowSuggestedCategories && (
    <PreviewSearchList
      onMouseEnter={onCategoryEnter}
      onMouseLeave={onMouseLeave}
      title="Categories"
      items={categoriesToDisplay}
      redirectUrl={redirectUrl}
      onNavigatingAway={onNavigatingAway}
    />
  );

  const trendingCategoriesList = shouldShowTrendingCategories && (
    <PreviewSearchList
      onMouseEnter={onTrendingCategoryEnter}
      onMouseLeave={onMouseLeave}
      title="Trending Categories"
      items={trendingCategoriesToDisplay}
      redirectUrl={redirectUrl}
      onNavigatingAway={onNavigatingAway}
    />
  );

  const didYouMeanList = shouldShowDidYouMean && (
    <PreviewSearchList
      onMouseEnter={onSuggestionEnter}
      onMouseLeave={onMouseLeave}
      title="Did you mean?"
      items={suggestions}
      redirectUrl={redirectUrl}
      onNavigatingAway={onNavigatingAway}
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
