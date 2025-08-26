import axios from 'axios'
const api = axios.create({
    baseURL: process.env.VUE_APP_API_URL || 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json'
    }
});
export function register({email,password}){
    return api.post('/auth/register',{email,password})
}
export function setAuthToken(token){
    if(token){
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    else{
        delete api.defaults.headers.common['Authorization'];
    }
}
export async function login({email,password}){
    const response = await api.post('/auth/login',{email,password})
    const token = response.data.token;
    localStorage.setItem('token',token);
    setAuthToken(token);
    return response
}
export default api;