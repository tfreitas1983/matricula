import React, { Component } from "react"
import {Link} from 'react-router-dom'
import EscolaDataService from "../services/escola.service"
import AuthService from "../services/auth.service"
import * as moment from 'moment'
import {FaSignInAlt, FaEye} from 'react-icons/fa'
import { IconContext } from "react-icons"


export default class BoardUser extends Component {
  constructor(props) {
    super(props)
    this.pegaChamados = this.pegaChamados.bind(this)


    this.state = {
      chamados: [],
            info: {},
            page: 1,
            current: null,
            currentIndex: -1,
            currentUser: AuthService.getCurrentUser(),
            selectedPage: null,
            buscaNome: ""
    }
  }

  componentDidMount() {
    /*UserService.getUserBoard().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    )*/
    this.pegaChamados() 
  }

  pegaChamados(page = 1) {        
    EscolaDataService.buscarTodos(page)
        .then(response => {
        //REST do response da API em duas constantes: 
        // "docs" com os dados do chamado e "info" com os dados das páginas
            const { docs, ...info } = response.data 
            this.setState({
                chamados: docs,
                info: info,
                page: page
            })                
        })
        .catch(e => {
            console.log(e)
        })
  }

  ativaChamado(chamado, index) {
    this.setState({
        current: chamado,
        currentIndex: index
    })
  }

  render() {
    const { chamados, current, currentUser, page, info} = this.state

    let i = 0
    let paginas = []
    for ( i = 1; i <= info.pages; i++ ) {
      paginas.push(
          <li className={"page-item " + (page === i ? "active" : "")} key={i}>
              <span className="page-link" key={i} id={i} onClick={this.selecionaPagina} >
                  {i}
              </span>
          </li>
      )            
    } 

    let mostrar = null
    if (current !== null) {
        mostrar =  <div className="autocomplete-items-active">
            {current.numchamado}{current.descricao}{current.status}{current.dt_abertura}
            {<Link to={`/chamados/${current.id}`} id="editar" className="autocomplete-items">Editar</Link>}
        </div>
    }
    let filtro = null
    if (chamados) {      
      filtro = chamados.filter((item) => {
          return (item.area === currentUser.area[0] || item.area === currentUser.area[1] || item.area === currentUser.area[2]  || item.area === currentUser.area[3] || item.area === currentUser.area[4])
      })   
      
           
      mostrar = 
      <div className="list-group">
          <table>
            <tbody>
              <tr>
                <th>Número</th>
                <th>Unidade</th>
                <th>Nome</th>
                <th>Descrição</th>
                <th>Área</th>
                <th>Data</th>
                <th>Status</th>
                <th>Ações</th>                  
              </tr>
              {filtro.map((chamado, index) => (
                <tr key={index}>
                    <td>{chamado.numchamado}</td>
                    <td>{chamado.unidade}</td>
                    <td>{chamado.nome}</td>
                    <td>{chamado.descricao}</td>
                    <td>{chamado.area}</td>
                    <td>{moment(chamado.dt_abertura).format('DD/MM/YYYY')}</td>
                    <td>{chamado.status}</td>
                    <td>
                      <IconContext.Provider value={{ size: "2em", className: "global-class-name" }}>
                        {<Link to={`/chamados/visualizar/${chamado.id}`} id="view"> <FaEye /> </Link>}
                        {<Link to={`/chamados/atender/${chamado.id}`} id="atender"> <FaSignInAlt  /> </Link>}
                      </IconContext.Provider>  
                    </td>                    
                </tr> 
              ))}
        </tbody>
      </table>
      </div>
  }

    return (
      <div>
        <h1>
            Chamados a atender            
        </h1>
        {mostrar}
      </div> 
    )
  }
}