import React, { Component } from 'react'
import { isAuthenticated } from '../Auth';
import { uncomment, comment } from './apiPost';
import { Link } from 'react-router-dom';
import DefaultProfile from "../images/images.png"

class Comment extends Component {

    state = {
        text : ""
    };

    handleChange = (event) => {
        this.setState({text: event.target.value });
    }

    addComment = e => {
        e.preventDefault();
        const userId = isAuthenticated().user._id;
        const postId = this.props.postId;
        const token = isAuthenticated().token;

        comment(userId,token,postId,{text : this.state.text}).then(data => {
            if (data.error){
                console.log(data.error);
            }else{
                this.setState({text: ""});
                // dispatch fresh list of comments to parent component
                this.props.updateComments(data.comments);
            }
        })
    }

    render() {
        const {comments} = this.props;
        return (
            <div>
                <h2 className="mt-5 mb-5">Leave a Comment</h2>

                <form> 
                    <div className="form-group">
                        <textarea type="text" rows="5" onChange={this.handleChange} className="form-control" />
                    </div>
                    <div>
                        <button onClick={this.addComment} className="btn btn-raised btn-success">
                            Save Comment
                        </button>
                    </div>
                </form>
                
                {/* {JSON.stringify(comments)} */}
                <div className="col-md-12">
                    <h3 className="text-primary">
                        {comments.length} Comments
                    </h3>
                    <hr />
                    {comments.map((comment, i) => (
                        <div key={i}>
                            <div>
                                <Link to={`/user/${comment.postedBy._id}`}>
                                    <img
                                        style={{
                                            borderRadius: "50%",
                                            border: "1px solid black"
                                        }}
                                        className="float-left mr-2"
                                        height="30px"
                                        width="30px"
                                        onError={i =>
                                            (i.target.src = `${DefaultProfile}`)
                                        }
                                        src={`${
                                            process.env.REACT_APP_API_URL
                                        }/user/photo/${comment.postedBy._id}`}
                                        alt={comment.postedBy.name}
                                    />
                                    <div>
                                        <p className="lead">
                                            {comment.text}
                                        </p>
                                        <br/>
                                        <p className="font-italic mark">
                                            Posted By: {" "}<Link to={`/user/${comment.postedBy._id}`}>{comment.postedBy.name}{" "}</Link><br/>
                                            Created on : {new Date(comment.created).toDateString()}
                                        </p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default Comment