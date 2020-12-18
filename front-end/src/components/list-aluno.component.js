import React, { Component } from 'react'
import AlunoDataService from "../services/aluno.service"
import EscolaDataService from "../services/escola.service"
import TurmaDataService from "../services/turma.service"
import AuthService from "../services/auth.service"
import {Link} from 'react-router-dom'
import {FaEdit, FaEye, FaPowerOff} from 'react-icons/fa'
import { IconContext } from "react-icons"
import * as moment from 'moment'
import {cpfMask} from './masks'

export default class Aluno extends Component {
    constructor(props) {
        super(props)

        this.pegaAlunos = this.pegaAlunos.bind(this)
        this.pegaEscolas = this.pegaEscolas.bind(this)
        this.pegaTurmas = this.pegaTurmas.bind(this)

        this.handlerBuscaNome = this.handlerBuscaNome.bind(this)
        this.handlerBuscaDtNascimento = this.handlerBuscaDtNascimento.bind(this)
        this.handlerBuscaCPF = this.handlerBuscaCPF.bind(this)
        this.handlerBuscaEscola = this.handlerBuscaEscola.bind(this)
        this.handlerBuscaSerie = this.handlerBuscaSerie.bind(this)
        this.handlerBuscaTurno = this.handlerBuscaTurno.bind(this)
        this.handlerBuscaTurma = this.handlerBuscaTurma.bind(this)
        this.handlerBuscaStatus = this.handlerBuscaStatus.bind(this)        
        
        this.buscarNome = this.buscarNome.bind(this)
        this.buscarDtNascimento = this.buscarDtNascimento.bind(this)
        this.buscarCPF = this.buscarCPF.bind(this)
        this.buscarEscola = this.buscarEscola.bind(this)
        this.buscarSerie = this.buscarSerie.bind(this)
        this.buscarTurno = this.buscarTurno.bind(this)
        this.buscarTurma = this.buscarTurma.bind(this)
        this.buscarStatus = this.buscarStatus.bind(this)
        this.buscarMultiplo = this.buscarMultiplo.bind(this)
        
        this.toggleFiltro = this.toggleFiltro.bind(this)
        this.limpaCurrent = this.limpaCurrent.bind(this)

        this.state = {
            currentUser: AuthService.getCurrentUser(),
            showModeratorBoard: false,
            alunos:[],
            escolas: [],
            turmas: [],
            buscaNome: "",
            buscaEscola: "",
            buscaSerie: "",
            buscaTurno: "",
            buscaTurma: "",
            buscaCPF: "",
            buscaDtNascimento: "",
            buscaStatus: "",
            mostraFiltro: true,
            className: 'show',
            info: "",
            infoE: "",
            page: "",
            pageE: ""
        }
    }

    componentDidMount(){
        this.pegaAlunos()        
        this.pegaEscolas()
        this.pegaTurmas()

        if (this.state.currentUser) {
            this.setState({
              showModeratorBoard: this.state.currentUser.roles.includes("ROLE_MODERATOR")
            })
        }
    }

    pegaAlunos(page = 1) {
        AlunoDataService.buscarTodos(page)
        .then(response => {
            //REST do response da API em duas constantes: 
            // "docs" com os dados do chamado e "info" com os dados das páginas
            const { docs, ...info } = response.data 
            this.setState({
                alunos: docs,
                info: info,
                page: page
            })                
        })
        .catch(e => {
            console.log(e)
        })
    }

    
    ativaAluno(aluno, index) {
        this.setState({
            current: aluno,
            currentIndex: index
        })
    }

    
    pegaEscolas(page = 1) {
        EscolaDataService.buscarTodos(page)
        .then(response => {
            //REST do response da API em duas constantes: 
            // "docs" com os dados do chamado e "info" com os dados das páginas
            const { docs, ...info } = response.data 
            this.setState({
                escolas: docs,
                infoE: info,
                pageE: page
            })                
        })
        .catch(e => {
            console.log(e)
        })
    }

    pegaTurmas(page = 1) {        
        TurmaDataService.buscarTodos(page)
        .then(response => {
        //REST do response da API em duas constantes: 
        // "docs" com os dados da turma e "info" com os dados das páginas
            const { docs, ...info } = response.data 
            this.setState({
                turmas: docs,
                info: info,
                page: page
            })                
        })
        .catch(e => {
            console.log(e)
        })
    }

    handlerBuscaNome(e) {
        const buscaNome = (e.target.value = ("" + e.target.value).toUpperCase()).replace(/\d+/g, "")
        this.buscarNome()        
        this.setState({
            buscaNome: buscaNome
        })
    }

    handlerBuscaDtNascimento(e) {
        const buscaDtNascimento = e.target.value
        this.setState({
            buscaDtNascimento: buscaDtNascimento
        })
        this.timerID = setTimeout(      
            () => this.buscarDtNascimento(),1000
        )        
    }

    handlerBuscaCPF(e) {
        const buscaCPF = cpfMask(e.target.value)
        this.setState({
            buscaCPF: buscaCPF
        })
        this.timerID = setTimeout(      
            () => this.buscarCPF(),1000
        )        
    }

    handlerBuscaEscola(e) {
        const buscaEscola = e.target.value
        this.setState({                        
            buscaEscola: buscaEscola
        })        
        this.timerID = setTimeout(      
            () => this.buscarEscola(),1000
        )        
    }

    handlerBuscaSerie(e) {
        const buscaSerie = e.target.value
        this.setState({
            buscaSerie: buscaSerie
        })
        this.timerID = setTimeout(      
            () => this.buscarSerie(),1000
        )        
    }

    handlerBuscaTurno(e) {
        const buscaTurno = e.target.value
        this.setState({
            buscaTurno: buscaTurno
        })
        this.timerID = setTimeout(      
            () => this.buscarTurno(),1000
        )        
    }

    handlerBuscaTurma(e) {
        const buscaTurma = e.target.value
        this.setState({
            buscaTurma: buscaTurma
        })
        this.timerID = setTimeout(      
            () => this.buscarTurma(),1000
        )        
    }

    handlerBuscaStatus(e) {
        const buscaStatus = e.target.value
        this.setState({
            buscaStatus: buscaStatus
        })
        this.timerID = setTimeout(      
            () => this.buscarStatus(),1000
        )        
    }    

    buscarNome(page = 1) {        
        AlunoDataService.buscarNome(this.state.buscaDescricao, page)
        .then(response => {
            const { docs, ...info } = response.data 
            this.setState({
                alunos: response.data.docs,
                info: info                                 
            })    
        })
        .catch(e => {
            console.log(e)
        })        
    }

    buscarDtNascimento(page = 1) {
        AlunoDataService.buscarData(this.state.buscaDtNascimento, page)
        .then(response => {
            const { docs, ...info } = response.data 
            this.setState({
                alunos: response.data.docs,
                info: info                                 
            })    
        })
        .catch(e => {
            console.log(e)
        })
    }

    buscarCPF(page = 1) {
        AlunoDataService.buscarCPF(this.state.buscaCPF, page)
        .then(response => {
            const { docs, ...info } = response.data 
            this.setState({
                alunos: response.data.docs,
                info: info                                 
            })    
        })
        .catch(e => {
            console.log(e)
        })
    }

    buscarEscola(page = 1) {
        AlunoDataService.buscarEscola(this.state.buscaEscola, page)
        .then(response => {
            const { docs, ...info } = response.data 
            this.setState({
                alunos: response.data.docs,
                info: info                                 
            })    
        })
        .catch(e => {
            console.log(e)
        })
    }

    buscarSerie(page = 1) {
        AlunoDataService.buscarSerie(this.state.buscaSerie, page)
        .then(response => {
            const { docs, ...info } = response.data 
            this.setState({
                alunos: response.data.docs,
                info: info                                 
            })    
        })
        .catch(e => {
            console.log(e)
        })
    }

    buscarTurno(page = 1) {
        AlunoDataService.buscarTurno(this.state.buscaTurno, page)
        .then(response => {
            const { docs, ...info } = response.data 
            this.setState({
                alunos: response.data.docs,
                info: info                                 
            })    
        })
        .catch(e => {
            console.log(e)
        })
    }

    buscarTurma(page = 1) {
        AlunoDataService.buscarTurma(this.state.buscaTurma, page)
        .then(response => {
            const { docs, ...info } = response.data 
            this.setState({
                alunos: response.data.docs,
                info: info                                 
            })    
        })
        .catch(e => {
            console.log(e)
        })
    }

    buscarStatus(page = 1) {
        AlunoDataService.buscarStatus(this.state.buscaStatus, page)
        .then(response => {
            const { docs, ...info } = response.data 
            this.setState({
                alunos: response.data.docs,
                info: info                                 
            })    
        })
        .catch(e => {
            console.log(e)
        })
    }

    buscarMultiplo(page = 1) {

        if (this.state.buscarSerie !== "" && this.state.buscaEscola !== "" & this.state.buscaTurno !== "" && this.state.buscaTurma !== "") {
            AlunoDataService.buscarEscolaSerieTurnoTurma(this.state.buscaEscola, this.state.buscaSerie, this.state.buscaTurno, this.state.buscarTurma, page)
            .then(response => {
                const { docs, ...info } = response.data 
                this.setState({
                    alunos: response.data.docs,
                    info: info                                 
                })    
            })
            .catch(e => {
                console.log(e)
            })
        }

        if (this.state.buscarSerie === "" && this.state.buscaEscola !== "" & this.state.buscaTurno !== "" && this.state.buscaTurma !== "") {
            AlunoDataService.buscarEscolaTurnoTurma(this.state.buscaEscola, this.state.buscaTurno, this.state.buscaTurma, page)
            .then(response => {
                const { docs, ...info } = response.data 
                this.setState({
                    alunos: response.data.docs,
                    info: info                                 
                })    
            })
            .catch(e => {
                console.log(e)
            })
        }

        if (this.state.buscarSerie !== "" && this.state.buscaEscola !== "" & this.state.buscaTurno !== "" && this.state.buscaTurma === "") {
            AlunoDataService.buscarEscolaSerieTurno(this.state.buscaEscola, this.state.buscaSerie, this.state.buscaTurno, page)
            .then(response => {
                const { docs, ...info } = response.data 
                this.setState({
                    alunos: response.data.docs,
                    info: info                                 
                })    
            })
            .catch(e => {
                console.log(e)
            })
        }

        if (this.state.buscaNome !== "" && this.state.buscaEscola !== "" ) {
            AlunoDataService.buscarNomeEscola(this.state.buscaNome, this.state.buscaEscola, page)
            .then(response => {
                const { docs, ...info } = response.data 
                this.setState({
                    alunos: response.data.docs,
                    info: info                                 
                })    
            })
            .catch(e => {
                console.log(e)
            })
        }

        if (this.state.buscaNome !== "" && this.state.buscarDtNascimento !== "" ) {
            AlunoDataService.buscarNomeDtNascimento(this.state.buscaNome, this.state.buscaDtNascimento, page)
            .then(response => {
                const { docs, ...info } = response.data 
                this.setState({
                    alunos: response.data.docs,
                    info: info                                 
                })    
            })
            .catch(e => {
                console.log(e)
            })
        }

        if (this.state.buscarTurno !== "" && this.state.buscaEscola !== "" ) {
            AlunoDataService.buscarEscolaTurno(this.state.buscaEscola, this.state.buscaTurno, page)
            .then(response => {
                const { docs, ...info } = response.data 
                this.setState({
                    alunos: response.data.docs,
                    info: info                                 
                })    
            })
            .catch(e => {
                console.log(e)
            })
        }

        if (this.state.buscarSerie !== "" && this.state.buscaEscola !== "" && this.state.buscaTurno === "") {
            AlunoDataService.buscarEscolaSerie(this.state.buscaEscola, this.state.buscaSerie, page)
            .then(response => {
                const { docs, ...info } = response.data 
                this.setState({
                    alunos: response.data.docs,
                    info: info                                 
                })    
            })
            .catch(e => {
                console.log(e)
            })
        }


    }

    toggleFiltro() {
        this.setState(state=> ({
          mostraFiltro: !state.mostraFiltro
        }))
  
        if(this.state.mostraFiltro === true) {
            this.setState({
                className: 'show'
            })
        } else {
            this.setState({
                className: 'hidden'
            })
        }        
    }

    limpaCurrent() {
        this.setState({                   
            buscaNome: "",
            buscaCPF: "",
            buscaEscola: "",
            buscaDtNascimento: "",  
            buscaStatus: "",
            buscaSerie:"",
            buscaTurno: "",
            buscaTurma:""       
        })
        this.inputData.value = ""
        this.inputCPF.value = ""
        this.inputNome.value = ""
        this.pegaAlunos()
    }
    
    


    render () {
        const {alunos, escolas, turmas, className, buscaCPF, buscaNome, buscaDtNascimento, buscaEscola,
            buscaStatus, buscaSerie, buscaTurno, buscaTurma, showModeratorBoard} = this.state

        let mostrar = null

        if (alunos.length > 0 && (buscaCPF || buscaDtNascimento || buscaNome || buscaEscola || buscaStatus || buscaSerie || buscaTurno || buscaTurma)) { 
            mostrar = alunos.map((aluno, index) => {
                if (aluno.situacao === false) {
                    return (
                    <tr key={index} className="bordalinha">                    
                    <td style={{width: 27+'%', color: 'red'}}>{aluno.nome}</td>                                
                    <td style={{width: 10+'%', color: 'red'}}>{moment(aluno.dtnascimento).format('DD/MM/YYYY')}</td>                                                       
                    <td style={{width: 13+'%', color: 'red'}}>{aluno.escola}</td>                                    
                    <td style={{width: 5+'%', color: 'red'}}>{aluno.serie}</td>                                    
                    <td style={{width: 5+'%', color: 'red'}}>{aluno.turno}</td> 
                    <td style={{width: 7+'%', color: 'red'}}>{aluno.turma}</td>                                
                    <td style={{width: 7+'%', color: 'red'}}>{moment(aluno.createdAt).format('DD/MM/YYYY')}</td>   
                    <td style={{width: 5+'%', color: 'red'}}>{aluno.status}</td> 
                    <td style={{width: 10+'%'}}>
                        <IconContext.Provider value={{ size: "2em", className: "global-class-name" }}>
                            {<Link to={`/alunos/visualizar/${aluno.id}`} target="_blank" id="view" style={{textDecoration: 'none'}}> <FaEye /> </Link>}
                            {<Link to={`/alunos/editar/${aluno.id}`} target="_blank" id="edit"> <FaEdit /> </Link>}
                            {<Link to={`/alunos/gestao/${aluno.id}`} target="_blank" id="edit"> <FaPowerOff /> </Link>}
                        </IconContext.Provider>
                    </td>                                
                </tr> 
                )} else {
                    return (
                    <tr key={index} className="bordalinha">                        
                        <td style={{width: 27+'%'}}>{aluno.nome}</td>                                
                        <td style={{width: 10+'%'}}>{moment(aluno.dtnascimento).format('DD/MM/YYYY')}</td>  
                        <td style={{width: 13+'%'}}>{aluno.escola}</td>                                    
                        <td style={{width: 5+'%'}}>{aluno.serie}</td>                                    
                        <td style={{width: 5+'%'}}>{aluno.turno}</td> 
                        <td style={{width: 7+'%'}}>{aluno.turma}</td>                                
                        <td style={{width: 7+'%'}}>{moment(aluno.createdAt).format('DD/MM/YYYY')}</td>   
                        <td style={{width: 5+'%'}}>{aluno.status}</td> 
                        <td style={{width: 10+'%'}}>
                            <IconContext.Provider value={{ size: "2em", className: "global-class-name" }}>
                                {<Link to={`/alunos/visualizar/${aluno.id}`} target="_blank" id="view" style={{textDecoration: 'none'}}> <FaEye /> </Link>}
                                {<Link to={`/alunos/editar/${aluno.id}`} target="_blank" id="edit"> <FaEdit /> </Link>}
                                {<Link to={`/alunos/gestao/${aluno.id}`} target="_blank" id="edit"> <FaPowerOff /> </Link>}
                            </IconContext.Provider>
                        </td>                                
                    </tr> 
                )}
            })
        }

        let listaEscolas = null
        let listaTurmas = null

        if (escolas.length > 0) {
            listaEscolas = escolas.map((escola, index) => {
            return <option value={escola.descricao} key={index}>{escola.descricao}</option>
            })            
        }  

        if (buscaEscola !== "") {
            listaTurmas = turmas.map((turma, index)=> {
                if (turma.escola === buscaEscola ) {
                    return (
                        <option value={turma.descricao} key={index}>
                            {turma.descricao}
                        </option>
                    )
                }  else {
                    return false
                }            
            })
        }     
           
 
        return ( 
            <div style={{marginTop: 5+'%'}}> 
             {showModeratorBoard && (
                <div>         
                    <h1>Lista de Alunos(as)</h1>    
                    <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 1+'%'}}>
                    
                        
                        <Link to={"/alunos/adicionar"} className="btn btn-success">
                            Cadastrar
                        </Link>
                        <div>
                            <button type="button" onClick={this.toggleFiltro} className="btn btn-info">
                                {this.state.mostraFiltro ?  'Filtros': 'Esconder' }
                            </button>
                        </div>  
                    </div>                 

                    <div className={className}>
                        <div className="form-group" style={{display: 'flex', justifyContent: 'space-around', marginTop: 15+'px'}}>                        
                            <input type="text" pattern="[a-zA-Z]*" className="form-control" placeholder="Busque pelo nome" onChange={this.handlerBuscaNome} onKeyUp={this.buscarNome} ref={el => this.inputNome = el}/>
                            <input type="number" min="1" className="form-control" placeholder="Busque pelo CPF do responsável" onChange={this.handlerBuscaCPF} onKeyUp={this.buscarCPF} ref={el => this.inputCPF = el}/>                        
                            <input type="date" className="form-control" placeholder="Busque pela Data" onChange={this.handlerBuscaDtNascimento} onKeyUp={this.buscarDtNascimento} ref={el => this.inputData = el} />
                                                
                            <select 
                                className="form-control" 
                                id="status" 
                                name="status"                        
                                value={buscaStatus}                                    
                                onChange={this.handlerBuscaStatus} > 
                                <option value="" disabled> --- Filtre por status --- </option>                                
                                <option value="Aprovado"> Aprovado(a) </option>
                                <option value="Em análise"> Em análise </option>  
                                <option value="Reprovado"> Reprovado(a) </option> 
                            </select>
                            
                        </div> 
                        <div className="form-group" style={{display: 'flex', justifyContent: 'space-around', marginTop: 15+'px'}}>                        
                            <select 
                                className="form-control" 
                                id="escola" 
                                name="escola"                        
                                value={buscaEscola}                                    
                                onChange={this.handlerBuscaEscola}
                                ref={el => this.inputEscola = el} >                              
                                <option value="" disabled> --- Selecione a escola --- </option>
                                {listaEscolas}
                            </select>
                            <select 
                                className="form-control" 
                                id="serie" 
                                name="serie"                        
                                value={buscaSerie}                                    
                                onChange={this.handlerBuscaSerie}
                                ref={el => this.inputserie = el} >                              
                                <option value="" disabled> --- Selecione a série --- </option>
                                <option value="Creche I"> Creche I </option>
                                <option value="Creche II"> Creche II </option>
                                <option value="Creche III"> Creche III </option>
                                <option value="Pré IV"> Pré IV </option>
                                <option value="Pré V"> Pré V </option>
                                <option value="1º ano"> 1º ano </option>
                                <option value="2º ano"> 2º ano </option>
                                <option value="3º ano"> 3º ano </option>
                                <option value="4º ano"> 4º ano </option>
                                <option value="5º ano"> 5º ano </option>
                                <option value="6º ano"> 6º ano </option>
                                <option value="7º ano"> 7º ano </option>
                                <option value="8º ano"> 8º ano </option>
                                <option value="9º ano"> 9º ano </option>
                            </select>
                            <select 
                                className="form-control" 
                                id="turno" 
                                name="turno"                        
                                value={buscaTurno}                                    
                                onChange={this.handlerBuscaTurno}
                                ref={el => this.inputTurno = el} >                              
                                <option value="" disabled> --- Selecione o turno --- </option>
                                <option value="1º Período"> 1º Período</option>
                                <option value="2º Período"> 2º Período</option>
                                <option value="3º Período"> 3º Período</option>                  
                                <option value="Intermediário"> Intermediário</option> 
                            </select>
                            <select 
                                className="form-control" 
                                id="turma" 
                                name="turma"                        
                                value={buscaTurma}                                    
                                onChange={this.handlerBuscaTurma}
                                ref={el => this.inputTurma = el} >                              
                                <option value="" disabled> --- Selecione a turma --- </option>
                                {listaTurmas}
                            </select>
                            <button type="button" className="btn btn-danger" onClick={this.limpaCurrent}>
                                Limpar
                            </button>
                            <button type="button" className="btn btn-info" onClick={this.buscarMultiplo}>
                                Buscar
                            </button>
                        </div>
                    </div>   
                
                
                    <div className="list-group">
                        <table className="tabela">
                            <tbody>
                                <tr className="bordalinha">                                
                                    <th>Nome</th>
                                    <th>Dt Nascimento</th>                                
                                    <th>Escola</th>
                                    <th>Série</th>
                                    <th>Turno</th>
                                    <th>Turma</th>                                
                                    <th>Dt Solicitado</th>                                
                                    <th>Status</th>
                                    <th>Ações</th>                            
                                </tr>
                                {mostrar}
                                {/*alunos.map((aluno, index) => (
                                    <tr key={index} className="bordalinha">
                                        <td style={{width: 35+'%'}}>{aluno.nome}</td>                                
                                        <td style={{width: 10+'%'}}>{moment(aluno.dtnascimento).format('DD/MM/YYYY')}</td>
                                        <td style={{width: 10+'%'}}>{aluno.matricula}</td>                                    
                                        <td style={{width: 15+'%'}}>{aluno.escola}</td>                                    
                                        <td style={{width: 10+'%'}}>{aluno.serie}</td>                                    
                                        <td style={{width: 10+'%'}}>{aluno.turno}</td>                                    
                                        <td style={{width: 10+'%'}}>
                                            <IconContext.Provider value={{ size: "2em", className: "global-class-name" }}>
                                                {<Link to={`/alunos/visualizar/${aluno.id}`} id="view" style={{textDecoration: 'none'}}> <FaEye /> </Link>}
                                                {<Link to={`/alunos/editar/${aluno.id}`} id="edit"> <FaEdit /> </Link>}
                                                {<Link to={`/alunos/editar/${aluno.id}`} id="edit"> <FaPowerOff /> </Link>}
                                            </IconContext.Provider>
                                        </td>                                
                                    </tr> 
                                ))*/}
                            </tbody>
                        </table>
                    </div>
                  
                </div>)}
            </div>
        )
    }
}