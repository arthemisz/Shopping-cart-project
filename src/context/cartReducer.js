export const CART_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
};

export const initialCartState = { items: [] };

export function cartReducer(state = initialCartState, action) {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const product = action.payload.product || action.payload;
      const quantity = Math.max(1, Number(action.payload.quantity) || 1);
      const idx = state.items.findIndex((i) => i.id === product.id);

      const items = idx > -1
        ? state.items.map((item, i) => (i === idx ? { ...item, quantity: item.quantity + quantity } : item))
        : [...state.items, { ...product, quantity }];

      return { ...state, items };
    }

    case CART_ACTIONS.REMOVE_ITEM: {
      const id = typeof action.payload === 'object' ? action.payload.id : action.payload;
      return { ...state, items: state.items.filter((i) => i.id !== id) };
    }

    case CART_ACTIONS.UPDATE_QUANTITY: {
      const { id, quantity } = action.payload;
      const safeQty = Math.max(1, Number(quantity) || 1);
      return {
        ...state,
        items: state.items.map((i) => (i.id === id ? { ...i, quantity: safeQty } : i)),
      };
    }

    case CART_ACTIONS.CLEAR_CART:
      return { ...state, items: [] };

    default:
      return state;
  }
}
