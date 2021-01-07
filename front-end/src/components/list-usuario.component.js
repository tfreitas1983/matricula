import React, { Component } from 'react'
import UsuarioDataService from '../services/usuario.service'
import AuthService from "../services/auth.service"
import {Link} from 'react-router-dom'
import {FaEdit, FaEye, FaPowerOff} from 'react-icons/fa'
import { IconContext } from "react-icons"



export default class Usuario extends Component {
    constructor(props) {
        super(props)

        this.pegaUsuarios = this.pegaUsuarios.bind(this)

        this.state = {
            currentUser: AuthService.getCurrentUser(),
            showModeratorBoard: false,
            showAdminBoard: false,
            usuarios:[],
            current: null,
            currentIndex: -1
        }
    }

    componentDidMount(){
        this.pegaUsuarios()

        if (this.state.currentUser) {
            this.setState({
              showModeratorBoard: this.state.currentUser.roles.includes("ROLE_MODERATOR"),
              showAdminBoard: this.state.currentUser.roles.includes("ROLE_ADMIN")
            })
        }
    }

    pegaUsuarios () {
        UsuarioDataService.buscarTodos()
         .then(response => {
         //REST do response da API em duas constantes: 
         // "docs" com os dados do chamado e "info" com os dados das páginas
             const usuarios = response.data 
             this.setState({
                 usuarios: usuarios
             })                
         })
         .catch(e => {
             console.log(e)
         })
    }


    render() {

        const {usuarios, showModeratorBoard, showAdminBoard} = this.state

        return (
            <div style={{margin: 60 + 'px'}}>
                { showModeratorBoard && (
                    <div>
                <h1 style={{marginLeft: 1 + '%'}}>Lista de Usuários</h1>
                <Link to={"/register"} className="btn btn-success" style={{width: 10+'%', margin: 1+'%'}}> Cadastrar </Link>

                <div className="list-group">
                    <table className="tabela">
                        <tbody>
                            <tr className="bordalinha">                                
                                <th>Usuário</th>                                
                                <th>Escola</th>
                                <th>E-mail</th>
                                <th>Perfil</th>
                                <th>Ações</th>                            
                            </tr>
                            {usuarios.map((usuario, index) => (
                                <tr key={index} className="bordalinha">
                                    <td style={{width: 20+'%'}}>{usuario.username}</td>                                
                                    <td style={{width: 15+'%'}}>{usuario.escola}</td>  
                                    <td style={{width: 30+'%'}}>{usuario.email}</td>                                    
                                    <td style={{width: 25+'%'}}>{usuario.roles.map((role, idx) =>  <div key={idx}>{role.name}</div>)}</td>                                    
                                    <td style={{width: 10+'%'}}>
                                        <IconContext.Provider value={{ size: "2em", className: "global-class-name" }}>
                                            {<Link to={`/usuarios/visualizar/${usuario._id}`} id="view" style={{textDecoration: 'none'}}> <FaEye /> </Link>}
                                            {<Link to={`/usuarios/editar/${usuario._id}`} id="edit"> <FaEdit /> </Link>}
                                            {<Link to={`/usuarios/editar/${usuario._id}`} id="edit"> <FaPowerOff /> </Link>}
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