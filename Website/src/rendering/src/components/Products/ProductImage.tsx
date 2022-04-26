import { useState } from 'react';

type ProductImageProps = {
  images: {
    Url: string;
  }[];
};

const ProductImage = (props: ProductImageProps): JSX.Element => {
  const [activeImg, setActiveImg] = useState(null);

  const thumbnails = props.images.map((img, i) => {
    const isActive = activeImg ? img.Url === activeImg : i === 0;
    return (
      <div key={img.Url} className={isActive && 'active'}>
        <img src={img.Url} alt="" onClick={() => setActiveImg(img.Url)} />
      </div>
    );
  });

  return (
    <div className="product-image">
      <div className="image-active">
        <div>
          <img src={activeImg || props.images[0].Url} alt="" />
          <span className="product-offer">Best Seller</span>
        </div>
      </div>
      {props.images.length > 1 && <div className="image-secondary">{thumbnails}</div>}
    </div>
  );
};

export default ProductImage;
