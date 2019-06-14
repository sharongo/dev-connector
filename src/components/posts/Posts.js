import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../common/Spinner';
import { getPosts } from '../../actions/post';
import PostItem from './PostItem';
import PostForm from './PostForm';

const Posts = ({ getPosts, post: { posts, loading } }) => {
    useEffect(() => {
        getPosts();
    }, [])
    return (
        <div>
            {
                loading ? <Spinner /> : (
                    <Fragment>
                        <h1 className='large text-primary'>Posts</h1>
                        <p className='lead'>
                            <i className='fas fa-user' /> Welcome to the community
                        </p>
                        <PostForm/>
                        <div className='posts'>
                            {
                                posts && posts.length > 0 && posts.map(post => (
                                    <PostItem key={post.id} post={post}/>
                                ))
                            }
                        </div>
                    </Fragment>
                )
            }
        </div>
    )
}

Posts.propTypes = {
    post: PropTypes.object.isRequired,
    getPosts: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    post: state.post
});

export default connect(mapStateToProps, { getPosts })(Posts);
