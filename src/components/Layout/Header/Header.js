import React from "react";
import Button from "../../common/Button";
import AuthContext from "../../auth/context";
import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import HeaderStyles from "./Header.module.css";

function Header() {
  const { isLogged, handleLogout } = useContext(AuthContext);
  return (
    <header className={HeaderStyles.header}>
      <div className="wrapper">
        <div className={HeaderStyles.headerContent}>
          <div>
            <Link to="/" className={HeaderStyles.logo}>
              Nodepop
            </Link>
          </div>
          <nav>
            <Button width="200px" as={Link} to="/adverts/new" >
              Crear anuncio
            </Button>
            {isLogged ? (
              <Button width="175px" onClick={handleLogout} variant="variant">
                Cerrar Sesión
              </Button>
            ) : (
              <Button width="175px" as={Link} to="/login">
                Iniciar Sesión
              </Button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
