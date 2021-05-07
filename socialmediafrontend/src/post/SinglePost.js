import React from 'react'
import { Component } from 'react'
import { singlePost } from './apiPost'
import DefaultProfile from "../images/images.png"
import { Link } from 'react-router-dom';

class SinglePost extends Component {
    state = {
        post: ""
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

    renderPost = post => {
        const posterId = post.postedBy ? post.postedBy._id : ""
        const posterName = post.postedBy ? post.postedBy.name : ""
        return (
                <div className="card-body">
                        <img src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`} onError={i => (i.target.src = `${DefaultProfile}`)} alt={post.name} style={{height: "300px", width: "100%", objectFit: "cover"}} className="img-thumbnail" />
                        <br/><br/>
                    <h5 className="card-title">TITLE OF THE POST : </h5>
                    <h5 className="card-title">{post.title}</h5><br/>
                    <h5 className="card-title">CONTENT OF THE POST : </h5>
                    <p className="card-text">
                        {post.body}
                    </p>
                    <br/>
                    <p className="font-italic mark">
                        Posted By: <Link to={`/user/${posterId}`}>{posterName}</Link><br/>
                        Created on : {new Date(post.created).toDateString()}
                    </p>
                    <Link to={`/`} className="btn btn-primary btn-raised btn-sm">
                        Back to Home Page
                    </Link>
                </div>
        );
    }

    render(){
        const {post} = this.state;
        return (
            <div className="container">
                <br/>
                <h2 className="display-2 mt-5 mb-5"><strong><ul>{post.title}:-</ul></strong></h2>
                {this.renderPost(post)}
            </div>
        )
    }
}

export default SinglePost
