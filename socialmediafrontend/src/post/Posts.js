import React, { Component } from 'react'
import { list } from "./apiPost";
import DefaultProfile from "../images/images.png"
import { Link } from 'react-router-dom';


class Posts extends Component {
    
    constructor() {
        super()
        this.state = {
            posts: []
        }
    }

    componentDidMount = () => {
        list().then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                this.setState({posts: data.posts})
            }
        })
    }

    renderPosts = posts => {
        return (
            <div className="row">
                    {posts.map((post, i) => 
                        {
                            const posterId = post.postedBy ? post.postedBy._id : ""
                            const posterName = post.postedBy ? post.postedBy.name : ""
                            
                            return (
                                <div className="card col-md-4" key={i}>
                                        <img src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`} onError={i => (i.target.src = `${DefaultProfile}`)} alt={post.name} style={{height: "200px", width: "auto"}} className="img-thumbnail" />
                                    <div className="card-body">
                                        <h5 className="card-title">{post.title}</h5>
                                        <p className="card-text">
                                            {post.body.substring(0,5)}....
                                        </p>
                                        <br/>
                                        <p className="font-italic mark">
                                            Posted By: <Link to={`/user/${posterId}`}>{posterName}</Link><br/>
                                            Created on : {new Date(post.created).toDateString()}
                                        </p>
                                        <Link to={`/posts/${post._id}`} className="btn btn-primary btn-raised btn-sm">
                                            Read More
                                        </Link>
                                    </div>
                                </div>
                            );
                        }
                    )}
            </div>
        );
    }    

    render() {
        const {posts} = this.state;
        return (
            <div  className="container">
                <h2 className="mt-5 mb-5">Recent Posts</h2>

                {this.renderPosts(posts)}
            </div>
        );
    }
}

export default Posts;