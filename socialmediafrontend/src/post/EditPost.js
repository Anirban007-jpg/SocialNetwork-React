import React, { Component } from 'react'
import { singlePost, update } from './apiPost';
import { Link, Redirect } from "react-router-dom";
import { isAuthenticated } from '../Auth/index'

class EditPost extends Component {
    constructor() {
        super()
        this.state = {
            id: "",
            title: "",
            body: "",
            photo: "",
            error: "",
            user: {},
            filesize: 1,
            loading: false,
            redirectToProfile: false
        }
    }


    init = (postId) => {
        // const token = isAuthenticated().token;
        singlePost(postId).then(data => {
            if (data.error) {
                this.setState({redirectToProfile: true});
            }
            else {
                this.setState({ id: data._id , title: data.title, body: data.body});
            }
        })
    }

    componentDidMount() {
        this.postData = new FormData();
        const postId = this.props.match.params.postId;
        this.init(postId);
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
            const postId = this.state.id;
            const token = isAuthenticated().token;

            update(postId, token, this.postData).then(data => {
                if(data.error){
                    this.setState({error: data.error})
                }else{
                   this.setState({redirectToProfile: true});
                }
            });
        }
      
    }

    EditForm = (title,body,photo) => (
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
                    <label className="text-muted"><b>Content</b></label>
                    <textarea onChange={this.handleChange("body")} rows="15" type="text" className="form-control" placeholder="Enter Body of the post" value={body} />
                </div>
             
                <button onClick={this.clickSubmit} className="btn btn-raised btn-success">
                    Update Post
                </button>&nbsp;
                 <div>
                        <Link className="btn btn-raised btn-info mr-5" to={`/`}>
                            GO BACK
                        </Link>
                </div>
        </form>
    )

    render() { 
        const {title, body, photo, redirectToProfile} = this.state;
        
        if (redirectToProfile) {
            return <Redirect to={`/user/${isAuthenticated().user._id}`} />;
        }

        return ( 
            <div>
                <h2>Edit Post : {title}</h2>
                {this.EditForm(title, body, photo)}
            </div>
         );
    }
}
 
export default EditPost;