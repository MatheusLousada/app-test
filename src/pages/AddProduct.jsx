import { useState, useEffect, useContext } from 'react';
import { ProductContext } from '../contexts/ProductContext';
import { getTypes, getAttributes } from '../services/api';
import '../styles/form.sass';
import React from 'react';
import { Formik } from 'formik';

const AddProduct = () => {
  
  const [productData, setProductData] = useState({
    sku: '',
    name: '',
    price: '',
    type_id: '',
    attributes: {}
  });

  const [options, setOptions] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [typesAttributes, setTypesAttributes] = useState([]);
  const { setNewProduct, setProductsFormErrors } = useContext(ProductContext);

  useEffect(() => {
    async function fetchProductData() {
      const typesData = await getTypes();
      const attributesData = await getAttributes();
      const combinedData = typesData.map(type => {
        const typeAttributesIds = type.attributes.split(',').map(id => parseInt(id.trim(), 10));
        const typeAttributes = attributesData.filter(attr => typeAttributesIds.includes(attr.id));
        return { ...type, attributes: typeAttributes };
      });
      setTypesAttributes(combinedData);
      const initialAttributes = attributesData.find(attr => attr.id === typesData[0].id);
      setProductData(prev => ({ ...prev, type_id: typesData[0].id, attributes: { 0: initialAttributes } }));
    }
    fetchProductData();
  }, []);

  useEffect(() => {
    if (typesAttributes.length > 0 && options.length === 0) {
      setOptions(typesAttributes.map(type => ({ id: type.id, description: type.description })));
    }
  }, [typesAttributes]);

  useEffect(() => {
    handleAttributes();
    setNewProduct(productData);
  }, [productData]);

  const updateAttributesDivClass = (type_id) => {
    const selectedType = typesAttributes.find(type => type.id === type_id);
    const classDiv = `div_product_form class_${selectedType.description.toLowerCase()}`;
    const attributesDiv = document.getElementById('attributes');
    attributesDiv.className = classDiv;
  };

  const handleAttributes = () => {
    const currentTypeAttributes = typesAttributes.find(type => type.id === productData.type_id);
    setAttributes(currentTypeAttributes ? currentTypeAttributes.attributes : []);
  };

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setProductData(prev => ({ ...prev, [id]: value }));
  };

  const handleTypeChange = (event) => {
    const type_id = parseInt(event.target.value);
    setProductData(prev => ({ ...prev, type_id: type_id }));
    updateAttributesDivClass(type_id);
  };

  const handleAttributeChange = (attributeId, value) => {
    const updatedAttributes = attributes.map(attribute => {
      if (attribute.id === attributeId) {
        attribute.value = value;
      }
      return attribute;
    });
    setProductData(prev => ({ ...prev, attributes: updatedAttributes }));
  };
  
  const handleUpperCaseInput = (event) => {
    event.target.value = event.target.value.toUpperCase();
  }

  const getInitialValues = () => {
    const attributes = typesAttributes.reduce((acc, type) => {
      return [...acc, ...type.attributes];
    }, []);
    
    const initialValues = {
      sku: '',
      name: '',
      price: '0.00'
    }
    
    attributes.forEach((attribute) => {
      initialValues['attribute'+attribute.id] = '';
    });
    
    return initialValues;
  };  

  return (
  <div id="product_form">

    {options.length > 0 && (

      <Formik
        initialValues={getInitialValues()}
        validate={(values) => {

          const errors = {};

          if (!values.sku) {
            errors.sku = 'Required';
          } else if (!/^[a-zA-Z0-9]+$/.test(values.sku)) {
            errors.sku = 'Invalid SKU. SKU can only contain letters and numbers.';
          } else if (values.sku.length < 2) {
            errors.sku = 'Invalid SKU. SKU must have minimal 2 caracteres.';
          }

          if (!values.name) {
            errors.name = 'Required';
          } else if (values.name.length < 2) {
            errors.name = 'Invalid name. Name must have minimal 2 caracteres.';
          }

          if (!values.price) {
            errors.price = 'Required';
          } else if (!/^\d+(\.\d{1,2})?$/.test(values.price)) {
            errors.price = 'Invalid Price. Price must be a valid decimal number.';
          }

          attributes.forEach((at) => {
            const attributeName = `attribute${at.id}`; 
            const attributeDescription = at.description; 
            if (!values[attributeName]) {
              errors[attributeName] = 'Required';
            } else if (!/^\d+(\.\d{1,3})?$/.test(values[attributeName])) {
              errors[attributeName] = `Invalid ${attributeDescription}. ${attributeDescription} must be a valid decimal number, with max 3 decimal places.`;
            }
          });

          setProductsFormErrors(errors);
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit
        }) => (

          <form onSubmit={handleSubmit}>

          <div className='div_product_form'>
          <label htmlFor="sku">SKU *</label>
          <input
            type="text"
            id="sku"
            name="sku"
            onChange={(event) => {
              handleUpperCaseInput(event);
              handleInputChange(event);
              handleChange(event);
            }}
            onBlur={handleBlur}
            value={values.sku}
            maxLength={150}
          />
          </div>
          <div className={errors.sku && touched.sku ? 'div_error' : ''}>
            {errors.sku && touched.sku && errors.sku}
          </div>

          <div className='div_product_form'>
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={(event) => {
              handleInputChange(event);
              handleChange(event);
            }}
            onBlur={handleBlur}
            value={values.name}
            maxLength={250}
          />
          </div>
          <div className={errors.name && touched.name ? 'div_error' : ''}>
            {errors.name && touched.name && errors.name}
          </div>

          <div className='div_product_form'>
          <label htmlFor="price">Price($) *</label>
          <input
            type="text"
            id="price"
            name="price"
            onChange={(event) => {
              handleInputChange(event);
              handleChange(event);
            }}
            onBlur={handleBlur}
            value={values.price}
            maxLength={15}
            pattern="^\d+(\.\d{1,2})?$"
          />
          </div>
          <div className={errors.price && touched.price ? 'div_error' : ''}>
            {errors.price && touched.price && errors.price}
          </div>

          <div className='div_product_form'>
            <label htmlFor='types'>Types *</label>
            <select 
              id='productType'
              onChange={(event) => {
                handleTypeChange(event);
                handleChange(event);
              }} 
              value={values.types}
            >
              {options.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.description}
                </option>
              ))}
            </select>
          </div>

          <div className={`div_product_form class_${options[0].description.toLowerCase()}`} id="attributes">
            {attributes.map((attribute) => (
              <div key={attribute.id} className='attribute_div'>
                <div>
                  <label htmlFor={attribute.id}>{attribute.description}({attribute.measurement_unit}) *</label>
                  <input
                    type="text"
                    id={attribute.description}
                    value={attribute.id.value}
                    name={'attribute'+attribute.id}
                    onChange={(event) => {
                      handleAttributeChange(attribute.id, event.target.value);
                      handleChange(event);
                    }}
                    onBlur={handleBlur}
                    required={true}
                  />
                </div>
                <div className={errors['attribute'+attribute.id] && touched['attribute'+attribute.id] ? 'div_error' : ''}>
                  {errors['attribute'+attribute.id] && touched['attribute'+attribute.id] && errors['attribute'+attribute.id]}
                </div>
              </div>
            ))}
          </div>

        </form>
      )}
      </Formik>

    )}

  </div>
  );
}

export default AddProduct;