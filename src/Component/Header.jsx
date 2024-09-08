import React from "react";
import logo from '../imagee-removebg-preview.png'
import { Link } from "react-router-dom";


export default function Header() {
	
    return (
		<nav class="navbar navbar-expand-lg  navbar-light">
            <a class="navbar-brand" href="#">
                <img src={logo} width="80" height="80"/>
                GESTION DES TICKETS
                </a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavDropdown">
    <ul class="navbar-nav">
    <li className="nav-item active">
            <Link className="nav-link" to="/">
              Tickets <span className="sr-only">(current)</span>
            </Link>
          </li>
    </ul>
  </div>
</nav>	
    )
}
