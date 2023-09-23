import axios from "axios";
const BASE_URL = 'http://localhost:3000'



const  customAxios =  axios.create({
    baseURL: BASE_URL,
    withCredentials:true,
})

const requestHandler = request => {
    // request.headers.Authorization = 'Bearer e';  
    console.log(request.headers.Authorization);
    return request;
};

const responseHandler = response => {
    if (response.status === 401) {
        window.location = '/signin';
    }
    console.log('response');
    return response;
};

customAxios.interceptors.request.use((request) => requestHandler(request))
customAxios.interceptors.response.use((response) => responseHandler(response))


export  default customAxios
