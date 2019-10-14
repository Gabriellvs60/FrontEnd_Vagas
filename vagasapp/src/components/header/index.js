import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import "./styles.css";

export default class Header extends Component {
    render() {
        return (
            
        <header id="main-header">
            {      
            <img src="navelogo.png" className="logo"></img>
            }
        </header>)
    }
}

