import React, { Component } from 'react'
import TurmaDataService from "../services/turma.service"
import EscolaDataService from "../services/escola.service"
//import CursoDataService from "../services/curso.service"
import AuthService from "../services/auth.service"
import {Link} from 'react-router-dom'

export default class AdicionarTurma extends Component {
    constructor(props) {
        super(props)
        this.handlerDescricao = this.handlerDescricao.bind(this)       
        this.handlerNivel = this.handlerNivel.bind(this)
        this.handlerQtd = this.handlerQtd.bind(this)
        this.handlerSerie = this.handlerSerie.bind(this)        
        this.handlerTurno = this.handlerTurno.bind(this)
        this.handlerEja = this.handlerEja.bind(this)
        this.handlerDeficiente = this.handlerDeficiente.bind(this)
        this.handlerMental = this.handlerMental.bind(this)       
        this.handlerAuditiva = this.handlerAuditiva.bind(this) 
        this.handlerMotora = this.handlerMotora.bind(this)
        this.handlerFala = this.handlerFala.bind(this)
        this.handlerVisual = this.handlerVisual.bind(this)
        this.handlerCegueira = this.handlerCegueira.bind(this)
        this.handlerBaixaVisao = this.handlerBaixaVisao.bind(this)
        this.handlerMultipla = this.handlerMultipla.bind(this)
        this.handlerSurdoCegueira = this.handlerSurdoCegueira.bind(this)
        this.handlerSuperdotacao = this.handlerSuperdotacao.bind(this)
        this.handlerDown = this.handlerDown.bind(this)
        this.handlerAutismo = this.handlerAutismo.bind(this)
        this.handlerChkOutra = this.handlerChkOutra.bind(this)  
        this.handlerOutra = this.handlerOutra.bind(this) 
        
        this.pegaEscolas = this.pegaEscolas.bind(this)
        this.handlerEscola = this.handlerEscola.bind(this)
        //this.pegaCursos = this.pegaCursos.bind(this)
        //this.handlerCurso = this.handlerCurso.bind(this)
        
        this.salvarTurma = this.salvarTurma.bind(this)        

        this.state = {
            currentUser: AuthService.getCurrentUser(),
            showAdminBoard: false,
            showModeratorBoard: false,
            escolas: [],
           // cursos: [],
           // selectedCurso: "",
            descricao: "",
            nivel: "",
            qnt: "",
            matriculas: 0,
            serie: "",
            turno: "",
            eja: false,
            escola: "",
            deficiente: "",
            mental: false,
            fala: false,
            auditiva: false,
            motora: false,
            visual: false,       
            cegueira: false,
            baixaVisao: false,
            multipla: false,
            surdoCegueira: false,
            superdotacao: false,
            down: false,
            autismo: false,
            chkOutra: false,
            outra: "",
            situacao: true,
            submitted: false
        }
    }

    componentDidMount() {
        //this.pegaCursos()        
        this.pegaEscolas()

        if (this.state.currentUser) {
            this.setState({
              showModeratorBoard: this.state.currentUser.roles.includes("ROLE_MODERATOR"),
              showAdminBoard: this.state.currentUser.roles.includes("ROLE_ADMIN")
            })
        }
    }
/*
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

    handlerCurso(e) {
        this.setState({
            selectedCurso: e.target.value
        })
    }
*/
    
    pegaEscolas(page = 1){           
        EscolaDataService.buscarTodos(page)
        .then(response => {
        //REST do response da API em duas constantes: 
        // "docs" com os dados do chamado e "info" com os dados das páginas
            const { docs, ...info } = response.data 
            this.setState({
                escolas: docs,
                info: info,
                page: page
            })                
        })
        .catch(e => {
            console.log(e)
        })
    }

    handlerEscola(e) {
        this.setState({
            escola: e.target.value
        })
    }


    handlerDescricao(e) {
        this.setState({
            descricao: e.target.value = ("" + e.target.value).toUpperCase()
        })
    }

    handlerNivel(e) {
        this.setState({
            nivel: e.target.value
        })
    }

    handlerQtd(e) {
        this.setState({
            qtd: e.target.value = e.target.value.replace(/\D/g, '')
        })
    }

    handlerSerie(e) {
        this.setState({
            serie: e.target.value
        })
    }

    handlerTurno(e) {
        this.setState({
            turno: e.target.value
        })
    }

    handlerEja(e) {
        this.setState({
            eja: e.target.type === 'checkbox' ? e.target.checked : e.target.value
        })
    }

    handlerDeficiente (e) {
        this.setState({
            deficiente: e.target.value
        })
    }

    handlerMental(e) {
        this.setState({
            mental: e.target.type === 'checkbox' ? e.target.checked : e.target.value
        })
    }

    handlerAuditiva(e) {
        this.setState({
            auditiva: e.target.type === 'checkbox' ? e.target.checked : e.target.value
        })
    }

    handlerMotora(e) {
        this.setState({
            motora: e.target.type === 'checkbox' ? e.target.checked : e.target.value
        })
    }

    handlerFala(e) {
        this.setState({
            fala: e.target.type === 'checkbox' ? e.target.checked : e.target.value
        })
    }

    handlerVisual(e) {
        this.setState({
            visual: e.target.type === 'checkbox' ? e.target.checked : e.target.value
        })
    }

    handlerCegueira(e) {
        this.setState({
            cegueira: e.target.type === 'checkbox' ? e.target.checked : e.target.value
        })
    }

    handlerBaixaVisao(e) {
        this.setState({
            baixaVisao: e.target.type === 'checkbox' ? e.target.checked : e.target.value
        })
    }

    handlerMultipla(e) {
        this.setState({
            multipla: e.target.type === 'checkbox' ? e.target.checked : e.target.value
        })
    }

    handlerSurdoCegueira(e) {
        this.setState({
            surdoCegueira: e.target.type === 'checkbox' ? e.target.checked : e.target.value
        })
    }

    handlerSuperdotacao(e) {
        this.setState({
            superdotacao: e.target.type === 'checkbox' ? e.target.checked : e.target.value
        })
    }

    handlerDown(e) {
        this.setState({
            down: e.target.type === 'checkbox' ? e.target.checked : e.target.value
        })
    }

    handlerAutismo(e) {
        this.setState({
            autismo: e.target.type === 'checkbox' ? e.target.checked : e.target.value
        })
    }

    handlerChkOutra(e) {
        this.setState({
            chkOutra: e.target.type === 'checkbox' ? e.target.checked : e.target.value
        })
    }

    handlerOutra(e) {
        this.setState({
            outra: e.target.value
        })
    }
   
    salvarTurma() {
        var data = null
        if (this.state.deficiente === "Não") {
            data = {
                descricao: this.state.descricao,
                username: this.state.currentUser.username,
                nivel: this.state.nivel,
                qtd: this.state.qtd,
                matriculas: 0,
                serie: this.state.serie,
                turno: this.state.turno,
                eja: this.state.eja,
               // selectedCurso: this.state.selectedCurso,
                escola: this.state.escola,
                deficiente: this.state.deficiente,
                mental: false,
                motora: false,
                auditiva: false,
                fala: false,
                visual: false,        
                cegueira: false,
                baixaVisao: false,
                multipla: false,
                surdoCegueira: false,
                superdotacao: false,
                down: false,
                autismo: false,
                chkOutra: false,           
                outra: ""
            }    
        } else {
            data = {
                descricao: this.state.descricao,
                username: this.state.currentUser.username,
                nivel: this.state.nivel,
                qtd: this.state.qtd,
                matriculas: 0,
                serie: this.state.serie,
                turno: this.state.turno,
                eja: this.state.eja,
               // selectedCurso: this.state.selectedCurso,
                escola: this.state.escola,
                deficiente: this.state.deficiente,
                mental: this.state.mental,
                motora: this.state.motora,
                auditiva: this.state.auditiva,
                fala: this.state.fala,
                visual: this.state.visual,                        
                cegueira: this.state.cegueira,
                baixaVisao: this.state.baixaVisao,
                multipla: this.state.multipla,
                surdoCegueira: this.state.surdoCegueira,
                superdotacao: this.state.superdotacao,
                down: this.state.down,
                autismo: this.state.autismo,           
                outra: this.state.outra
            }
        }

        

        TurmaDataService.cadastrar(data)
        .then(response => {
            this.setState({
                id: response.data.id,
                descricao: response.data.descricao,
                username: response.data.username,
                nivel: response.data.nivel,
                qtd: response.data.qtd,
                matriculas: response.data.matriculas,
                serie: response.data.serie,
                turno: response.data.turno,
                eja: response.data.eja,
               // selectedCurso: response.data.selectedCurso,
                escola: response.data.escola,
                deficiente: response.data.deficiente,
                mental: response.data.mental,
                motora: response.data.motora,
                auditiva: response.data.auditiva,
                visual: response.data.visual,       
                cegueira: response.data.cegueira,
                baixaVisao: response.data.baixaVisao,
                multipla: response.data.multipla,
                surdoCegueira: response.data.surdoCegueira,
                superdotacao: response.data.superdotacao,
                fala: response.data.fala,
                down: response.data.down,
                autismo: response.data.autismo,
                outra: response.data.outra,
                situacao: response.data.situacao,
                submitted: true
            })            
        })
        .catch(e => {
            console.log(e)
        })
    }
    

    render() {

        const {escolas, showAdminBoard, showModeratorBoard } = this.state

        let lista = escolas.map((escola, index)=> (
            <option value={escola.descricao} key={index}>{escola.descricao}</option>
        ))

        let deficiencias = null
        let outra = null
        if (this.state.chkOutra === true) {
            outra = 
                <input type="text" className="form-control" onChange={this.handlerOutra} placeholder="Digite a deficiência" />          
        }

        if (this.state.deficiente === 'Sim') {
            deficiencias = <div>
                <label className="col-sm-6">Marque as deficiências que a turma atende: </label>
                <div className="form-group row">                    
                    <div className="col-sm-12">
                        <div className="form-check">
                            <label className="form-check-label"  style={{marginRight: 2+'%'}}>
                                <input className="form-check-input" type="checkbox" onChange={this.handlerAuditiva} /> Deficiência auditiva e surdez
                            </label>
                            <label className="form-check-label"  style={{marginRight: 3+'%'}}>
                                <input className="form-check-input" type="checkbox" onChange={this.handlerFala}  /> Fala
                            </label>
                            <label className="form-check-label"  style={{marginRight: 3+'%'}}>
                                <input className="form-check-input" type="checkbox" onChange={this.handlerMental} /> Deficiência mental
                            </label>
                            <label className="form-check-label"  style={{marginRight: 3+'%'}}>
                                <input className="form-check-input" type="checkbox" onChange={this.handlerMotora} /> Deficiência física
                            </label>
                            <label className="form-check-label"  style={{marginRight: 3+'%'}}>
                                <input className="form-check-input" type="checkbox" onChange={this.handlerVisual} /> Deficiência visual
                            </label>
                            <label className="form-check-label"  style={{marginRight: 3+'%'}}>
                                <input className="form-check-input" type="checkbox" onChange={this.handlerCegueira}  /> Cegueira
                            </label>
                            <label className="form-check-label"  style={{marginRight: 3+'%'}}>
                                <input className="form-check-input" type="checkbox" onChange={this.handlerSurdoCegueira} /> Surdocegueira
                            </label>
                            <label className="form-check-label"  style={{marginRight: 3+'%'}}>
                                <input className="form-check-input" type="checkbox" onChange={this.handlerBaixaVisao}  /> Baixa visão
                            </label>
                            <label className="form-check-label"  style={{marginRight: 3+'%'}}>
                                <input className="form-check-input" type="checkbox" onChange={this.handlerMultipla}  /> Deficiência múltipla
                            </label>
                            {/* <label className="form-check-label"  style={{marginRight: 3+'%'}}>
                                <input className="form-check-input" type="checkbox" onChange={this.handlerDown} style={{marginLeft: -1+'%'}} /> Síndrome de Down
                            </label>*/}
                            <label className="form-check-label"  style={{marginRight: 3+'%'}}>
                                <input className="form-check-input" type="checkbox" onChange={this.handlerAutismo}  /> Transtorno do espectro autista
                            </label>
                            <label className="form-check-label"  style={{marginRight: 3+'%'}}>
                                <input className="form-check-input" type="checkbox" onChange={this.handlerSuperdotacao} /> Altas habilidades / Superdotação
                            </label>
                            <label className="form-check-label"  style={{marginRight: 3+'%'}}>
                                <input className="form-check-input" type="checkbox" onChange={this.handlerChkOutra}  /> Outra
                            </label>
                            {outra}
                        </div>
                    </div>                    
                </div>
            </div>
        }

        let serie = null

        if (this.state.nivel === "Creche") {
            serie = <div className="form-group">
                <label>Ano de escolaridade</label>
                <select className="form-control" id="serie" name="serie" value={this.state.serie} onChange={this.handlerSerie}  > 
                    <option value="" disabled> --- Selecione --- </option>
                    <option value="Creche I">Creche I</option>
                    <option value="Creche II">Creche II</option>
                    <option value="Creche III">Creche III</option>
                </select>
            </div> 
        }

        if (this.state.nivel === "Pré escola") {
            serie = <div className="form-group">
                <label>Ano de escolaridade</label>
                <select className="form-control" id="serie" name="serie" value={this.state.serie} onChange={this.handlerSerie}  > 
                    <option value="" disabled> --- Selecione --- </option>
                    <option value="Pré IV">Pré Escola IV</option>
                    <option value="Pré V">Pré Escola V</option>
                </select>
            </div> 
        }

        if (this.state.nivel === "Fundamental Anos Iniciais") {
            serie = <div className="form-group">
                <label>Ano de escolaridade</label>
                <select className="form-control" id="serie" name="serie" value={this.state.serie} onChange={this.handlerSerie}  > 
                    <option value="" disabled> --- Selecione --- </option>
                    <option value="1º ano">1º ano</option>
                    <option value="2º ano">2º ano</option>
                    <option value="3º ano">3º ano</option>
                    <option value="4º ano">4º ano</option>
                    <option value="5º ano">5º ano</option>
                </select>
            </div>
        }

        if (this.state.nivel === "Fundamental Anos Finais") {
            serie = <div className="form-group">
                <label>Ano de escolaridade</label>
                <select className="form-control" id="serie" name="serie" value={this.state.serie} onChange={this.handlerSerie}  > 
                    <option value="" disabled> --- Selecione --- </option>
                    <option value="6º ano">6º ano</option>
                    <option value="7º ano">7º ano</option>
                    <option value="8º ano">8º ano</option>
                    <option value="9º ano">9º ano</option>
                </select>
            </div>
        }

        if (this.state.nivel === "Semi Presencial") {
            serie = <div className="form-group">
                <label>Ano de escolaridade</label>
                <select className="form-control" id="serie" name="serie" value={this.state.serie} onChange={this.handlerSerie}  > 
                    <option value="" disabled> --- Selecione --- </option>
                    <option value="1º ano">1º ano</option>
                    <option value="2º ano">2º ano</option>
                    <option value="3º ano">3º ano</option>
                    <option value="4º ano">4º ano</option>
                    <option value="5º ano">5º ano</option>
                    <option value="6º ano">6º ano</option>
                    <option value="7º ano">7º ano</option>
                    <option value="8º ano">8º ano</option>
                    <option value="9º ano">9º ano</option>
                </select>
            </div>
        }



        let eja = null
        if (this.state.nivel === "Fundamental Anos Finais") {
            eja = <div className="form-check">
                <label className="form-check-label" style={{marginRight: 2+'%', marginTop: 1+'%', fontSize: 18+'px'}}>
                    <input className="form-check-input" type="checkbox" onChange={this.handlerEja} style={{marginRight: 1+'%', transform: `scale(1.3)`}} /> EJA?
                </label>
            </div>
        }
    
         /*

        if (this.state.nivel === "Ensino Médio") {
            serie = <div className="form-group">
                <label>Série</label>
                <select className="form-control" id="serie" name="serie" value={this.state.serie} onChange={this.handlerSerie}  > 
                    <option value="" disabled >Selecione a série</option>
                    <option value="1º ano">1º ano</option>
                    <option value="2º ano">2º ano</option>
                    <option value="3º ano">3º ano</option>
                </select>
            </div>
        }

        if (this.state.nivel === "Ensino Médio Técnico") {
            serie = <div className="form-group">
                <label>Série</label>
                <select className="form-control" id="serie" name="serie" value={this.state.serie} onChange={this.handlerSerie}  > 
                    <option value="" disabled>Selecione a série</option>
                    <option value="1º ano">1º ano</option>
                    <option value="2º ano">2º ano</option>
                    <option value="3º ano">3º ano</option>
                    <option value="4º ano">4º ano</option>
                </select>
            </div>
        }

     
        let listacurso = null
        let curso = this.state.cursos.map((item, index) => ( 
            <option value={item.descricao} key={index}>{item.descricao}</option>
        ))

        if (this.state.nivel === "Ensino Médio Técnico") {
            listacurso = <div>   
                <label>Curso</label>                                          
                <select 
                    className="form-control" 
                    id="curso" 
                    name="curso"
                    value={this.state.selectedCurso}                                    
                    onChange={this.handlerCurso} >     
                
                    <option value="" disabled>---Selecione---</option>  
                    {curso}                     
                </select>
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
                        {(showAdminBoard || showModeratorBoard) && (
                        <div>
                        <div className="row">
                            <div className="col-md-6" style={{padding: 0}}>
                                <div className="form-group">
                                    <label htmlFor="descricao"> Nome da turma </label>
                                    <input 
                                    type="text" 
                                    className="form-control" 
                                    id="descricao" 
                                    required 
                                    value={this.state.descricao} 
                                    onChange={this.handlerDescricao} 
                                    name="descricao"
                                    autoFocus />
                                </div>
                            </div>
                            <div className="col-md-6">
                            <div className="form-group">
                                    <label htmlFor="qtd"> Quantidade de vagas </label>
                                    <input 
                                    type="number" 
                                    min="1"
                                    max="100"
                                    className="form-control" 
                                    id="qtd" 
                                    required 
                                    value={this.state.qtd} 
                                    onChange={this.handlerQtd} 
                                    name="qtd" />
                                </div>  
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6" style={{padding: 0}}>
                                <div className="form-group">
                                    <label htmlFor="nivel"> Nível </label>
                                    <select className="form-control" id="nivel" name="nivel"value={this.state.nivel} onChange={this.handlerNivel} > 
                                    <option value="" disabled>Selecione o nível de ensino</option>
                                    <option value="Creche">Creche</option>
                                    <option value="Pré escola">Pré escola</option>
                                    <option value="Fundamental Anos Iniciais">Fundamental Anos Iniciais</option>
                                    <option value="Fundamental Anos Finais">Fundamental Anos Finais</option>
                                    <option value="Semi Presencial">Semi Presencial</option>
                                    {/*<option value="Ensino Médio">Ensino Médio</option>
                                    <option value="Ensino Médio Técnico">Ensino Médio Técnico</option>*/}
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-6">
                                {serie}
                            </div>
                        </div>
                        
                        {/*listacurso*/}
                        <div className="row">
                            <div className="col-md-6" style={{padding:0}}>
                                <label htmlFor="turno"> Turno </label>
                                <select className="form-control" id="nivel" name="nivel"value={this.state.turno} onChange={this.handlerTurno} > 
                                    <option value="" disabled> ---Selecione o turno--- </option>
                                    <option value="Manhã">Manhã</option>
                                    <option value="Tarde">Tarde</option>
                                    <option value="Noite">Noite</option>
                                    <option value="Intermediário">Intermediário</option>
                                </select>
                            </div>
                            <div className="col-md-6">
                                <div>   
                                    <label>Escola</label>                                          
                                    <select 
                                        className="form-control" 
                                        id="escola" 
                                        name="escola"
                                        value={this.state.escola}                                    
                                        onChange={this.handlerEscola} >     
                                    
                                        <option value="" disabled> ---Selecione--- </option>  
                                        {lista}                     
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">                                    
                                    <label style={{marginRight: 3+'%', marginTop: 1+'%'}}>Aceita Deficientes?</label>
                                </div>
                                <div className="form-group">                                    
                                    <div className="form-check form-check-inline">
                                        <input 
                                            className="form-check-input"
                                            type="radio"
                                            name="sim"
                                            id="sim"
                                            value="Sim"
                                            checked={this.state.deficiente === 'Sim'}
                                            onChange={this.handlerDeficiente} />
                                    </div>
                                    <label className="form-check-label" onClick={() => this.setState({deficiente: "Sim"})} >Sim</label>

                                    <div className="form-check form-check-inline" style={{marginLeft: 2+'%'}}>
                                        <input 
                                            className="form-check-input"
                                            type="radio"
                                            name="nao"
                                            id="nao"
                                            value="Não"
                                            checked={this.state.deficiente === 'Não'}
                                            onChange={this.handlerDeficiente} />
                                    </div>
                                    <label className="form-check-label" onClick={() => this.setState({deficiente: "Não"})}>Não</label>
                                </div>
                            </div> 
                            <div className="col-md-6">
                                {eja}                           
                            </div>
                        </div>                
                        {deficiencias}                       
                                           
                        <button onClick={this.salvarTurma} className="btn btn-success">
                            Adicionar
                        </button>
                        </div>)}
                    
                    </div>
                )}
            </div>
        )
    }
}