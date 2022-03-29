import { useState } from 'react';

type ProductImageProps = {
  images: {
    Url: string;
  }[];
};

const ProductImage = (props: ProductImageProps): JSX.Element => {
  const [activeImg, setActiveImg] = useState(null);

  return (
    <div className="product-image">
      <div className="image-active">
        <div>
          <img src={activeImg || props.images[0].Url} alt="" />
          <span className="product-offer">Best Seller</span>
        </div>
      </div>
      <div className="image-secondary">
        {props.images.map((img) => (
          <div key={img.Url}>
            <img src={img.Url} alt="" onClick={() => setActiveImg(img.Url)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImage;
