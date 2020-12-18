import http from "../http-common"

class UsuarioDataService {
    buscarTodos() {
        return http.get(`/usuarios`)
    }

    buscarUm(id) {
        return http.get(`/usuarios/${id}`)
    }

    cadastrar(data) {
        return http.post("/usuarios", data)
    }

    editar(id, data) {
        return http.put(`/usuarios/${id}`, data)
    }

    apagar(id) {
        return http.delete(`/usuarios/${id}`)
    }

    apagarTodos() {
        return http.delete(`/usuarios`)
    }

    buscarDescricao(username) {
        return http.get(`/usuarios?username=${username}`)
    }
}

export default new UsuarioDataService()