
import devConnector from '../api/devConnector';


const setAuthToken = token => {
    if(token){
        devConnector.defaults.headers.common['Authorization'] = `Bearer ${token}`
        //axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        //axios.defaults.headers.common = {'Authorization': `Bearer ${token}`};
        //axios.defaults.headers.common['x-auth-token'] = token;
    }
    else{
        delete devConnector.defaults.headers.common['Authorization'];
        //delete axios.defaults.headers.common['Authorization'];
        //delete axios.defaults.headers.common['x-auth-token'];
    }
}

export default setAuthToken;