// reducers are function that take two arguements aka parameters, 
// it return the apps current state aka JS OBJECT
// the two arguements are:
  // your current state (JS Object)
  // An Action (JS Object)
import { useReducer } from 'react';
import {
  UPDATE_PRODUCTS,
  ADD_TO_CART,
  UPDATE_CART_QUANTITY,
  REMOVE_FROM_CART,
  ADD_MULTIPLE_TO_CART,
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
  CLEAR_CART,
  TOGGLE_CART,
} from './actions';

// TODO: To get a better understand of how a reducer works - add comments to the various actions in the reducer
export const reducer = (state, action) => {
  switch (action.type) {

    // TODO: Add a comment describing the functionality of the UPDATE_PRODUCTS case
    // Your comment here
    // copy states
    // replace products with the contents of action.products
    //fully replaces what we have in the state with action.products gives us
    case UPDATE_PRODUCTS:
      return {
        // spread syntax
        ...state,
        products: [...action.products],
      };

    case ADD_TO_CART:
      return {
        ...state,
        cartOpen: true,
        cart: [...state.cart, action.product],
      };

    case ADD_MULTIPLE_TO_CART:
      return {
        ...state,
        cart: [...state.cart, ...action.products],
      };

     // check to see if ID is === to the product id
     // if what we set in matches the current product we have in the cart
     // we use map in this instance , we can't directly update the state
     // we need to send it a new value to replace the state
     // map function always retunrs to us the NEW modified array
    case UPDATE_CART_QUANTITY:
      return {
        ...state,
        cartOpen: true,
        cart: state.cart.map((product) => {
          if (action._id === product._id) {
            product.purchaseQuantity = action.purchaseQuantity;
          }
          return product;
        }),
      };

    case REMOVE_FROM_CART:
      // filter returns a new array
      // we update cartopen to be === to new.state.length is greater than zero
      // if we remove an item from the cart
      // length of the item is zero
      // we update the cart to a new state
      //
      let newState = state.cart.filter((product) => {
        return product._id !== action._id;
      });

      return {
        ...state,
        cartOpen: newState.length > 0,
        cart: newState,
      };

    case CLEAR_CART:
      return {
        ...state,
        cartOpen: false,
        cart: [],
      };

    case TOGGLE_CART:
      return {
        ...state,
        cartOpen: !state.cartOpen,
      };

    case UPDATE_CATEGORIES:
      return {
        ...state,
        categories: [...action.categories],
      };

    case UPDATE_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: action.currentCategory,
      };

    // we leave default base case here 
    default:
      return state;
  }
};

export function useProductReducer(initialState) {
  return useReducer(reducer, initialState);
}
