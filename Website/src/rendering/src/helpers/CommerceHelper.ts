export const isCommerceEnabled =
  !!process.env.NEXT_PUBLIC_DISCOVER_API_KEY &&
  !!process.env.NEXT_PUBLIC_DISCOVER_CUSTOMER_KEY &&
  !!process.env.NEXT_PUBLIC_ORDERCLOUD_BASE_API_URL &&
  !!process.env.NEXT_PUBLIC_ORDERCLOUD_BUYER_CLIENT_ID;

export const isAShopPage = (urlPathName: string): boolean => {
  return !!urlPathName && (urlPathName.startsWith('/shop') || urlPathName.startsWith('/account'));
};
