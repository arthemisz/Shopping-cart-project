/**
 * Format a number as USD currency
 * @param {number|string} amount
 * @returns {string} e.g. "$109.95"
 */
export const formatPrice = (amount) => {
  const numeric = Number(amount) || 0;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numeric);
};

/**
 * Capitalize first letter of category or phrase
 * @param {string} category
 * @returns {string}
 */
export const formatCategory = (category) => {
  if (!category || typeof category !== 'string') return '';
  return category
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

/**
 * Format star rating score to one decimal point
 * @param {number|string} rate
 * @returns {string} e.g. "4.8"
 */
export const formatRating = (rate) => {
  const numeric = Number(rate) || 0;
  return numeric.toFixed(1);
};

/**
 * Truncate long string with ellipsis
 * @param {string} text
 * @param {number} maxLength
 * @returns {string}
 */
export const truncateText = (text, maxLength = 80) => {
  if (!text || typeof text !== 'string') return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trimEnd() + '...';
};
