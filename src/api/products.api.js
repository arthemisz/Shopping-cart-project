import { apiClient } from './client';

/**
 * Products and Categories API service
 */
export const productsApi = {
  /**
   * Fetch all products or products in category
   */
  getProducts: (category = null, signal = null) => {
    const endpoint = category
      ? `/products/category/${encodeURIComponent(category)}`
      : '/products';
    return apiClient(endpoint, { signal });
  },

  /**
   * Fetch single product by id
   */
  getProductById: (id, signal = null) => {
    return apiClient(`/products/${id}`, { signal });
  },

  /**
   * Fetch list of all product categories
   */
  getCategories: (signal = null) => {
    return apiClient('/products/categories', { signal });
  },
};

export default productsApi;
