import React, { useEffect, useContext } from 'react';
import '../../styles/card.sass';
import ProductCard from './ProductCard';
import { getProducts } from '../../services/api';
import { ProductContext } from '../../contexts/ProductContext';

function ProductCardContainer() {
  const { products, setProducts, selectedProductSkus, setSelectedProductSkus } = useContext(ProductContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, []);

  const handleProductSelect = (productId) => {
    setSelectedProductSkus([...selectedProductSkus, productId]);
  };

  const handleProductDeselect = (productId) => {
    setSelectedProductSkus(selectedProductSkus.filter((id) => id !== productId));
  };

  return (
    <div id='div-container-product-cards'>
      {products.map((product) => {
        
        let price = 0.00;
        if(product.price)
          price = product.price % 1 === 0 ? `${product.price}.00` : product.price.toFixed(2);

        return (
          <ProductCard
            key={product.sku}
            sku={product.sku}
            name={product.name}
            price={price}
            type={product.type}
            attribute={product.attributes}
            onProductSelect={handleProductSelect}
            onProductDeselect={handleProductDeselect}
          />
        );
      })}
    </div>
  );
  
}

export default ProductCardContainer;
