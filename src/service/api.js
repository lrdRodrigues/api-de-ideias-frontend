import axios from 'axios' 

const api = axios.create({
    baseURL: 'https://api-de-ideias.herokuapp.com/'
})

export default api 