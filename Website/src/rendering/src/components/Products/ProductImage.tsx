import { useEffect, useMemo, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { addTransformation } from '../../helpers/ImageHelper';

type ProductImageProps = {
  images: {
    Url: string;
  }[];
  loading?: boolean;
};

const ProductImage = (props: ProductImageProps): JSX.Element => {
  const [activeImgSrc, setActiveImgSrc] = useState(null);

  const uniqueImages = useMemo(
    () => [...new Map(props.images.map((image) => [image['Url'], image])).values()],
    [props.images]
  );

  useEffect(() => setActiveImgSrc(null), [props]);

  const thumbnails = useMemo(
    () =>
      uniqueImages.length > 1 && (
        <div className="image-secondary">
          {uniqueImages.map((img, i) => {
            const isActive = activeImgSrc ? img.Url === activeImgSrc : i === 0;
            return (
              <div key={img.Url} className={isActive ? 'active' : ''}>
                <img src={`${img.Url}&t=w320`} alt="" onClick={() => setActiveImgSrc(img.Url)} />
              </div>
            );
          })}
        </div>
      ),
    [activeImgSrc, uniqueImages]
  );

  const activeImage = useMemo(() => {
    if (props.loading) {
      return <Skeleton height="100%" />;
    } else if (activeImgSrc || uniqueImages[0]) {
      return (
        <img
          src={
            activeImgSrc
              ? addTransformation(activeImgSrc, 'w800')
              : addTransformation(uniqueImages[0].Url, 'w800')
          }
          alt=""
        />
      );
    } else {
      return null;
    }
  }, [activeImgSrc, props.loading, uniqueImages]);

  const productOffer = !props.loading && <span className="product-offer">Best Seller</span>;

  const images =
    uniqueImages.length > 0 || props.loading ? (
      <div className="product-image">
        <div className="image-active">
          <div>
            {activeImage}
            {productOffer}
          </div>
        </div>
        {thumbnails}
      </div>
    ) : null;

  return images;
};

export default ProductImage;
