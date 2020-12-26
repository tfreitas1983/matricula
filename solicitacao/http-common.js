import axios from 'axios'

export default axios.create({
    baseURL: "http://matricula.ddns.net:8085/api",
    headers: {
        "Content-type": "application/json"
    }
})