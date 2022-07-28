import { ListFacet } from 'ordercloud-javascript-sdk';
import { Category } from 'src/models/discover/Category';
import { Facet } from 'src/models/discover/Facet';
import { Product } from 'src/models/discover/Product';
import { DBuyerProduct } from 'src/models/ordercloud/DBuyerProduct';
import { DCategory } from 'src/models/ordercloud/DCategory';

export const isOrderCloudEnabled =
  !!process.env.NEXT_PUBLIC_ORDERCLOUD_BASE_API_URL &&
  !!process.env.NEXT_PUBLIC_ORDERCLOUD_BUYER_CLIENT_ID;

export const mapOrderCloudProductToDiscoverProduct = (product: DBuyerProduct): Product => {
  return {
    sku: product.ID,
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

export const mapOrderderCloudFacetToDiscoverFacet = (facet: ListFacet, filters: any): Facet => {
  const selectedFacet = filters && filters[`xp.${facet.XpPath}`];
  return {
    number_of_products: facet.Values.length,
    display_name: facet.Name,
    facetType: facet.XpPath,
    values: facet.Values.map((facetValue) => {
      return {
        count: facetValue.Count,
        text: facetValue.Value,
        id: facetValue.Value,
        selected: selectedFacet && selectedFacet.includes(facetValue?.Value),
      };
    }),
  };
};
