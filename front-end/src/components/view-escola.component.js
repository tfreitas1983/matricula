import React, { Component } from 'react'
import EscolaDataService from "../services/escola.service"
import AuthService from "../services/auth.service"
import {Link} from 'react-router-dom'

export default class VisualizarEscola extends Component {
    constructor(props) {
        super(props)       
        
        this.buscarEscola = this.buscarEscola.bind(this)  
       

        this.state = {
            currentUser: AuthService.getCurrentUser(), 
            showAdminBoard: false,
            showModeratorBoard: false,           
            current: {
                id: null,
                descricao: "",
                cnpj: "",
                inep: "",
                logradouro: "",
                numero: "",
                complemento: "",
                bairro: "",
                cidade: "",
                uf: "RJ",
                cep: "",
                telefone: "",
                email: "",
                eja: false,
                subprefeitura: "",
                conveniada: false,
                lat: "",
                long: "",
                auditiva: "",
                fala: "",
                mental: "",
                motora: "",
                visual: "",
                down: "",
                autismo: "",
                outra: "",
                foto: "default.jpg",
                imagem: "",
                url:"",
                submitted: false
            }
        }
    }

    componentDidMount() {
        this.buscarEscola(this.props.match.params.id)
        
            
    if (this.state.currentUser) {
        this.setState({
          showModeratorBoard: this.state.currentUser.roles.includes("ROLE_MODERATOR"),
          showAdminBoard: this.state.currentUser.roles.includes("ROLE_ADMIN")
        })
      }
    }

    buscarEscola(id) {
        EscolaDataService.buscarUm(id)
            .then(response => {
                this.setState({
                    current: {
                        id: response.data.id,
                        descricao: response.data.descricao,                        
                        cnpj: response.data.cnpj,    
                        inep: response.data.inep,    
                        logradouro: response.data.logradouro,
                        numero: response.data.numero,
                        complemento: response.data.complemento,
                        bairro: response.data.bairro,
                        cidade: response.data.cidade,
                        uf: response.data.uf,
                        cep: response.data.cep,
                        telefone: response.data.telefone,
                        email: response.data.email,
                        eja: response.data.eja,
                        conveniada: response.data.conveniada,
                        subprefeitura: response.data.subprefeitura,
                        lat: response.data.lat,
                        long: response.data.long,
                        auditiva: response.data.auditiva,
                        fala: response.data.fala,
                        mental: response.data.mental,
                        motora: response.data.motora,
                        visual: response.data.visual,        
                        cegueira: response.data.cegueira,
                        baixaVisao: response.data.baixaVisao,
                        multipla: response.data.multipla,
                        surdoCegueira: response.data.surdoCegueira,
                        superdotacao: response.data.superdotacao,
                        down: response.data.down,
                        autismo: response.data.autismo,
                        chkOutra: response.data.chkOutra,
                        outra: response.data.outra,
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

        const {current, showAdminBoard, showModeratorBoard} = this.state

        let auditiva = null
        let autismo = null
        let down = null
        let fala = null
        let mental = null
        let motora = null
        let visual = null
        let cegueira = null
        let baixaVisao = null
        let surdoCegueira = null
        let superdotacao = null
        let multipla = null
        let outra = null

        if (current.auditiva === true) {
            auditiva = <div>
                <label> Deficiência auditiva e surdez</label>
            </div>
        }

        if (current.autismo === true) {
            autismo = <div>
                <label>Transtorno do espectro autista</label>
            </div>
        }

        if (current.fala === true) {
            fala = <div>
                <label>Fala</label>
            </div>
        }

        if (current.mental === true) {
            mental = <div>
                <label>Deficiência mental</label>
            </div>
        }

        if (current.motora === true) {
            motora = <div>
                <label>Deficiência Física</label>
            </div>
        }

        /* if (current.down === true) {
            down = <div>
                <label>Síndrome de Down</label>
            </div>
        } */

        if (current.visual === true) {
            visual = <div>
                <label>Deficiência visual</label>
            </div>
        }

        if (current.cegueira === true) {
            cegueira = <div>
                <label>Cegueira</label>
            </div>
        }

        if (current.baixaVisao === true) {
            baixaVisao = <div>
                <label>Baixa visão</label>
            </div>
        }

        if (current.surdoCegueira === true) {
            surdoCegueira = <div>
                <label>Surdocegueira</label>
            </div>
        }

        if (current.multipla === true) {
            multipla = <div>
                <label>Deficiência múltipla</label>
            </div>
        }

        if (current.superdotacao === true) {
            superdotacao = <div>
                <label>Altas habilidades / Superdotação</label>
            </div>
        }
        

        if (current.chkOutra === true) {
            outra = <div>
                <label>Outra: {current.outra}</label>
            </div>
        }

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

                        {(showAdminBoard || showModeratorBoard) && (
                        <div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="descricao"> Unidade escolar </label>
                                    <input 
                                    type="text" 
                                    className="form-control" 
                                    id="descricao"                              
                                    value={current.descricao}
                                    name="descricao"                                    
                                    disabled />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label htmlFor="cnpj"> CNPJ </label>
                                    <input 
                                    type="text" 
                                    className="form-control" 
                                    id="cnpj"                              
                                    value={current.cnpj}
                                    name="cnpj"                                    
                                    disabled />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label htmlFor="inep"> INEP </label>
                                    <input 
                                    type="text" 
                                    className="form-control" 
                                    id="inep"                              
                                    value={current.inep}
                                    name="inep"                                    
                                    disabled />
                                </div>
                            </div>
                        </div>                            
                        <div className="row">
                            <div className="col-md-6">
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
                            </div>
                            
                            <div className="col-md-3">
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
                            <div className="col-md-3">
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
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label htmlFor="cidade"> Cidade </label>
                                    <input 
                                    type="text" 
                                    className="form-control" 
                                    id="cidade"                                                 
                                    value={current.cidade} 
                                    disabled
                                    name="cidade" />                            
                                </div>
                            </div>
                            <div className="col-md-2">
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
                            <div className="col-md-3">
                                <div className="form-check">
                                    <label className="form-check-label" style={{marginRight: 2+'%'}}>
                                        <input className="form-check-input" type="checkbox" disabled checked={current.eja} onChange={this.handlerEja} style={{marginRight: 1+'%'}} /> Possui EJA
                                    </label>                                    
                                </div>
                            </div>
                            <div className="col-md-3">
                            <div className="form-check">
                                    <label className="form-check-label" style={{marginRight: 2+'%'}}>
                                        <input className="form-check-input" disabled type="checkbox" checked={current.conveniada}  onChange={this.handlerConveniada} style={{marginRight: 1+'%'}} /> Conveniada
                                    </label>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="subprefeitura"> Subprefeitura </label>
                                    <input 
                                    type="subprefeitura" 
                                    className="form-control" 
                                    id="subprefeitura" 
                                    disabled 
                                    value={current.subprefeitura}
                                    name="subprefeitura" />                            
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
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label style={{marginTop: 1+'%'}}>Deficiência(s) atendida(s): </label>                                    
                                </div>
                            </div>                         
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">                                    
                                    {auditiva}  {/*down*/} {fala} {mental} {motora} {visual} {cegueira} 
                                    {surdoCegueira} {baixaVisao} {multipla} {autismo} {superdotacao} {outra}
                                </div>
                            </div>                            
                        </div>
                        <div style={{display:'flex', justifyContent: 'space-around'}}>             
                            <Link to={"/escolas"} className="btn btn-info">
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