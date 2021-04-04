import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom';
import { isAuthenticated } from '../Auth/index'
import { read } from './apiUser';
import DefaultProfile from "../images/images.png"

class Profile extends Component {
    constructor() {
        super()
        this.state = {
            user: "",
            redirectToSignin: false
        }
    }

    init = (userId) => {
        const token = isAuthenticated().token;
        read(userId,token).then(data => {
            if (data.error) {
                this.setState({redirectToSignin: true});
            }
            else {
                this.setState({ user: data });
            }
        })
    }

    componentDidMount() {
        const userId = this.props.match.params.userId;
        this.init(userId);
    }

    render() {

        const {user} = this.state;
        const {redirectToSignin, _id, created} = this.state.user;
        if (redirectToSignin){
            return <Redirect to='/signin' />
        }

        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Profile</h2>
                <div className="row">
                    <div className="col-md-6">
                        <img className="card-img-top" src={DefaultProfile} alt={user.name} style={{width: '100%', height: '15vw', objectFit: 'cover'}} />
                    </div>
                
                    <div className="col-md-6">
                    <div className="lead mt-2">
                            <p>Hello {user.name}</p>
                            <p>Email: {user.email}</p>
                            <p>{`Joined ${new Date(created).toDateString()}`}</p>
                        </div>
                        {isAuthenticated().user && isAuthenticated().user._id === _id && (
                            <div className="d-inline-block mt-5">
                                <Link className="btn btn-raised btn-success mr-5" to={`/user/edit/${_id}`}>
                                    Edit Profile
                                </Link>
                                <Link className="btn btn-raised btn-danger mr-5" to={`/user/delete/${_id}`}>
                                    Delete Profile
                                </Link>
                            </div>
                        )}
                        
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;