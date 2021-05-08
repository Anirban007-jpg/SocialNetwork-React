import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { signout, isAuthenticated } from '../Auth/index'

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
                            {!isAuthenticated() && (
                                <>
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
                                </>
                            )}
                            {isAuthenticated() && isAuthenticated().user.role === "subscriber" && (
                                <>
                                    <li className="nav-item">
                                        <Link to={`/findpeople`} style={isActive(history, `/findpeople`)} className="nav-link">
                                            <strong>
                                                Find People
                                            </strong>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <span className="nav-link" style={{cursor: "pointer", color:"#fff"}} onClick={() => signout(() => history.push('/'))} href=""> 
                                            <strong>   
                                                Sign Out
                                            </strong>
                                        </span>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" style={isActive(history, "/users")} aria-current="page" to="/users">
                                            <strong>
                                                Users
                                            </strong>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                    {/* // eslint-disable-next-line */}
                                            <Link className="nav-link" to={`/user/${isAuthenticated().user._id}`} style={isActive(history, `/user/${isAuthenticated().user._id}`)}>
                                                <strong>
                                                    {`${isAuthenticated().user.name}'s profile`}
                                                </strong>
                                            </Link>
                                    </li>
                                </>
                            )}
                            {isAuthenticated() && isAuthenticated().user.role === "admin" && (
                                <>
                                    <li className="nav-item">
                                        <Link
                                            to={`/admin`}
                                            style={isActive(history, `/admin`)}
                                            className="nav-link"
                                        >
                                            <strong>Admin</strong>
                                        </Link>
                                    </li>
                                        <li className="nav-item">
                                        <span className="nav-link" style={{cursor: "pointer", color:"#fff"}} onClick={() => signout(() => history.push('/'))} href=""> 
                                            <strong>   
                                                Sign Out
                                            </strong>
                                        </span>
                                    </li>
                                </>
                            )}
                            {/* for debug porpose */}
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