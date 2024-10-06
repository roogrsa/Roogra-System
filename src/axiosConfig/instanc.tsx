import  axios  from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://roogr.sa/admin',
});


axiosInstance.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    console.log(token);
    
    req.headers.Authorization = `Bearer ${token}`;
    return req;
}, (err) => {
    return Promise.reject(err);
});
axiosInstance.interceptors.response.use((res) => {
    return res;
}, (err) => {
    if (err.response && err.response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = '/auth/login';
    }
    return Promise.reject(err);
});

export default axiosInstance;