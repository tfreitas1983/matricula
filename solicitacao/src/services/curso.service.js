import http from "../http-common"

class CursoDataService {
    buscarTodos(page) {
        return http.get(`/cursos?page=${page}`)
    }

    buscarUm(id) {
        return http.get(`/cursos/${id}`)
    }

    cadastrar(data) {
        return http.post("/cursos", data)
    }

    editar(id, data) {
        return http.put(`/cursos/${id}`, data)
    }

    apagar(id) {
        return http.delete(`/cursos/${id}`)
    }

    apagarTodos() {
        return http.delete(`/cursos`)
    }

    buscarDescricao(descricao, page) {
        return http.get(`/cursos?descricao=${descricao}&page=${page}`)
    }
}

export default new CursoDataService()