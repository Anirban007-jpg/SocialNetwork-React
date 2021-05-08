import React, { Component } from 'react'
import { Redirect } from 'react-router';
import { isAuthenticated, updateUser } from '../Auth/index'
import { read, update } from './apiUser';
import DefaultProfile from "../images/images.png"

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
            open: false,
            loading: false,
            about: "",
            filesize: 0,
        }
    }

    init = (userId) => {
        const token = isAuthenticated().token;
        read(userId,token).then(data => {
            if (data.error) {
                this.setState({redirectToProfile: true});
            }
            else {
                this.setState({ id: data._id , name: data.name, email: data.email, about: data.about});
            }
        })
    }

    componentDidMount() {
        this.userData = new FormData();
        const userId = this.props.match.params.userId;
        this.init(userId);
    }

    handleChange = name => event => {
        this.setState({error: ""});
        const value = name === "photo" ? event.target.files[0]: event.target.value
        const filesize = name === "photo" ? event.target.files[0] : 1;
        this.userData.set(name, value);
        this.setState({ [name]: value, filesize });
    }

    isValid = () => {
        const {name, filesize} = this.state
        if (name.length === 0){
            this.setState({error: "Name is required"})
            return false;
        }
        if (filesize > 100000){
            this.setState({error: "file size should be less than 100kb"})
            return false;
        }
        return true;
    }

    clickSubmit = event => {
        this.setState({loading: true});
        event.preventDefault();
        if (this.isValid()){
            const userId = this.props.match.params.userId;
            const token = isAuthenticated().token;

            update(userId, token, this.userData).then(data => {
                if(data.error){
                    this.setState({error: data.error})
                }else if (isAuthenticated().user.role === "admin") {
                    this.setState({
                        redirectToProfile: true
                    })
                }else{
                    updateUser(data, () => {
                        this.setState({
                            redirectToProfile: true
                        });
                    })
                }
            });
        }
      
    }


    UpdateForm = (name, email, password,about) => (
        <form>
                <div className="form-group">
                    <label className="text-muted"><b>Profile Photo</b></label>
                    <input onChange={this.handleChange("photo")} type="file" accept="image/*" className="form-control" placeholder="Select Profile photo" />
                </div>
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
                <div className="form-group">
                    <label className="text-muted"><b>Email</b></label>
                    <textarea rows="5" onChange={this.handleChange("about")} type="text" className="form-control" placeholder="Enter your details..." value={about} />
                </div>
                <button onClick={this.clickSubmit} className="btn btn-raised btn-success">
                    Update
                </button>&nbsp;
        </form>
    )

    render() {
        const {id , name, email, password, redirectToProfile,error, loading,about} = this.state;

        if (redirectToProfile){
            return <Redirect to={`/user/${id}`} />
        }

        const photoUrl = id ? `${process.env.REACT_APP_API_URL}/user/photo/${id}` : DefaultProfile

        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Edit Profile</h2> 

                <div className="alert alert-danger" style={{display: error ? "" : "none"}}>
                    {error}
                </div>
                {loading ? (
                    <div className="jumbotron text-center">
                        <h2>Loading ...</h2>
                    </div>
                ): (
                    ""
                )}
                
                <img src={photoUrl} alt={name} style={{height: "200px", width: "auto"}} className="img-thumbnail" />

                {this.UpdateForm(name, email, password, about)} 
            </div>
        )
    }
}

export default EditProfile
