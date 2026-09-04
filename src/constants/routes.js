export const ROUTES = {
  HOME: '/',
  SHOP: '/shop',
  PRODUCT_DETAIL: '/shop/:id',
  CART: '/cart',
  WISHLIST: '/wishlist',
  NOT_FOUND: '*',
};

export const createProductUrl = (id) => `/shop/${id}`;
export const createCategoryUrl = (category) =>
  `/shop?category=${encodeURIComponent(category)}`;
export const createSearchUrl = (query) =>
  `/shop?search=${encodeURIComponent(query)}`;
