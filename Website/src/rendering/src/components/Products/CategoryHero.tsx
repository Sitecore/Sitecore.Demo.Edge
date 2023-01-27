import Link from 'next/link';
import { Category } from '../../models/Category';
import CategoryBreadcrumb from '../../components/Navigation/CategoryBreadcrumb';
import { getCategoryChildrenByCcid } from '../../helpers/CategoriesDataHelper';
import { addTransformation } from '../../helpers/ImageHelper';

type CategoryHeroProps = {
  category: Category;
};

const CategoryHero = ({ category }: CategoryHeroProps): JSX.Element => {
  if (!category) {
    return null;
  }

  const categoryDisplayName = category.title ? category.title : category.name;

  const categoryChildren = getCategoryChildrenByCcid(category.ccid);
  const subCategories = categoryChildren && (
    <div className="category-hero-sub">
      <ul>
        {categoryChildren.slice(0, 3).map((cat) => (
          <li key={cat.ccid}>
            <Link href={cat.url_path}>
              <a>
                <img
                  src={
                    cat?.image_url
                      ? addTransformation(cat.image_url, 'w320')
                      : '/assets/img/shop/category-placeholder.png'
                  }
                  alt="Category"
                />
                <h4>{cat?.title || cat.name}</h4>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <section className="category-hero">
      <CategoryBreadcrumb category={category} />
      <div className="category-hero-container">
        <div className="category-hero-content">
          <h1>{categoryDisplayName}</h1>
          <p>{category.desc}</p>
        </div>
        {subCategories}
      </div>
    </section>
  );
};

export default CategoryHero;
