import { Link } from 'react-router-dom';
import Nav from './Nav';

const Header = () => {
  return (
    <header className="header">
      <Link to="/" className="header__logo-container">
        <h2 className="header__logo">Reportr</h2>
      </Link>
      <Nav />
    </header>
  );
};

export default Header;
