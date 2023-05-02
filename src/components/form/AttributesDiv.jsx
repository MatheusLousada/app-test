export default function AttributesDiv(props) {

    const { attributes, onAttributeChange, className } = props;
  
    return (
      <div className={className} id="attributes">
        {attributes.map((attribute) => (
          <div key={attribute.id}>
            <label htmlFor={attribute.id}>{attribute.description} *</label>
            <input
              type="text"
              id={attribute.id}
              value={attribute.value}
              onChange={(event) => onAttributeChange(attribute.id, event.target.value)}
              required={true}
            />
          </div>
        ))}
      </div>
    );
  }
  