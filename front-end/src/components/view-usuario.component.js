import React, { Component } from 'react'
import UsuarioDataService from "../services/usuario.service"
import AuthService from "../services/auth.service"
import {Link} from 'react-router-dom'
//import * as moment from 'moment'

export default class VisualizarUsuario extends Component {
    constructor(props) {
        super(props)       
        
        this.buscarUsuario = this.buscarUsuario.bind(this)       

        this.state = {
            currentUser: AuthService.getCurrentUser(),
            showModeratorBoard: false,
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


    render() {

        const {current, showModeratorBoard} = this.state

        let mostraEscola = null

        if (current.escola !== "" || current.escola !== undefined) {
            mostraEscola = <div>
                <div className="form-group">
                    <label htmlFor="escola"> Escola </label>
                    <input 
                    type="text" 
                    className="form-control" 
                    id="escola" 
                    disabled    
                    value={current.escola}                      
                    name="escola" />
                </div>
            </div>
        }

        return (
            <div className="submit-form">
                { this.state.submitted ? (
                    <div style={{margin: 5 + '%'}}>
                        <h4> Usuário cadastrado com sucesso!</h4>
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
                                        disabled 
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
                            </div>
                        </div>)}
                    </div>
                    
                        )}
            </div>
        )
    }
}