import React, { Component } from 'react'
import AlunoDataService from "../services/aluno.service"
import { Link } from 'react-router-dom'
import * as moment from 'moment'
import cabecalho from '../images/cabecalho.jpg'

export default class Status extends Component {
    constructor(props) {
        super(props)

        this.buscaAluno = this.buscaAluno.bind(this)
        
        this.state = {
            current: {
                id: null,                
                nome: "",
                dtnascimento: "",
                sexo: "",
                rg: "",
                cpf: "",
                nis: "",
                bolsafamilia: "",
                matricula: "",
                protocolo: "",
                nivel: "",
                serie: "",
                turma: "",
                turno: "",
                escola: "",
                conveniada: false,
                responsavel: "",
                cpf_responsavel: "",
                logradouro: "",
                numero: "",
                complemento: "",
                bairro: "",
                cidade: "",
                uf: "RJ",
                cep: "",
                telefone: "",
                celular: "",
                email: "",
                eja: false,
                deficiente: "Não",
                mental: false,
                fala: false,
                auditiva: false,
                motora: false,
                visual: false,
                down: false,
                autismo: false,
                chkOutra: false,
                outra: "",
                lat: "",
                long: "",
                foto: "default.jpg",
                status: "",
                situacao: true,
                imagem: "",
                url: "",
                status: "",
                submitted: false,
                successful: false,
                message: ""
            }
        }
    }

    componentDidMount(){
        this.buscaAluno(this.props.match.params.id)
    }

    buscaAluno(id) {
        AlunoDataService.buscarUm(id)
        .then(response => {
            this.setState({
                current: {
                    id: response.data.id,
                    nome: response.data.nome,
                    dtnascimento: moment(response.data.dtnascimento).format('YYYY-MM-DD'),
                    sexo: response.data.sexo,
                    rg: response.data.rg,
                    cpf: response.data.cpf,
                    nis: response.data.nis,
                    bolsafamilia: response.data.bolsafamilia,
                    matricula: response.data.matricula,
                    protocolo: response.data.protocolo,
                    nivel: response.data.nivel,
                    serie: response.data.serie,
                    turma: response.data.turma,
                    turno: response.data.turno,
                    irmao: response.data.irmao,
                    vulneravel: response.data.vulneravel,
                    escola: response.data.escola,
                    responsavel: response.data.responsavel,
                    cpf_responsavel: response.data.cpf_responsavel,
                    logradouro: response.data.logradouro,
                    numero: response.data.numero,
                    complemento: response.data.complemento,
                    bairro: response.data.bairro,
                    cidade: response.data.cidade,
                    uf: "RJ",
                    cep: response.data.cep,
                    telefone: response.data.telefone,
                    celular: response.data.celular,
                    email: response.data.email,
                    eja: false,
                    deficiente: response.data.deficiente,
                    mental: false,
                    fala: false,
                    auditiva: false,
                    motora: false,
                    visual: false,
                    down: false,
                    autismo: false,
                    chkOutra: false,
                    outra: response.data.outra,
                    lat: response.data.lat,
                    long: response.data.long,
                    foto: "default.jpg",
                    status: response.data.status,
                    situacao: true,
                    imagem: response.data.imagem,
                    url: response.data.url
                }
            })
        })
        .catch(e => {
            console.log(e)
        })          
    }

    render() {

        const {current} = this.state

        let deficiencias = null
        let outraDeficiencia = null
        if (current.chkOutra === true) {
            outraDeficiencia = 
                <input type="text" className="form-control" onChange={this.handlerOutra} placeholder="Digite a deficiência" />          
        }

        if (current.deficiente === 'Sim') {
            deficiencias = <div>
                <label className="col-sm-6" style={{padding: 0}}>Marque as deficiências que o(a) candidato(a) possui: </label>
                <div className="form-group row">                    
                    <div className="col-sm-12">
                        <div className="form-check">
                            <label className="form-check-label"  style={{marginRight: 3+'%'}}>
                                <input className="form-check-input" type="checkbox" onChange={this.handlerAuditiva} /> Auditiva
                            </label>
                            <label className="form-check-label"  style={{marginRight: 3+'%'}}>
                                <input className="form-check-input" type="checkbox" onChange={this.handlerFala} /> Fala
                            </label>
                            <label className="form-check-label"  style={{marginRight: 3+'%'}}>
                                <input className="form-check-input" type="checkbox" onChange={this.handlerMental} /> Mental
                            </label>
                            <label className="form-check-label"  style={{marginRight: 3+'%'}}>
                                <input className="form-check-input" type="checkbox" onChange={this.handlerMotora} /> Motora
                            </label>
                            <label className="form-check-label"  style={{marginRight: 3+'%'}}>
                                <input className="form-check-input" type="checkbox" onChange={this.handlerVisual} /> Visual
                            </label>
                            <label className="form-check-label"  style={{marginRight: 3+'%'}}>
                                <input className="form-check-input" type="checkbox" onChange={this.handlerDown}/> Síndrome de Down
                            </label>
                            <label className="form-check-label"  style={{marginRight: 3+'%'}}>
                                <input className="form-check-input" type="checkbox" onChange={this.handlerAutismo} /> Autismo
                            </label>
                            <label className="form-check-label"  style={{marginRight: 3+'%'}}>
                                <input className="form-check-input" type="checkbox" onChange={this.handlerChkOutra} /> Outra
                            </label>
                            {outraDeficiencia}
                        </div>
                    </div>                    
                </div>
            </div>
        }

        let status = null
        if (current.status === "Aprovado(a)") {
            status = <div style={{display: 'grid', justifyContent: 'center'}}>
                <h2>A sua solicitação foi aprovada pela Secretaria de Educação</h2>
                <p>Acompanhe os passos a serem seguidos enviados ao e-mail ou <Link to={"/documentos"}>clique aqui</Link>, para visualizar</p>
            </div>
        }

        return (
            <div>
                
                
                <div style={{display: 'grid', justifyContent: 'center'}}>
                    <div >
                        <img src={cabecalho} alt="cabeçalho" style={{height: 70+'%', width: 70+'%'}} />
                    </div>
                    <h1>
                        Status da solicitação: {current.status}
                    </h1> 
                    
                </div>
                {status}
                <div style={{margin: 5 + '%', fontWeight: 'bold'}}>
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                DADOS DO RESPONSÁVEL
                                <div className="panel-body">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="responsavel"> Responsável </label>
                                                <input 
                                                type="text" 
                                                className="form-control" 
                                                value={current.responsavel}                                                 
                                                disabled />
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="form-group">
                                                <label htmlFor="cpf_responsavel"> CPF Responsável </label>
                                                <input 
                                                type="text" 
                                                className="form-control" 
                                                value={current.cpf_responsavel}                                                
                                                disabled  />
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="form-group">
                                                <label htmlFor="cep"> CEP </label>
                                                <input 
                                                type="text" 
                                                className="form-control" 
                                                value={current.cep} 
                                                disabled />
                                            </div>  
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="endereco"> Endereço </label>
                                                <input 
                                                type="text" 
                                                className="form-control" 
                                                value={current.logradouro}                                                 
                                                disabled />
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="form-group">
                                                <label htmlFor="numero"> Número </label>
                                                <input 
                                                type="text" 
                                                className="form-control" 
                                                value={current.numero}                                                
                                                disabled  />
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="form-group">
                                                <label htmlFor="complemento"> Complemento </label>
                                                <input 
                                                type="text" 
                                                className="form-control" 
                                                value={current.complemento} 
                                                disabled />
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
                                                value={current.bairro} 
                                                disabled
                                                name="bairro" />                            
                                            </div>
                                        </div> 
                                        <div className="col-md-3">
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
                                        <div className="col-md-3">
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
                                </div>                                
                            </div>
                        </div>
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                DADOS DO(A) CANDIDATO(A)
                                <div className="panel-body">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="nome"> Nome </label>
                                                <input 
                                                type="text" 
                                                className="form-control" 
                                                id="nome" 
                                                disabled 
                                                value={current.nome}  />                            
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="form-group">
                                                <label htmlFor="dtnascimento"> Data de Nascimento </label>
                                                <input 
                                                type="date" 
                                                className="form-control" 
                                                disabled 
                                                value={current.dtnascimento}  />                            
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <label>Gênero</label>
                                            <div className="form-group">    
                                                <div className="form-check form-check-inline">
                                                    <input 
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="sexo"
                                                        id="sexoFeminino"
                                                        value="Feminino"
                                                        checked={current.sexo === 'Feminino'}
                                                        disabled/>
                                                </div>
                                                <label className="form-check-label" style={{marginRight: 3+'%'}}>Feminino</label>

                                                <div className="form-check form-check-inline">
                                                    <input 
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="sexo"
                                                        id="sexoMasculino"
                                                        value="Masculino"
                                                        checked={current.sexo === 'Masculino'}
                                                        disabled />
                                                </div>
                                                <label className="form-check-label">Masculino</label>
                                            </div> 
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-2">
                                            <div className="form-group">                                                
                                                <label htmlFor="matricula">Matrícula</label>
                                                <input
                                                type="text" 
                                                className="form-control"                                                     
                                                disabled 
                                                value={current.matricula}  />                                                
                                            </div>
                                        </div>
                                        <div className="col-md-2">
                                            <div className="form-group">                                                
                                                <label htmlFor="cpf">CPF</label>
                                                <input
                                                type="text" 
                                                className="form-control" 
                                                disabled                
                                                value={current.cpf}  />                                                
                                            </div>
                                        </div>
                                        <div className="col-md-2">
                                            <div className="form-group">                                                
                                                <label htmlFor="rg">RG</label>
                                                <input
                                                type="text" 
                                                className="form-control"
                                                value={current.rg} 
                                                disabled />                                               
                                            </div>
                                        </div>
                                        <div className="col-md-2">                                            
                                            <div className="form-group">
                                                <label htmlFor="nis">NIS</label>
                                                <input
                                                type="text" 
                                                className="form-control"
                                                value={current.nis} 
                                                disabled />
                                            </div>                                           
                                        </div>
                                        <div className="col-md-2">
                                            <label>Bolsa Família</label>
                                            <div className="form-group">    
                                                <div className="form-check form-check-inline">
                                                    <input 
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="sexo"
                                                        id="sexoFeminino"
                                                        value="Feminino"
                                                        checked={current.bolsafamilia === 'Sim'}
                                                        disabled/>
                                                </div>
                                                <label className="form-check-label" style={{marginRight: 3+'%'}}>Sim</label>

                                                <div className="form-check form-check-inline">
                                                    <input 
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="sexo"
                                                        id="sexoMasculino"
                                                        value="Masculino"
                                                        checked={current.bolsafamilia === 'Não'}
                                                        disabled />
                                                </div>
                                                <label className="form-check-label">Não</label>
                                            </div> 
                                        </div>
                                        <div className="col-md-2">      
                                            <label></label>                                               
                                            <div className="form-check col-md-6">
                                                <label className="form-check-label" style={{paddingLeft: 30+'%',width: 'max-content', fontSize: 18+'px'}}>
                                                    <input className="form-check-input" type="checkbox" disabled checked={current.eja === true}  /> Candidato(a) EJA
                                                </label>
                                            </div>                                         
                                        </div>
                                    </div>                                    
                                    <div className="row">
                                        <div className="col-md-4">      
                                            <label></label>                                               
                                            <div className="form-check col-md-6">
                                                <label className="form-check-label" style={{width: 'max-content', fontSize: 18+'px'}}>
                                                    <input className="form-check-input" type="checkbox" disabled checked={current.irmao === true}  /> Possui irmão na unidade escolar pretendida
                                                </label>
                                            </div>                                         
                                        </div>
                                        <div className="col-md-4">      
                                            <label></label>                                               
                                            <div className="form-check col-md-6">
                                                <label className="form-check-label" style={{width: 'max-content', fontSize: 18+'px'}}>
                                                    <input className="form-check-input" type="checkbox" disabled checked={current.vulneravel === true}  /> Candidato(a) no Creas/Conselho Tutelar
                                                </label>
                                            </div>                                         
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">                                    
                                                <label style={{marginRight: 3+'%', marginTop: 1+'%'}}>Possui Deficiências</label>
                                            </div>
                                            <div className="form-group">                                    
                                                <div className="form-check form-check-inline">
                                                    <input 
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="sim"
                                                        disabled
                                                        value="Sim"
                                                        checked={current.deficiente === 'Sim'}
                                                        />
                                                </div>
                                                <label className="form-check-label">Sim</label>
                                                <div className="form-check form-check-inline" style={{marginLeft: 2+'%'}}>
                                                    <input 
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="nao"
                                                    id="nao"
                                                    value="Não"
                                                    checked={current.deficiente === 'Não'}
                                                    disabled />
                                                </div>
                                                <label className="form-check-label">Não</label>
                                            </div>
                                        </div>                             
                                    </div>       
                                    {deficiencias}
                                </div>                                
                            </div>
                        </div>
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                DADOS DA CANDIDATURA
                                <div className="panel-body">
                                    <div className="row">
                                        <div className="col-md-6">                                            
                                        <label htmlFor="escola">Escola</label>
                                        <div className="form-group">                                                    
                                            <input
                                            type="text" 
                                            className="form-control"
                                            value={current.escola} 
                                            disabled />
                                        </div>                                            
                                    </div>
                                        <div className="col-md-3">                                            
                                        <label htmlFor="série">Ano de escolaridade</label>
                                        <div className="form-group">                                                    
                                            <input
                                            type="text" 
                                            className="form-control"                                                                                                          
                                            value={current.serie} 
                                            disabled />
                                        </div>                                            
                                    </div>
                                        <div className="col-md-3">                                                                        
                                            <label htmlFor="turno">Turno</label>
                                            <div className="form-group">                                                    
                                                <input
                                                type="text" 
                                                className="form-control"
                                                value={current.turno} 
                                                disabled />
                                            </div>                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div style={{display:'flex', justifyContent: 'space-around'}}>             
                            <Link to={"/"} className="btn btn-info" style={{width: 50+'%'}}>
                                Voltar
                            </Link>
                        </div>
                    </div>
            </div>
        )
    }
}