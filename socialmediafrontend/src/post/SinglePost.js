import React from 'react'
import { Component } from 'react'
import { remove, singlePost } from './apiPost'
import DefaultProfile from "../images/images.png"
import { Link, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../Auth/index'

class SinglePost extends Component {
    state = {
        post: "",
        redirecttoHome: false
    }

    componentDidMount = () => {
        const postId = this.props.match.params.postId;
        singlePost(postId).then(data => {
            if (data.error){
                console.log(data.error);
            }else{
                this.setState({post: data});
            }
        })
    };

    clcikDelete = () => {
        const postId = this.props.match.params.postId;
        const token = isAuthenticated().token;
        let answer = window.confirm("Are you sure you want to delete your account?");
        if (answer){
            remove(postId, token).then(data => {
                if (data.error){
                    console.log(data.error);
                }else{
                    this.setState({redirecttoHome: true})
                }
            })
        }
    }

    renderPost = post => {
        const posterId = post.postedBy ? post.postedBy._id : ""
        const posterName = post.postedBy ? post.postedBy.name : ""
        return (
                <div className="card-body">
                        <img src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`} onError={i => (i.target.src = `${DefaultProfile}`)} alt={post.name} style={{height: "300px", width: "100%", objectFit: "cover"}} className="img-thumbnail" />
                        <br/><br/>
                    <h5 className="card-title">TITLE OF THE POST : </h5>
                    <p className="card-text">{post.title}</p><br/>
                    <h5 className="card-title">CONTENT OF THE POST : </h5>
                    <p className="card-text">
                        {post.body}
                    </p>
                    <br/>
                    <p className="font-italic mark">
                        Posted By: <Link to={`/user/${posterId}`}>{posterName}</Link><br/>
                        Created on : {new Date(post.created).toDateString()}
                    </p>
                    <Link to={`/`} className="btn btn-primary btn-raised btn-sm mr-5">
                            Back to Home Page
                    </Link>
                    {isAuthenticated().user && isAuthenticated().user._id === post.postedBy._id &&
                    <>
                        <button className="btn btn-raised btn-warning mr-5">
                            Update Post
                        </button>
                        <button onClick={this.clcikDelete} className="btn btn-raised btn-danger mr-5">
                            Delete Post
                        </button>
                       
                    </>
                    }
                </div>
        );
    }

    render(){
        const {post} = this.state;

        if (this.state.redirecttoHome){
            return <Redirect to={`/`} />;
        }

        return (
            <div className="container">
                <br/>
                {!post ? 
                    <div className="jumbotron text-center">
                        <h2>Loading...</h2>

                    </div> 
                    :
                    <>
                        <h2 className="display-2 mt-5 mb-5"><strong><ul>{post.title}:-</ul></strong></h2>
                        {this.renderPost(post)}
                    </> 
                    }
            </div>
        )
    }
}

export default SinglePost
