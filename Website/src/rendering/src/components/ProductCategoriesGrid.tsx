import Link from 'next/link';
import Image from 'next/image';

import product1 from '../../data/media/img/products/team-sports.jpg';
import product2 from '../../data/media/img/products/water-sports.jpg';
import product3 from '../../data/media/img/products/motor-sports.jpg';
import product4 from '../../data/media/img/products/hiking.jpg';
import product5 from '../../data/media/img/products/fitness.jpg';
import product6 from '../../data/media/img/products/yoga.jpg';

const ProductCategoriesGrid = (): JSX.Element => (
  <div className="section__products__grid">
    <div className="section__products__grid__product">
      <Link href="/shop/teamsports">
        <a>
          <figure>
            <Image src={product1} alt="Category" width={350} height={250} />
          </figure>
          <h3 className="product__category">Team Sports</h3>
        </a>
      </Link>
    </div>
    <div className="section__products__grid__product">
      <Link href="/shop/swimming">
        <a>
          <figure>
            <Image src={product2} alt="Category" width={350} height={250} />
          </figure>
          <h3 className="product__category">Swimming</h3>
        </a>
      </Link>
    </div>
    <div className="section__products__grid__product">
      <Link href="/shop/motorsports">
        <a>
          <figure>
            <Image src={product3} alt="Category" width={350} height={250} />
          </figure>
          <h3 className="product__category">Motor Sports</h3>
        </a>
      </Link>
    </div>
    <div className="section__products__grid__product">
      <Link href="/shop/hiking">
        <a>
          <figure>
            <Image src={product4} alt="Category" width={350} height={250} />
          </figure>
          <h3 className="product__category">Hike</h3>
        </a>
      </Link>
    </div>
    <div className="section__products__grid__product">
      <Link href="/shop/fitness">
        <a>
          <figure>
            <Image src={product5} alt="Category" width={350} height={250} />
          </figure>
          <h3 className="product__category">Fitness</h3>
        </a>
      </Link>
    </div>
    <div className="section__products__grid__product">
      <Link href="/shop/yoga">
        <a>
          <figure>
            <Image src={product6} alt="Category" width={350} height={250} />
          </figure>
          <h3 className="product__category">Yoga</h3>
        </a>
      </Link>
    </div>
  </div>
);

export default ProductCategoriesGrid;
