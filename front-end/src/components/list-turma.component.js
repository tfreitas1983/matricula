import React, { Component } from 'react'
import TurmaDataService from "../services/turma.service"
import AuthService from "../services/auth.service"
import {Link} from 'react-router-dom'
import {FaEdit, FaEye, FaPowerOff} from 'react-icons/fa'
import { IconContext } from "react-icons"

export default class Turma extends Component {
    constructor(props) {
        super(props)

        this.pegaTurmas = this.pegaTurmas.bind(this)
        this.handlerBuscaDescricao = this.handlerBuscaDescricao.bind(this)
        this.buscarDescricao = this.buscarDescricao.bind(this)
        
        this.state = {
            turmas: [],
            info: {},
            page: 1,
            current: null,
            currentIndex: -1,
            currentUser: AuthService.getCurrentUser(),            
            showAdminBoard: false,
            showModeratorBoard: false,
            selectedPage: null,
            buscaDescricao: "",
        }
    }

    componentDidMount() {
        this.pegaTurmas()        

        if (this.state.currentUser) {
            this.setState({
              showModeratorBoard: this.state.currentUser.roles.includes("ROLE_MODERATOR"),
              showAdminBoard: this.state.currentUser.roles.includes("ROLE_ADMIN")
            })
        }
    }

    pegaTurmas(page = 1) {        
        TurmaDataService.buscarTodos(page)
            .then(response => {
            //REST do response da API em duas constantes: 
            // "docs" com os dados do chamado e "info" com os dados das páginas
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


    handlerBuscaDescricao(e) {
        const buscaDescricao = e.target.value
        this.buscarDescricao()        
        this.setState({
            buscaDescricao: buscaDescricao
        })
    }

    buscarDescricao(page = 1) {        
        TurmaDataService.buscarNome(this.state.buscaDescricao, page)
        .then(response => {
            const { docs, ...info } = response.data 
            this.setState({
                turmas: response.data.docs,
                info: info                                 
            })    
        })
        .catch(e => {
            console.log(e)
        })        
    }

    render() {

        const {turmas, showAdminBoard, showModeratorBoard} = this.state

        return (
            <div style={{margin: 60 + 'px'}}>
                {(showAdminBoard || showModeratorBoard) && (
                    <div>
                <h1 style={{marginLeft: 1 + '%'}}>Lista de Turmas</h1>
                <Link to={"/turmas/adicionar"} className="btn btn-success" style={{width: 10+'%', margin: 1+'%'}}> Cadastrar </Link>

                <div className="list-group">
                    <table className="tabela">
                        <tbody>
                            <tr className="bordalinha"> 
                                <th>Escola</th>                               
                                <th>Descrição</th>
                                <th>Quantidade</th>
                                <th>Nível</th>
                                <th>Série</th>
                                <th>Turno</th>
                                <th>Deficiência?</th>
                                <th>Ações</th>                            
                            </tr>
                            {turmas.map((turma, index) => (
                                <tr key={index} className="bordalinha">
                                    <td style={{width: 20+'%'}}>{turma.escola}</td>
                                    <td style={{width: 10+'%'}}>{turma.descricao}</td>                                
                                    <td style={{width: 10+'%'}}>{turma.qtd}</td>
                                    <td style={{width: 15+'%'}}>{turma.nivel}</td>  
                                    <td style={{width: 10+'%'}}>{turma.serie}</td>
                                    <td style={{width: 10+'%'}}>{turma.turno}</td>
                                    <td style={{width: 10+'%'}}>
                                        
                                    </td>                                                                         
                                    <td style={{width: 15+'%'}}>
                                        <IconContext.Provider value={{ size: "2em", className: "global-class-name" }}>
                                            {<Link to={`/turmas/visualizar/${turma.id}`} id="view" style={{textDecoration: 'none'}}> <FaEye /> </Link>}
                                            {<Link to={`/turmas/editar/${turma.id}`} id="edit"> <FaEdit /> </Link>}
                                            {<Link to={`/turmas/editar/${turma.id}`} id="edit"> <FaPowerOff /> </Link>}
                                        </IconContext.Provider>
                                    </td>                                
                                </tr> 
                            ))}
                        </tbody>
                    </table>
                </div>
                </div>)}
            </div>
        )
    }
}