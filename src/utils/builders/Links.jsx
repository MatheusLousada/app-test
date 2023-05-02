import { useContext } from 'react';
import { ProductContext } from '../../contexts/ProductContext';
import { deleteProducts, addProduct } from '../../services/api';

function handleMassDelete(selectedProductSkus, products, setProducts, setSelectedProductSkus) {
  if (selectedProductSkus.length > 0) {
    deleteProducts(selectedProductSkus)
      .then(() => {
        const updatedProducts = products.filter(product => !selectedProductSkus.includes(product.sku));
        setProducts(updatedProducts);
        setSelectedProductSkus([]);
      })
      .catch((error) => {});
  } else {
    alert("Hey there! Please select at least one card to delete before clicking the delete button. Thank you!");
  }
}

function handleSave(event, products, setProducts, newProduct, setNewProduct, productsFormErrors) {

  event.preventDefault();

  if(Object.keys(productsFormErrors).length > 0){
    alert('Please fill out all the fields of the form correctly.');
    return;
  }

  const product = {product: newProduct};

  addProduct(product)
    .then((data) => {
      event.stopPropagation();
      setProducts([...products, data]);
      setNewProduct({
        product: {
          sku: '',
          name: '',
          price: '',
          image: '',
          type_id: '',
          attributes: {}
        }
      });
      window.location.replace('/');
    })
    .catch((error) => {
      alert(error.message);
    });
}


const handleCancel = () => {
};

export function Links() {

  const { 
    selectedProductSkus,
    products,
    setProducts,
    setSelectedProductSkus,
    newProduct,
    setNewProduct, 
    productsFormErrors
  } = useContext(ProductContext);

  const LIST_LINKS = [
    {
      id: 'add-product-btn',
      to: '/addproduct',
      label: 'ADD',
      onClick: null,
    },
    {
      id: 'delete-product-btn',
      to: '/',
      label: 'MASS DELETE',
      onClick: () => handleMassDelete(selectedProductSkus, products, setProducts, setSelectedProductSkus)
    },
  ];
  
  const ADD_PRODUCT_LINKS = [
    {
      id: 'save-product-btn',
      to: '/',
      label: 'SAVE',
      onClick: (event) => handleSave(event, products, setProducts, newProduct, setNewProduct, productsFormErrors)
    },
    {
      id: 'cancel-product-btn',
      to: '/',
      label: 'CANCEL',
      onClick: () => handleCancel()
    },
  ];

  return {
    LIST_LINKS,
    ADD_PRODUCT_LINKS
  };
}
