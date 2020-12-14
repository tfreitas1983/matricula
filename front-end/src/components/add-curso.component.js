import React, { Component } from 'react'
import CursoDataService from "../services/curso.service"
import AuthService from "../services/auth.service"
import {Link} from 'react-router-dom'

import Form from "react-validation/build/form"
import Input from "react-validation/build/input"
import CheckButton from "react-validation/build/button"

const required = value => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          Este campo é obrigatório!
        </div>
      )
    }
  }

export default class AdicionarCurso extends Component {
    constructor(props) {
        super(props)
        this.handlerDescricao = this.handlerDescricao.bind(this)    
        this.pegaCursos = this.pegaCursos.bind(this)
        this.salvarCurso = this.salvarCurso.bind(this)        

        this.state = {
            currentUser: AuthService.getCurrentUser(),
            cursos: [],
            descricao: "",
            situacao: true,
            submitted: false,
            successful: false,
            message: ""
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

    handlerDescricao(e) {
        this.setState({
            descricao: e.target.value
        })
    }
   
    salvarCurso(e) {
        e.preventDefault();

        this.setState({
        message: "",
        successful: false
        });

        this.form.validateAll()

        var data = {
            descricao: this.state.descricao,
        }

        if (this.checkBtn.context._errors.length === 0) {
            CursoDataService.cadastrar(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    descricao: response.data.descricao,
                    situacao: response.data.situacao,
                    submitted: true,
                    message: response.data.message,
                    successful: true
                })            
            },
            error => {
                const resMessage =
                  (error.response && error.response.data && error.response.data.message) || 
                  error.message || error.toString();
      
                this.setState({
                  successful: false,
                  message: resMessage
                });
              })
            .catch(e => {
                console.log(e)
            })
        }
    }
    

    render() {
        const {cursos} = this.state

        
        let filtro = ""
        filtro =  cursos.filter((item) => {
            return this.state.descricao === item.descricao
         })
        
        let comparar = ""
         comparar= filtro.map((item, index)=> {
             return item.descricao
        })     

        let vdescricao = null
        if (comparar.length > 0 && (this.state.descricao === comparar[0].toString()) ) {
            vdescricao = 
            <div className="alert alert-danger" role="alert">
                Este curso já foi cadastrado.
            </div>            
        }       
       
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
                        <Form onSubmit={this.salvarCurso} ref={c => { this.form = c; }} >
                            {!this.state.successful && (
                                <div>
                                    <div className="form-group">
                                        <label htmlFor="descricao"> Nome do curso </label>
                                        <Input 
                                        type="text" 
                                        className="form-control" 
                                        id="descricao"                                          
                                        value={this.state.descricao} 
                                        onChange={this.handlerDescricao}                                      
                                        name="descricao"
                                        validation={[required]}
                                        autoFocus/>
                                    </div>
                                    {vdescricao}
                                                
                                    <button onClick={this.salvarCurso} className="btn btn-success">
                                        Adicionar
                                    </button>
                                </div>
                            )}
                            {this.state.message && (
                                <div className="form-group">
                                    <div
                                    className={
                                        this.state.successful
                                        ? "alert alert-success"
                                        : "alert alert-danger"
                                    }
                                    role="alert"
                                    >
                                    {this.state.message}
                                    </div>
                                </div>
                            )}
                            <CheckButton style={{ display: "none" }} ref={c => {this.checkBtn = c;}}/>
                        </Form>
                    </div>
                )}
            </div>
        )
    }
}