import React, { Component } from 'react'
import CursoDataService from "../services/curso.service"
import AuthService from "../services/auth.service"
import {Link} from 'react-router-dom'
//import * as moment from 'moment'

export default class VisualizarCurso extends Component {
    constructor(props) {
        super(props)       
        
        this.buscarCurso = this.buscarCurso.bind(this)       

        this.state = {
            currentUser: AuthService.getCurrentUser(),
            current: {
                id: null,
                descricao: "",
                submitted: false
            }
        }
    }

    componentDidMount() {
        this.buscarCurso(this.props.match.params.id)
    }

    buscarCurso(id) {
        CursoDataService.buscarUm(id)
            .then(response => {
                this.setState({
                    current: {
                        id: response.data.id,
                        descricao: response.data.descricao, 
                        situacao: response.data.situacao                     
                    }
                })
            })
            .catch(e => {
                console.log(e)
            })    
    }
    

    render() {

        const {current} = this.state

        return (
            <div className="submit-form">
                { this.state.submitted ? (
                    <div style={{margin: 5 + '%'}}>
                        <h4> Curso cadastrado com sucesso!</h4>
                        <Link to={"/cursos"} className="btn btn-success">
                            Voltar
                        </Link>
                    </div>
                ) : (
                
                    <div style={{margin: 5 + '%'}}>

                        <div className="form-group">
                            <label htmlFor="descricao"> Nome do curso </label>
                            <input 
                            type="text" 
                            className="form-control" 
                            id="descricao"                              
                            value={current.descricao}
                            name="descricao"
                            disabled />
                        </div>
                    
                        <div style={{display:'flex', justifyContent: 'space-around'}}>             
                            <Link to={"/cursos"} className="btn btn-info">
                                Voltar
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}