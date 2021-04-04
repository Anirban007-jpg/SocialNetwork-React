import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { signup } from '../Auth/index'

class Signup extends Component {

    constructor() {
        super()
        this.state = {
            name: "",
            email: "",
            password: "",
            error: "", 
            open: false
        }
    }

    handleChange = name => event => {
        this.setState({error: ""});
        this.setState({ [name]: event.target.value });
    }

    clickSubmit = event => {
        event.preventDefault();
        const {name, email, password} = this.state;
        const user = {
            name,
            email,
            password
        };
        // using for debug purpose
        //console.log(user);
        // now doing post request
        signup(user).then(data => {
            if(data.error){
                this.setState({error: data.error})
            }else{
                this.setState({
                    name: "",
                    email: "",
                    password: "",
                    error: "",
                    open: true
                });
            }
        });
    }


    signupForm = (name, email, password) => (
        <form>
                <div className="form-group">
                    <label className="text-muted"><b>Name</b></label>
                    <input onChange={this.handleChange("name")} type="text" className="form-control" placeholder="Enter your username.." value={name} />
                </div>
                <div className="form-group">
                    <label className="text-muted"><b>Email</b></label>
                    <input onChange={this.handleChange("email")} type="email" className="form-control" placeholder="Enter the Email to be registered...." value={email} />
                </div>
                <div className="form-group">
                    <label className="text-muted"><b>Password</b></label>
                    <input onChange={this.handleChange("password")} type="password" className="form-control" placeholder="Enter the password to be set..." value={password} />
                </div>
                <button onClick={this.clickSubmit} className="btn btn-raised btn-success">
                    Submit
                </button>&nbsp;
        </form>
    )

    render() {
        const {name, email, password, error, open} = this.state;
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Signup</h2>

                <div className="alert alert-danger" style={{display: error ? "" : "none"}}>
                    {error}
                </div>

                <div className="alert alert-info" style={{display: open ? "" : "none"}}>
                    New Account is successfully created. Please <Link to="/signin">Sign In</Link>
                </div>

                    
                   {this.signupForm(name, email, password)}
            </div>
        );
    }
}

export default Signup;