import http from "../http-common"

class TurmaDataService {
    buscarTodos(page) {
        return http.get(`/turmas?page=${page}`)
    }

    buscarUm(id) {
        return http.get(`/turmas/${id}`)
    }

    cadastrar(data) {
        return http.post("/turmas", data)
    }

    editar(id, data) {
        return http.put(`/turmas/${id}`, data)
    }

    apagar(id) {
        return http.delete(`/turmas/${id}`)
    }

    apagarTodos() {
        return http.delete(`/turmas`)
    }

    buscarDescricao(descricao, page) {
        return http.get(`/turmas?descricao=${descricao}&page=${page}`)
    }

    cadastrarImagem(file) {
        return http.post("/turmas/files", file)
    } 

    buscarImagens() {
        return http.get("/turmas/files")
    }
}

export default new TurmaDataService()