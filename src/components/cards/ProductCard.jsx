import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../../styles/card.sass';

function ProductCard(props) {
  const [isSelected, setIsSelected] = useState(false);

  const handleCheckboxChange = () => {
    setIsSelected(!isSelected);
    if (!isSelected) {
      props.onProductSelect(props.sku);
    } else {
      props.onProductDeselect(props.sku);
    }
  };

  let cardClass = 'product-card';
  if (isSelected) {
    cardClass += ' product-card-selected';
  }

  const type = props.type?.toLowerCase() ?? '';
  cardClass += ` product-card-${type}`;

  const attribute = props.attribute ?? [];
  const attributeDescription = attribute[0]?.description ?? '';
  const attributeValue = attribute[0]?.value ?? '';
  const attributeUnit = attribute[0]?.measurement_unit ?? '';

  return (
    <div className={cardClass}>
      <div className='product-card-div-check'>
        <input
          type='checkbox'
          className='delete-checkbox'
          id={props.sku}
          checked={isSelected}
          onChange={handleCheckboxChange}
        />
      </div>
      <div className='card-body'>
        <div className='product-card-div-sku'>
          <p className='product-tag-sku'>{props.sku}</p>
        </div>
        <div className='product-card-div-name'>
          <p className='product-name'>{props.name}</p>
        </div>
        <div className='product-card-div-price'>
          <p className='product-price'>$ {props.price}</p>
        </div>
        <div className='product-card-div-attributes'>
          {attributeDescription && (
            <p className='product-attribute'>
              {attributeDescription}: {attributeValue} {attributeUnit}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  sku: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  type: PropTypes.string,
  attribute: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      measurement_unit: PropTypes.string,
    }),
  ),
  onProductSelect: PropTypes.func.isRequired,
  onProductDeselect: PropTypes.func.isRequired,
};

ProductCard.defaultProps = {
  type: '',
  attribute: [],
};

export default ProductCard;
