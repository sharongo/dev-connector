import devConnector from '../api/devConnector';
import { setAlert } from './alert';
import { 
  GET_POSTS, 
  POST_ERROR, 
  UPDATE_LIKES, 
  DELETE_POST, 
  ADD_POST 
} from './types';

// Get posts
export const getPosts = () => async dispatch => {
  var token = localStorage.getItem('token');
  try {
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
    const res = await devConnector.get('/api/posts', config);

    dispatch({
      type: GET_POSTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add Like
export const addLike = (postId) => async dispatch => {
  var token = localStorage.getItem('token');
  try {
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
    const res = await devConnector.put(`/api/posts/like/${postId}`, config);

    dispatch({
      type: UPDATE_LIKES,
      payload: { postId, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Remove Likes
export const removeLike = (postId) => async dispatch => {
  var token = localStorage.getItem('token');
  try {
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
    const res = await devConnector.put(`/api/posts/unlike/${postId}`, config);

    dispatch({
      type: UPDATE_LIKES,
      payload: { postId, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete Post
export const deletePost = (id) => async dispatch => {
  var token = localStorage.getItem('token');
  try {
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
    const res = await devConnector.delete(`/api/posts/${id}`, config);

    dispatch({
      type: DELETE_POST,
      payload: id
    });

    dispatch(setAlert('Post Removed', 'success'))
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add Post
export const addPost = (formData) => async dispatch => {
  var token = localStorage.getItem('token');
  try {
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
    const res = await devConnector.post(`/api/posts`, formData, config);

    dispatch({
      type: ADD_POST,
      payload: res.data
    });

    dispatch(setAlert('Post Created', 'success'))
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};