import React, { Component } from 'react'
import UsuarioDataService from "../services/usuario.service"
import AuthService from "../services/auth.service"
import EscolaDataService from "../services/escola.service"
import {Link} from 'react-router-dom'
//import * as moment from 'moment'

export default class EditarUsuario extends Component {
    constructor(props) {
        super(props)       
        
        this.buscarUsuario = this.buscarUsuario.bind(this)
        this.handlerEmail = this.handlerEmail.bind(this) 
        this.handlerEscola = this.handlerEscola.bind(this) 
        
        this.pegaEscolas = this.pegaEscolas.bind(this)
        this.salvarUsuario = this.salvarUsuario.bind(this)

        this.state = {
            currentUser: AuthService.getCurrentUser(),
            showModeratorBoard: false,
            escolas: [],
            message: "",
            current: {
                id: null,                
                username: "",
                email: "",
                escola: "",
                situacao: "",
                submitted: false
            }
        }
    }

    componentDidMount() {
        this.buscarUsuario(this.props.match.params.id)
        this.pegaEscolas()

        if (this.state.currentUser) {
            this.setState({
            showModeratorBoard: this.state.currentUser.roles.includes("ROLE_MODERATOR")
            })
        }
    }

    buscarUsuario(id) {
        UsuarioDataService.buscarUm(id)
            .then(response => {
                this.setState({
                    current: {
                        id: response.data._id,
                        username: response.data.username,                        
                        email: response.data.email,
                        escola: response.data.escola,
                        situacao: response.data.situacao                     
                    }
                })
            })
            .catch(e => {
                console.log(e)
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
                info: info,
                page: page
            })                
        })
        .catch(e => {
            console.log(e)
        })
    }

    handlerEmail(e) {
        const email = e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                email: email
            }
        }))
    }

    handlerEscola(e) {
        const selectedEscola = e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                escola: selectedEscola
            }
        }))
    }

    salvarUsuario() {
        var data = {
            id: this.state.current.id,
            username: this.state.current.username,
            email: this.state.current.email,
            escola: this.state.current.escola,
            situacao: this.state.current.situacao,
            submitted: true
        }

        UsuarioDataService.editar(this.state.current.id, data)
        .then(response => {
            this.setState({
                message: "O usuário foi alterado com sucesso!",
                voltar: true
            })

        })
        .catch(e => {
            console.log(e)
        })
    }


    render() {

        const {current, escolas, showModeratorBoard} = this.state

        let mostraEscola = null
        let lista = escolas.map((escola, index)=> (
            <option value={escola.descricao} key={index}>{escola.descricao}</option>
        ))

        if (current.escola !== undefined || current.escola !== "") {
            mostraEscola = <div>
                <div className="form-group">
                    <label htmlFor="email"> Escola </label>
                    <select 
                    className="form-control" 
                    id="escola" 
                    name="escola"
                    value={current.escola}                                    
                    onChange={this.handlerEscola} > 
                        <option value="" > --- Selecione a escola ---</option>
                        {lista}
                    </select>
                </div>
            </div>
        }

        return (
            <div className="submit-form">
                { this.state.submitted ? (
                    <div style={{margin: 5 + '%'}}>
                        <h4> Usuário alterado com sucesso!</h4>
                        <Link to={"/usuarios"} className="btn btn-success">
                            Voltar
                        </Link>
                    </div>
                ) : (
                
                    <div style={{margin: 5 + '%'}}>
                        {showModeratorBoard && ( <div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="username"> Usuário </label>
                                        <input 
                                        type="text" 
                                        className="form-control" 
                                        id="username"                              
                                        value={current.username}
                                        name="username"
                                        disabled />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="email"> E-mail </label>
                                        <input 
                                        type="text" 
                                        className="form-control" 
                                        id="email" 
                                        value={current.email} 
                                        onChange={this.handlerEmail} 
                                        name="email" />
                                    </div>
                                </div>
                            </div>
                            
                            <div className="row">
                                <div className="col-md-6">
                                    {mostraEscola}
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="situacao"> Situação </label>
                                        <input 
                                        type="situacao" 
                                        className="form-control" 
                                        id="situacao" 
                                        disabled 
                                        value={current.situacao}
                                        name="situacao" />                            
                                    </div>
                                </div>                           
                            </div>
                            <div style={{display:'flex', justifyContent: 'space-around'}}>             
                                <Link to={"/usuarios"} className="btn btn-info">
                                    Voltar
                                </Link>
                                <button onClick={this.salvarUsuario} className="btn btn-success" style={{width: 15+'%'}}>
                                    Salvar
                                </button>                                
                            </div>
                            <h4>  {this.state.message}  </h4>
                        </div>)}
                    </div>
                )}
            </div>
        )
    }
}