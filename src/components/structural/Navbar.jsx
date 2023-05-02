import { useLocation } from 'react-router-dom';
import NavbarBuilder from '../../utils/builders/NavbarBuilder';

function Navbar({navigate}) {

    const location = useLocation();
    const navbar = <NavbarBuilder pathname={location.pathname}/>
    
    return navbar
}

export default Navbar;