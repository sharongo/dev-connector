import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../actions/post';


const PostItem = ({
    addLike,
    removeLike,
    deletePost,
    auth,
    post: {
        id,
        text,
        name,
        avatar,
        user,
        likes,
        comments,
        date
    }
}) => {
    return (
        <div className="post bg-white p-1 my-1">
            <div>
                <Link to={`/profile/${user}`}>
                    <img
                        className="round-img"
                        src={avatar}
                        alt="avatar"
                    />
                    <h4>{name}</h4>
                </Link>
            </div>
            <div>
                <p className="my-1">
                    {text}
                </p>
                <p className="post-date">
                    Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
                </p>
                <button onClick={(e) => addLike(id)} type="button" className="btn btn-light">
                    <i className="fas fa-thumbs-up"></i>{' '}
                    <span>{likes.length && (
                        <span>{likes.length}</span>
                    )}</span>
                </button>
                <button onClick={(e) => removeLike(id)} type="button" className="btn btn-light">
                    <i className="fas fa-thumbs-down"></i>
                </button>
                <Link to={`/post/${id}`} className="btn btn-primary">
                    Discussion
                    {comments.length && (
                        <span className='comment-count'>{comments.length}</span>
                    )}
                </Link>
                {
                    !auth.loading && user === auth.user.id && (
                        <button
                            onClick={(e) => deletePost(id)}
                            type="button"
                            className="btn btn-danger"
                        >
                            <i className="fas fa-times"></i>
                        </button>
                    )
                }

            </div>
        </div>
    )
}

PostItem.propTypes = {
    auth: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(PostItem)
