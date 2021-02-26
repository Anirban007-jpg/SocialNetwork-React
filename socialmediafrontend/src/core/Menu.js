import React from 'react'
import { Link, withRouter } from 'react-router-dom'

const isActive = (history, path) => {
    if (history.location.pathname === path){
        return {color: "#ff9900"}
    }
    else {
        return {color: "#ffffff"}
    }
}

export const signout = (next) => {
    if (typeof window!== "undefined"){
        localStorage.removeItem('jwt');
        next();
        return fetch("http://localhost:5000/signout", {
            method: "GET"
        }).then(response => {
            console.log('signout', response);
            return response.json();
        }).catch(err => {
            console.log("error", err);
        })
    }
}

const Menu = ({history}) => (
    <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-primary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <strong>
                        AniSus
                    </strong>
                </Link>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" style={isActive(history, "/")} aria-current="page" to="/">
                                    <strong>
                                        Home
                                    </strong>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" style={isActive(history, "/signin")} to="/signin">
                                    <strong>
                                        Sign In
                                    </strong>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" style={isActive(history, "/signup")} to="/signup">
                                    <strong>
                                        Sign Up
                                    </strong>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" style={isActive(history, "/signout") , {cursor: "pointer", color:"#fff"}} onClick={() => signout(() => history.push('/'))} href=""> 
                                    Sign Out
                                </a>
                            </li>
                            {/* for debug purpose */}
                            {/* {JSON.stringify(props.history)}
                        //    We got this as output
                           {"length":10,"action":"PUSH","location":{"pathname":"/signup","search":"","hash":"","key":"xsn24c"}} */}
                        </ul>
                    </div>
            </div>
        </nav>
    </div>
  
);

export default withRouter(Menu);