import React, { useReducer } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import AddProduct from './pages/AddProduct';
import Navbar from './components/structural/Navbar';
import Footer from './components/structural/Footer';
import BackgroundImages from './components/structural/BackgroundImages';
import {ProductContext, initialState, reducer} from './contexts/ProductContext';

function App() {

  const [state, dispatch] = useReducer(reducer, initialState);
  const { selectedProductSkus, products, newProduct, productsFormErrors } = state;

  return (
    <ProductContext.Provider value={{
      selectedProductSkus,
      setSelectedProductSkus: (skus) => dispatch({ type: 'setSelectedProductSkus', payload: skus }),
      products,
      setProducts: (products) => dispatch({ type: 'setProducts', payload: products }),
      newProduct,
      setNewProduct: (product) => dispatch({ type: 'setNewProduct', payload: product }),
      productsFormErrors,
      setProductsFormErrors: (productsFormErrors) => dispatch({ type: 'setProductsFormErrors', payload: productsFormErrors })
    }}>
      <BackgroundImages />
      <BrowserRouter>
      <body>
        <header>
          <Navbar />
        </header>
        <main id='main'>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/addproduct" element={<AddProduct />} />
          </Routes>
        </main>
        <footer>
          <Footer />
        </footer>
      </body>
      </BrowserRouter>
    </ProductContext.Provider>
  );
}

export default App;