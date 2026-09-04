import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { cartReducer, CART_ACTIONS, initialCartState } from './cartReducer';
import { storageGet, storageSet } from '../utils/storage';
import { SHIPPING_CONFIG } from '../constants/coupons';

const CART_KEY = 'nexus_store_cart_v2';
export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, null, () => {
    const saved = storageGet(CART_KEY, []);
    return Array.isArray(saved) ? { items: saved } : initialCartState;
  });

  useEffect(() => {
    storageSet(CART_KEY, state.items);
  }, [state.items]);

  const addToCart = (product, quantity = 1) =>
    dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: { product, quantity } });

  const removeFromCart = (id) =>
    dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: id });

  const updateQuantity = (id, quantity) =>
    dispatch({ type: CART_ACTIONS.UPDATE_QUANTITY, payload: { id, quantity } });

  const clearCart = () => dispatch({ type: CART_ACTIONS.CLEAR_CART });

  const getItemQuantity = (id) => state.items.find((i) => i.id === id)?.quantity || 0;
  const isInCart = (id) => state.items.some((i) => i.id === id);

  const totalCount = state.items.reduce((s, i) => s + i.quantity, 0);
  const subtotal = state.items.reduce((s, i) => s + Number(i.price) * i.quantity, 0);
  const tax = subtotal * SHIPPING_CONFIG.TAX_RATE;
  const shippingThreshold = SHIPPING_CONFIG.FREE_SHIPPING_THRESHOLD;
  const isFreeShipping = subtotal >= shippingThreshold || subtotal === 0;
  const shipping = isFreeShipping ? 0 : SHIPPING_CONFIG.FLAT_SHIPPING_FEE;
  const total = subtotal + tax + shipping;

  const value = {
    cart: state.items,
    items: state.items,
    totalCount,
    subtotal,
    tax,
    shipping,
    isFreeShipping,
    shippingThreshold,
    total,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getItemQuantity,
    isInCart,
    dispatch,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};

export default CartContext;
