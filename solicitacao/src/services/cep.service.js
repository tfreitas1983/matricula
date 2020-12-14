import http from "../http-common"

class CepDataService {
    buscarTodos(page) {
        return http.get(`/ceps?page=${page}`)
    }

    buscarCep(cep, page) {
        return http.get(`/ceps?cep=${cep}&page=${page}`)
    }

    buscarUm(id) {
        return http.get(`/ceps/${id}`)
    }

    buscarLogradouro(logradouro, page) {
        return http.get(`/ceps?logradouro=${logradouro}&page=${page}`)
    }
}

export default new CepDataService()