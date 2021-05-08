import React, { Component } from 'react'
import { isAuthenticated } from '../Auth';
import { uncomment, comment } from './apiPost';
import { Link } from 'react-router-dom';
import DefaultProfile from "../images/images.png"
import { text } from 'body-parser';

class Comment extends Component {

    state = {
        text : "",
        length : 150,
        error: ""
    };

    handleChange = (event) => {
        this.setState({error: ""});
        this.setState({text: event.target.value });
    }

    isValid = () => {
        const {text} = this.state;
        if (!text.length>0 || text.length > 150) {
            this.setState({
                error: "Comment should not be empty and less than 150 charecters long"
            });
            return false;
        }
        return true;
    }

    addComment = e => {
        e.preventDefault();

        if (!isAuthenticated()){
            this.setState({error: "Please sign in to leave a comment"});
            return false;
        }

        if (this.isValid()){
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
    }

    deleteComment = (comment) => {
        const userId = isAuthenticated().user._id;
        const postId = this.props.postId;
        const token = isAuthenticated().token;

        uncomment(userId,token,postId,comment).then(data => {
            if (data.error){
                console.log(data.error);
            }else{
                this.props.updateComments(data.comments);
            }
        })
    }

    deleteConfirmed = (comment) => {
        let answer = window.confirm("Are you sure you want to delete your Comment");
        if (answer) {
            this.deleteComment(comment);
        }
    }

    render() {
        const {comments} = this.props;
        const {text,length,error} = this.state;

        return (
            <div>
                <h2 className="mt-5 mb-5">Leave a Comment{" "} ({length-text.length} words left)</h2> 


                <form> 
                    <div className="form-group">
                        <textarea type="text" rows="2" disabled={length-text.length === 0} onChange={this.handleChange} className="form-control" />
                    </div>
                    <div>
                        <button onClick={this.addComment} className="btn btn-raised btn-success">
                            Save Comment
                        </button>
                    </div>
                </form>
                <div className="alert alert-danger" style={{ display : error ? "" : "none" }}>{error}</div>
                
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
                                            Posted By: {" "}<Link to={`/user/${comment.postedBy._id}`}>{comment.postedBy.name}{" "}</Link>  Created on : {new Date(comment.created).toDateString()}
                                          
                                            <span>
                                            {isAuthenticated().user && isAuthenticated().user._id === comment.postedBy._id &&
                                                <>
                                                    <span onClick={() => this.deleteConfirmed(comment)} className="text-danger float-right mr-1">
                                                        Remove Comment
                                                    </span>
                                                </>
                                            }
                                            </span>
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