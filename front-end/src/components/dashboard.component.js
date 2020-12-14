import React, { Component } from 'react'
import EscolaDataService from "../services/escola.service"
import AuthService from "../services/auth.service"
import {Link} from 'react-router-dom'
//import * as moment from 'moment'
import {FaEdit, FaEye} from 'react-icons/fa'
import { IconContext } from "react-icons"

export default class Dashboard extends Component {
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
            selectedPage: null,
            buscaDescricao: "",
        }
    }

    componentDidMount() {
        this.pegaEscolas()        
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

        const {escolas} = this.state

        return (
            <div style={{marginTop: 60 + 'px'}}>
                <h1>Lista de Escolas</h1>
                <Link to={"/escolas/adicionar"}> Cadastrar </Link>

                <div className="list-group">
                    <table>
                        <tbody>
                            <tr>                                
                                <th>Descrição</th>
                                <th>Telefone</th>
                                <th>E-mail</th>
                                <th>Ações</th>                            
                            </tr>
                            {escolas.map((escola, index) => (
                                <tr key={index}>
                                    <td>{escola.descricao}</td>                                
                                    <td>{escola.telefone}</td>
                                    <td>{escola.email}</td>                                    
                                    <td>
                                        <IconContext.Provider value={{ size: "2em", className: "global-class-name" }}>
                                            {<Link to={`/escolas/visualizar/${escola.id}`} id="view"> <FaEye /> </Link>}
                                            {<Link to={`/escolas/editar/${escola.id}`} id="edit"> <FaEdit /> </Link>}
                                        </IconContext.Provider>
                                    </td>                                
                                </tr> 
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}