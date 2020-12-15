import React, { Component } from 'react'
import EscolaDataService from "../services/escola.service"
import AuthService from "../services/auth.service"
import {Link} from 'react-router-dom'
//import * as moment from 'moment'
import {FaEdit, FaEye, FaPowerOff} from 'react-icons/fa'
import { IconContext } from "react-icons"

export default class Escola extends Component {
    constructor(props) {
        super(props)

        this.pegaEscolas = this.pegaEscolas.bind(this)
        this.handlerBuscaDescricao = this.handlerBuscaDescricao.bind(this)
        this.buscarDescricao = this.buscarDescricao.bind(this)
        
        this.state = {
            escolas: [],
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
        this.pegaEscolas() 
        
        
    if (this.state.currentUser) {
        this.setState({
          showModeratorBoard: this.state.currentUser.roles.includes("ROLE_MODERATOR"),
          showAdminBoard: this.state.currentUser.roles.includes("ROLE_ADMIN")
        })
      }
    }

    pegaEscolas(page = 1) {        
        EscolaDataService.buscarTodos(page)
        .then(response => {
        //REST do response da API em duas constantes: 
        // "docs" com os dados do chamado e "info" com os dados das páginas
            const { docs, ...info } = response.data 
            this.setState({
                escolas: docs,
                info: info,
                page: page
            })                
        })
        .catch(e => {
            console.log(e)
        })
    }

    ativaEscola(escola, index) {
        this.setState({
            current: escola,
            currentIndex: index
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
        EscolaDataService.buscarNome(this.state.buscaDescricao, page)
        .then(response => {
            const { docs, ...info } = response.data 
            this.setState({
                escolas: response.data.docs,
                info: info                                 
            })    
        })
        .catch(e => {
            console.log(e)
        })        
    }

    render() {

        const {escolas, showAdminBoard, showModeratorBoard} = this.state

        return (
            <div style={{margin: 60 + 'px'}}>
                {showAdminBoard || showModeratorBoard && (
                    <div>
                <h1 style={{marginLeft: 1 + '%'}}>Lista de Escolas</h1>
                <Link to={"/escolas/adicionar"} className="btn btn-success" style={{width: 10+'%', margin: 1+'%'}}> Cadastrar </Link>

                <div className="list-group">
                    <table className="tabela">
                        <tbody>
                            <tr className="bordalinha">                                
                                <th>Descrição</th>
                                <th>Telefone</th>
                                <th>E-mail</th>
                                <th>Ações</th>                            
                            </tr>
                            {escolas.map((escola, index) => (
                                <tr key={index} className="bordalinha">
                                    <td style={{width: 40+'%'}}>{escola.descricao}</td>                                
                                    <td style={{width: 15+'%'}}>{escola.telefone}</td>
                                    <td style={{width: 35+'%'}}>{escola.email}</td>                                    
                                    <td style={{width: 10+'%'}}>
                                        <IconContext.Provider value={{ size: "2em", className: "global-class-name" }}>
                                            {<Link to={`/escolas/visualizar/${escola.id}`} id="view" style={{textDecoration: 'none'}}> <FaEye /> </Link>}
                                            {<Link to={`/escolas/editar/${escola.id}`} id="edit"> <FaEdit /> </Link>}
                                            {<Link to={`/escolas/editar/${escola.id}`} id="edit"> <FaPowerOff /> </Link>}
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