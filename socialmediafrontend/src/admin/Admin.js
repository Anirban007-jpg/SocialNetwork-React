import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { isAuthenticated } from "../Auth";
import Posts from "../post/Posts";
import Users from "../user/User";

class Admin extends Component {

    state = {
        redirectToHome: false
    };
     
    // then on componentDidMount()
    componentDidMount() {
        if (isAuthenticated().user.role !== "admin") {
            this.setState({ redirectToHome: true });
        }
    }

    render() {
        if (this.state.redirectToHome) {
            return <Redirect to="/" />;
        }
        return (
            <div>
                <div className="jumbotron">
                    <h2>Admin Dashboard</h2>
                    <p className="lead">Welcome to React Frontend</p>
                </div>
                <div className="container-fluid">
                    <div className="row">
                    <hr/>
                        <div className="col-md-6">
                            <h2>Posts</h2>
                            <hr />
                            <Posts />
                        </div>
                        <div className="col-md-6">
                        <h2>Users</h2>
                        <hr />
                        <Users />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default Admin;
