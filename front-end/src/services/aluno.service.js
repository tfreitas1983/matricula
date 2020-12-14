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

    emailAprovado(id) {
        return http.get(`/alunos/envioaprovado/${id}`)
    }

    emailReprovado(id) {
        return http.get(`/alunos/envioreprovado/${id}`)
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

    buscarData(dt, page) {
        return http.get(`/alunos?dtnascimento=${dt}&page=${page}`)
    }

    buscarCPF(cpf_responsavel, page) {
        return http.get(`/alunos?cpf_responsavel=${cpf_responsavel}&page=${page}`)
    }

    buscarEscola(escola, page) {
        return http.get(`/alunos?escola=${escola}&page=${page}`)
    }

    buscarStatus(status, page) {
        return http.get(`/alunos?status=${status}&page=${page}`)
    }

    buscarSerie(serie, page) {
        return http.get(`/alunos?serie=${serie}&page=${page}`)
    }

    buscarTurno(turno, page) {
        return http.get(`/alunos?turno=${turno}&page=${page}`)
    }

    buscarTurma(turma, page) {
        return http.get(`/alunos?turma=${turma}&page=${page}`)
    }

    buscarNomeEscola(nome, escola, page) {
        return http.get(`/alunos?nome=${nome}&escola=${escola}&page=${page}`)
    }

    buscarNomeDtNascimento(nome, dtnascimento, page) {
        return http.get(`/alunos?nome=${nome}&dtnascimento=${dtnascimento}&page=${page}`)
    }

    buscarEscolaTurno(escola, turno, page) {
        return http.get(`/alunos?escola=${escola}&turno=${turno}&page=${page}`)
    }

    buscarEscolaSerie(escola, serie, page) {
        return http.get(`/alunos?escola=${escola}&serie=${serie}&page=${page}`)
    }

    buscarEscolaSerieTurno(escola, serie, turno, page) {
        return http.get(`/alunos?escola=${escola}&serie=${serie}&turno=${turno}&page=${page}`)
    }

    buscarEscolaTurnoTurma(escola, turno, turma, page) {
        return http.get(`/alunos?escola=${escola}&turno=${turno}&turma=${turma}&page=${page}`)
    }

    buscarEscolaSerieTurnoTurma(escola, serie, turno, turma,page) {
        return http.get(`/alunos?escola=${escola}&serie=${serie}&turno=${turno}&turma=${turma}&page=${page}`)
    }


}

export default new AlunoDataService()