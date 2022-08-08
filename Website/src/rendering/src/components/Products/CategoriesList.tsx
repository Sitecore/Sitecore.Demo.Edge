import TrendingCategories, { TrendingCategoriesProps } from '../Widgets/TrendingCategories';
import DiscoverWidget from '../ShopCommon/DiscoverWidget';

export type CategoriesListProps = {
  title?: string;
  subtitle?: string;
  theme?: string;
  trendingCategoriesProps?: TrendingCategoriesProps; // For Storybook support
};

const CategoriesList = (props: CategoriesListProps): JSX.Element => {
  const themeClass = props.theme ? `categories-list-${props.theme}` : '';

  const trendingCategoriesWidget = props.trendingCategoriesProps ? (
    <TrendingCategories {...props.trendingCategoriesProps} />
  ) : (
    <DiscoverWidget rfkId="ps_trending_categories" />
  );

  return (
    <section className={`categories-list ${themeClass}`}>
      <div className="categories-list-title">
        <h1>{props.title}</h1>
        <p>{props.subtitle}</p>
      </div>
      {trendingCategoriesWidget}
    </section>
  );
};

export default CategoriesList;
