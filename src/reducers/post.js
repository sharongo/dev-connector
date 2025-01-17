import {
    GET_POSTS,
    POST_ERROR,
    UPDATE_LIKES,
    DELETE_POST,
    ADD_POST
} from '../actions/types';

const initialState = {
    post: null,
    posts: [],
    loading: true,
    error: {}
}

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_POSTS:
            return {
                ...state,
                posts: payload,
                loading: false
            }
        case ADD_POST:
            return{
                ...state,
                posts: [...state.posts, payload],
                loading: false
            }    
        case DELETE_POST:
            return{
                ...state, 
                posts: state.posts.filter(post => post.id !== payload),
                loading: false
            }
        case POST_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        case UPDATE_LIKES:
            return{
                ...state,
                posts: state.posts.map(post => (
                    post.id === payload.postId ? {
                        ...post,
                        likes: payload.likes
                    } : post
                )),
                loading: false
            }
        default:
            return state;
    }
}