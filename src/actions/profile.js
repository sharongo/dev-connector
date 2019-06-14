import devConnector from '../api/devConnector';
import {setAlert} from './alert';
import {
    GET_PROFILE,
    GET_PROFILES, 
    PROFILE_ERROR, 
    UPDATE_PROFILE, 
    CLEAR_PROFILE, 
    ACCOUNT_DELETED,
    GET_REPOS
} from './types';



//GET current users profile
export const getCurrentProfile = (id) => async dispatch => {
    try {
        const res = await devConnector.get(`/api/profile/${id}`);
        console.log(res);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status
            }
        })
    }
};

//Get All Profiles

export const getProfiles = () => async dispatch => {
    dispatch({type: CLEAR_PROFILE})
    try {
        const res = await devConnector.get(`/api/profile`);
        console.log(res);
        dispatch({
            type: GET_PROFILES,
            payload: res.data
        });
    } catch (error) {
        console.log(error);
        // dispatch({
        //     type: PROFILE_ERROR,
        //     payload: {
        //         msg: error.response.statusText,
        //         status: error.response.status
        //     }
        // })
    }
};

//Get profile by id
export const getProfileById = (userId) => async dispatch => {
    
    try {
        //const res = await devConnector.get(`/api/profile/user/${userId}`);
        const res = await devConnector.get(`/api/profile/${userId}`);
        console.log(res);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status
            }
        })
    }
};

//Create or update a profile
export const createProfile = (formData, history, edit = false) => async dispatch => {
    var token = localStorage.getItem('token');
    try {
        // const config = {
        //     headers: {
        //         'Authorization': `Bearer ${token}`
        //     }
        // }
        const res = await devConnector.post('/api/profile', formData);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

        if(!edit){
            history.push('/dashboard')
        }
    } catch (error) {
        // const errors = error.response.data;
        // if(errors){
        //     for(var key in errors){
        //         //console.log(errors[key][0]);
        //         dispatch(setAlert(errors[key], 'danger'));
        //     }
        //     // errors.forEach(error => {
        //     //     dispatch(setAlert(error.msg, 'danger'));
        //     // });
        // }
        console.log(error);
        // dispatch({
        //     type: PROFILE_ERROR,
        //     payload: {
        //         msg: error.response.statusText,
        //         status: error.response.status
        //     }
        // });
    }
};

// Update profile
export const updateProfile = (formData, history, edit = true) => async dispatch => {
    var token = localStorage.getItem('token');
    try {
        // const config = {
        //     headers: {
        //         'Authorization': `Bearer ${token}`
        //     }
        // }
        const res = await devConnector.post('/api/profile/edit', formData);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

        if(edit){
            history.push('/dashboard')
        }
    } catch (error) {
        // const errors = error.response.data;
        // if(errors){
        //     for(var key in errors){
        //         //console.log(errors[key][0]);
        //         dispatch(setAlert(errors[key], 'danger'));
        //     }
        //     // errors.forEach(error => {
        //     //     dispatch(setAlert(error.msg, 'danger'));
        //     // });
        // }
        console.log(error);
        // dispatch({
        //     type: PROFILE_ERROR,
        //     payload: {
        //         msg: error.response.statusText,
        //         status: error.response.status
        //     }
        // })
    }
};

// Get Github repos
export const getGithubRepos = (username) => async dispatch => {
    
    try {
        const res = await devConnector.get(`/api/profile/github/${username}`);
        console.log(res);
        dispatch({
            type: GET_REPOS,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status
            }
        })
    }
};


//Add Experience
export const addExperience = (formData, history) => async dispatch => {
    try {
        // const config = {
        //     headers: {
        //         'Authorization': `Bearer ${token}`
        //     }
        // }
        const res = await devConnector.put('/api/profile/experience', formData);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Experience Added', 'success'));
     
        history.push('/dashboard')

    } catch (error) {
        
        console.log(error);
        
    }
};

//Add Education
export const addEducation = (formData, history) => async dispatch => {
    try {
        // const config = {
        //     headers: {
        //         'Authorization': `Bearer ${token}`
        //     }
        // }
        const res = await devConnector.put('/api/profile/education', formData);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Education Added', 'success'));
     
        history.push('/dashboard');

    } catch (error) {
        
        console.log(error);
        
    }
};


//Delete Experience
export const deleteExperience = (profileId, id) => async dispatch => {
    try {
        const res = await devConnector.delete(`/api/profile/${profileId}/experience/${id}`);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Experience removed', 'success'));

        
    } catch (error) {
        console.log(error);
    }
};

//Delete Education
export const deleteEducation = (profileId, id) => async dispatch => {
    try {
        const res = await devConnector.delete(`/api/profile/${profileId}/education/${id}`);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Education removed', 'success'));
    } catch (error) {
        console.log(error);
    }
};

//Delete Account & profile
export const deleteAccount = (id) => async dispatch => {
    if(window.confirm('Are You Sure? This cannot be undone')){
        try {
            const res = await devConnector.delete(`/api/profile/${id}`);
    
            dispatch({
                type: CLEAR_PROFILE
            });

            dispatch({
                type: ACCOUNT_DELETED
            });
    
            dispatch(setAlert('Your account has been removed'));
        } catch (error) {
            console.log(error);
        }
    }
   
};
