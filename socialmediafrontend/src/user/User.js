import React, { Component } from 'react'
import { list } from "./apiUser";

class Users extends Component {
    
    constructor() {
        super()
        this.state = {
            users: []
        }
    }

    componentDidMount = () => {
        list().then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                this.setState({users: data.users})
            }
        })
    }

    render() {
        const {users} = this.state;
        return (
            <div  className="container">
                <h2 className="mt-5 mb-5">Users</h2>

                <div className="card">
                    {users.map((user, i) => 
                        (
                            <div key={i}>
                                {user.name}
                                </div>
                        )
                    )}
                </div>
            </div>
        );
    }
}

export default Users;