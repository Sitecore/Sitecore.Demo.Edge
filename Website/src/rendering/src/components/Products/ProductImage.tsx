import { useState } from 'react';
import Skeleton from 'react-loading-skeleton';

type ProductImageProps = {
  images: {
    Url: string;
  }[];
  loading?: boolean;
};

const ProductImage = (props: ProductImageProps): JSX.Element => {
  const [activeImg, setActiveImg] = useState(null);

  const uniqueImages = [...new Map(props.images.map((image) => [image['Url'], image])).values()];

  const thumbnails = uniqueImages.length > 1 && (
    <div className="image-secondary">
      {uniqueImages.map((img, i) => {
        const isActive = activeImg ? img.Url === activeImg : i === 0;
        return (
          <div key={img.Url} className={isActive ? 'active' : ''}>
            <img src={img.Url} alt="" onClick={() => setActiveImg(img.Url)} />
          </div>
        );
      })}
    </div>
  );

  const getActiveImage = () => {
    if (props.loading) {
      return <Skeleton height="100%" />;
    } else if (activeImg || uniqueImages[0]) {
      return <img src={activeImg || uniqueImages[0].Url} alt="" />;
    } else {
      return null;
    }
  };

  const productOffer = !props.loading && <span className="product-offer">Best Seller</span>;

  const images =
    uniqueImages.length > 0 || props.loading ? (
      <div className="product-image">
        <div className="image-active">
          <div>
            {getActiveImage()}
            {productOffer}
          </div>
        </div>
        {thumbnails}
      </div>
    ) : null;

  return images;
};

export default ProductImage;
