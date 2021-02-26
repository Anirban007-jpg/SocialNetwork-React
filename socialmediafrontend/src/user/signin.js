import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';

class signin extends Component {

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

    authenticate (jwt, next) {
        if (typeof window !== "undefined"){
            localStorage.setItem("jwt", JSON.stringify(jwt));
            next();
        }
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
        this.signin(user).then(data => {
            if(data.error){
                this.setState({error: data.error, loading: false})
            }
            else
            {
                // authenticate
                this.authenticate(data, () => {
                    this.setState({redirect: true});
                });
                // redirect   
            }
        });
    }

    signin = user => {
        return fetch("http://localhost:5000/signin", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        }).then(response => {
            return response.json()
        }).catch(err => console.log(err))
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

export default signin;