import { Link } from 'react-router-dom';
import { IoMdListBox } from "react-icons/io";
import { Links } from './Links';

function NavbarBuilder({ pathname }) {

  const { ADD_PRODUCT_LINKS, LIST_LINKS } = Links();
  const links = pathname === '/' ? LIST_LINKS : ADD_PRODUCT_LINKS;

  return (
    <div className='navbar'>
      <div className='div-icon-title'>
        <div>
          <IoMdListBox />
        </div>
        <div>
          <h1>{pathname === '/' ? 'Product List' : 'Product Add'}</h1>
        </div>
      </div>
      <div className='div-buttons'>
        {links.map(link => (
          <div key={link.id}>
            {link.to ? (
              <Link to={link.to}>
                <button id={link.id} role='button' onClick={link.onClick} disabled={link.disabled}>
                  {link.label}
                </button>
              </Link>
            ) : (
              <button id={link.id} role='button' onClick={link.onClick} disabled={link.disabled}>
                {link.label}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default NavbarBuilder;
