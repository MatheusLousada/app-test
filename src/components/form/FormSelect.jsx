import React from 'react';

function FormSelect({ id, label, options, value, onChange }) {
  return (
    <div className='div_product_form'>
      <label htmlFor={id}>{label} *</label>
      <select id={id} onChange={onChange} value={value}>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.description}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FormSelect;
