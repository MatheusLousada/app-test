import React from 'react';

function FormLabelInput({ label, type, id, value, onChange }) {
  return (
    <div className='div_product_form'>
      <label htmlFor={id}>{label}:</label>
      <input type={type} id={id} onChange={onChange} value={value} />
    </div>
  );
}

export default FormLabelInput;

