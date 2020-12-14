import axios from 'axios'

export default axios.create({
    baseURL: "http://matriculabelfordroxo.com.br:8085/api",
    headers: {
        "Content-type": "application/json"
    }
})