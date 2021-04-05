import React, { Component } from 'react'
import { Redirect } from 'react-router';
import { isAuthenticated } from '../Auth/index'
import { read, update } from './apiUser';

class EditProfile extends Component {

    constructor() {
        super()
        this.state = {
            id: "",
            name: "",
            email: "",
            password: "",
            redirectToProfile: false,
            error : "",
            open: false
        }
    }

    init = (userId) => {
        const token = isAuthenticated().token;
        read(userId,token).then(data => {
            if (data.error) {
                this.setState({redirectToProfile: true});
            }
            else {
                this.setState({ id: data._id , name: data.name, email: data.email});
            }
        })
    }

    componentDidMount() {
        const userId = this.props.match.params.userId;
        this.init(userId);
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    }

    isValid = () => {
        const {name} = this.state
        if (name.length === 0){
            this.setState({error: "Name is required"})
            return false;
        }
        return true;
    }

    clickSubmit = event => {
        event.preventDefault();
        if (this.isValid()){
            const {name, email, password} = this.state;
            const user = {
                name,
                email,
                password: password || undefined
            };
            const userId = this.props.match.params.userId;
            const token = isAuthenticated().token;
            // using for debug purpose
            // console.log(user);
            // now doing post request
            update(userId, token, user).then(data => {
                if(data.error){
                    this.setState({error: data.error})
                }else{
                    this.setState({
                        redirectToProfile: true
                    });
                }
            });
        }
      
    }


    UpdateForm = (name, email, password) => (
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
                    Update
                </button>&nbsp;
        </form>
    )

    render() {
        const {id , name, email, password, redirectToProfile,error} = this.state;

        if (redirectToProfile){
            return <Redirect to={`/user/${id}`} />
        }

        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Edit Profile</h2> 

                <div className="alert alert-danger" style={{display: error ? "" : "none"}}>
                    {error}
                </div>

                {this.UpdateForm(name, email, password)} 
            </div>
        )
    }
}

export default EditProfile
