import { Category } from '../Widgets/TrendingCategories';

export type CategoriesListProps = {
  title?: string;
  subtitle?: string;
  categories?: Category[];
  theme?: string;
  inStorybook?: boolean;
};

const CategoriesList = (props: CategoriesListProps): JSX.Element => {
  const themeClass = props.theme ? `categories-list-${props.theme}` : '';

  return (
    <section className={`categories-list ${themeClass}`}>
      <div className="categories-list-title">
        <h1>{props.title}</h1>
        <p>{props.subtitle}</p>
      </div>
      {/* TODO: rework after npm package is integrated */}
      {props.inStorybook ? (
        <ul>
          {props.categories.map((cat) => (
            <li key={cat.id}>
              <a href={cat.url}>
                <img src="/assets/img/shop/category-placeholder.png" alt={cat.text} />
                <h4>{cat.text}</h4>
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <div data-rfkid="ps_trending_categories"></div>
      )}
    </section>
  );
};

export default CategoriesList;
