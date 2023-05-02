import { createContext } from 'react';

export const ProductContext = createContext({
  selectedProductSkus: [],
  setSelectedProductSkus: () => {},
  products: [],
  setProducts: () => {},
  newProduct: {},
  setNewProduct: () => {},
  productsFormErrors: {},
  setProductsFormErrors: () => {}
});
  
export  const initialState = {
  selectedProductSkus: [],
  products: [],
  newProduct: {
      sku: '',
      name: '',
      price: '',
      type_id: '',
      attributes: {}
  },
  productsFormErrors: {
    name: 'Initial required fields'
  }
};
  
export  function reducer(state, action) {
  switch (action.type) {
    case 'setSelectedProductSkus':
      return { ...state, selectedProductSkus: action.payload };
    case 'setProducts':
      return { ...state, products: action.payload };
    case 'setNewProduct':
      return { ...state, newProduct: action.payload };
    case 'setProductsFormErrors':
      return { ...state, productsFormErrors: action.payload };
    default:
      return state;
  }
}