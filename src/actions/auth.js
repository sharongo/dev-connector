import devConnector from '../api/devConnector';
import {setAlert} from './alert';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL, 
    USER_LOADED, 
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_PROFILE
} from './types';
import setAuthToken from '../utils/setAuthToken';

//Load User
// export const loadUser = () => async dispatch => {
//     if(localStorage.getItem('token')){
//         setAuthToken(localStorage.getItem('token'));
//     }
//     else{
//         try {
//             const res = await devConnector.get('/api/auth');

//             dispatch({
//                 type: USER_LOADED,
//                 payload: res.data
//             });
//         } catch (error) {
//             dispatch({
//                 type: AUTH_ERROR 
//             });
//         }
//     }
// }

//register user
export const register = ({name, email, password}) => async dispatch => {
    const body = JSON.stringify({name, email, password});

    try {
        const res = await devConnector.post('/api/users', body);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
        //dispatch(loadUser());
    } catch (error) {
        const errors = error.response.data;
        if(errors){
            for(var key in errors){
                //console.log(errors[key][0]);
                dispatch(setAlert(errors[key][0], 'danger'));
            }
            // errors.forEach(error => {
            //     dispatch(setAlert(error.msg, 'danger'));
            // });
        }
        dispatch({
            type:REGISTER_FAIL
        })
    }
};

//Login user
export const login = (email, password) => async dispatch => {
    const body = JSON.stringify({email, password});

    try {
        const res = await devConnector.post('/api/auth/login', body);
        console.log(res);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
        //dispatch(loadUser());
    } catch (error) {
        const errors = error.response.data;
        if(errors){
            for(var key in errors){
                //console.log(errors[key][0]);
                dispatch(setAlert(errors[key], 'danger'));
            }
            // errors.forEach(error => {
            //     dispatch(setAlert(error.msg, 'danger'));
            // });
        }
        dispatch({
            type:LOGIN_FAIL
        });
    }
};

//Logout / Clear Profile
export const logout = () => dispatch => {
    dispatch({
        type:CLEAR_PROFILE
    })
    dispatch({
        type: LOGOUT
    });
}