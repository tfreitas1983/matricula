import axios from 'axios'

export default axios.create({
    baseURL: "http://10.1.1.26:8085/api",
   
    headers: {
        "Content-type": "application/json"
    }
})
