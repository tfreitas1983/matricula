import http from "../http-common"

class SubPrefeituraDataService {
    buscarTodos(page) {
        return http.get(`/subprefeituras?page=${page}`)
    }
}

export default new SubPrefeituraDataService()