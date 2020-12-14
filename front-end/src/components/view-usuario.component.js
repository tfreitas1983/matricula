import React, { Component } from 'react'
import EscolaDataService from "../services/escola.service"
import AuthService from "../services/auth.service"
import {Link} from 'react-router-dom'
//import * as moment from 'moment'

export default class VisualizarEscola extends Component {
    constructor(props) {
        super(props)       
        
        this.buscarEscola = this.buscarEscola.bind(this)       

        this.state = {
            currentUser: AuthService.getCurrentUser(),
            current: {
                id: null,
                descricao: "",
                logradouro: "",
                numero: "",
                complemento: "",
                bairro: "",
                cidade: "Belford Roxo",
                uf: "RJ",
                cep: "",
                telefone: "",
                email: "",
                lat: "",
                long: "",
                foto: "default.jpg",
                imagem: "",
                url:"",
                submitted: false
            }
        }
    }

    componentDidMount() {
        this.buscarEscola(this.props.match.params.id)
    }

    buscarEscola(id) {
        EscolaDataService.buscarUm(id)
            .then(response => {
                this.setState({
                    current: {
                        id: response.data.id,
                        descricao: response.data.descricao,                        
                        logradouro: response.data.logradouro,
                        numero: response.data.numero,
                        complemento: response.data.complemento,
                        bairro: response.data.bairro,
                        cidade: response.data.cidade,
                        uf: response.data.uf,
                        cep: response.data.cep,
                        telefone: response.data.telefone,
                        email: response.data.email,
                        lat: response.data.lat,
                        long: response.data.long,
                        foto: response.data.foto,
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
                        <h4> Escola cadastrada com sucesso!</h4>
                        <Link to={"/escolas"} className="btn btn-success">
                            Voltar
                        </Link>
                    </div>
                ) : (
                
                    <div style={{margin: 5 + '%'}}>

                        <div className="form-group">
                            <label htmlFor="descricao"> Nome da escola </label>
                            <input 
                            type="text" 
                            className="form-control" 
                            id="descricao"                              
                            value={current.descricao}
                            name="descricao"
                            disabled />
                        </div>
                    
                        

                        <div className="form-group">
                            <label htmlFor="logradouro"> Endereço </label>
                            <input 
                            type="text" 
                            className="form-control" 
                            id="logradouro" 
                            value={current.logradouro} 
                            disabled 
                            name="logradouro" />
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="numero"> Número </label>
                                    <input 
                                    type="text" 
                                    className="form-control" 
                                    id="numero" 
                                    value={current.numero} 
                                    disabled
                                    name="numero" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="complemento"> Complemento </label>
                                    <input 
                                    type="text" 
                                    className="form-control" 
                                    id="complemento" 
                                    value={current.complemento} 
                                    disabled 
                                    name="complemento" />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="bairro"> Bairro </label>
                                    <input 
                                    type="text" 
                                    className="form-control" 
                                    id="bairro" 
                                    required 
                                    value={current.bairro} 
                                    disabled
                                    name="bairro" />                            
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="cep"> CEP </label>
                                    <input 
                                    type="text" 
                                    className="form-control" 
                                    id="cep" 
                                    disabled
                                    value={current.cep} 
                                    name="cep" />                            
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="telefone"> Telefone </label>
                                    <input 
                                    type="text" 
                                    className="form-control" 
                                    id="telefone"                              
                                    value={current.telefone} 
                                    disabled
                                    name="telefone" />                            
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="email"> E-mail </label>
                                    <input 
                                    type="email" 
                                    className="form-control" 
                                    id="email" 
                                    disabled 
                                    value={current.email} 
                                    name="email" />                            
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="lat"> Latitude </label>
                                    <input 
                                    type="lat" 
                                    className="form-control" 
                                    id="lat" 
                                    disabled 
                                    value={current.lat}
                                    name="lat" />                            
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="long"> Longitude </label>
                                    <input 
                                    type="long" 
                                    className="form-control" 
                                    id="long" 
                                    disabled 
                                    value={current.long} 
                                    name="long" />                            
                                </div>
                            </div>
                        </div>
                        <div style={{display:'flex', justifyContent: 'space-around'}}>             
                            <Link to={"/escolas"} className="btn btn-info">
                                Voltar
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}