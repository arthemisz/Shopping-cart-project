export const AVAILABLE_COUPONS = {
  NEXUS15: {
    code: 'NEXUS15',
    discountPercent: 15,
    description: '15% Off Your Entire Order',
  },
  SAVE15: {
    code: 'SAVE15',
    discountPercent: 15,
    description: '15% Off Seasonal Special',
  },
  PRO20: {
    code: 'PRO20',
    discountPercent: 20,
    description: '20% Off Premier Pass',
  },
};

export const SHIPPING_CONFIG = {
  FREE_SHIPPING_THRESHOLD: 50.0,
  FLAT_SHIPPING_FEE: 5.99,
  TAX_RATE: 0.15,
};

export const validateCoupon = (inputCode) => {
  if (!inputCode) return null;
  const normalized = inputCode.trim().toUpperCase();
  return AVAILABLE_COUPONS[normalized] || null;
};
