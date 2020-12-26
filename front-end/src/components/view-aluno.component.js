import React, { Component } from 'react'
import AlunoDataService from "../services/aluno.service"
import AuthService from "../services/auth.service"
import {Link} from 'react-router-dom'
import * as moment from 'moment'

export default class VisualizarAluno extends Component {
    constructor(props) {
        super(props)       
        
        this.buscarAluno = this.buscarAluno.bind(this) 

        this.state = {
            currentUser: AuthService.getCurrentUser(),
            showModeratorBoard: false,
            current: {
                id: null,
                username: "",
                nome: "",
                dtnascimento: "",
                sexo: "",
                rg: "",
                cpf: "",
                nis: "",
                bolsafamilia: "",
                protocolo: "",
                nivel: "",
                serie: "",
                turma: "",
                turno: "",
                escola: "",
                irmao: false,
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
                situacao: true,
                imagem: "",
                url: "",
                submitted: false,
                successful: false,
                message: ""
            }
        }
    }

    componentDidMount(){
        this.buscarAluno(this.props.match.params.id)

        
    if (this.state.currentUser) {
        this.setState({
          showModeratorBoard: this.state.currentUser.roles.includes("ROLE_MODERATOR")
        })
      }
    }

    buscarAluno(id) {
        AlunoDataService.buscarUm(id)
        .then(response => {
            this.setState({
                current: {
                    id: response.data.id,                    
                    username: response.data.username,
                    nome: response.data.nome,
                    dtnascimento: response.data.dtnascimento,
                    sexo: response.data.sexo,
                    rg: response.data.rg,
                    cpf: response.data.cpf,
                    nis: response.data.nis,
                    bolsafamilia: response.data.bolsafamilia,
                    protocolo: response.data.protocolo,
                    nivel: response.data.nivel,
                    serie: response.data.serie,
                    turma: response.data.turma,
                    turno: response.data.turno,
                    irmao: response.data.irmao,
                    vulneravel: response.data.vulneravel,
                    pontos: response.data.pontos,
                    escola: response.data.escola,
                    responsavel: response.data.responsavel,
                    cpf_responsavel: response.data.cpf_responsavel,
                    logradouro: response.data.logradouro,
                    numero: response.data.numero,
                    complemento: response.data.complemento,
                    bairro: response.data.bairro,
                    cidade: response.data.cidade,
                    uf: response.data.uf,
                    cep: response.data.cep,
                    telefone: response.data.telefone,
                    celular: response.data.celular,
                    email: response.data.email,
                    eja: response.data.eja,
                    deficiente: response.data.deficiente,
                    mental: response.data.mental,
                    fala: response.data.fala,
                    auditiva: response.data.auditiva,
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
                    lat: response.data.lat,
                    long: response.data.long,
                    status: response.data.status,
                    situacao: response.data.situacao,
                    submitted: true                   
                }
            })          
        })
        .catch(e => {
            console.log(e)
        })
    }

    render() {

        const {current, showModeratorBoard } = this.state

      
        let deficiencias = null
        let outraDeficiencia = null
        if (current.chkOutra === true) {
            outraDeficiencia = 
                <input type="text" className="form-control" disabled value={current.outra} />          
        }

        if (current.deficiente === 'Sim') {
            deficiencias = <div>
                <label className="col-sm-6" style={{padding: 0}}>Deficiências que o(a) candidato(a) possui: </label>
                <div className="form-group row">                    
                    <div className="col-sm-12">
                        <div className="form-check">
                            <label className="form-check-label"  style={{marginRight: 3+'%'}}>
                                <input className="form-check-input" type="checkbox" checked={current.auditiva === true} disabled /> Deficiência auditiva e surdez
                            </label>
                            <label className="form-check-label"  style={{marginRight: 3+'%'}}>
                                <input className="form-check-input" type="checkbox" checked={current.fala === true} disabled /> Fala
                            </label>
                            <label className="form-check-label"  style={{marginRight: 3+'%'}}>
                                <input className="form-check-input" type="checkbox" checked={current.mental === true} disabled /> Deficiência mental
                            </label>
                            <label className="form-check-label"  style={{marginRight: 3+'%'}}>
                                <input className="form-check-input" type="checkbox" checked={current.motora === true} disabled/> Deficiência física
                            </label>
                            <label className="form-check-label"  style={{marginRight: 3+'%'}}>
                                <input className="form-check-input" type="checkbox" checked={current.visual === true} disabled /> Deficiência visual
                            </label>
                            <label className="form-check-label"  style={{marginRight: 3+'%'}}>
                                <input className="form-check-input" type="checkbox" checked={current.cegueira === true} disabled  /> Cegueira
                            </label>
                            <label className="form-check-label"  style={{marginRight: 3+'%'}}>
                                <input className="form-check-input" type="checkbox" checked={current.surdoCegueira === true} disabled /> Surdocegueira
                            </label>
                            <label className="form-check-label"  style={{marginRight: 3+'%'}}>
                                <input className="form-check-input" type="checkbox" checked={current.baixaVisao === true} disabled  /> Baixa visão
                            </label>
                            <label className="form-check-label"  style={{marginRight: 3+'%'}}>
                                <input className="form-check-input" type="checkbox" checked={current.multipla === true} disabled  /> Deficiência múltipla
                            </label>
                            {/* <label className="form-check-label"  style={{marginRight: 3+'%'}}>
                                <input className="form-check-input" type="checkbox" disabled /> Síndrome de Down
                            </label> */}
                            <label className="form-check-label"  style={{marginRight: 3+'%'}}>
                                <input className="form-check-input" type="checkbox" disabled /> Transtorno do espectro autista
                            </label>
                            <label className="form-check-label"  style={{marginRight: 3+'%'}}>
                                <input className="form-check-input" type="checkbox" checked={current.superdotacao === true} disabled /> Altas habilidades / Superdotação
                            </label>
                            <label className="form-check-label"  style={{marginRight: 3+'%'}}>
                                <input className="form-check-input" type="checkbox" checked={current.chkOutra === true} disabled /> Outra
                            </label>
                            {outraDeficiencia}
                        </div>
                    </div>                    
                </div>
            </div>
        }

        return (
            <div className="submit-form">
                { this.state.submitted ? (
                    <div style={{margin: 5 + '%'}}>
                        <h4> Aluno cadastrado com sucesso!</h4>
                        <Link to={"/alunis"} className="btn btn-success">
                            Voltar
                        </Link>
                    </div>
                ) : (
                    
                    <div style={{margin: 5 + '%'}}>
                        {showModeratorBoard && (
                        <div>
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <strong> DADOS DO RESPONSÁVEL </strong>
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
                                        <div className="col-md-6">
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
                                </div>                                
                            </div>
                        </div>
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <strong> DADOS DO(A) CANDIDATO(A) </strong>
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
                                                type="text" 
                                                className="form-control" 
                                                disabled 
                                                value={moment(current.dtnascimento).format('DD/MM/YYYY')}  />                            
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
                                            <label htmlFor="bolsa família">Bolsa Família</label>
                                            <div className="form-group">                                    
                                                <div className="form-check form-check-inline">
                                                    <input 
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="simbolsa"
                                                        disabled
                                                        value="Sim"
                                                        checked={current.bolsafamilia === 'Sim'}
                                                        />
                                                </div>
                                                <label className="form-check-label">Sim</label>
                                                <div className="form-check form-check-inline" style={{marginLeft: 2+'%'}}>
                                                    <input 
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="naobolsa"
                                                    id="naobolsa"
                                                    value="Não"
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
                                        
                                        <div className="col-md-6">      
                                            <label></label>                                               
                                            <div className="form-check col-md-6">
                                                <label className="form-check-label" style={{width: 'max-content', fontSize: 18+'px'}}>
                                                    <input className="form-check-input" type="checkbox" disabled checked={current.irmao === true}  /> Possui irmão na unidade escolar pretendida
                                                </label>
                                            </div>                                         
                                        </div>
                                        <div className="col-md-4">
                                            <label></label>
                                            <div className="form-group row">                                
                                                <div className="form-check" style={{marginLeft:3+'%'}}>
                                                    <label className="form-check-label">
                                                        <input className="form-check-input" type="checkbox" checked={current.vulneravel === true} disabled style={{marginRight: 1+'%'}} /> Candidato(a) no Creas/Conselho Tutelar
                                                    </label>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-2">
                                            <label></label> 
                                            <div className="form-group row">                                
                                                <div className="form-check" style={{marginLeft:3+'%'}}>
                                                    <label className="form-check-label">
                                                        <input className="form-check-input" type="checkbox" checked={current.conveniada === true} disabled style={{marginRight: 1+'%'}} /> Conveniada
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>                                    
                                    <div className="row">
                                        <div className="col-md-12" >
                                            <div className="form-group">                                    
                                               
                                            </div>
                                            <div className="form-group">  
                                                <label style={{marginRight: 3+'%', marginTop: 1+'%'}}>Possui Deficiências</label>                                  
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
                                <strong>DADOS DA CANDIDATURA</strong>
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
                                    </div>
                                    <div className="row">
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
                                        <div className="col-md-3">                                                                        
                                            <label htmlFor="turno">Turma</label>
                                            <div className="form-group">                                                    
                                                <input
                                                type="text" 
                                                className="form-control"
                                                value={current.turma} 
                                                disabled />
                                            </div>                                            
                                        </div>
                                        <div className="col-md-3">                                                                        
                                            <label htmlFor="turno">Protocolo</label>
                                            <div className="form-group">                                                    
                                                <input
                                                type="text" 
                                                className="form-control"
                                                value={current.protocolo} 
                                                disabled />
                                            </div>                                            
                                        </div>
                                        <div className="col-md-3">                                                                        
                                            <label htmlFor="turno">Status</label>
                                            <div className="form-group">                                                    
                                                <input
                                                type="text" 
                                                className="form-control"
                                                value={current.status} 
                                                disabled />
                                            </div>                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div style={{display:'flex', justifyContent: 'space-around'}}>             
                            <Link to={"/alunos"} className="btn btn-info">
                                Voltar
                            </Link>
                        </div>
                    </div>
                )}
                </div>)}
            </div>
        )
    }
}