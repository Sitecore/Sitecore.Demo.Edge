import CategoryBreadcrumb from '../../components/Navigation/CategoryBreadcrumb';
import { Category } from '../../helpers/CategoriesDataHelper';

type CategoryHeroProps = {
  category: Category;
};

const CategoryHero = ({ category }: CategoryHeroProps): JSX.Element => {
  if (!category) {
    return null;
  }

  const categoryDisplayName = category.title ? category.title : category.name;

  return (
    <section className="category-hero">
      <CategoryBreadcrumb category={category} />
      <div className="category-hero-container">
        <div className="category-hero-content">
          <h1>{categoryDisplayName}</h1>
          <p>{category.desc}</p>
        </div>
        {/* TODO: Add subcategories here */}
        {/* <div className="category-hero-sub">
          <ul>
            {[...Array(3)].map((e, i) => (
              <li key={i}>
                <Link href="#">
                  <a>
                    <img src="/assets/img/shop/category-placeholder.png" alt="Category" />
                    <h4>Sub-category {++i}</h4>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div> */}
      </div>
    </section>
  );
};

export default CategoryHero;
