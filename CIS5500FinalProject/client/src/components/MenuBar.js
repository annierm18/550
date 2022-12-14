import React from "react";
import { Link } from "react-router-dom";
import "./MenuBar.css";

function NavBar() {

    return (
        <nav className="navbar-container">
            <header className="navbar-header">
                <div className="logo">
                    <Link to="/"><i className="fa fa-globe fa-2x"></i></Link>
                    <h2>Movie PAAS</h2>
                </div>

                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/country">Country</Link></li>
                    <li><Link to="/rec">Recommendations</Link></li>
                </ul>
            </header>
        </nav>
    );
}

export default NavBar;