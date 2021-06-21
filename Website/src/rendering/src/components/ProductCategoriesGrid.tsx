const ProductCategoriesGrid = (): JSX.Element => (
  <div className="section__products__grid">
    <div className="section__products__grid__product">
      <a href="#">
        <figure>
          <img src="assets/img/products-team-sports.jpg" alt="Team sports product category image" />
        </figure>
        <h3 className="product__category">Team Sports</h3>
      </a>
    </div>
    <div className="section__products__grid__product">
      <a href="#">
        <figure>
          <img
            src="assets/img/products-water-sports.jpg"
            alt="Water sports product category image"
          />
        </figure>
        <h3 className="product__category">Swimming</h3>
      </a>
    </div>
    <div className="section__products__grid__product">
      <a href="#">
        <figure>
          <img
            src="assets/img/products-motor-sports.jpg"
            alt="Motor sports product category image"
          />
        </figure>
        <h3 className="product__category">Motor Sports</h3>
      </a>
    </div>
    <div className="section__products__grid__product">
      <a href="#">
        <figure>
          <img src="assets/img/products-hiking.jpg" alt="Hiking product category image" />
        </figure>
        <h3 className="product__category">Hike</h3>
      </a>
    </div>
    <div className="section__products__grid__product">
      <a href="#">
        <figure>
          <img src="assets/img/products-fitness.jpg" alt="Fitness product category image" />
        </figure>
        <h3 className="product__category">Fitness</h3>
      </a>
    </div>
    <div className="section__products__grid__product">
      <a href="#">
        <figure>
          <img src="assets/img/products-yoga.jpg" alt="Yoga product category image" />
        </figure>
        <h3 className="product__category">Yoga</h3>
      </a>
    </div>
  </div>
);

export default ProductCategoriesGrid;
