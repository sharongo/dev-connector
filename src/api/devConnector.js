import axios from 'axios';

export default axios.create({
    baseURL: 'http://beta.devconnector.com:3009',
    headers: {
        'Content-Type': 'application/json'
    }
});