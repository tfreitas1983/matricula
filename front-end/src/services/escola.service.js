import http from "../http-common"

class EscolaDataService {
    buscarTodos(page) {
        return http.get(`/escolas?page=${page}`)
    }

    buscarUm(id) {
        return http.get(`/escolas/${id}`)
    }

    cadastrar(data) {
        return http.post("/escolas", data)
    }

    editar(id, data) {
        return http.put(`/escolas/${id}`, data)
    }

    apagar(id) {
        return http.delete(`/escolas/${id}`)
    }

    apagarTodos() {
        return http.delete(`/escolas`)
    }

    buscarDescricao(descricao, page) {
        return http.get(`/escolas?descricao=${descricao}&page=${page}`)
    }

    cadastrarImagem(file) {
        return http.post("/escolas/files", file)
    } 

    buscarImagens() {
        return http.get("/escolas/files")
    }
}

export default new EscolaDataService()