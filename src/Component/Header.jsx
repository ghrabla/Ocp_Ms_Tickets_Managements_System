import React from 'react'
// import './src/Components/Header.css';
import logo from '../imagee-removebg-preview.png'

export default function Header() {
	
    return (
		
        <nav class="navbar bg-body-tertiary">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">
                <img src={logo} width="80" height="80"/>
                GESTION DES TICKETS
                </a>
                <form class="d-flex" role="search">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                    <button class="btn btn-outline-success" type="submit">Search</button>
                </form>
            </div>
        </nav>		
    )
}
