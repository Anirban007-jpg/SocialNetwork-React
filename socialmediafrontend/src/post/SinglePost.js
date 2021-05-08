import React from 'react'
import { Component } from 'react'
import { remove, singlePost, like, unlike } from './apiPost'
import DefaultProfile from "../images/images.png"
import { Link, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../Auth/index'
import Comment from './Comment';

class SinglePost extends Component {
    state = {
        post: "",
        redirecttoHome: false,
        like: false,
        likes: 0,
        redirecttoSignin : false,
        comments: []
    }

    componentDidMount = () => {
        const postId = this.props.match.params.postId;
        singlePost(postId).then(data => {
            if (data.error){
                console.log(data.error);
            }else{
                this.setState({
                    post: data,
                    likes: data.likes.length,
                    like: this.checkLike(data.likes),
                    comments: data.comments
                });
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

    checkLike = (likes) => {
        const userId = isAuthenticated() && isAuthenticated().user._id;
        let match = likes.indexOf(userId) !== -1;
        return match;
    }

    liketoggle = () => {
        if (!isAuthenticated()){
            this.setState({RedirecttoSignin: true});
            return false;
        }
        let callApi = this.state.like ? unlike : like;
        const userId = isAuthenticated().user._id;
        const postId = this.props.match.params.postId;
        const token = isAuthenticated().token;
        callApi(userId, token, postId).then(data => {
            if (data.error){
                console.log(data.error);
            }else{
                this.setState({
                    like: !this.state.like,
                    likes: data.likes.length,
                })
            }
        })
    }

    updateComments = comments => {
        this.setState({comments});
    }

    renderPost = post => {
        const posterId = post.postedBy ? post.postedBy._id : ""
        const posterName = post.postedBy ? post.postedBy.name : ""
        const {like, likes} = this.state;

        return (
                <div className="card-body">
                        <img src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`} onError={i => (i.target.src = `${DefaultProfile}`)} alt={post.name} style={{height: "300px", width: "100%", objectFit: "cover"}} className="img-thumbnail" />
                        <br/><br/>
                        {like ? (
                            <h3 onClick={this.liketoggle}><i className="fa fa-thumbs-down text-warning bg-dark" style={{padding: '10px', borderRadius: '50%'}} />{" "}{likes} Like</h3>
                        ): (
                            <h3 onClick={this.liketoggle}><i className="fa fa-thumbs-up text-success bg-dark" style={{padding: '10px', borderRadius: '50%'}} />{" "}{likes} Like</h3>
                        )}
                        
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
                    {isAuthenticated().user && isAuthenticated().user.role === "admin" &&
                    <>
                        <div class="card mt-5">
                <div className="card-body">
                    <h5 className="card-title">Admin</h5>
                    <p className="mb-2 text-danger">
                        Edit/Delete as an Admin
                    </p>
                    <Link
                        to={`/post/edit/${post._id}`}
                        className="btn btn-raised btn-warning btn-sm mr-5"
                    >
                        Update Post
                    </Link>
                    <button
                        onClick={this.deleteConfirmed}
                        className="btn btn-raised btn-danger"
                    >
                        Delete Post
                    </button>
                </div>
            </div>
                       
                    </>
                    }
                </div>
        );
    }

    render(){
        const {post, redirecttoHome, redirecttoSignin, comments} = this.state;

        if (redirecttoHome){
            return <Redirect to={`/`} />;
        }

        if (redirecttoSignin){
            return <Redirect to={`/signin`} />;
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
                        <hr style={{width:'100%'}}/>
                        <Comment postId={post._id} comments={comments.reverse()} updateComments={this.updateComments} />
                    </> 
                    }
            </div>
        )
    }
}

export default SinglePost
