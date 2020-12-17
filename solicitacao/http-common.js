import axios from 'axios'

export default axios.create({
    baseURL: "http://api.matriculabelfordroxo.com.br:8085/api",
    headers: {
        "Content-type": "application/json"
    }
})