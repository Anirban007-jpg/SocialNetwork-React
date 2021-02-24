import React, { Component } from 'react'

class signup extends Component {

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
        this.signup(user).then(data => {
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

    signup = user => {
        return fetch("http://localhost:5000/signup", {
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

    render() {
        const {name, email, password, error, open} = this.state;
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Signup</h2>

                <div className="alert alert-primary" style={{display: error ? "" : "none"}}>
                    {error}
                </div>

                <div className="alert alert-info" style={{display: open ? "" : "none"}}>
                    New Account is successfully created. Please Sign In
                </div>

                    
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
            </div>
        );
    }
}

export default signup;