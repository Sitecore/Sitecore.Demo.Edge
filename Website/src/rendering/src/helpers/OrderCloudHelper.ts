export const isOrderCloudEnabled =
  !!process.env.NEXT_PUBLIC_ORDERCLOUD_BASE_API_URL &&
  !!process.env.NEXT_PUBLIC_ORDERCLOUD_BUYER_CLIENT_ID;
