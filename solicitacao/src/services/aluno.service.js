import http from "../http-common"

class AlunoDataService {
    buscarTodos(page) {
        return http.get(`/alunos?page=${page}`)
    }

    buscarUm(id) {
        return http.get(`/alunos/${id}`)
    }

    cadastrar(data) {
        return http.post("/alunos", data)
    }

    email(id) {
        return http.get(`/alunos/envio/${id}`)
    }

    editar(id, data) {
        return http.put(`/alunos/${id}`, data)
    }

    apagar(id) {
        return http.delete(`/alunos/${id}`)
    }

    apagarTodos() {
        return http.delete(`/alunos`)
    }

    buscarNome(nome, page) {
        return http.get(`/alunos?nome=${nome}&page=${page}`)
    }
}

export default new AlunoDataService()