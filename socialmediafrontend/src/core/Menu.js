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

const Menu = ({history}) => (
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-primary">
            <div class="container-fluid">
                <Link class="navbar-brand" to="/">
                    <strong>
                        AniSus
                    </strong>
                </Link>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <Link class="nav-link" style={isActive(history, "/")} aria-current="page" to="/">
                                    <strong>
                                        Home
                                    </strong>
                                </Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" style={isActive(history, "/signin")} to="/signin">
                                    <strong>
                                        Sign In
                                    </strong>
                                </Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" style={isActive(history, "/signup")} to="/signup">
                                    <strong>
                                        Sign Up
                                    </strong>
                                </Link>
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