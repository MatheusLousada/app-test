import React from 'react';

function FormikLabelInput({ id, name, label, value, onChange, onBlur, type, required, errors, touched}) {
  return (
    <div className='div_product_form'>
      <label htmlFor={id}>{label}{required ? ' *' : ''}</label>
      <input
            type={type}
            id={id}
            name={name}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
      />
      {errors && touched.email && errors.email}
    </div>
  );
}

export default FormikLabelInput;