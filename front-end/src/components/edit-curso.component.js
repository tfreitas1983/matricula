import React, { Component } from 'react'
import CursoDataService from "../services/curso.service"
import AuthService from "../services/auth.service"
import {Link} from 'react-router-dom'
//import * as moment from 'moment'

export default class EditarCurso extends Component {
    constructor(props) {
        super(props)       
        
        this.buscarCurso = this.buscarCurso.bind(this)
        this.salvarCurso = this.salvarCurso.bind(this)  
        this.handlerDescricao = this.handlerDescricao.bind(this)     

        this.state = {
            currentUser: AuthService.getCurrentUser(),
            voltar: "",
            message: "",
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

    handlerDescricao(e) {
        const descricao = e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                descricao: descricao
            }
        }))
    }
   
    salvarCurso() {

        var data = {
            descricao: this.state.current.descricao,
        }

        CursoDataService.editar(this.state.current.id ,data)
        .then(response => {
            this.setState({
                message: "O curso foi alterado com sucesso!",
                voltar: true
            })
        })
        .catch(e => {
            console.log(e)
        })
    }
    
    

    render() {

        const {current, voltar} = this.state

        let botao = null

        if (voltar === true) {
            botao = <div>
                <Link to={"/cursos"} className="btn btn-info">Voltar</Link>
            </div>
        }

        return (                
            <div style={{margin: 5 + '%'}}>
                { current ? (
                    <div>

                        <div className="form-group">
                            <label htmlFor="descricao"> Nome do curso </label>
                            <input 
                            type="text" 
                            className="form-control" 
                            id="descricao"                              
                            value={current.descricao}
                            onChange={this.handlerDescricao}
                            name="descricao"
                            autoFocus />
                        </div>
                    
                        <div style={{display:'flex', justifyContent: 'space-around'}}>             
                            <button onClick={this.salvarCurso} className="btn btn-success">
                                Salvar
                            </button>
                        </div>

                        <h4>{this.state.message}</h4>
                        {botao}
                    </div>
                ) : (
                    <div>
                     <br />
                    <p>Selecione um curso...</p>
                </div>
                )}   
            </div>
        )
    }
}