import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'

export default class Navbar extends Component {

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <NavLink className="navbar-brand" to="/">Home</NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav" style={{textAlign: 'center'}}>
                        <li className="nav-item ">
                            <NavLink exact activeClassName = 'btn btn-primary text-white' className="nav-link" to="/">Exercises</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink exact activeClassName = 'btn btn-primary text-white' className="nav-link" to="/create">Create Exercise log</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink exact activeClassName = 'btn btn-primary text-white' className="nav-link" to="/user">Create Uses</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}
