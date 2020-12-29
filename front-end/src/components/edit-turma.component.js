import React, { Component } from 'react'
import TurmaDataService from "../services/turma.service"
import EscolaDataService from "../services/escola.service"
//import CursoDataService from "../services/curso.service"
import AuthService from "../services/auth.service"
import {Link} from 'react-router-dom'

export default class Turma extends Component {
    constructor(props) {
        super(props)

        this.buscarTurma = this.buscarTurma.bind(this)
        this.handlerDescricao = this.handlerDescricao.bind(this)       
        this.handlerNivel = this.handlerNivel.bind(this)
        this.handlerQtd = this.handlerQtd.bind(this)
        this.handlerSerie = this.handlerSerie.bind(this)        
        this.handlerTurno = this.handlerTurno.bind(this)  
        this.handlerEja = this.handlerEja.bind(this)
        this.handlerEscola = this.handlerEscola.bind(this)
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
        this.removeEja = this.removeEja.bind(this)
        
      //  this.pegaCursos = this.pegaCursos.bind(this)
       // this.handlerCurso = this.handlerCurso.bind(this)
        this.pegaEscolas = this.pegaEscolas.bind(this)
        this.salvarTurma = this.salvarTurma.bind(this)
        
        this.state = {
            currentUser: AuthService.getCurrentUser(),
            showAdminBoard: false,
            showModeratorBoard: false,
            message: "",
            voltar: "",
            escolas: [],
            //cursos: [],
            current: {
                id: null,
                descricao: "",
                qtd: "",
                matriculas: 0,
                nivel: "",
                selectedNivel: "",
                serie: "",
               // selectedCurso: "",
                selectedSerie: "",
                turno: "",
                escola: "",
                eja: false,
                deficiente: "",                                
                auditiva: "",
                fala: "",
                mental: "",
                motora: "",
                visual: "",     
                cegueira: "",
                baixaVisao: "",
                multipla: "",
                surdoCegueira: "",
                superdotacao: "",
                down: "",
                autismo: "",
                chkOutra: "",
                outra: "",
               // curso: "",
                submitted: false
            }
        }
    }

    componentDidMount() {
        this.buscarTurma(this.props.match.params.id)
        this.pegaEscolas()

        if (this.state.currentUser) {
            this.setState({
            showModeratorBoard: this.state.currentUser.roles.includes("ROLE_MODERATOR"),
            showAdminBoard: this.state.currentUser.roles.includes("ROLE_ADMIN")
            })
        }
       // this.pegaCursos()
    }

    pegaEscolas(page = 1) {        
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
        const selectedCurso = e.target.value
        this.setState(prevState =>({
            current: {
                ...prevState.current,
                selectedCurso: selectedCurso
            }            
        }))
    }
*/
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
                        eja: response.data.eja,
                       // selectedCurso: response.data.selectedCurso,
                        escola: response.data.escola,
                        username: response.data.username,
                        deficiente: response.data.deficiente,
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
                        outra: response.data.outra,
                       // curso: response.data.curso,
                        situacao: response.data.situacao                     
                    }
                })
            })
            .catch(e => {
                console.log(e)
            })    
    }

    handlerDescricao(e) {
        const descricao = e.target.value = ("" + e.target.value).toUpperCase()
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                descricao: descricao
            }
        }))
    }

    handlerQtd(e) {
        const qtd = e.target.value.replace(/\D/g, '')
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                qtd: qtd
            }
        }))
    }

    async handlerNivel(e) {
        const selectedNivel = e.target.value
        await this.setState(prevState => ({
            current: {
                ...prevState.current,
                nivel: selectedNivel
            }
        }))

        if (this.state.current.nivel === "EJA") {
            this.setState(prevState => ({
                current: {
                    ...prevState.current,
                    eja: true
            }}))
        } else {
            this.setState(prevState => ({
                current: {
                    ...prevState.current,
                    eja: false
            }}))
        }
    }

    handlerSerie(e) {
        const selectedSerie = e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                serie: selectedSerie
            }
        }))
    }

    handlerTurno(e) {
        const selectedTurno = e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                turno: selectedTurno
            }
        }))
    }

    handlerEscola(e) {
        const selectedEscola = e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                escola: selectedEscola
            }
        }))
    }


    handlerEja(e) {
        const eja = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                eja: eja
            }
        }))
    }

    handlerDeficiente(e) {
        const deficiente = e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                deficiente: deficiente
            }
        }))
    }

    handlerAuditiva(e) {
        const auditiva = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                auditiva: auditiva
            }
        }))
    }

    handlerFala(e) {
        const fala = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                fala: fala
            }
        }))
    }

    handlerMental(e) {
        const mental = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                mental: mental
            }
        }))
    }

    handlerMotora(e) {
        const motora = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                motora: motora
            }
        }))
    }

    handlerVisual(e) {
        const visual = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                visual: visual
            }
        }))
    }

    handlerCegueira(e) {
        const cegueira = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                cegueira: cegueira
            }
        }))
    }

    handlerBaixaVisao(e) {
        const baixaVisao = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                baixaVisao: baixaVisao
            }
        }))
    }

    handlerSurdoCegueira(e) {
        const surdoCegueira = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                surdoCegueira: surdoCegueira
            }
        }))
    }

    handlerSuperdotacao(e) {
        const superdotacao = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                superdotacao: superdotacao
            }
        }))
    }

    handlerMultipla(e) {
        const multipla = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                multipla: multipla
            }
        }))
    }


    handlerDown(e) {
        const down = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                down: down
            }
        }))
    }

    handlerAutismo(e) {
        const autismo = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                autismo: autismo
            }
        }))
    }

    handlerChkOutra(e) {
        const chkOutra = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                chkOutra: chkOutra
            }
        }))
    }

    handlerOutra(e) {
        const outra = e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                outra: outra
            }
        }))
    }

    removeEja() {
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                eja: false
            }
        }))
    }


    salvarTurma() {
        
        if (this.state.current.nivel === "Educação Infantil") {
            this.removeEja()
        }
        var data = null
        if (this.state.current.deficiente === "Não") {
            
            data = {
                id: this.state.current.id,
                descricao: this.state.current.descricao,                        
                qtd: this.state.current.qtd,
                matriculas: this.state.current.matriculas,
                nivel: this.state.current.nivel,
                serie: this.state.current.serie,
                turno: this.state.current.turno,
            // selectedCurso: this.state.current.selectedCurso,
                escola: this.state.current.escola,
                eja: this.state.current.eja,
                username: this.state.current.username,
                deficiente: this.state.current.deficiente,
                auditiva: false,
                fala: false,
                mental: false,
                motora: false,
                visual: false,       
                cegueira: true,
                baixaVisao: true,
                multipla: true,
                surdoCegueira: true,
                superdotacao: true,
                down: false,
                autismo: false,
                chkOutra: false,
                outra: false,
            //  curso: this.state.current.curso,
                situacao: this.state.current.situacao 
            }
        } else {
                data = {
                    id: this.state.current.id,
                    descricao: this.state.current.descricao,                        
                    qtd: this.state.current.qtd,
                    matriculas: this.state.current.matriculas,
                    nivel: this.state.current.nivel,
                    serie: this.state.current.serie,
                    turno: this.state.current.turno,
                // selectedCurso: this.state.current.selectedCurso,
                    escola: this.state.current.escola,
                    eja: this.state.current.eja,
                    username: this.state.current.username,
                    deficiente: this.state.current.deficiente,
                    auditiva: this.state.current.auditiva,
                    fala: this.state.current.fala,
                    mental: this.state.current.mental,
                    motora: this.state.current.motora,
                    visual: this.state.current.visual,      
                    cegueira: this.state.current.cegueira,
                    baixaVisao: this.state.current.baixaVisao,
                    multipla: this.state.current.multipla,
                    surdoCegueira: this.state.current.surdoCegueira,
                    superdotacao: this.state.current.superdotacao,
                    down: this.state.current.down,
                    autismo: this.state.current.autismo,
                    chkOutra: this.state.current.chkOutra,
                    outra: this.state.current.outra,
                //  curso: this.state.current.curso,
                    situacao: this.state.current.situacao 
                }
            }
        

        TurmaDataService.editar(this.state.current.id, data)
        .then(response => {
            this.setState({
                message: "A turma foi alterada com sucesso!",
                voltar: true
            })

        })
        .catch(e => {
            console.log(e)
        })
    }

    render () {
        const {current, voltar, escolas, showAdminBoard, showModeratorBoard /*cursos*/} = this.state

        let botao = null

        if (voltar === true) {
            botao = <div>
                <Link to={"/turmas"} className="btn btn-info">Voltar</Link>
            </div>
        }

        let lista = escolas.map((escola, index)=> (
            <option value={escola.descricao} key={index}>{escola.descricao}</option>
        ))

        let deficiencias = null
        let outra = null
        if (current.chkOutra === true) {
            outra = 
                <input type="text" className="form-control" value={current.outra} onChange={this.handlerOutra} placeholder="Digite a deficiência" />          
        }

        if (current.deficiente === 'Sim') {
            deficiencias = <div>
                <label className="col-md-12" syle={{padding: 0}}>Marque as deficiências que a turma atende: </label>
                <div className="form-group row">                    
                    <div className="col-sm-12">
                        <div className="form-check">
                            <label className="form-check-label"  style={{marginRight: 3+'%'}}>
                                <input className="form-check-input" type="checkbox" checked={current.auditiva} onChange={this.handlerAuditiva} /> Deficiência auditiva e surdez
                            </label>
                            <label className="form-check-label"  style={{marginRight: 3+'%'}}>
                                <input className="form-check-input" type="checkbox" checked={current.fala} onChange={this.handlerFala}  /> Fala
                            </label>
                            <label className="form-check-label"  style={{marginRight: 3+'%'}}>
                                <input className="form-check-input" type="checkbox" checked={current.mental} onChange={this.handlerMental} /> Deficiência mental
                            </label>
                            <label className="form-check-label"  style={{marginRight: 3+'%'}}>
                                <input className="form-check-input" type="checkbox" checked={current.motora} onChange={this.handlerMotora}  /> Deficiência física
                            </label>
                            <label className="form-check-label"  style={{marginRight: 3+'%'}}>
                                <input className="form-check-input" type="checkbox" checked={current.visual} onChange={this.handlerVisual}  /> Deficiência visual
                            </label>
                            <label className="form-check-label"  style={{marginRight: 3+'%'}}>
                                <input className="form-check-input" type="checkbox" checked={current.cegueira === true} onChange={this.handlerCegueira}  /> Cegueira
                            </label>
                            <label className="form-check-label"  style={{marginRight: 3+'%'}}>
                                <input className="form-check-input" type="checkbox" checked={current.surdoCegueira === true} onChange={this.handlerSurdoCegueira}  /> Surdocegueira
                            </label>
                            <label className="form-check-label"  style={{marginRight: 3+'%'}}>
                                <input className="form-check-input" type="checkbox" checked={current.baixaVisao === true} onChange={this.handlerBaixaVisao}  /> Baixa visão
                            </label>
                            <label className="form-check-label"  style={{marginRight: 3+'%'}}>
                                <input className="form-check-input" type="checkbox" checked={current.multipla === true} onChange={this.handlerMultipla}  /> Deficiência múltipla
                            </label>
                            {/*<label className="form-check-label"  style={{marginRight: 3+'%'}}>
                                <input className="form-check-input" type="checkbox" checked={current.down} onChange={this.handlerDown} style={{marginLeft: -1+'%'}} /> Síndrome de Down
                            </label>  */}
                            <label className="form-check-label"  style={{marginRight: 3+'%'}}>
                                <input className="form-check-input" type="checkbox" checked={current.autismo === true} onChange={this.handlerAutismo}  /> Transtorno do espectro autista
                            </label>
                            <label className="form-check-label"  style={{marginRight: 3+'%'}}>
                                <input className="form-check-input" type="checkbox" checked={current.superdotacao === true} onChange={this.handlerSuperdotacao}  /> Altas habilidades / Superdotação
                            </label>
                            <label className="form-check-label"  style={{marginRight: 3+'%'}}>
                                <input className="form-check-input" type="checkbox" checked={current.chkOutra} onChange={this.handlerChkOutra}  /> Outra
                            </label>
                            {outra}
                        </div>
                    </div>                    
                </div>
            </div>
        }

        let serie = null

        if (current.nivel === "Creche") {
            serie = <div className="form-group">
                <label>Ano de escolaridade</label>
                <select className="form-control" id="serie" name="serie" value={current.serie} onChange={this.handlerSerie}  > 
                    <option value="" disabled> --- Selecione --- </option>
                    <option value="Creche I">Creche I</option>
                    <option value="Creche II">Creche II</option>
                    <option value="Creche III">Creche III</option>
                </select>
            </div> 
        }

        if (current.nivel === "Pré escola") {
            serie = <div className="form-group">
                <label>Ano de escolaridade</label>
                <select className="form-control" id="serie" name="serie" value={current.serie} onChange={this.handlerSerie}  > 
                    <option value="" disabled> --- Selecione --- </option>
                    <option value="Pré IV">Pré Escola IV</option>
                    <option value="Pré V">Pré Escola V</option>
                </select>
            </div> 
        }

        if (current.nivel === "Fundamental Anos Iniciais") {
            serie = <div className="form-group">
                <label>Ano de escolaridade</label>
                <select className="form-control" id="serie" name="serie" value={current.serie} onChange={this.handlerSerie}  > 
                    <option value="" disabled> --- Selecione --- </option>
                    <option value="1º ano">1º ano</option>
                    <option value="2º ano">2º ano</option>
                    <option value="3º ano">3º ano</option>
                    <option value="4º ano">4º ano</option>
                    <option value="5º ano">5º ano</option>
                </select>
            </div>
        }

        if (current.nivel === "Fundamental Anos Finais") {
            serie = <div className="form-group">
                <label>Ano de escolaridade</label>
                <select className="form-control" id="serie" name="serie" value={current.serie} onChange={this.handlerSerie}  > 
                    <option value="" disabled> --- Selecione --- </option>
                    <option value="6º ano">6º ano</option>
                    <option value="7º ano">7º ano</option>
                    <option value="8º ano">8º ano</option>
                    <option value="9º ano">9º ano</option>
                </select>
            </div>
        }

        /*if (current.nivel === "Semi Presencial") {
            serie = <div className="form-group">
                <label>Ano de escolaridade</label>
                <select className="form-control" id="serie" name="serie" value={current.serie} onChange={this.handlerSerie}  > 
                    <option value="" disabled>  --- Selecione --- </option>
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
        } */

        if (current.nivel === "EJA") {
            serie = <div className="form-group">
                <label>Ano de escolaridade</label>
                <select className="form-control" id="serie" name="serie" value={current.serie} onChange={this.handlerSerie}  > 
                    <option value="" disabled>  --- Selecione --- </option>
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

 /*       let eja = null
        if (current.nivel === "Fundamental Anos Finais") {
            eja = <div className="form-check">
                <label className="form-check-label" style={{marginRight: 2+'%', marginTop: 1+'%', fontSize: 18+'px'}}>
                    <input className="form-check-input" type="checkbox" onChange={this.handlerEja} style={{marginRight: 1+'%', transform: `scale(1.3)`}} /> EJA
                </label>
            </div>
        }
    

        if (current.nivel === "Ensino Médio") {
            serie = <div className="form-group">
                <label>Série</label>
                <select className="form-control" id="serie" name="serie" value={current.serie} onChange={this.handlerSerie}  > 
                    <option value="" disabled >Selecione a série</option>
                    <option value="M1ano">1º ano</option>
                    <option value="M2ano">2º ano</option>
                    <option value="M3ano">3º ano</option>
                </select>
            </div>
        }

        if (current.nivel === "Ensino Médio Técnico") {
            serie = <div className="form-group">
                <label>Série</label>
                <select className="form-control" id="serie" name="serie" value={current.serie} onChange={this.handlerSerie}  > 
                    <option value="" disabled>Selecione a série</option>
                    <option value="T1ano">1º ano</option>
                    <option value="T2ano">2º ano</option>
                    <option value="T3ano">3º ano</option>
                    <option value="T4ano">4º ano</option>
                </select>
            </div>
        }

        let listacurso = null
        let curso = cursos.map((item, index) => ( 
            <option value={item.descricao} key={index}>{item.descricao}</option>
        ))

        if (current.nivel === "Ensino Médio Técnico") {
            listacurso = <div className="col-md-6" style={{padding: 0, margin: 0}}>  
                <label>Curso</label>                                           
                <select 
                    className="form-control" 
                    id="curso" 
                    name="curso"
                    value={current.selectedCurso}                                    
                    onChange={this.handlerCurso} >     
                
                    <option value="" disabled>---Selecione---</option>  
                    {curso}                     
                </select>
            </div>
        }
*/
        return (
            <div style={{margin: 5 + '%'}}>
                {(showAdminBoard || showModeratorBoard) && (
                    <div>
                     { current ? (
                        <div>
                    <div style={{margin: 5 + '%'}}>
                        <div className="row">
                            <div className="col-md-6" style={{padding: 0}}>
                                <div className="form-group">
                                    <label htmlFor="descricao"> Nome da turma </label>
                                    <input 
                                    type="text" 
                                    className="form-control" 
                                    id="descricao" 
                                    required 
                                    value={current.descricao} 
                                    onChange={this.handlerDescricao} 
                                    name="descricao" />
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
                                    value={current.qtd} 
                                    onChange={this.handlerQtd} 
                                    name="qtd" />
                                </div>  
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6" style={{padding: 0}}>
                                <div className="form-group">
                                    <label htmlFor="nivel"> Nível </label>
                                    <select className="form-control" id="nivel" name="nivel"value={current.nivel} onChange={this.handlerNivel} > 
                                    <option value="Creche">Creche</option>
                                    <option value="Pré escola">Pré escola</option>
                                    <option value="Fundamental Anos Iniciais">Fundamental Anos Iniciais</option>
                                    <option value="Fundamental Anos Finais">Fundamental Anos Finais</option>
                                    <option value="Semi Presencial">Semi Presencial</option>
                                    <option value="EJA">EJA</option>
                                   {/* <option value="Ensino Médio">Ensino Médio</option>
                                    <option value="Ensino Médio Técnico">Ensino Médio Técnico</option> */}
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-6">
                                {serie}
                            </div>
                        </div>
                        {/*
                        <div className="row">
                            {listacurso}
                        </div>*/}

                        <div className="row">
                            <div className="col-md-6" style={{padding: 0}}>
                                <div className="form-group">
                                    <label htmlFor="turno"> Turno </label>
                                    <select className="form-control" id="turno" name="turno"value={current.turno} onChange={this.handlerTurno} > 
                                    <option value="" disabled> ---Selecione o turno --- </option>
                                    <option value="Manhã">Manhã</option>
                                    <option value="Tarde">Tarde</option>
                                    <option value="Noite">Noite</option>
                                    <option value="Intermediário">Intermediário</option>
                                         {/* <option value="Ensino Médio Técnico">Ensino Médio Técnico</option> */}
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div>   
                                    <label>Escola</label>                                          
                                    <select 
                                        className="form-control" 
                                        id="escola" 
                                        name="escola"
                                        value={current.escola}                                    
                                        onChange={this.handlerEscola} >     
                                    
                                        <option value="" disabled>---Selecione---</option>  
                                        {lista}                     
                                    </select>
                                </div>
                            </div>
                        </div>
                        {/*<div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label style={{marginRight: 3+'%', marginTop: 1+'%', padding: 0}}>Aceita Deficientes</label>
                                    <div className="form-check form-check-inline" >
                                        <input 
                                            className="form-check-input"
                                            type="radio"
                                            name="sim"
                                            id="sim"
                                            value="Sim"
                                            checked={current.deficiente === 'Sim'}
                                            onChange={this.handlerDeficiente} />
                                    </div>
                                    <label className="form-check-label" onClick={() => this.setState(prevState => ({current: {...prevState.current, deficiente: "Sim"}}))} >Sim</label>

                                    <div className="form-check form-check-inline" style={{marginLeft: 2+'%'}}>
                                        <input 
                                            className="form-check-input"
                                            type="radio"
                                            name="nao"
                                            id="nao"
                                            value="Não"
                                            checked={current.deficiente === 'Não'}
                                            onChange={this.handlerDeficiente} />
                                    </div>
                                    <label className="form-check-label" onClick={() => this.setState(prevState => ({current: {...prevState.current, deficiente: "Não"}}))} >Não</label>
                                </div>                                
                            </div> 
                           {/* <div className="col-md-6">
                                {eja} 
                            </div>                       
                        </div>*/}    
                        <div className="row">
                            <div className="col-md-12" style={{padding: 0}}>
                                {deficiencias} 
                            </div>
                        </div>
                        
                    <div style={{display: 'flex', justifyContent: 'space-around'}}>                         
                        <Link to={"/turmas"} className="btn btn-info" style={{width: 15+'%'}}>
                            Voltar
                        </Link>
                        <button onClick={this.salvarTurma} className="btn btn-success" style={{width: 15+'%'}}>
                            Salvar
                        </button>
                    </div>

                    <h4>{this.state.message}</h4>
                    {botao}
                </div>  
                </div>
                ) : (
                    <div>
                        <br />
                        <p>Selecione uma turma...</p>
                    </div>
                )
                } 
                </div>)}                          
            </div>            
        )
    }

}