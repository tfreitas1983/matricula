import React, { Component } from "react"
import AlunoDataService from "../services/aluno.service"
import CepDataService from "../services/cep.service"
import EscolaDataService from "../services/escola.service"
import TurmaDataService from "../services/turma.service"
import AuthService from "../services/auth.service"
import * as moment from 'moment'
import {Link} from 'react-router-dom'
import { Button, Accordion, Card} from 'react-bootstrap'
import axios from 'axios'
import {cpfMask} from './masks'
import { cepMask} from './cepMask'
import { telMask, celMask } from './telMask'

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                Este campo é obrigatório!
            </div>
        )
    }
}

export default class EditarAluno extends Component {
    constructor(props){ 
        super(props)
        this.handlerNome = this.handlerNome.bind(this)
        this.handlerDtNascimento = this.handlerDtNascimento.bind(this)
        this.handlerDtNascimentoNovo = this.handlerDtNascimentoNovo.bind(this)
        this.handlerSexo = this.handlerSexo.bind(this)
        this.handlerRG = this.handlerRG.bind(this)
        this.handlerCPF = this.handlerCPF.bind(this)
        this.handlerProtocolo = this.handlerProtocolo.bind(this)
        this.handlerNIS = this.handlerNIS.bind(this)
        this.handlerBolsaFamilia = this.handlerBolsaFamilia.bind(this)
        this.handlerNivel = this.handlerNivel.bind(this)
        this.handlerSerie = this.handlerSerie.bind(this)
        this.handlerTurma = this.handlerTurma.bind(this)
        this.handlerTurno = this.handlerTurno.bind(this)
        this.handlerEscola = this.handlerEscola.bind(this)
        this.handlerIrmao = this.handlerIrmao.bind(this)
        this.handlerVulneravel = this.handlerVulneravel.bind(this)
        this.handlerResponsavel = this.handlerResponsavel.bind(this)
        this.handlerCPFResponsavel = this.handlerCPFResponsavel.bind(this)
        this.handlerLogradouro = this.handlerLogradouro.bind(this)
        this.handlerNumero = this.handlerNumero.bind(this)
        this.handlerComplemento = this.handlerComplemento.bind(this)
        this.handlerBairro = this.handlerBairro.bind(this)         
        this.handlerCidade = this.handlerCidade.bind(this) 
        this.handlerCEP = this.handlerCEP.bind(this)
        this.handlerTelefone = this.handlerTelefone.bind(this)
        this.handlerCelular = this.handlerCelular.bind(this)
        this.handlerEmail = this.handlerEmail.bind(this)
        this.handlerConveniada = this.handlerConveniada.bind(this)
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
        this.handlerLat = this.handlerLat.bind(this)
        this.handlerLong = this.handlerLong.bind(this)
        this.handlerStatus = this.handlerStatus.bind(this)
        
        this.buscaAluno = this.buscaAluno.bind(this)
        this.pegaTurmas = this.pegaTurmas.bind(this)
        this.pegaEscolas = this.pegaEscolas.bind(this)
        this.pegaLocalizacao = this.pegaLocalizacao.bind(this)
        this.pegaLocalizacaoCEP = this.pegaLocalizacaoCEP.bind(this)  
        this.pegaEnderecoCep = this.pegaEnderecoCep.bind(this)

        this.inputLogradouro = React.createRef()
        this.inputBairro = React.createRef()        
        this.inputCidade = React.createRef()
        this.inputLatitude = React.createRef()
        this.inputLongitude = React.createRef()

        this.salvarAluno = this.salvarAluno.bind(this)
        this.calculaPontos = this.calculaPontos.bind(this)
        this.contaVaga = this.contaVaga.bind(this)
        this.pegaTurmaOriginal = this.pegaTurmaOriginal.bind(this)
        

        this.state = {
            currentUser: AuthService.getCurrentUser(),
            showModeratorBoard: false,
            escolas: [],
            turmas: [],
            message: "",  
            turmaOriginal: "",
            currentEscola: "",
            currentIndexEscola: null,
            currentTurma: "",
            currentIndexTurma: null, 
            current: {
                id: null,
                nome: "",
                dtnascimento: moment(),
                dtnascimentonovo: "",
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
                irmao: false,
                vulneravel: false,
                pontos: 1,
                pontuacao: 0,
                eja: false,
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
                lat: "",
                long: "",
                foto: "default.jpg",
                situacao: true,
                status: "",
                imagem: "",
                url: "",
                submitted: false,
                successful: false,
                message: "",
                p1Location:"",                
                infoE: "",
                pageE: "",
                infoT: "",
                pageT:""
            }
        }
    }

    componentDidMount() {
        this.pegaEscolas()
        this.pegaTurmas()
        this.buscaAluno(this.props.match.params.id)
        
        
    if (this.state.currentUser) {
        this.setState({
          showModeratorBoard: this.state.currentUser.roles.includes("ROLE_MODERATOR")
        })
      }
    }

    async buscaAluno(id) {
        await AlunoDataService.buscarUm(id)
        .then(response => {
            this.setState({
                current: {
                    id: response.data.id,
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
                    turmaOriginal: response.data.turma,
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
                    cidade: "Belford Roxo",
                    uf: "RJ",
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
                    status: response.data.status,
                    long: response.data.long,
                    foto: "default.jpg",
                    situacao: response.data.situacao,
                    imagem: response.data.imagem,
                    url: response.data.url
                }
            })
        })
        .catch(e => {
            console.log(e)
        })  
        this.pegaTurmaOriginal()        
    }
        
    pegaEscolas(page = 1) {
        EscolaDataService.buscarTodos(page)
        .then(response => {
            //REST do response da API em duas constantes: 
            // "docs" com os dados do chamado e "info" com os dados das páginas
            const { docs, ...info } = response.data
            this.setState({
                escolas: docs,
                infoE: info,
                pageE: page
            })
        })
        .catch(e => {
            console.log(e)
        })
    }

    async pegaTurmas(page = 1) {
        await TurmaDataService.buscarTodos(page)
        .then(response => {
            //REST do response da API em duas constantes: 
            // "docs" com os dados do chamado e "info" com os dados das páginas
            const { docs, ...info } = response.data
            this.setState({
                turmas: docs,
                infoT: info,
                pageP: page
            })
            
        })
        .catch(e => {
            console.log(e)
        })   
        
    }

    async pegaTurmaOriginal() {
        await this.state.turmas.map((turma) => {
            if (this.state.current.turma === turma.descricao) {
                this.setState({
                    turmaOriginal: turma
                })                
            }
        })
    }

    handlerResponsavel(e){
        const responsavel = e.target.value = ("" + e.target.value).toUpperCase()
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                responsavel: responsavel
            }
        }))
    }

    handlerCPFResponsavel(e){
        const cpf_responsavel = cpfMask(e.target.value)
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                cpf_responsavel: cpf_responsavel
            }
        }))
    }

    handlerCEP(e){
        const cep =  cepMask(e.target.value)
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                cep: cep
            }
        }))
    }

    handlerLogradouro(e){
        const logradouro = e.target.value = ("" + e.target.value).toUpperCase()
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                logradouro: logradouro
            }
        }))
    }

    handlerNumero(e){
        const numero = e.target.value = ("" + e.target.value).toUpperCase()
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                numero: numero
            }
        }))
    }

    handlerComplemento(e){
        const complemento = e.target.value = ("" + e.target.value).toUpperCase()
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                complemento: complemento
            }
        }))
    }

    handlerBairro(e){
        const bairro = e.target.value = ("" + e.target.value).toUpperCase()
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                bairro: bairro
            }
        }))
    }

    handlerCidade(e) {
        const cidade = e.target.value = ("" + e.target.value).toUpperCase()
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                cidade: cidade
            }
        }))
    }

    handlerTelefone(e){
        const telefone = telMask(e.target.value)
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                telefone: telefone
            }
        }))
    }
    
    handlerCelular(e){
        const celular = celMask(e.target.value)
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                celular: celular
            }
        }))
    }

    handlerEmail(e){
        const email = e.target.value = ("" + e.target.value).toLowerCase()
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                email: email
            }
        }))
    }

    handlerNome(e){
        const nome = e.target.value = ("" + e.target.value).toUpperCase()
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                nome: nome
            }
        }))
    }

    handlerDtNascimento(e) {
        const dtnascimento = e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                 dtnascimento: dtnascimento
            }
        }))
    }

    handlerDtNascimentoNovo(e) {
        const dtnascimentonovo = e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                 dtnascimento: dtnascimentonovo
            }
        }))
    }

    handlerSexo(e){
        const sexo = e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                sexo: sexo
            }
        }))
    }

    handlerRG(e){
        const rg = e.target.value = ("" + e.target.value).replace(/\D/g, '')
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                rg: rg
            }
        }))
    }

    handlerCPF(e){
        const cpf = cpfMask(e.target.value)
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                cpf: cpf
            }
        }))
    }

    handlerNIS(e){
        const nis = e.target.value = ("" + e.target.value).replace(/\D/g, '')
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                nis: nis
            }
        }))
    }

    handlerBolsaFamilia(e){
        const bolsafamilia = e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                bolsafamilia: bolsafamilia
            }
        }))
    }

    handlerIrmao(e){
        const irmao = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                irmao: irmao
            }
        }))
    }

    handlerVulneravel(e){
        const vulneravel = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                vulneravel: vulneravel
            }
        }))
    }


    handlerEja(e){
        const eja = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                eja: eja
            }
        }))
    }

    handlerConveniada(e) {
        const conveniada = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                conveniada: conveniada
            }
        }))
    }

    handlerLat(e) {
        const lat = e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                lat: lat
            }
        }))
    }

    handlerLong(e) {
        const long = e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                long: long
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
        const outra = e.target.value = ("" + e.target.value).toUpperCase()
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                outra: outra
            }
        }))
    }

    handlerEscola(e){
        const escola = e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                escola: escola
            }
        }))
    }

    handlerNivel(e){
        const nivel = e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                nivel: nivel
            }
        }))
    }

    handlerSerie(e){
        const serie = e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                serie: serie
            }
        }))
    }

    handlerTurma(e){
        //this.selecionaTurma()
        const turma = e.target.value        
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                turma: turma
            }
        }))
    }

    handlerTurno(e){
        const turno = e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                turno: turno
            }
        }))
    }

    handlerProtocolo(e){
        const protocolo = e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                protocolo: protocolo
            }
        }))
    }

    handlerStatus(e){
        const status = e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                status: status
            }
        }))
    }

    async pegaEnderecoCep(page = 1) {

        if (this.state.current.cep !== "" || this.state.current.cep !== undefined ) {
           await CepDataService.buscarCep(this.state.current.cep,page)
            .then(response => {
                const { docs, ...info } = response.data
                this.setState({
                    ceps: docs,
                    infoT: info,
                    pageP: page
                })
            })
            .catch(e => {
                console.log(e)
            })

            if (this.state.ceps.length > 0) {                
                this.setState( prevState => ({
                    current: {
                    ...prevState.current,
                    logradouro: this.state.ceps[0].logradouro,              
                    bairro: this.state.ceps[0].bairro,
                    cidade: this.state.ceps[0].cidade
                }})
                    
                ) 
                this.inputLogradouro.current.value = this.state.current.logradouro
                this.inputBairro.current.value = this.state.current.bairro            
                this.inputCidade.current.value = this.state.current.cidade 
            }

            if ( this.state.ceps.length === 0) {
                alert("CEP não localizado")
            }
             
        }
    }

    async pegaLocalizacaoCEP() {
        const key = 'AIzaSyBwNxO-LGt8HpwtFbMAhBEaUxeew-FCz1o'        

        if (this.state.current.cep !== "" || this.state.current.cep !== undefined ) {
            const buscaCEP = await axios
            .get('https://maps.googleapis.com/maps/api/geocode/json?&address=' + 
            this.state.current.cep + '&key=' + key)

            if (buscaCEP.data.results.length > 0) {
                const pegaEndereco = await axios
                .get('https://maps.googleapis.com/maps/api/geocode/json?latlng='+
                buscaCEP.data.results[0].geometry.location.lat+','+
                buscaCEP.data.results[0].geometry.location.lng+'&key='+key)                
                
                this.setState({
                    p1Location: buscaCEP.data         
                })
                
                this.timerID = setTimeout(() => {
                    this.setState({                
                        lat: buscaCEP.data.results[0].geometry.location.lat,
                        long: buscaCEP.data.results[0].geometry.location.lng          
                    })
                    this.inputLatitude.current.value = this.state.lat
                    this.inputLongitude.current.value = this.state.long
                }, 2000)  
            }

            if (buscaCEP.data.results.length === 0) {
                alert("Latitude e logitude não encontradas pelo CEP indicado!")
            }            
        }    

        this.pegaEnderecoCep()           
          
    }

    async pegaLocalizacao() {
        const key = 'AIzaSyBwNxO-LGt8HpwtFbMAhBEaUxeew-FCz1o' 
        
        if (this.state.current.cep === "" && this.state.current.logradouro !== "" ) {
            const buscaEndereco = await axios
            .get('https://maps.googleapis.com/maps/api/geocode/json?&address=' + 
            this.state.current.numero + ',' + this.state.current.logradouro + this.state.current.cidade +', RJ&key=' + key)

            this.setState({
                p1Location: buscaEndereco.data         
            })

            this.timerID = setTimeout(() => {
                this.setState(prevState => ({                
                    current: {
                        ...prevState.current,
                        lat: buscaEndereco.data.results[0].geometry.location.lat,
                        long: buscaEndereco.data.results[0].geometry.location.lng          
                    }                    
                }))
                this.inputLatitude.current.value = this.state.current.lat
                this.inputLongitude.current.value = this.state.current.long
            }, 2000)    
        }        
    }

    calculaSerie() {

        if (this.state.current.dtnascimento) {
            if (this.state.current.dtnascimento >= '2019-04-01' && this.state.current.dtnascimento <= '2020-03-31') {
                this.setState({
                    nivel: "Creche",
                    serie: "Creche I"
                })
             }
     
             if (this.state.current.dtnascimento >= '2018-04-01' && this.state.current.dtnascimento <= '2019-03-31') {
                 this.setState({
                     nivel: "Creche",
                     serie: "Creche II"
                 })
             }
     
             if (this.state.current.dtnascimento >= '2017-04-01' && this.state.current.dtnascimento <= '2018-03-31') {
                 this.setState({
                     nivel: "Creche",
                     serie: "Creche III"
                 })
             }
             if (this.state.current.dtnascimento >= '2016-04-01' && this.state.current.dtnascimento <= '2017-03-31') {
                 this.setState({
                     nivel: "Pré escola",
                     serie: "Pré IV"
                 })
             }
             if (this.state.current.dtnascimento >= '2015-04-01' && this.state.current.dtnascimento <= '2016-03-31') {
                 this.setState({
                     nivel: "Pré escola",
                     serie: "Pré V"                
                 })
             }
     
             if (this.state.current.dtnascimento <= '2003-03-31') {
                 this.setState({
                     eja: true,
                     nivel: "Fundamental Anos Finais"
                 })
             }

             if ( this.state.current.dtnascimento > '2010-03-31' && this.state.current.dtnascimento <= '2015-03-31') {
                this.setState({
                    eja: false,
                    nivel: "Fundamental Anos Iniciais"
                })

                if (this.state.current.dtnascimento > '2014-03-31' && this.state.current.dtnascimento <= '2015-03-31') {
                    this.setState({
                        faixaSerie: "1",
                        serie: "1º ano"
                    })
                }
                if (this.state.current.dtnascimento > '2013-03-31' && this.state.current.dtnascimento <= '2014-03-31') {
                    this.setState({
                        faixaSerie: "2",
                        serie: "2º ano"
                    })
                }
                if (this.state.current.dtnascimento > '2012-03-31' && this.state.current.dtnascimento <= '2013-03-31') {
                    this.setState({
                        faixaSerie: "3",
                        serie: "3º ano"
                    })
                }
                if (this.state.current.dtnascimento > '2011-03-31' && this.state.current.dtnascimento <= '2012-03-31') {
                    this.setState({
                        faixaSerie: "4",
                        serie: "4º ano"
                    })
                }
                if (this.state.current.dtnascimento > '2010-03-31' && this.state.current.dtnascimento <= '2011-03-31') {
                    this.setState({
                        faixaSerie: "5",
                        serie: "5º ano"
                    })
                }

             }
     
             if (this.state.current.dtnascimento > '2003-03-31' && this.state.current.dtnascimento <= '2005-03-31' && this.state.current.eja === false) {
                 this.setState({
                     eja: false,
                     nivel: "Fundamental Anos Finais"
                 })
                 
                 if (this.state.current.dtnascimento > '2009-03-31' && this.state.current.dtnascimento <= '2010-03-31') {
                     this.setState({
                         faixaSerie: "6",
                         serie: "6º ano"
                     })
                 }
                 if (this.state.current.dtnascimento > '2008-03-31' && this.state.current.dtnascimento <= '2009-03-31') {
                     this.setState({
                         faixaSerie: "7",
                         serie: "7º ano"
                     })
                 }
                 if (this.state.current.dtnascimento > '2007-03-31' && this.state.current.dtnascimento <= '2008-03-31') {
                     this.setState({
                         faixaSerie: "8",
                         serie: "8º ano"
                     })
                 }
                 if (this.state.current.dtnascimento <= '2007-03-31') {
                     this.setState({
                         faixaSerie: "9",
                         serie: "9º ano"
                     })
                 }
             }
        }
        

    }

    buscarEscolas() {

        this.calculaSerie()

        let todasDistancias = []
        let atual = [this.state.current.lat, this.state.current.long]
        let todas = null
        let filtroTurma = null
        let turmaEscola = null
        let todasEscolas = null

        if (this.state.current.dtnascimento <= '2020-03-31' && this.state.current.deficiente === "Não") {
           
            if (this.state.current.conveniada === true) {
               todas = this.state.current.escolas.filter((escola) => {
                return escola.conveniada === true
               })
            } else {
                todas = this.state.current.escolas
            }

            if (this.state.current.eja === true) {
                todas = this.state.current.escolas.filter((escola) => {
                    return escola.eja === true
                })

                filtroTurma = this.state.current.turmas.filter((turma) => {
                    return ((turma.serie === this.state.current.serie) && (turma.turno === this.state.current.turno) && (turma.eja === true))
                }) 
    
                turmaEscola = filtroTurma.map((turma) => {
                    return todas.filter((escola) => {
                        return turma.escola === escola.descricao
                    })
                }) 

                todasEscolas = turmaEscola.filter((escola) => {
                    return escola.length > 0
                }) 
            } else {         
                todas = this.state.current.escolas

                filtroTurma = this.state.current.turmas.filter((turma) => {
                    return ((turma.serie === this.state.current.serie) && (turma.turno === this.state.current.turno))
                }) 

                turmaEscola = filtroTurma.map((turma) => {
                    return todas.filter((escola) => {
                        return turma.escola === escola.descricao
                    })
                }) 
                
                todasEscolas = turmaEscola.filter((escola) => {
                    return escola.length > 0
                })            
            }           

            this.setState({
                turmaEscola: turmaEscola,
                todas: todas,
                filtroTurma: filtroTurma,
                todasEscolas: todasEscolas
            })
                       
            for (let i = 0; i < todasEscolas.length; i++) {
                let R = 6371
                let dLat = (todasEscolas[i][0].lat - atual[0]) * (Math.PI / 180)
                let dLon = (todasEscolas[i][0].long - atual[1]) * (Math.PI / 180)
                
                this.setState({
                    dLat: todasEscolas[i][0].lat,
                    dLon: todasEscolas[i][0].long
                })

                let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(atual[0] * (Math.PI / 180)) * Math.cos(todasEscolas[i][0].lat * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
                let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))        
            
                todasDistancias.push({...todasEscolas[i][0] = {...todasEscolas[i][0], dist: R * c}})
                let ordenarDistancias = todasDistancias.sort(function(a, b) {
                    return a.dist -b.dist
                })
                const distancias = ordenarDistancias.slice(0,5)

                this.setState({
                    distancias: distancias
                })      
            }                       
        } 

        if (this.state.current.dtnascimento <= '2020-03-31' && this.state.current.deficiente === 'Sim') {
            if (this.state.current.auditiva === true) {
                let auditiva = this.state.escolas.filter((item) => {
                    return item.auditiva === true
                })

                for (let i = 0; i < auditiva.length; i++) {
                    let R = 6371
                    let dLat = (auditiva[i].lat - atual[0]) * (Math.PI / 180)
                    let dLon = (auditiva[i].long - atual[1]) * (Math.PI / 180)
                
                    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(atual[0] * (Math.PI / 180)) * Math.cos(auditiva[i].lat * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
                    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))        
                
                    todasDistancias.push({...auditiva[i] = {...auditiva[i], dist: R * c}})
                    let ordenarDistancias = todasDistancias.sort(function(a, b) {
                        return a.dist -b.dist
                    })
                    const distancias = ordenarDistancias.slice(0,5)

                    this.setState({
                        distancias: distancias
                    })      
                }
            }

            if (this.state.current.autismo === true) {
                let autismo = this.state.escolas.filter((item) => {
                    return item.autismo === true
                })

                for (let i = 0; i < autismo.length; i++) {
                    let R = 6371
                    let dLat = (autismo[i].lat - atual[0]) * (Math.PI / 180)
                    let dLon = (autismo[i].long - atual[1]) * (Math.PI / 180)
                
                    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(atual[0] * (Math.PI / 180)) * Math.cos(autismo[i].lat * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
                    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))        
                
                    todasDistancias.push({...autismo[i] = {...autismo[i], dist: R * c}})
                    let ordenarDistancias = todasDistancias.sort(function(a, b) {
                        return a.dist -b.dist
                    })
                    const distancias = ordenarDistancias.slice(0,5)

                    this.setState({
                        distancias: distancias
                    })      
                }
            }

            if (this.state.current.fala === true) {
                let fala = this.state.escolas.filter((item) => {
                    return item.fala === true
                })

                for (let i = 0; i < fala.length; i++) {
                    let R = 6371
                    let dLat = (fala[i].lat - atual[0]) * (Math.PI / 180)
                    let dLon = (fala[i].long - atual[1]) * (Math.PI / 180)
                
                    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(atual[0] * (Math.PI / 180)) * Math.cos(fala[i].lat * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
                    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))        
                
                    todasDistancias.push({...fala[i] = {...fala[i], dist: R * c}})
                    let ordenarDistancias = todasDistancias.sort(function(a, b) {
                        return a.dist -b.dist
                    })
                    const distancias = ordenarDistancias.slice(0,5)

                    this.setState({
                        distancias: distancias
                    })      
                }
            }

            if (this.state.current.mental === true) {
                let mental = this.state.escolas.filter((item) => {
                    return item.mental === true
                })

                for (let i = 0; i < mental.length; i++) {
                    let R = 6371
                    let dLat = (mental[i].lat - atual[0]) * (Math.PI / 180)
                    let dLon = (mental[i].long - atual[1]) * (Math.PI / 180)
                
                    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(atual[0] * (Math.PI / 180)) * Math.cos(mental[i].lat * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
                    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))        
                
                    todasDistancias.push({...mental[i] = {...mental[i], dist: R * c}})
                    let ordenarDistancias = todasDistancias.sort(function(a, b) {
                        return a.dist -b.dist
                    })
                    const distancias = ordenarDistancias.slice(0,5)

                    this.setState({
                        distancias: distancias
                    })      
                }
            }

            if (this.state.current.motora === true) {
                let motora = this.state.escolas.filter((item) => {
                    return item.motora === true
                })

                for (let i = 0; i < motora.length; i++) {
                    let R = 6371
                    let dLat = (motora[i].lat - atual[0]) * (Math.PI / 180)
                    let dLon = (motora[i].long - atual[1]) * (Math.PI / 180)
                
                    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(atual[0] * (Math.PI / 180)) * Math.cos(motora[i].lat * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
                    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))        
                
                    todasDistancias.push({...motora[i] = {...motora[i], dist: R * c}})
                    let ordenarDistancias = todasDistancias.sort(function(a, b) {
                        return a.dist -b.dist
                    })
                    const distancias = ordenarDistancias.slice(0,5)

                    this.setState({
                        distancias: distancias
                    })      
                }
            }

            if (this.state.current.visual === true) {
                let visual = this.state.escolas.filter((item) => {
                    return item.visual === true
                })

                for (let i = 0; i < visual.length; i++) {
                    let R = 6371
                    let dLat = (visual[i].lat - atual[0]) * (Math.PI / 180)
                    let dLon = (visual[i].long - atual[1]) * (Math.PI / 180)
                
                    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(atual[0] * (Math.PI / 180)) * Math.cos(visual[i].lat * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
                    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))        
                
                    todasDistancias.push({...visual[i] = {...visual[i], dist: R * c}})
                    let ordenarDistancias = todasDistancias.sort(function(a, b) {
                        return a.dist -b.dist
                    })
                    const distancias = ordenarDistancias.slice(0,5)

                    this.setState({
                        distancias: distancias
                    })      
                }
            }

            if (this.state.current.cegueira === true) {
                let cegueira = this.state.escolas.filter((item) => {
                    return item.cegueira === true
                })

                for (let i = 0; i < cegueira.length; i++) {
                    let R = 6371
                    let dLat = (cegueira[i].lat - atual[0]) * (Math.PI / 180)
                    let dLon = (cegueira[i].long - atual[1]) * (Math.PI / 180)
                
                    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(atual[0] * (Math.PI / 180)) * Math.cos(cegueira[i].lat * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
                    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))        
                
                    todasDistancias.push({...cegueira[i] = {...cegueira[i], dist: R * c}})
                    let ordenarDistancias = todasDistancias.sort(function(a, b) {
                        return a.dist -b.dist
                    })
                    const distancias = ordenarDistancias.slice(0,5)

                    this.setState({
                        distancias: distancias
                    })      
                }
            }

            if (this.state.current.baixaVisao === true) {
                let baixaVisao = this.state.escolas.filter((item) => {
                    return item.baixaVisao === true
                })

                for (let i = 0; i < baixaVisao.length; i++) {
                    let R = 6371
                    let dLat = (baixaVisao[i].lat - atual[0]) * (Math.PI / 180)
                    let dLon = (baixaVisao[i].long - atual[1]) * (Math.PI / 180)
                
                    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(atual[0] * (Math.PI / 180)) * Math.cos(baixaVisao[i].lat * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
                    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))        
                
                    todasDistancias.push({...baixaVisao[i] = {...baixaVisao[i], dist: R * c}})
                    let ordenarDistancias = todasDistancias.sort(function(a, b) {
                        return a.dist -b.dist
                    })
                    const distancias = ordenarDistancias.slice(0,5)

                    this.setState({
                        distancias: distancias
                    })      
                }
            }

            if (this.state.current.surdoCegueira === true) {
                let surdoCegueira = this.state.escolas.filter((item) => {
                    return item.surdoCegueira === true
                })

                for (let i = 0; i < surdoCegueira.length; i++) {
                    let R = 6371
                    let dLat = (surdoCegueira[i].lat - atual[0]) * (Math.PI / 180)
                    let dLon = (surdoCegueira[i].long - atual[1]) * (Math.PI / 180)
                
                    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(atual[0] * (Math.PI / 180)) * Math.cos(surdoCegueira[i].lat * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
                    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))        
                
                    todasDistancias.push({...surdoCegueira[i] = {...surdoCegueira[i], dist: R * c}})
                    let ordenarDistancias = todasDistancias.sort(function(a, b) {
                        return a.dist -b.dist
                    })
                    const distancias = ordenarDistancias.slice(0,5)

                    this.setState({
                        distancias: distancias
                    })      
                }
            }

            if (this.state.current.multipla === true) {
                let multipla = this.state.escolas.filter((item) => {
                    return item.multipla === true
                })

                for (let i = 0; i < multipla.length; i++) {
                    let R = 6371
                    let dLat = (multipla[i].lat - atual[0]) * (Math.PI / 180)
                    let dLon = (multipla[i].long - atual[1]) * (Math.PI / 180)
                
                    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(atual[0] * (Math.PI / 180)) * Math.cos(multipla[i].lat * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
                    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))        
                
                    todasDistancias.push({...multipla[i] = {...multipla[i], dist: R * c}})
                    let ordenarDistancias = todasDistancias.sort(function(a, b) {
                        return a.dist -b.dist
                    })
                    const distancias = ordenarDistancias.slice(0,5)

                    this.setState({
                        distancias: distancias
                    })      
                }
            }

            if (this.state.current.superdotacao === true) {
                let superdotacao = this.state.escolas.filter((item) => {
                    return item.superdotacao === true
                })

                for (let i = 0; i < superdotacao.length; i++) {
                    let R = 6371
                    let dLat = (superdotacao[i].lat - atual[0]) * (Math.PI / 180)
                    let dLon = (superdotacao[i].long - atual[1]) * (Math.PI / 180)
                
                    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(atual[0] * (Math.PI / 180)) * Math.cos(superdotacao[i].lat * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
                    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))        
                
                    todasDistancias.push({...superdotacao[i] = {...superdotacao[i], dist: R * c}})
                    let ordenarDistancias = todasDistancias.sort(function(a, b) {
                        return a.dist -b.dist
                    })
                    const distancias = ordenarDistancias.slice(0,5)

                    this.setState({
                        distancias: distancias
                    })      
                }
            }


            if (this.state.current.down === true) {
                let down = this.state.escolas.filter((item) => {
                    return item.down === true
                })

                for (let i = 0; i < down.length; i++) {
                    let R = 6371
                    let dLat = (down[i].lat - atual[0]) * (Math.PI / 180)
                    let dLon = (down[i].long - atual[1]) * (Math.PI / 180)
                
                    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(atual[0] * (Math.PI / 180)) * Math.cos(down[i].lat * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
                    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))        
                
                    todasDistancias.push({...down[i] = {...down[i], dist: R * c}})
                    let ordenarDistancias = todasDistancias.sort(function(a, b) {
                        return a.dist -b.dist
                    })
                    const distancias = ordenarDistancias.slice(0,5)

                    this.setState({
                        distancias: distancias
                    })      
                }
            }

        }

        if (this.state.current.dtnascimento >= '2021-04-01') {
            alert("Data de nascimento incorreta")   
            return false         
        } 

        if (this.state.current.dtnascimento < '1900-01-01') {
            alert("Data de nascimento incorreta")
            return false            
        } 


        if (this.state.current.dtnascimento >= '2020-04-01' && this.state.current.dtnascimento <= '2021-03-31') {
            alert("Somente crianças com 1 completo até 31/03/2021 podem se candidatar")
            return false
        }
    }

    selecionaOpcao(item, index) {
        this.setState({
            currentEscola: item,
            currentIndexEscola: index
        })
    }

    selecionaTurma(turma, index) {
        this.setState({
            currentTurma: turma,
            currentIndexTurma: index
        })
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                turma: turma.descricao
            }
        }))
    }

    calculaPontos () {

        let arrayPontos = []
        if (this.state.current.deficiente === "Sim") {
           
            arrayPontos.push(50)
        }

        if (this.state.current.irmao === true) {               
            arrayPontos.push(5)
        }

        if (this.state.current.vulneravel === true) {           
            arrayPontos.push(2)
        }

        if (this.state.current.bolsafamilia === "Sim") {            
            arrayPontos.push(4)
        }
        
        let soma = []   
        soma = arrayPontos.reduce((a, b) => {return a += b}, 0)        
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                pontos: soma
            }
        }))

        this.timerSave = setTimeout(() => {
            this.contaVaga()
            this.salvarAluno()
        }, 1000)         
        
    }

    async contaVaga() {

        if (this.state.current.turma !== "" && this.state.turmaOriginal === "" && this.state.currentTurma.id !== "") {
            await TurmaDataService.buscarUm(this.state.currentTurma.id)
            .then(response => {
                this.setState({
                    matriculaCurrent: response.data.matriculas
                })
            })
            .catch(e => {
                console.log(e)
            }) 

            var data = {
                id: this.state.currentTurma.id,
                matriculas: this.state.matriculaCurrent + 1
            }

            console.log("log", data)
            await TurmaDataService.editar(this.state.currentTurma.id, data)
            .then(response => {
                this.setState({
                    responseTurma: response.data
                })})
            .catch(e => {
                console.log(e)
            }) 
        }

        if (this.state.currentTurma && this.state.currentTurma !== "" && this.state.turmaOriginal && (this.state.currentTurma.id !== this.state.turmaOriginal.id) ) {
            await TurmaDataService.buscarUm(this.state.currentTurma.id)
            .then(response => {
                this.setState({
                    matriculaCurrent: response.data.matriculas
                })
            })
            .catch(e => {
                console.log(e)
            }) 

            var data = {
                id: this.state.currentTurma.id,
                matriculas: this.state.matriculaCurrent + 1
            }
            await TurmaDataService.editar(this.state.currentTurma.id, data)
            .then(response => {
                this.setState({
                    responseTurma: response.data
                })})
            .catch(e => {
                console.log(e)
            }) 

            await TurmaDataService.buscarUm(this.state.turmaOriginal.id)
            .then(response => {
                this.setState({
                    matriculaOriginal: response.data.matriculas
                })
            })
            .catch(e => {
                console.log(e)
            }) 

            var remove = {
                id: this.state.turmaOriginal.id,
                matriculas: this.state.matriculaOriginal - 1
            }

            await TurmaDataService.editar(this.state.turmaOriginal.id, remove)
            .then(response => {
                this.setState({
                    responseTurmaRemove: response.data
                })})
            .catch(e => {
                console.log(e)
            }) 
        }


       if (this.state.current.turma !== "" && this.state.turmaOriginal && (this.state.current.turma === this.state.turmaOriginal.descricao)) {
            await TurmaDataService.buscarUm(this.state.turmaOriginal.id)
            .then(response => {
                this.setState({
                    matriculaOriginal: response.data.matriculas
                })
            })

            var data = {
                id: this.state.idTurmaOriginal,
                matriculas: this.state.matriculaOriginal + 1
            }

            await TurmaDataService.editar(this.state.turmaOriginal.id, data)
            .then(response => {
                this.setState({
                    responseTurmaRemove: response.data
                })})
            .catch(e => {
                console.log(e)
            }) 
        } 

        
    }


    async salvarAluno() {

        if (this.state.current.dtnascimento >= '2021-04-01') {
            alert("Data de nascimento incorreta")   
            return false         
        } 
        if (this.state.current.dtnascimento < '1900-01-01') {
            alert("Data de nascimento incorreta")
            return false            
        } 

        if (this.state.current.dtnascimento >= '2020-04-01' && this.state.dtnascimento <= '2021-03-31') {
            alert("Somente crianças com 1 completo até 31/03/2021 podem se candidatar à vaga")
            return false
        }

        var data = {
            id: this.state.current.id,
            username: this.state.currentUser.username,
            nome: this.state.current.nome,
            dtnascimento: moment(this.state.current.dtnascimento,'YYYY-MM-DD'),
            sexo: this.state.current.sexo,
            rg: this.state.current.rg,
            cpf: this.state.current.cpf,
            nis: this.state.current.nis,
            bolsafamilia: this.state.current.bolsafamilia,
            //protocolo: this.state.current.protocolo,
            nivel: this.state.current.nivel,
            serie: this.state.current.serie,
            turma: this.state.currentTurma.descricao,
            turno: this.state.current.turno,
            escola: this.state.current.escola,
            irmao: this.state.current.irmao,
            vulneravel: this.state.current.vulneravel,
            pontos: this.state.current.pontos,
            responsavel: this.state.current.responsavel,
            cpf_responsavel: this.state.current.cpf_responsavel,
            logradouro: this.state.current.logradouro,
            numero: this.state.current.numero,
            complemento: this.state.current.complemento,
            bairro: this.state.current.bairro,
            cidade: "Belford Roxo",
            uf: "RJ",
            cep: this.state.current.cep,
            telefone: this.state.current.telefone,
            celular: this.state.current.celular,
            email: this.state.current.email,
            eja: this.state.current.eja,
            deficiente: this.state.current.deficiente,
            mental: this.state.current.mental,
            fala: this.state.current.fala,
            auditiva: this.state.current.auditiva,
            motora: this.state.current.motora,
            visual: this.state.current.visual,                     
            cegueira: this.state.cegueira,
            baixaVisao: this.state.baixaVisao,
            multipla: this.state.multipla,
            surdoCegueira: this.state.surdoCegueira,
            superdotacao: this.state.superdotacao,
            down: this.state.current.down,
            autismo: this.state.current.autismo,
            chkOutra: this.state.current.chkOutra,
            outra: this.state.current.outra,
            lat: this.state.current.lat,
            long: this.state.current.long,
            status: this.state.current.status
        }

        AlunoDataService.editar(this.state.current.id, data)
        .then(response => {
            this.setState({
                id: response.data.id,
                username: response.data.username,
                nome: response.data.nome,
                dtnascimento: moment(response.data.dtnascimento).format('DD/MM/YYYY'),
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
                down: response.data.down,
                autismo: response.data.autismo,
                chkOutra: response.data.chkOutra,
                outra: response.data.outra,
                lat: response.data.lat,
                long: response.data.long,
                situacao: response.data.situacao,
                status: response.data.status,
                submitted: true,
                message: "Aluno(a) alterado(a) com sucesso"
            })            
            })
            .catch(e => {
                console.log(e)
            })   
            
            if (this.state.current.turma !== "") {
                await TurmaDataService.buscarUm(this.state.turmaOriginal.id)
            .then(response => {
                this.setState({
                    matriculaOriginal: response.data.matriculas
                })
            })
            }
    }


    render () {
        const {showModeratorBoard, current, distancias, currentIndex,currentTurma, currentIndexTurma, escolas, turmas} = this.state

        let mostrarOpcoes = null
        let serie = null
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
        let multipla = null
        let superdotacao = null
        let outra = null

        if (distancias && current.lat && current.long) {
            mostrarOpcoes = <div className="escola-list">
                {distancias.map((item, index) => {                   
            
            if (item.auditiva === true) {
                auditiva = <div>
                    <label> Deficiência auditiva e surdez, </label>
                </div>
            }
    
            if (item.autismo === true) {
                autismo = <div>
                    <label> , Transtorno do espectro autista </label>
                </div>
            }
    
            if (item.fala === true) {
                fala = <div>
                    <label>, Fala</label>
                </div>
            }
    
            if (item.mental === true) {
                mental = <div>
                    <label>, Deficiência mental</label>
                </div>
            }
    
            if (item.motora === true) {
                motora = <div>
                    <label>, Deficiência física</label>
                </div>
            }
    
            /*if (item.down === true) {
                down = <div>
                    <label>, Síndrome de Down</label>
                </div>
            }*/
    
            if (item.visual === true) {
                visual = <div>
                    <label>, Deficiência visual</label>
                </div>
            }

            if (item.cegueira === true) {
                cegueira = <div>
                    <label>, Cegueira</label>
                </div>
            }

            if (item.baixaVisao === true) {
                baixaVisao = <div>
                    <label>, Baixa visão</label>
                </div>
            }

            if (item.surdoCegueira === true) {
                surdoCegueira = <div>
                    <label>, Surdocegueira</label>
                </div>
            }

            if (item.multipla === true) {
                multipla = <div>
                    <label>, Deficiência múltipla</label>
                </div>
            }

            if (item.superdotacao === true) {
                superdotacao = <div>
                    <label>, Altas habilidades / Superdotação</label>
                </div>
            }
            
            if (item.chkOutra === true) {
                outra = <div>
                    <label>, Outra: {item.outra}</label>
                </div>
            }

                    
            return (
                <article key={item.id}>
                    <div className="row">
                        <div className="col-md-8" style={{display: 'flex'}}>
                            <div className={"escola-list" + (index === currentIndex ? "-active" : "")} onClick={() => this.selecionaOpcao(item, index)} key={index}>
                                <h2>Opção {index + 1}: {item.descricao}</h2>                                                         
                                <h4>{item.logradouro}, {item.numero}, {item.bairro}</h4>                                
                                <h4>Distância: {item.dist.toFixed(1)} Km</h4>
                                <div className="row" style={{padding: 15}} >
                                <div style={{width: 'max-width'}}>
                                        <div style={{display: 'flex'}}>                                    
                                            <h5>Deficiência(s) atendida(s):  </h5> 
                                            <div style={{display: 'grid'}}>
                                                <div>{auditiva}</div>                                                
                                                {/* <div> {down} </div> */}
                                                <div> {fala} </div> 
                                                <div> {mental} </div>
                                                <div> {motora} </div>
                                                <div> {visual} </div>
                                                <div> {cegueira} </div>
                                            </div>
                                            <div style={{display: 'grid'}}>
                                                <div> {baixaVisao} </div>
                                                <div> {surdoCegueira} </div>
                                                <div> {multipla} </div>
                                                <div> {superdotacao} </div>
                                                <div>{autismo}</div>
                                                <div> {outra} </div>
                                            </div>
                                        </div>
                                    </div>                                 
                                </div>
                            </div>
                        </div>
                    </div>                          
                </article>)
            })}
        </div>

    }

        if (current.nivel === "Creche") {
            serie = <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Ano de escolaridade</label>
                        <select className="form-control" id="serie" name="serie" value={current.serie} onChange={this.handlerSerie}  > 
                            <option value="" disabled> ---Selecione --- </option>
                            <option value="Creche I">Creche I</option>
                            <option value="Creche II">Creche II</option>
                            <option value="Creche III">Creche III</option>                       
                        </select>
                    </div> 
                </div>
                <div className="col-md-4">
                    <div className="form-group">
                        <label>Turno</label>
                        <select className="form-control" id="turno" name="turno" value={current.turno} onChange={this.handlerTurno}  > 
                            <option value="" disabled>---Selecione Turno---</option>
                            <option value="Manhã"> Manhã</option>
                            <option value="Tarde"> Tarde</option>
                            <option value="Noite"> Noite</option>                  
                            <option value="Intermediário"> Intermediário</option>                        
                        </select>
                    </div> 
                </div>
                <div className="col-md-2">
                    <div className="form-group row">                                
                        <div className="form-check" style={{marginLeft:3+'%'}}>
                            <label className="form-check-label">
                                <input className="form-check-input" type="checkbox" checked={current.conveniada === true} onChange={this.handlerConveniada} style={{marginRight: 1+'%'}} /> Conveniada
                            </label>
                        </div>
                    </div>
                </div>
            </div>

        }

        if (current.nivel === "Pré escola") {
            serie = <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Ano de escolaridade</label>
                        <select className="form-control" id="serie" name="serie" value={current.serie} onChange={this.handlerSerie}  > 
                            <option value="" disabled> --- Selecione ---</option>
                            <option value="Pré IV">Pré IV</option>
                            <option value="Pré V">Pré V</option>                   
                        </select>
                    </div> 
                </div>
                <div className="col-md-4">
                    <div className="form-group">
                        <label>Turno</label>
                        <select className="form-control" id="turno" name="turno" value={current.turno} onChange={this.handlerTurno}  > 
                            <option value="" disabled>---Selecione Turno---</option>
                            <option value="Manhã"> Manhã</option>
                            <option value="Tarde"> Tarde</option>
                            <option value="Noite"> Noite</option>                  
                            <option value="Intermediário"> Intermediário</option>                        
                        </select>
                    </div> 
                </div>
                <div className="col-md-2">
                    <div className="form-group row">                                
                        <div className="form-check" style={{marginLeft:3+'%'}}>
                            <label className="form-check-label">
                                <input className="form-check-input" type="checkbox" checked={current.conveniada === true} onChange={this.handlerConveniada} style={{marginRight: 1+'%'}} /> Conveniada
                            </label>
                        </div>
                    </div>
                </div>
            </div>

        }

        if (current.nivel === "Fundamental Anos Iniciais") {
            serie = <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
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
                </div>            
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Turno</label>
                        <select className="form-control" id="turno" name="turno" value={current.turno} onChange={this.handlerTurno}  > 
                            <option value="" disabled>---Escolha o turno---</option>
                            <option value="Manhã"> Manhã</option>
                            <option value="Tarde"> Tarde</option>
                            <option value="Noite"> Noite</option>                  
                            <option value="Intermediário"> Intermediário</option>                      
                        </select>
                    </div> 
                </div>
        </div>
        }

        if (current.nivel === "Fundamental Anos Finais") {
            serie = <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Ano de escolaridade</label>
                        <select className="form-control" id="serie" name="serie" value={current.serie} onChange={this.handlerSerie}  > 
                            <option value="" disabled> --- Selecione --- </option>
                            <option value="6º ano">6º ano</option>
                            <option value="7º ano">7º ano</option>
                            <option value="8º ano">8º ano</option>
                            <option value="9º ano">9º ano</option>
                        </select>
                    </div>
                </div>            
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Turno</label>
                        <select className="form-control" id="turno" name="turno" value={current.turno} onChange={this.handlerTurno}  > 
                            <option value="" disabled>---Escolha o turno---</option>
                            <option value="Manhã"> Manhã</option>
                            <option value="Tarde"> Tarde</option>
                            <option value="Noite"> Noite</option>                  
                            <option value="Intermediário"> Intermediário</option>                      
                        </select>
                    </div> 
                </div>
        </div>
        }



        let eja = null
        if (current.dtnascimento === "") {
            eja = <div>
            <div className="form-group row">                    
                <div className="col-md-6" style={{paddingLeft: 30}}>
                    <div className="form-check col-md-6">
                        <label className="form-check-label" style={{paddingLeft: 30+'%',width: 'max-content', fontSize: 18+'px'}}>
                            <input className="form-check-input" type="checkbox" hidden  onChange={this.handlerEja}  /> Candidato(a) EJA
                        </label>
                    </div>
                </div>
            </div> 
            </div>
        }

        if (current.dtnascimento >= '2003-04-01' && current.dtnascimento <= '2006-03-31' ) {
            eja =  <div className="form-group row">                    
            <div className="col-md-6" style={{paddingLeft: 30}}>
                <div className="form-check col-md-6">
                    <label className="form-check-label" style={{paddingLeft: 30+'%',width: 'max-content', fontSize: 18+'px'}}>
                        <input className="form-check-input" type="checkbox" checked={current.eja === true} onChange={this.handlerEja}  /> Candidato(a) EJA
                    </label>
                </div>
            </div>
            </div> 
        }  

        if (current.dtnascimento  <= '2003-03-31' ) {
            eja =  <div className="form-group row">                    
            <div className="col-md-6" style={{paddingLeft: 30}}>
                <div className="form-check col-md-6">
                    <label className="form-check-label" style={{paddingLeft: 30+'%',width: 'max-content', fontSize: 18+'px'}}>
                        <input className="form-check-input" type="checkbox" disabled checked={true} onChange={this.handlerEja}  /> Candidato(a) EJA
                    </label>
                </div>
            </div>
            </div> 
        }        
    

        let deficiencias = null
        
        if (current.chkOutra === true) {
            outra = 
                <input type="text" className="form-control" value={current.outra} onChange={this.handlerOutra} placeholder="Digite a deficiência" />          
        }

        if (current.deficiente === 'Sim') {
            deficiencias = <div>
                <label className="col-md-12">Marque as deficiências que o(a) candidato(a) possui: </label>
                <div className="form-group row">                    
                    <div className="col-sm-12">
                        <div className="form-check">
                            <label className="form-check-label"  style={{marginRight: 2+'%'}}>
                                <input className="form-check-input" type="checkbox" checked={current.auditiva === true} onChange={this.handlerAuditiva} /> Deficiência auditiva e surdez
                            </label>
                            <label className="form-check-label"  style={{marginRight: 3+'%'}}>
                                <input className="form-check-input" type="checkbox" checked={current.fala === true} onChange={this.handlerFala}  /> Fala
                            </label>
                            <label className="form-check-label"  style={{marginRight: 3+'%'}}>
                                <input className="form-check-input" type="checkbox" checked={current.mental === true} onChange={this.handlerMental}  /> Deficiência mental
                            </label>
                            <label className="form-check-label"  style={{marginRight: 3+'%'}}>
                                <input className="form-check-input" type="checkbox" checked={current.motora === true} onChange={this.handlerMotora}  /> Deficiência física
                            </label>
                            <label className="form-check-label"  style={{marginRight: 3+'%'}}>
                                <input className="form-check-input" type="checkbox" checked={current.visual === true} onChange={this.handlerVisual}  /> Deficiência visual
                            </label>
                            <label className="form-check-label"  style={{marginRight: 3+'%'}}>
                                <input className="form-check-input" type="checkbox" checked={current.cegueira === true}onChange={this.handlerCegueira}  /> Cegueira
                            </label>
                            <label className="form-check-label"  style={{marginRight: 3+'%'}}>
                                <input className="form-check-input" type="checkbox" checked={current.surdoCegueira === true} onChange={this.handlerSurdoCegueira} /> Surdocegueira
                            </label>
                            <label className="form-check-label"  style={{marginRight: 3+'%'}}>
                                <input className="form-check-input" type="checkbox" checked={current.baixaVisao === true} onChange={this.handlerBaixaVisao}  /> Baixa visão
                            </label>
                            <label className="form-check-label"  style={{marginRight: 3+'%'}}>
                                <input className="form-check-input" type="checkbox" checked={current.multipla === true} onChange={this.handlerMultipla}  /> Deficiência múltipla
                            </label>
                            {/*<label className="form-check-label"  style={{marginRight: 3+'%'}}>
                                <input className="form-check-input" type="checkbox" checked={current.down === true} onChange={this.handlerDown}  /> Síndrome de Down
                            </label> */}
                            <label className="form-check-label"  style={{marginRight: 3+'%'}}>
                                <input className="form-check-input" type="checkbox" checked={current.autismo === true} onChange={this.handlerAutismo}  /> Transtorno do espectro autista
                            </label>
                            <label className="form-check-label"  style={{marginRight: 3+'%'}}>
                                <input className="form-check-input" type="checkbox" checked={current.superdotacao === true} onChange={this.handlerSuperdotacao} /> Altas habilidades / Superdotação
                            </label>
                            <label className="form-check-label"  style={{marginRight: 3+'%'}}>
                                <input className="form-check-input" type="checkbox" checked={current.chkOutra === true} onChange={this.handlerChkOutra}  /> Outra
                            </label>
                            {outra}
                        </div>
                    </div>                    
                </div>
            </div>
        }

        let listaEscolas = null
        let lista = escolas.map((item, index) => ( 
            <option value={item.descricao} key={index}>{item.descricao}</option>
        ))
        
        listaEscolas = <div className="col-md-6" >   
            <label>Escola</label>                                          
            <select 
                className="form-control" 
                id="escola" 
                name="escola"
                value={current.escola}                                    
                onChange={this.handlerEscola} >     
            
                <option value="" disabled> ---Selecione--- </option>  
                {lista}                     
            </select>
        </div>

        let filtroTurma = turmas.filter((turma) => {
            return ((turma.serie === current.serie) && (turma.turno === current.turno) && (turma.escola === current.escola))
        }) 

        let turmaEscola = filtroTurma.map((turma, index) =>{
        
            if (currentTurma === "" && current.turma === "")
            return <div className={"turma-list" + (index === currentIndexTurma ? "-active" : "")} onClick={() => this.selecionaTurma(turma, index)} key={index}>
                <article>
                    {turma.descricao}  ( {turma.qtd - turma.matriculas}  vagas livres )
                </article>
            </div>
            if ((current.turma !== turma.descricao)  && currentTurma === "" )
                return <div className={"turma-list" + (index === currentIndexTurma ? "-active" : "")} onClick={() => this.selecionaTurma(turma, index)} key={index}>
                    <article>
                        {turma.descricao} ( {turma.qtd - turma.matriculas}   vagas livres )
                    </article>
                </div>
            if ((current.turma === turma.descricao) && currentTurma === "")
                return <div className="turma-list-active" onClick={() => this.selecionaTurma(turma, index)} key={index}>
                    <article>
                        {turma.descricao}  ( {turma.qtd - turma.matriculas}   vagas livres )
                    </article>
                </div>
            if ((current.turma === turma.descricao) && currentTurma !== "")
            return <div className={"turma-list" + (index === currentIndexTurma ? "-active" : "")} onClick={() => this.selecionaTurma(turma, index)} key={index}>
                <article>
                    {turma.descricao}  ( {turma.qtd - turma.matriculas}   vagas livres )
                </article>
            </div>
            if ((current.turma !== turma.descricao) && currentTurma !== "")
            return <div className={"turma-list"  + (index === currentIndexTurma ? "-active" : "")} onClick={() => this.selecionaTurma(turma, index)} key={index}>
                <article>
                    {turma.descricao}  ( {turma.qtd - turma.matriculas}  vagas livres )
                </article>
            </div>
             
            
        })

        

        let listaTurmas = <div className="col-md-6" >   
        <label>Turma</label>   
        {turmaEscola}
        {/* <select 
            className="form-control" 
            id="turma" 
            name="turma"
            value={current.turma}                                    
            onChange={this.handlerTurma} >     
        
            <option value="" disabled>---Selecione---</option>  
            {turmaEscola}                     
        </select> */}
    </div>

        

        return (

            <div style={{marginTop: 5+'%'}}>
                {showModeratorBoard && (
                    <div>
                <h1> Alterar Aluno</h1>
                { current ? (
                    <div>
                        <Accordion defaultActiveKey="0">
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                        DADOS DO RESPONSÁVEL    
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        <div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="card-body text-secondary">
                                                        <label htmlFor="responsavel">Responsável</label>
                                                        <input 
                                                        type="text" 
                                                        className="form-control"
                                                        value={current.responsavel} 
                                                        onChange={this.handlerResponsavel} 
                                                        autoFocus 
                                                        required
                                                        validations={[required]} />
                                                    </div>
                                                </div>
                                                <div className="col-md-3">
                                                    <div className="card-body text-secondary">
                                                    <label htmlFor="cpf_responsavel">CPF Responsável</label>
                                                        <input 
                                                        maxLength = '14'   
                                                        className="form-control" 
                                                        onChange={this.handlerCPFResponsavel} 
                                                        value={current.cpf_responsavel}
                                                        required
                                                        validations={[required]}/>
                                                    </div>
                                                </div>
                                                <div className="col-md-3">
                                                    <div className="card-body text-secondary">
                                                        <label htmlFor="cep">CEP</label>
                                                        <input 
                                                        type="text" 
                                                        className="form-control" 
                                                        onChange={this.handlerCEP} 
                                                        value={current.cep}
                                                        onBlur={this.pegaLocalizacaoCEP} />
                                                    </div>  
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="card-body text-secondary">
                                                        <label htmlFor="logradouro">Endereço</label>
                                                        <input 
                                                        type="text" 
                                                        className="form-control" 
                                                        onChange={this.handlerLogradouro} 
                                                        value={current.logradouro}
                                                        ref={this.inputLogradouro} />
                                                    </div>
                                                </div>
                                                <div className="col-md-2">
                                                    <div className="card-body text-secondary">
                                                        <label htmlFor="numero">Número</label>
                                                        <input 
                                                        type="text" 
                                                        className="form-control" 
                                                        onChange={this.handlerNumero} 
                                                        value={current.numero} />
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="card-body text-secondary">
                                                        <label htmlFor="complemento">Complemento</label>
                                                        <input 
                                                        type="text" 
                                                        className="form-control" 
                                                        onChange={this.handlerComplemento} 
                                                        value={current.complemento} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="card-body text-secondary">
                                                    <label htmlFor="bairro">Bairro</label>
                                                    <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    onChange={this.handlerBairro} 
                                                    value={current.bairro}
                                                    ref={this.inputBairro} />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="card-body text-secondary">
                                                    <label htmlFor="cidade"> Cidade </label>
                                                    <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    id="cidade" 
                                                    required 
                                                    value={current.cidade} 
                                                    onChange={this.handlerCidade} 
                                                    name="cidade"
                                                    ref={this.inputCidade} />                            
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-3">
                                                <div className="card-body text-secondary">
                                                    <label htmlFor="latitude">Latitude</label>
                                                    <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    onChange={this.handlerLat} 
                                                    value={current.lat}
                                                    ref={this.inputLatitude}/>
                                                </div>
                                            </div>                                    
                                            <div className="col-md-3">
                                                <div className="card-body text-secondary">
                                                    <label htmlFor="longitude">Longitude</label>
                                                    <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    onChange={this.handlerLong} 
                                                    value={current.long}
                                                    ref={this.inputLongitude} />
                                                </div>
                                            </div>
                                            <div className="col-md-2">
                                                <div className="card-body text-secondary">                                                    
                                                    <button type="button" className="btn btn-info" style={{backgroundColor: 'rgb(226, 88, 34)', marginTop:33}} onClick={this.pegaLocalizacao}>
                                                        Localização
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <div className="card-body text-secondary">
                                                    <label htmlFor="email">E-mail</label>
                                                    <input 
                                                    type="email" 
                                                    className="form-control" 
                                                    onChange={this.handlerEmail} 
                                                    value={current.email}/>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="card-body text-secondary">
                                                    <label htmlFor="telefone">Telefone</label>
                                                    <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    onChange={this.handlerTelefone} 
                                                    value={current.telefone} />
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="card-body text-secondary">
                                                    <label htmlFor="celular">Celular</label>
                                                    <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    onChange={this.handlerCelular} 
                                                    value={current.celular} />
                                                </div>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                        DADOS DO(A) CANDIDATO(A)
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="1">
                                    <Card.Body>
                                        <div>
                                            <div className="row">
                                                <div className="col-md-6">                                                    
                                                    <div className="card-body text-secondary">
                                                        <label htmlFor="nome">Nome</label>
                                                        <input 
                                                        type="text" 
                                                        className="form-control" 
                                                        onChange={this.handlerNome} 
                                                        value={current.nome}
                                                        validations={[required]} />
                                                    </div>
                                                </div>
                                                <div className="col-md-3">                                                    
                                                    <div className="card-body text-secondary">
                                                        <label>Data de Nascimento</label>
                                                        <input 
                                                        type="text" 
                                                        className="form-control" 
                                                        onChange={this.handlerDtNascimentoNovo} 
                                                        value={moment(current.dtnascimento).format('DD/MM/YYYY')}                                                        
                                                        validations={[required]}/>
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
                                                                onChange={this.handlerSexo} />
                                                        </div>
                                                        <label className="form-check-label"  onClick={() => this.setState(prevState => ({current: {...prevState.current, sexo: "Feminino"}}))}  style={{marginRight: 3+'%'}}>Feminino</label>

                                                        <div className="form-check form-check-inline">
                                                            <input 
                                                                className="form-check-input"
                                                                type="radio"
                                                                name="sexo"
                                                                id="sexoMasculino"
                                                                value="Masculino"
                                                                checked={current.sexo === 'Masculino'}
                                                                onChange={this.handlerSexo} />
                                                        </div>
                                                        <label className="form-check-label"  onClick={() => this.setState(prevState => ({current: {...prevState.current, sexo: "Masculino"}}))} >Masculino</label>
                                                    </div> 
                                                </div>
                                            </div>
                                            <div className="row" style={{display: 'flex', justifyContent: 'space-between', padding: 0, margin: 0}}>
                                                <div className="col-md-2">
                                                    <div className="card-body text-secondary" style={{padding: 0, margin: 0}}>
                                                        <label htmlFor="cpf">CPF</label>
                                                        <input 
                                                        maxLength = '14'                                                        
                                                        className="form-control" 
                                                        onChange={this.handlerCPF} 
                                                        value={current.cpf} />
                                                    </div>
                                                </div>
                                                <div className="col-md-2">
                                                    <div className="card-body text-secondary" style={{padding: 0, margin: 0}}>
                                                        <label htmlFor="rg">RG</label>
                                                        <input 
                                                        maxLength="11" 
                                                        className="form-control" 
                                                        onChange={this.handlerRG} 
                                                        value={current.rg} />
                                                    </div>
                                                </div>
                                                <div className="col-md-2">
                                                    <div className="card-body text-secondary" style={{padding: 0, margin: 0}}>
                                                        <label htmlFor="nis">NIS</label>
                                                        <input 
                                                        maxLength="11"                                                         
                                                        className="form-control" 
                                                        onChange={this.handlerNIS} 
                                                        value={current.nis} />
                                                    </div>
                                                </div>
                                                <div className="col-md-3">
                                                    <div className="form-group">                                    
                                                        <label style={{marginRight: 3+'%', marginTop: 1+'%'}}>Bolsa Família</label>
                                                    </div>
                                                    <div className="form-group">                                    
                                                        <div className="form-check form-check-inline">
                                                            <input 
                                                                className="form-check-input"
                                                                type="radio"
                                                                name="simbolsa"
                                                                id="simbolsa"
                                                                value="Sim"
                                                                checked={current.bolsafamilia === 'Sim'}
                                                                onChange={this.handlerBolsaFamilia} />
                                                        </div>
                                                        <label className="form-check-label"  onClick={() => this.setState(prevState => ({current: {...prevState.current, bolsafamilia: "Sim"}}))} >Sim</label>

                                                        <div className="form-check form-check-inline" style={{marginLeft: 2+'%'}}>
                                                            <input 
                                                                className="form-check-input"
                                                                type="radio"
                                                                name="naobolsa"
                                                                id="naobolsa"
                                                                value="Não"
                                                                checked={current.bolsafamilia === 'Não'}
                                                                onChange={this.handlerBolsaFamilia} />
                                                        </div>
                                                        <label className="form-check-label" onClick={() => this.setState(prevState => ({current: {...prevState.current, bolsafamilia: "Não"}}))} >Não</label>
                                                    </div>
                                                        
                                                        
                                                
                                                </div>
                                            </div>
                                            <div className="row" style={{display: 'flex', marginTop: 1+'%'}}>
                                                {eja}                                                                                                                  
                                            </div>
                                            
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">                                    
                                                        <label style={{marginRight: 3+'%', marginLeft: 3+'%', marginTop: 1+'%'}}>Possui Deficiências</label>
                                                    </div>
                                                    <div className="form-group" style={{marginLeft: 2+'%'}}>                                    
                                                        <div className="form-check form-check-inline">
                                                            <input 
                                                                className="form-check-input"
                                                                type="radio"
                                                                name="sim"
                                                                id="sim"
                                                                value="Sim"
                                                                checked={current.deficiente === 'Sim'}
                                                                onChange={this.handlerDeficiente} />
                                                        </div>
                                                        <label className="form-check-label"  onClick={() => this.setState(prevState => ({current: {...prevState.current, deficiente: "Sim"}}))} >Sim</label>

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
                                                        <label className="form-check-label"  onClick={() => this.setState(prevState => ({current: {...prevState.current, deficiente: "Não"}}))} >Não</label>
                                                    </div>
                                                </div>   
                                            
                                            
                                                <div className="col-md-6">
                                                    <div className="form-group row">                                
                                                        <div className="form-check">
                                                            <label className="form-check-label">
                                                                <input className="form-check-input" type="checkbox" checked={current.irmao === true} onChange={this.handlerIrmao} /> Possui irmão na unidade escolar pretendida
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row"> 
                                                <div className="col-md-6">
                                                    
                                                </div>

                                                <div className="col-md-6">
                                                    <div className="form-group row">                                
                                                        <div className="form-check" >
                                                            <label className="form-check-label">
                                                                <input className="form-check-input" type="checkbox" checked={current.vulneravel === true} onChange={this.handlerVulneravel}  /> Candidato(a) no Creas/Conselho Tutelar
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>                                                                         
                                                           
                                            {deficiencias}                                               
                                        </div>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="3">
                                        ESCOLA ESCOLHIDA                                        
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="3">
                                    <Card.Body>
                                        {listaEscolas}
                                        {serie}
                                        <div className="row">
                                            {listaTurmas}
                                            <div className="col-md-3">
                                                <div className="form-group">
                                                    <label>Status</label>
                                                    <select className="form-control" id="status" name="status" value={current.status} onChange={this.handlerStatus}  > 
                                                        <option value="" disabled>---Selecione o status---</option>
                                                        <option value="Em análise"> Em análise</option>
                                                        <option value="Aprovado(a)"> Aprovado(a)</option>
                                                        <option value="Reprovado(a)"> Reprovado(a)</option>                        
                                                    </select>
                                                </div> 
                                            </div>
                                            <div className="col-md-3">
                                                <div className="form-group">
                                                    <label>Protocolo</label>
                                                    <div className="form-group">
                                                        <input type="text" disabled value={current.protocolo} style={{fontWeight: 'bold'}} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="4">
                                        BUSCA DE VAGAS
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="4">
                                    <Card.Body>
                                        <div>
                                            {serie}  
                                            
                                            <div className="col-md-6" style={{display: 'flex', justifyContent: 'flex-end'}}>
                                                <button type="button" className="btn btn-info" style={{backgroundColor: 'rgb(226, 88, 34)'}} onClick={this.buscarEscolas}>
                                                    Buscar Escolas
                                                </button>
                                            </div>  
                                        </div>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                        {mostrarOpcoes}

                        <div className="row">
                            <div className="col-md-12" style={{display:'flex', justifyContent: 'space-evenly'}}>
                                <button type="submit" className="btn btn-success" onClick={this.calculaPontos} style={{width: 20+'%'}}>
                                    Salvar
                                </button>
                                <Link to={"/alunos"} className="btn btn-info" style={{width: 20+'%'}}>
                                    Voltar
                                </Link>
                            </div>                                                                       
                        </div>
                        <h1 style={{marginBottom: 2+'%'}}> {this.state.message} </h1>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Selecione um(a) aluno(a)...</p>
                    </div>
                )}
                </div>
                )}
            </div>
        )
    }


}
