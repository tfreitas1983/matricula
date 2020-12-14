import React, { Component } from 'react'
import CursoDataService from "../services/curso.service"
import AuthService from "../services/auth.service"
import {Link} from 'react-router-dom'
import {FaEdit, FaEye} from 'react-icons/fa'
import { IconContext } from "react-icons"

export default class Curso extends Component {
    constructor(props) {
        super(props)

        this.pegaCursos = this.pegaCursos.bind(this)
        this.handlerBuscaDescricao = this.handlerBuscaDescricao.bind(this)
        this.buscarDescricao = this.buscarDescricao.bind(this)
        
        this.state = {
            cursos: [],
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
        this.pegaCursos()        
    }

    pegaCursos(page = 1) {        
        CursoDataService.buscarTodos(page)
            .then(response => {
            //REST do response da API em duas constantes: 
            // "docs" com os dados do chamado e "info" com os dados das páginas
                const { docs, ...info } = response.data 
                this.setState({
                    cursos: docs,
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
        CursoDataService.buscarNome(this.state.buscaDescricao, page)
        .then(response => {
            const { docs, ...info } = response.data 
            this.setState({
                cursos: response.data.docs,
                info: info                                 
            })    
        })
        .catch(e => {
            console.log(e)
        })        
    }

    render() {

        const {cursos} = this.state

        return (
            <div style={{margin: 60 + 'px'}}>
                <h1 style={{marginLeft: 1 + '%'}}>Lista de Cursos</h1>
                <Link to={"/cursos/adicionar"} className="btn btn-success" style={{width: 10+'%', margin: 1+'%'}}> Cadastrar </Link>

                <div className="list-group">
                    <table className="tabela">
                        <tbody>
                            <tr className="bordalinha">                                
                                <th>Descrição</th>
                                <th>Ações</th>                            
                            </tr>
                            {cursos.map((turma, index) => (
                                <tr key={index} className="bordalinha">
                                    <td style={{width: 50+'%'}}>{turma.descricao}</td>                                
                                    <td style={{width: 10+'%'}}>
                                        <IconContext.Provider value={{ size: "2em", className: "global-class-name" }}>
                                            {<Link to={`/cursos/visualizar/${turma.id}`} id="view" style={{textDecoration: 'none'}}> <FaEye /> </Link>}
                                            {<Link to={`/cursos/editar/${turma.id}`} id="edit"> <FaEdit /> </Link>}
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