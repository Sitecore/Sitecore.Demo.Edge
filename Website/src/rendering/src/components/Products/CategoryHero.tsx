type CategoryHeroProps = {
  categoryName: string;
  categoryDescription: string;
};

const CategoryHero = ({ categoryName, categoryDescription }: CategoryHeroProps): JSX.Element => {
  return (
    <section className="category-hero">
      <div className="category-hero-container">
        <div className="category-hero-content">
          <h1>{categoryName}</h1>
          <p>{categoryDescription}</p>
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
