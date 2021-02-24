import React, { Component } from 'react'

class signup extends Component {

    constructor() {
        super()
        this.state = {
            name: "",
            email: "",
            password: "",
            error: ""
        }
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    }

    render() {
        const {name, email, password} = this.state;
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Signup</h2>
                    
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
                        <button className="btn btn-raised btn-success">
                            Submit
                        </button>&nbsp;
                        <input type="reset" className="btn btn-raised btn-danger" value="reset" />
                    </form>
            </div>
        );
    }
}

export default signup;