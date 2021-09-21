import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export const NavbarApp = () => {
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark ">

            <Link
                className="navbar-brand p-2"
                to="/"
            >
                PhotoApp
            </Link>

            <div className="navbar-collapse">
                <div className="navbar-nav">

                    <NavLink
                        activeClassName="active"
                        className="nav-item nav-link"
                        exact
                        to="/list" >
                        Listado
                    </NavLink>

                    <NavLink
                        activeClassName="active"
                        className="nav-item nav-link"
                        exact
                        to="/new" >
                        Nueva Fotografia
                    </NavLink>
                </div>
            </div>
        </nav>
    )
}
