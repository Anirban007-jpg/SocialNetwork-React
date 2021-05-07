import React, { Component } from 'react'
// import { Redirect } from 'react-router';
import { isAuthenticated } from '../Auth/index'
// import DefaultProfile from "../images/images.png"
import { create } from './apiPost';
import { Link } from "react-router-dom";

class NewPost extends Component {

    constructor() {
        super()
        this.state = {
            title: "",
            body: "",
            photo: "",
            error: "",
            user: {},
            filesize: 1,
            loading: false
        }
    }

  
    componentDidMount() {
        this.postData = new FormData();
        // const userId = this.props.match.params.userId;
        // this.init(userId);
        this.setState({user: isAuthenticated().user})
    }

    handleChange = name => event => {
        this.setState({error: ""});
        const value = name === "photo" ? event.target.files[0]: event.target.value
        const filesize = name === "photo" ? event.target.files[0] : 1;
        this.postData.set(name, value);
        this.setState({ [name]: value, filesize });
    }

    isValid = () => {
        const {title, filesize} = this.state
        if (title.length === 0){
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
            const userId = isAuthenticated().user._id;
            const token = isAuthenticated().token;

            create(userId, token, this.postData).then(data => {
                if(data.error){
                    this.setState({error: data.error})
                }else{
                   this.setState({
                        title: "",
                        body: "",
                        photo: "",
                        loading: false
                   });
                }
            });
        }
      
    }


    PostForm = (title,body,photo) => (
        <form>
                <div className="form-group">
                    <label className="text-muted"><b>Profile Photo</b></label>
                    <input onChange={this.handleChange("photo")} type="file" accept="image/*" className="form-control" placeholder="Select Profile photo" />
                </div>
                <div className="form-group">
                    <label className="text-muted"><b>Title</b></label>
                    <textarea onChange={this.handleChange("title")}  rows="2" type="text" className="form-control" placeholder="Enter title" value={title} />
                </div>
                <div className="form-group">
                    <label className="text-muted"><b>Name</b></label>
                    <textarea onChange={this.handleChange("body")} rows="15" type="text" className="form-control" placeholder="Enter Body of the post" value={body} />
                </div>
             
                <button onClick={this.clickSubmit} className="btn btn-raised btn-success">
                    Create Post
                </button>&nbsp;
                 <div>
                        <Link className="btn btn-raised btn-info mr-5" to={`/user/:userId`}>
                            GO BACK
                        </Link>
                </div>
        </form>
    )

    render() {
        const {title,body,photo,error,loading} = this.state;

        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Create a new Post</h2> 

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

                {this.PostForm(title, body,photo)} 
            </div>
        )
    }
}

export default NewPost
