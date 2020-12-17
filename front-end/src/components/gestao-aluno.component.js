import React, { Component } from "react"
import AlunoDataService from "../services/aluno.service"
import AuthService from "../services/auth.service"
import * as moment from 'moment'
import {Link} from 'react-router-dom'

export default class GestaoAluno extends Component {
    constructor(props) {
        super(props)

        this.buscaAluno = this.buscaAluno.bind(this)
        this.handlerStatus = this.handlerStatus.bind(this)
        
        this.salvarAluno = this.salvarAluno.bind(this)
        this.emailAprovado = this.emailAprovado.bind(this)
        this.emailReprovado = this.emailReprovado.bind(this)
        

        this.state = {
            currentUser: AuthService.getCurrentUser(),     
            showAdminBoard: false,
            showModeratorBoard: false, 
            showUserBoard: false,                
            message: "",
            msg: "",            
            current: {
                id: null,
                nome: "",
                dtnascimento: moment(),
                sexo: "",
                rg: "",
                cpf: "",
                nis: "",
                bolsafamilia: "",
                matricula: "",
                protocolo: "",
                nivel: "",
                serie: "",
                turma: "",
                turno: "",
                escola: "",
                responsavel: "",
                cpf_responsavel: "",
                logradouro: "",
                numero: "",
                complemento: "",
                bairro: "",
                cidade: "",
                uf: "RJ",
                cep: "",
                telefone: "",
                celular: "",
                email: "",
                eja: false,
                deficiente: "",
                mental: false,
                fala: false,
                auditiva: false,
                motora: false,
                visual: false,
                down: false,
                autismo: false,
                chkOutra: false,
                outra: "",
                lat: "",
                long: "",
                foto: "default.jpg",
                status: "",
                situacao: true,
                imagem: "",
                url: "",
                submitted: false,
                successful: false,
                p1Location:"",                
                infoE: "",
                pageE: "",
                infoT: "",
                pageT:""
            }
        }
    }

    componentDidMount() {        
        this.buscaAluno(this.props.match.params.id) 

        if (this.state.currentUser) {
            this.setState({
            showModeratorBoard: this.state.currentUser.roles.includes("ROLE_MODERATOR"),
            showAdminBoard: this.state.currentUser.roles.includes("ROLE_ADMIN"),
            showUserBoard: this.state.currentUser.roles.includes("ROLE_USER")
            })
        }
    }

    buscaAluno(id) {
        AlunoDataService.buscarUm(id)
        .then(response => {
            this.setState({
                current: {
                    id: response.data.id,
                    nome: response.data.nome.toUpperCase(),
                    dtnascimento: moment(response.data.dtnascimento).format('DD/MM/YYYY'),
                    sexo: response.data.sexo,
                    rg: response.data.rg,
                    cpf: response.data.cpf,
                    nis: response.data.nis,
                    bolsafamilia: response.data.bolsafamilia,
                    matricula: response.data.matricula,
                    protocolo: response.data.protocolo,
                    nivel: response.data.nivel,
                    serie: response.data.serie,
                    turma: response.data.turma,
                    turno: response.data.turno,
                    escola: response.data.escola.toUpperCase(),
                    responsavel: response.data.responsavel,
                    cpf_responsavel: response.data.cpf_responsavel,
                    logradouro: response.data.logradouro,
                    numero: response.data.numero,
                    complemento: response.data.complemento,
                    bairro: response.data.bairro,
                    cidade: "Belford Roxo",
                    uf: "RJ",
                    cep: response.data.cep,
                    telefone: response.data.telefone,
                    celular: response.data.celular,
                    email: response.data.email,
                    eja: false,
                    deficiente: response.data.deficiente,
                    mental: false,
                    fala: false,
                    auditiva: false,
                    motora: false,
                    visual: false,
                    down: false,
                    autismo: false,
                    chkOutra: false,
                    outra: response.data.outra,
                    lat: response.data.lat,
                    long: response.data.long,
                    foto: "default.jpg",
                    status: response.data.status,
                    situacao: response.data.situacao,
                    imagem: response.data.imagem,
                    url: response.data.url
                }
            })
        })
        .catch(e => {
            console.log(e)
        })          
    }

    handlerStatus(e){
        const status = e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                status: status
            }
        }))
    }

    salvarAluno(){
        var data = {
            id: this.state.current.id,
            username: this.state.currentUser.username,
            nome: this.state.current.nome,
            dtnascimento: moment(this.state.current.dtnascimento,'DD-MM-YYYY'),
            sexo: this.state.current.sexo,
            rg: this.state.current.rg,
            cpf: this.state.current.cpf,
            nis: this.state.current.nis,
            bolsafamilia: this.state.current.bolsafamilia,
            matricula: this.state.current.matricula,
            protocolo: this.state.current.protocolo,
            nivel: this.state.current.nivel,
            serie: this.state.current.serie,
            turma: this.state.current.turma,
            turno: this.state.current.turno,
            escola: this.state.current.escola,
            responsavel: this.state.current.responsavel,
            cpf_responsavel: this.state.current.cpf_responsavel,
            logradouro: this.state.current.logradouro,
            numero: this.state.current.numero,
            complemento: this.state.current.complemento,
            bairro: this.state.current.bairro,
            cidade: this.state.current.cidade,
            uf: "RJ",
            cep: this.state.current.cep,
            telefone: this.state.current.telefone,
            celular: this.state.current.celular,
            email: this.state.current.email,
            eja: this.state.current.eja,
            deficiente: this.state.current.deficiente,
            mental: this.state.current.mental,
            fala: this.state.current.fala,
            auditiva: this.state.current.auditiva,
            motora: this.state.current.motora,
            visual: this.state.current.visual,
            down: this.state.current.down,
            autismo: this.state.current.autismo,
            chkOutra: this.state.current.chkOutra,
            outra: this.state.current.outra,
            lat: this.state.current.lat,
            long: this.state.current.long,
            status: this.state.current.status
        }

        AlunoDataService.editar(this.state.current.id, data)
        .then(response => {
            this.setState({
                id: response.data.id,
                username: response.data.username,
                situacao: response.data.situacao,
                status: response.data.status,
                submitted: true,
                message: "Aluno(a) alterado(a) com sucesso"
            })
            console.log(response.data)
        })
        .catch(e => {
            console.log(e)
        })      
        
        if (this.state.current.email !== "" && this.state.current.status === "Aprovado") {
            this.timerID = setTimeout(      
                () => this.emailAprovado(),1000
            )
        }

        if (this.state.current.email !== "" && this.state.current.status === "Reprovado") {
            this.timerID = setTimeout(      
                () => this.emailReprovado(),1000
            )
        }
    }

    atualizaSituacao(status) {
        var data = {
            id: this.state.current.id,
            username: this.state.currentUser.username,
            nome: this.state.current.nome,
            dtnascimento: moment(this.state.current.dtnascimento,'DD-MM-YYYY'),
            sexo: this.state.current.sexo,
            rg: this.state.current.rg,
            cpf: this.state.current.cpf,
            nis: this.state.current.nis,
            bolsafamilia: this.state.current.bolsafamilia,
            matricula: this.state.current.matricula,
            protocolo: this.state.current.protocolo,
            nivel: this.state.current.nivel,
            serie: this.state.current.serie,
            turma: this.state.current.turma,
            turno: this.state.current.turno,
            escola: this.state.current.escola,
            responsavel: this.state.current.responsavel,
            cpf_responsavel: this.state.current.cpf_responsavel,
            logradouro: this.state.current.logradouro,
            numero: this.state.current.numero,
            complemento: this.state.current.complemento,
            bairro: this.state.current.bairro,
            cidade: "Belford Roxo",
            uf: "RJ",
            cep: this.state.current.cep,
            telefone: this.state.current.telefone,
            celular: this.state.current.celular,
            email: this.state.current.email,
            eja: this.state.current.eja,
            deficiente: this.state.current.deficiente,
            mental: this.state.current.mental,
            fala: this.state.current.fala,
            auditiva: this.state.current.auditiva,
            motora: this.state.current.motora,
            visual: this.state.current.visual,
            down: this.state.current.down,
            autismo: this.state.current.autismo,
            chkOutra: this.state.current.chkOutra,
            outra: this.state.current.outra,
            lat: this.state.current.lat,
            long: this.state.current.long,
            situacao: status
        }

        AlunoDataService.editar(this.state.current.id, data)
        .then(response => {
            this.setState(prevState => ({
                current: {
                    ...prevState.currentMembro,
                    situacao: status
                }
            }))
            window.location.reload(true)
        })
        .catch(e => {
            console.log(e)
        })
    }

    async emailAprovado () {
        await AlunoDataService.emailAprovado(this.state.current.id)
        .then(response => {
            this.setState({
                msg: "Email enviado com sucesso"
            })
        })
        .catch(e => {
            console.log(e)
        }) 
    }

    async emailReprovado () {
        await AlunoDataService.emailReprovado(this.state.current.id)
        .then(response => {
            this.setState({
                msg: "Email enviado com sucesso"
            })
        })
        .catch(e => {
            console.log(e)
        }) 
    }

    render () {

        const {current, showAdminBoard, showModeratorBoard,showUserBoard} = this.state

        return (
            <div style={{margin: 5+'%'}}>
                {(showAdminBoard || showModeratorBoard || showUserBoard ) && (
                <div>
                <h3>Gestão de alunos</h3>
                <div className="row">
                    <div className="col-md-6">                          
                        <label htmlFor="nome">Nome</label>
                        <input 
                        type="text" 
                        className="form-control" 
                        value={current.nome}
                        disabled />                        
                    </div>
                    <div className="col-md-3">                       
                        <label>Data de Nascimento</label>
                        <input 
                        type="text" 
                        className="form-control"                         
                        value={current.dtnascimento}                                                        
                        disabled />                       
                    </div>
                    <div className="col-md-3">
                        <label>Gênero</label>
                        <div className="form-group">    
                            <div className="form-check form-check-inline">
                                <input 
                                    className="form-check-input"
                                    type="radio"
                                    name="sexo"
                                    id="sexoFeminino"
                                    value="Feminino"
                                    checked={current.sexo === 'Feminino'}
                                    disabled />
                            </div>
                            <label className="form-check-label" style={{marginRight: 3+'%'}}>Feminino</label>

                            <div className="form-check form-check-inline">
                                <input 
                                    className="form-check-input"
                                    type="radio"
                                    name="sexo"
                                    id="sexoMasculino"
                                    value="Masculino"
                                    checked={current.sexo === 'Masculino'}
                                    disabled />
                            </div>
                            <label className="form-check-label">Masculino</label>
                        </div> 
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3">                          
                        <label htmlFor="telefone">Telefone</label>
                        <input 
                        type="text" 
                        className="form-control" 
                        value={current.telefone}
                        disabled />                        
                    </div>
                    <div className="col-md-3">                       
                        <label>Celular</label>
                        <input 
                        type="text" 
                        className="form-control"                         
                        value={current.celular}                                                        
                        disabled />                       
                    </div>
                    <div className="col-md-3">                       
                        <label>E-mail</label>
                        <input 
                        type="text" 
                        className="form-control"                         
                        value={current.email}                                                        
                        disabled />                       
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <label htmlFor="nome">Escola</label>
                        <input 
                        type="text" 
                        className="form-control" 
                        value={current.escola}
                        disabled />
                    </div>
                    <div className="col-md-2">
                        <label htmlFor="nome">Série</label>
                        <input 
                        type="text" 
                        className="form-control" 
                        value={current.serie}
                        disabled />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="nome">Turno</label>
                        <input 
                        type="text" 
                        className="form-control" 
                        value={current.turno}
                        disabled />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="nome">Turma</label>
                        <input 
                        type="text" 
                        className="form-control" 
                        value={current.turma}
                        disabled />
                    </div>


                </div>
                <div className="row">
                    <div className="col-md-6">
                        <label>Status</label>
                        <select
                        className="form-control" 
                        id="status" 
                        name="status"                        
                        value={current.status}                                    
                        onChange={this.handlerStatus} > 
                            <option value="" disabled> --- Escolha um status --- </option>                                
                            <option value="Aprovado"> Aprovado(a) </option>
                            <option value="Em análise"> Em análise </option>  
                            <option value="Reprovado"> Reprovado(a) </option> 
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12" style={{display:'flex', justifyContent: 'space-evenly', marginTop: 2+'%'}}>
                        <button type="submit" className="btn btn-success" onClick={this.salvarAluno} style={{width: 20+'%'}}>
                            Salvar
                        </button>
                        <Link to={"/solicitacoes"} className="btn btn-info" style={{width: 20+'%'}}>
                            Voltar
                        </Link>
                        {current.situacao ? (
                            <button className="badge badge-danger mr-2" onClick={() => this.atualizaSituacao(false)}>
                                Inativar
                            </button>
                        ) : (
                            <button className="badge badge-success mr-2" onClick={() => this.atualizaSituacao(true)}>
                                Ativar
                            </button>
                        )}
                    </div>                                                                       
                </div>
                <h1 style={{marginBottom: 2+'%'}}> {this.state.message} </h1>
                </div>)}
            </div>
        )
    }

}