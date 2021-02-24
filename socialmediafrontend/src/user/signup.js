import React, { Component } from 'react'

class signup extends Component {

    constructor() {
        super()
        this.setState = {
            name: "",
            email: "",
            password: "",
            error: ""
        }
    }

    render() {
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Signup</h2>
                    
                    <form>
                        <div className="form-group">
                            <label className="text-muted">Name</label>
                            <input type="text" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label className="text-muted">Email</label>
                            <input type="email" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label className="text-muted">Password</label>
                            <input type="password" className="form-control" />
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