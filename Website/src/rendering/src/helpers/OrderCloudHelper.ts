import { Category } from 'src/models/discover/Category';
import { Product } from 'src/models/discover/Product';
import { DBuyerProduct } from 'src/models/ordercloud/DBuyerProduct';
import { DCategory } from 'src/models/ordercloud/DCategory';

export const isOrderCloudEnabled =
  !!process.env.NEXT_PUBLIC_ORDERCLOUD_BASE_API_URL &&
  !!process.env.NEXT_PUBLIC_ORDERCLOUD_BUYER_CLIENT_ID;

export const mapOrderCloudProductToDiscoverProduct = (product: DBuyerProduct): Product => {
  return {
    product_group: product.ID,
    name: product.Name,
    description: product.Description,
    image_url: product?.xp?.Images?.length ? product.xp.Images[0].Url : '',
    brand: product.xp.Brand,
    product_url: product.xp.ProductUrl,
    price: product.PriceSchedule ? product.PriceSchedule.PriceBreaks[0].Price.toString() : '0',
    final_price: product.PriceSchedule
      ? product.PriceSchedule.PriceBreaks[0].Price.toString()
      : '0',
    final_price_min_formatted: null,
    final_price_max_formatted: null,
  } as Product;
};

export const mapOrderCloudCategoryToDiscoverCategory = (category: DCategory): Category => {
  return {
    id: category.ID,
    in_content: '',
    text: category.Name,
    url: `/shop/categories/${category.ID}`,
  };
};
