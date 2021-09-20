import axios from 'axios';

const AxiosInterceptor = axios.create({
    baseURL: 'https://picsum.photos/v2'
});

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    console.log("request config: ", config)
    return config;
}, function (error) {
    console.log("request error: ", error);
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    console.log("response ok: ", response);
    return response;
}, function (error) {
    console.log("response error: ", error);
    return Promise.reject(error);
});

export default AxiosInterceptor;
