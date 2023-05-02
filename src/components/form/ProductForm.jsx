import React from 'react';
import { Formik } from 'formik';

const ProductForm = () => (

  <div id="product_form">

    <Formik
      initialValues={{ sku: '', name: '', price: 0.00 }}
      validate={values => {

        const errors = {};

        if (!values.sku) {
          errors.sku = 'Required';
        } else if (
          !/^[a-zA-Z0-9]*$/.test(values.sku)
        ) {
          errors.sku = 'Invalid SKU. SKU can only contain letters and numbers.';
        }

        if (!values.name) {
          errors.name = 'Required';
        } else if (
          !/^[a-zA-Z\s]+$/.test(values.name)
        ) {
          errors.name = 'Invalid Name. Name can only contain letters.';
        }

        if (!values.price) {
          errors.price = 'Required';
        } else if (!/^\d+(\.\d{1,2})?$/.test(values.price)) {
          errors.price = 'Invalid Price. Price must be a valid decimal number.';
        }      
        
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
              type="sku"
              name="sku"
              onChange={handleChange}
              onBlur={handleBlur}
              onKeyUp={(e) => {
                e.target.value = e.target.value.toUpperCase();
              }}
              value={values.sku}
              maxLength={15}
            />
          </div>
          <div className={errors.sku && touched.sku ? 'div-error' : ''}>
            {errors.sku && touched.sku && errors.sku}
          </div>

          <div className='div_product_form'>
            <label htmlFor="name">Name *</label>
            <input
              type="name"
              name="name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              maxLength={30}
            />
          </div>
          <div className={errors.name && touched.name ? 'div-error' : ''}>
            {errors.name && touched.name && errors.name}
          </div>

          <div className='div_product_form'>
            <label htmlFor="price">Price($) *</label>
            <input
              type="text"
              name="price"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.price}
              maxLength={15}
              pattern="^\d+(\.\d{1,2})?$"
            />
          </div>
          <div className={errors.price && touched.price ? 'div-error' : ''}>
            {errors.price && touched.price && errors.price}
          </div>

        </form>
      )}
    </Formik>
  </div>
);

export default ProductForm;