import React, { Component } from 'react'
import TurmaDataService from "../services/turma.service"
import AuthService from "../services/auth.service"
import {Link} from 'react-router-dom'

export default class VisualizarTurma extends Component {
    constructor(props) {
        super(props)       
        
        this.buscarTurma = this.buscarTurma.bind(this)       

        this.state = {
            currentUser: AuthService.getCurrentUser(),
            current: {
                id: null,
                descricao: "",
                qtd: "",
                nivel: "",
                serie: "",
                turno: "",
                escola: "",                                
                eja: "",
                auditiva: "",
                fala: "",
                mental: "",
                motora: "",
                visual: "",
                down: "",
                autismo: "",
                outra: "",
                selectedCurso: "",
                submitted: false
            }
        }
    }

    componentDidMount() {
        this.buscarTurma(this.props.match.params.id)
    }

    buscarTurma(id) {
        TurmaDataService.buscarUm(id)
        .then(response => {
            this.setState({
                current: {
                    id: response.data.id,
                    descricao: response.data.descricao,                        
                    qtd: response.data.qtd,
                    matriculas: response.data.matriculas,
                    nivel: response.data.nivel,
                    serie: response.data.serie,
                    turno: response.data.turno,
                    escola: response.data.escola,
                    eja: response.data.eja,
                    username: response.data.username,
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
                    selectedCurso: response.data.selectedCurso,
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
                <label>Deficiência auditiva e surdez</label>
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
                <label>Deficiência física</label>
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

        let eja = null
        if (current.nivel === "Fundamental Anos Finais") {
            eja = <div className="form-check">
                <label className="form-check-label" style={{marginRight: 2+'%', marginTop: 1+'%', fontSize: 18+'px'}}>
                    <input className="form-check-input" type="checkbox" disabled checked={current.eja === true} onChange={this.handlerEja} style={{marginRight: 1+'%', transform: `scale(1.3)`}} /> EJA?
                </label>
            </div>
        }

     /*   let curso = null
        if (current.selectedCurso !== "") {
            curso = <div className="col-md-6">
                <label> Curso </label>
                <input 
                 type="text"
                 disabled 
                 value={current.selectedCurso} 
                 className="form-control" 
                id="curso" />
            </div>
        }
*/
        return (
            <div className="submit-form">
                { this.state.submitted ? (
                    <div style={{margin: 5 + '%'}}>
                        <h4> Turma cadastrada com sucesso!</h4>
                        <Link to={"/turmas"} className="btn btn-success">
                            Voltar
                        </Link>
                    </div>
                ) : (
                
                    <div style={{margin: 5 + '%'}}>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="descricao"> Nome da turma </label>
                                    <input 
                                    type="text" 
                                    className="form-control" 
                                    id="descricao"                              
                                    value={current.descricao}
                                    name="descricao"
                                    disabled />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="qtd"> Quantidade de vagas </label>
                                    <input 
                                    type="" 
                                    className="form-control" 
                                    id="qtd" 
                                    value={current.qtd} 
                                    disabled 
                                    name="qtd" />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="nivel"> Nível </label>
                                    <input 
                                    type="text" 
                                    className="form-control" 
                                    id="nivel" 
                                    value={current.nivel} 
                                    disabled
                                    name="nivel" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="serie"> Série </label>
                                    <input 
                                    type="text" 
                                    className="form-control" 
                                    id="serie" 
                                    value={current.serie} 
                                    disabled 
                                    name="serie" />
                                </div>
                            </div>
                            {/*curso*/}
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="turno"> Turno </label>
                                    <input 
                                    type="text" 
                                    className="form-control" 
                                    id="turno" 
                                    value={current.turno} 
                                    disabled
                                    name="turno" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="escola"> Escola </label>
                                    <input 
                                    type="text" 
                                    className="form-control" 
                                    id="escola" 
                                    value={current.escola} 
                                    disabled 
                                    name="escola" />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label style={{marginTop: 1+'%'}}>Deficiência(s) atendida(s): </label>                                    
                                </div>
                            </div> 
                            <div className="col-md-6">
                                {eja}
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
                            <Link to={"/turmas"} className="btn btn-info">
                                Voltar
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}