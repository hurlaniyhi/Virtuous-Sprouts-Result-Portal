import axios from 'axios'

// https://halal-school.herokuapp.com

const instance = axios.create({
    baseURL: "https://virtuous-sprouts-server.vercel.app"   
})


instance.interceptors.request.use(
    async (config) => {
        const token = await localStorage.getItem('token')
        
        if(token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config;
    },

    (err) => {
        return Promise.reject(err)
    }
)


export default instance
