import React from "react";
import { Link } from "react-router-dom";
import "./MenuBar.css";

function NavBar() {

    return (
        <nav className="navbar-container">
            <header className="navbar-header">
                {/* <input type="checkbox" className="" id="chk1"/> */}
                <div className="logo">
                    <Link to="/"><i className="fa fa-globe fa-2x"></i></Link>
                    <h2>Movie PAAS</h2>
                </div>
                {/* <div className="search-box">
                    <form action="">
                        <input type="text" className="search" id="srch" placeholder="Search..."/>
                        <button type="submit"><i className="fa fa-search"></i></button>
                    </form>
                </div> */}
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/country">Country</Link></li>
                    <li><Link to="/rec">Recommendations</Link></li>
                </ul>
                {/* <div className="menu">
                    <label for='chk1'>
                        <i className="fa fa-bars"></i>
                    </label>
                </div> */}
            </header>
        </nav>
    );
}

export default NavBar;