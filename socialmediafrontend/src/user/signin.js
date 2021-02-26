import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import { signin, authenticate } from '../Auth/index'

class Signin extends Component {

    constructor() {
        super()
        this.state = {
            email: "",
            password: "",
            error: "", 
            redirect: false,
            loading: false
        }
    }

    handleChange = name => event => {
        this.setState({error: ""});
        this.setState({ [name]: event.target.value });
    }


    clickSubmit = event => {
        event.preventDefault();
        this.setState({loading:true});
        const {email, password} = this.state;
        const user = {
            email,
            password
        };
        // using for debug purpose
        //console.log(user);
        // now doing post request
        signin(user).then(data => {
            if(data.error){
                this.setState({error: data.error, loading: false})
            }
            else
            {
                // authenticate
                authenticate(data, () => {
                    this.setState({redirect: true});
                });
                //console.log(process.env.REACT_APP_API_URL);
                // redirect   
            }
        });
    }

   

    signinForm = (email, password) => (
        <form>
                <div className="form-group">
                    <label className="text-muted"><b>Email</b></label>
                    <input onChange={this.handleChange("email")} type="email" className="form-control" placeholder="Enter the Registered Email...." value={email} />
                </div>
                <div className="form-group">
                    <label className="text-muted"><b>Password</b></label>
                    <input onChange={this.handleChange("password")} type="password" className="form-control" placeholder="Enter your password.." value={password} />
                </div>
                <button onClick={this.clickSubmit} className="btn btn-raised btn-success">
                    Submit
                </button>&nbsp;
        </form>
    )

    render() {
        const {email, password, error, redirect, loading} = this.state;
        if (redirect) {
            return <Redirect to="/" />
        }
        return (
            
            <div className="container">
                <h2 className="mt-10 mb-5">Log In to start your Session</h2>
                {/* {JSON.parse(localStorage.getItem('jwt'))} */}
                

                <div className="alert alert-danger" style={{display: error ? "" : "none"}}>
                    {error}
                </div>

                {loading ? 
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div> 
                    : 
                    ""}

                    
                   {this.signinForm(email, password)}
            </div>
        );
    }
}

export default Signin;