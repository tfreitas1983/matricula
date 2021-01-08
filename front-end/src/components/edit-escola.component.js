import React, { Component } from "react"
import EscolaDataService from "../services/escola.service"
import TurmaDataService from "../services/turma.service"
import CepDataService from "../services/cep.service"
import SubPrefeituraDataService from "../services/subprefeitura.service"
import AuthService from "../services/auth.service"
import {Link} from 'react-router-dom'
import {FaEdit, FaEye, FaPowerOff} from 'react-icons/fa'
import { IconContext } from "react-icons"
import axios from 'axios'
import {cnpjMask} from './cnpjMask'
import {cepMask} from './cepMask'
import {telMask} from './telMask'
import * as moment from 'moment'

export default class EditarEscola extends Component {
    constructor(props){ 
        super(props)
        this.buscarEscola = this.buscarEscola.bind(this) 
        this.handlerDescricao = this.handlerDescricao.bind(this)               
        this.handlerCNPJ = this.handlerCNPJ.bind(this) 
        this.handlerINEP = this.handlerINEP.bind(this)      
        this.handlerLogradouro = this.handlerLogradouro.bind(this) 
        this.handlerNumero = this.handlerNumero.bind(this) 
        this.handlerComplemento = this.handlerComplemento.bind(this) 
        this.handlerBairro = this.handlerBairro.bind(this) 
        this.handlerCidade = this.handlerCidade.bind(this) 
        this.handlerUf = this.handlerUf.bind(this) 
        this.handlerCep = this.handlerCep.bind(this) 
        this.handlerEja = this.handlerEja.bind(this)
        this.handlerSubPrefeitura = this.handlerSubPrefeitura.bind(this)
        this.handlerConveniada = this.handlerConveniada.bind(this)
        this.handlerTelefone = this.handlerTelefone.bind(this) 
        this.handlerEmail = this.handlerEmail.bind(this)         
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

        this.handlerTurma = this.handlerTurma.bind(this)
        this.handlerNivel = this.handlerNivel.bind(this)
        this.handlerQtd = this.handlerQtd.bind(this)
        this.handlerTurno = this.handlerTurno.bind(this)
        this.handlerSerie = this.handlerSerie.bind(this)

        this.pegaSubPrefeituras = this.pegaSubPrefeituras.bind(this)
        this.pegaLocalizacao = this.pegaLocalizacao.bind(this)
        this.pegaLocalizacaoCEP = this.pegaLocalizacaoCEP.bind(this)
        this.pegaEnderecoCep = this.pegaEnderecoCep.bind(this)
        this.pegaTurmas = this.pegaTurmas.bind(this)

        this.inputLogradouro = React.createRef()
        this.inputBairro = React.createRef()
        this.inputCidade = React.createRef()
        this.inputLatitude = React.createRef()
        this.inputLongitude = React.createRef()

        this.salvarEscola = this.salvarEscola.bind(this)
        this.salvarTurma = this.salvarTurma.bind(this)
        this.novaTurma = this.novaTurma.bind(this)

        this.inputQtd = React.createRef()
        this.inputTurma = React.createRef()

        this.state = {
            currentUser: AuthService.getCurrentUser(),
            showAdminBoard: false,
            showModeratorBoard: false,
            message: "",
            subprefeituras: [],
            ceps: [],   
            turmas: [],             
            turma: "",
            identificador: "",
            qtd: "",
            matriculas: 0,
            serie: "",
            turno: "",
            nivel: "",
            msg: "", 
            ejaTurma: "",
            mostraForm: false,      
            current: {
                id: null,
                descricao: "",
                idescola: "",
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
                deficiente: "Sim",                                
                auditiva: true,
                fala: true,
                mental: true,
                motora: true,
                visual: true,       
                cegueira: true,
                baixaVisao: true,
                multipla: true,
                surdoCegueira: true,
                superdotacao: true,
                down: true,
                autismo:true,
                chkOutra: false,
                outra: "",
                lat: "",
                long: "",
                foto: "default.jpg",
                imagem: "",
                url:"",
                infoS: "",
                pageS: "",
                p1Location: "",
                submitted: false
            }
        }
    }

    componentDidMount() {
        this.buscarEscola(this.props.match.params.id)
        this.pegaSubPrefeituras() 
        this.pegaTurmas()

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
                    descricao: response.data.descricao.toUpperCase(), 
                    idescola: response.data.idescola,
                    cnpj: response.data.cnpj,
                    inep: response.data.inep,                       
                    logradouro: response.data.logradouro.toUpperCase(),
                    numero: response.data.numero.toUpperCase(),
                    complemento: response.data.complemento.toUpperCase(),
                    bairro: response.data.bairro.toUpperCase(),
                    cidade: response.data.cidade.toUpperCase(),
                    uf: response.data.uf,
                    cep: response.data.cep,
                    telefone: response.data.telefone,
                    email: response.data.email,
                    eja: response.data.eja,
                    conveniada: response.data.conveniada,
                    subprefeitura: response.data.subprefeitura,
                    lat: response.data.lat,
                    long: response.data.long,
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

    pegaSubPrefeituras (page = 1) {        
        SubPrefeituraDataService.buscarTodos(page)
         .then(response => {
         //REST do response da API em duas constantes: 
         // "docs" com os dados do chamado e "info" com os dados das páginas
             const { docs, ...info } = response.data 
             this.setState({
                 subprefeituras: docs,
                 infoS: info,
                 pageS: page
             })                
         })
         .catch(e => {
             console.log(e)
         })
    }

    pegaTurmas(page = 1) {        
        TurmaDataService.buscarTodos(page)
            .then(response => {
            //REST do response da API em duas constantes: 
            // "docs" com os dados do chamado e "info" com os dados das páginas
                const { docs, ...info } = response.data
                this.setState({
                    turmas: docs,
                    info: info,
                    page: page
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

    handlerCNPJ(e) {
        const CNPJ = cnpjMask(e.target.value)
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                cnpj: CNPJ
            }
        }))
    }

    handlerINEP(e) {
        const INEP = e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                inep: INEP
            }
        }))
    }

    handlerLogradouro(e) {
        const logradouro = e.target.value = ("" + e.target.value).toUpperCase()
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                logradouro: logradouro
            }
        }))
    }

    handlerNumero(e) {
        const numero = e.target.value = ("" + e.target.value).toUpperCase()
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                numero: numero
            }
        }))
    }

    handlerComplemento(e) {
        const complemento = e.target.value = ("" + e.target.value).toUpperCase()
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                complemento: complemento
            }
        }))
    }

    handlerBairro(e) {
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

    handlerUf(e) {
        const uf = e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                uf: uf
            }
        }))
    }

    handlerCep(e) {
        const cep = cepMask(e.target.value)
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                cep: cep
            }
        }))
    }

    handlerTelefone(e) {
        const telefone = telMask(e.target.value)
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                telefone: telefone
            }
        }))
    }

    handlerEmail(e) {
        const email = e.target.value = ("" + e.target.value).toLowerCase()
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                email: email
            }
        }))
    }

    handlerSubPrefeitura(e) {
        const subprefeitura = e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                subprefeitura: subprefeitura
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
        const outra = e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                outra: outra
            }
        }))
    }

    handlerTurma(e) {
        this.setState({
            turma: e.target.value = ("" + e.target.value).toUpperCase()
        })
    }

    async handlerNivel(e) {
        await this.setState({
            nivel: e.target.value
        })

        if (this.state.nivel === "EJA") {
            this.setState({
                ejaTurma: true
            })
        }
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

                    this.setState(prevState => ({
                        current: {
                            ...prevState.current,
                            lat: buscaCEP.data.results[0].geometry.location.lat,
                            long: buscaCEP.data.results[0].geometry.location.lng          
                    }}))
                    this.inputLatitude.current.value = this.state.current.lat
                    this.inputLongitude.current.value = this.state.current.long
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

    salvarEscola() {

        if (this.state.current.logradouro === "" || this.state.current.cidade === "" ) {
            alert("Deve ser cadastrado endereço e cidade para a unidade escolar")
            return false
        }

        if (this.state.current.lat === "" || this.state.current.long === "") {
            alert("As latitudes e longitudes devem ser preenchidas para a unidade escolar")
            return false
        }

        var data = null

        if (this.state.current.deficiente === "Não") {

            data = {
                descricao: this.state.current.descricao,
                idescola: this.state.current.idescola,
                cnpj: this.state.current.cnpj,
                inep: this.state.current.inep,
                username: this.state.currentUser.username,
                cep: this.state.current.cep,
                logradouro: this.state.current.logradouro,
                numero: this.state.current.numero,
                complemento: this.state.current.complemento,
                bairro: this.state.current.bairro,
                cidade: this.state.current.cidade,
                uf: 'RJ',
                telefone: this.state.current.telefone,
                email: this.state.current.email,
                eja: this.state.current.eja,
                conveniada: this.state.current.conveniada,
                subprefeitura: this.state.current.subprefeitura,
                lat: this.state.current.lat,
                long: this.state.current.long,            
                deficiente: "Sim",
                auditiva: true,
                fala: true,
                mental: true,
                motora: true,
                visual: true,       
                cegueira: true,
                baixaVisao: true,
                multipla: true,
                surdoCegueira: true,
                superdotacao: true,
                down: true,
                autismo: true,
                chkOutra: false,
                outra: "",
                foto: this.state.current.foto
            }
        } else {
            data = {
                descricao: this.state.current.descricao,                
                idescola: this.state.current.idescola, 
                cnpj: this.state.current.cnpj,
                inep: this.state.current.inep,
                username: this.state.currentUser.username,
                cep: this.state.current.cep,
                logradouro: this.state.current.logradouro,
                numero: this.state.current.numero,
                complemento: this.state.current.complemento,
                bairro: this.state.current.bairro,
                cidade: this.state.current.cidade,
                uf: 'RJ',
                telefone: this.state.current.telefone,
                email: this.state.current.email,
                eja: this.state.current.eja,
                conveniada: this.state.current.conveniada,
                subprefeitura: this.state.current.subprefeitura,
                lat: this.state.current.lat,
                long: this.state.current.long,            
                deficiente: "Sim",
                auditiva: true,
                fala: true,
                mental: true,
                motora: true,
                visual: true,       
                cegueira: true,
                baixaVisao: true,
                multipla: true,
                surdoCegueira: true,
                superdotacao: true,
                down: true,
                autismo: true,
                chkOutra: this.state.current.chkOutra,
                outra: this.state.current.outra,
                foto: this.state.current.foto
            }
        }

        EscolaDataService.editar(this.state.current.id, data)
        .then(response => {
            this.setState({
                message: "A unidade escolar foi alterada com sucesso!",
                voltar: true
            })

        })
        .catch(e => {
            console.log(e)
        })
    }

    async salvarTurma() {
        var data = null
        if (this.state.deficiente === "Não") {
            data = {
                descricao: this.state.turma,
                username: this.state.currentUser.username,
                nivel: this.state.nivel,
                identificador: this.state.identificador,
                qtd: this.state.qtd,
                matriculas: 0,
                serie: this.state.serie,
                turno: this.state.turno,
                eja: this.state.ejaTurma,
               // selectedCurso: this.state.selectedCurso,
                escola: this.state.current.descricao,
                deficiente: this.state.current.deficiente,
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
                descricao: this.state.turma,
                username: this.state.currentUser.username,
                nivel: this.state.nivel,
                qtd: this.state.qtd,
                identificador: this.state.identificador,
                matriculas: 0,
                serie: this.state.serie,
                turno: this.state.turno,
                eja: this.state.ejaTurma,
               // selectedCurso: this.state.selectedCurso,
                escola: this.state.current.descricao,
                deficiente: this.state.current.deficiente,
                mental: this.state.current.mental,
                motora: this.state.current.motora,
                auditiva: this.state.current.auditiva,
                fala: this.state.current.fala,
                visual: this.state.current.visual,                        
                cegueira: this.state.current.cegueira,
                baixaVisao: this.state.current.baixaVisao,
                multipla: this.state.current.multipla,
                surdoCegueira: this.state.current.surdoCegueira,
                superdotacao: this.state.current.superdotacao,
                down: this.state.current.down,
                autismo: this.state.current.autismo,           
                outra: this.state.current.outra
            }
        }

        await TurmaDataService.cadastrar(data)
        .then(response => {
            this.setState({
                id: response.data.id,
                turma: response.data.descricao,
                username: response.data.username,
                nivel: response.data.nivel,
                qtd: response.data.qtd,
                identificador: response.data.identificador,
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
                submitted: true,
                msg: "Turma adicionada com sucesso!"
            })            
        })
        .catch(e => {
            console.log(e)
        })
        this.pegaTurmas()
        this.forceUpdate()
    }

    novaTurma() {
        this.inputTurma.current.value = ""
        this.inputQtd.current.value = ""

        this.setState({
            turma: "",
            serie: "",
            nivel: "",
            qtd: "",
            turno:"",
            msg: ""
        })
    }

    render () {

        const {current, subprefeituras, showAdminBoard, showModeratorBoard, turmas} = this.state

        
        let listasub = null
        let lista = subprefeituras.map((item, index) => ( 
            <option value={item.descricao} key={index}>{item.descricao}</option>
        ))
        
        listasub = <div className="col-md-6" >   
            <label>Subprefeitura</label>                                          
            <select 
                className="form-control" 
                id="curso" 
                name="curso"
                value={current.subprefeitura}                                    
                onChange={this.handlerSubPrefeitura} >     
            
                <option value="" >---Selecione---</option>  
                {lista}                     
            </select>
        </div>

        let deficiencias = null
        let outra = null
        if (current.chkOutra === true) {
            outra = 
                <input hidden type="text" className="form-control" value={current.outra} onChange={this.handlerOutra} placeholder="Digite a deficiência" />          
        }

        if (current.deficiente === 'Sim') {
            deficiencias = <div>
                <label hidden className="col-md-12" syle={{padding: 0}}>Marque as deficiências que a escola atende: </label>
                <div hidden className="form-group row">                    
                    <div className="col-sm-12">
                        <div className="form-check">
                            <label className="form-check-label"  style={{marginRight: 2+'%'}}>
                                <input className="form-check-input" type="checkbox" checked={current.auditiva === true} onChange={this.handlerAuditiva} style={{marginRight: 1+'%'}} /> Deficiência auditiva e surdez
                            </label>
                            <label className="form-check-label"  style={{marginRight: 3+'%'}}>
                                <input className="form-check-input" type="checkbox" checked={current.fala === true} onChange={this.handlerFala} style={{marginLeft: -1+'%', marginRight: 1+'%'}} /> Fala
                            </label>
                            <label className="form-check-label"  style={{marginRight: 3+'%'}}>
                                <input className="form-check-input" type="checkbox" checked={current.mental === true} onChange={this.handlerMental} style={{marginLeft: -1+'%'}} /> Deficiência mental
                            </label>
                            <label className="form-check-label"  style={{marginRight: 3+'%'}}>
                                <input className="form-check-input" type="checkbox" checked={current.motora === true} onChange={this.handlerMotora} style={{marginLeft: -1+'%'}} /> Deficiência física
                            </label>
                            <label className="form-check-label"  style={{marginRight: 3+'%'}}>
                                <input className="form-check-input" type="checkbox" checked={current.visual === true} onChange={this.handlerVisual} style={{marginLeft: -1+'%'}} /> Deficiência visual
                            </label>
                            <label className="form-check-label"  style={{marginRight: 3+'%'}}>
                                <input className="form-check-input" type="checkbox" checked={current.cegueira === true} onChange={this.handlerCegueira} style={{marginLeft: -1+'%'}} /> Cegueira
                            </label>
                            <label className="form-check-label"  style={{marginRight: 3+'%'}}>
                                <input className="form-check-input" type="checkbox" checked={current.surdoCegueira === true} onChange={this.handlerSurdoCegueira} style={{marginLeft: -1+'%'}} /> Surdocegueira
                            </label>
                            <label className="form-check-label"  style={{marginRight: 3+'%'}}>
                                <input className="form-check-input" type="checkbox" checked={current.baixaVisao === true} onChange={this.handlerBaixaVisao} style={{marginLeft: -1+'%'}} /> Baixa visão
                            </label>
                            <label className="form-check-label"  style={{marginRight: 3+'%'}}>
                                <input className="form-check-input" type="checkbox" checked={current.multipla === true} onChange={this.handlerMultipla} style={{marginLeft: -1+'%'}} /> Deficiência múltipla
                            </label>
                            {/* <label className="form-check-label"  style={{marginRight: 3+'%'}}>
                                <input className="form-check-input" type="checkbox" checked={current.down === true} onChange={this.handlerDown} style={{marginLeft: -1+'%'}} /> Síndrome de Down
                            </label> */}
                            <label className="form-check-label"  style={{marginRight: 3+'%'}}>
                                <input className="form-check-input" type="checkbox" checked={current.autismo === true} onChange={this.handlerAutismo} style={{marginLeft: -1+'%'}} /> Transtorno do espectro autista
                            </label>
                            <label className="form-check-label"  style={{marginRight: 3+'%'}}>
                                <input className="form-check-input" type="checkbox" checked={current.superdotacao === true} onChange={this.handlerSuperdotacao} style={{marginLeft: -1+'%'}} /> Altas habilidades / Superdotação
                            </label>
                            <label className="form-check-label"  style={{marginRight: 3+'%'}}>
                                <input className="form-check-input" type="checkbox" checked={current.chkOutra === true} onChange={this.handlerChkOutra} style={{marginLeft: -1+'%'}} /> Outra
                            </label>
                            {outra}
                        </div>
                    </div>                    
                </div>
            </div>
        }

        let filtroTurma = []
        filtroTurma = turmas.filter((item) => {
            return item.escola === current.descricao
        })

        let mostrarTurma = null
        let mostraForm = null

        let serie = null

        if (this.state.nivel === "Creche") {
            serie = <div className="form-group">
                <label>Ano de escolaridade</label>
                <select className="form-control" id="serie" name="serie" value={this.state.serie} onChange={this.handlerSerie}  > 
                    <option value="" > --- Selecione --- </option>
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
                    <option value="" > --- Selecione --- </option>
                    <option value="Pré Escola IV">Pré Escola IV</option>
                    <option value="Pré Escola V">Pré Escola V</option>
                </select>
            </div> 
        }

        if (this.state.nivel === "Fundamental Anos Iniciais") {
            serie = <div className="form-group">
                <label>Ano de escolaridade</label>
                <select className="form-control" id="serie" name="serie" value={this.state.serie} onChange={this.handlerSerie}  > 
                    <option value="" > --- Selecione --- </option>
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
                    <option value="" > --- Selecione --- </option>
                    <option value="6º ano">6º ano</option>
                    <option value="7º ano">7º ano</option>
                    <option value="8º ano">8º ano</option>
                    <option value="9º ano">9º ano</option>
                </select>
            </div>
        }

       /* if (this.state.nivel === "Semi Presencial") {
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
        }*/

        if (this.state.nivel === "EJA") {
            serie = <div className="form-group">
                <label>Ano de escolaridade</label>
                <select className="form-control" id="serie" name="serie" value={this.state.serie} onChange={this.handlerSerie}  > 
                    <option value="" > --- Selecione --- </option>
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


/*
        let eja = null
        if (this.state.nivel === "Fundamental Anos Finais") {
            eja = <div className="form-check">
                <label className="form-check-label" style={{marginRight: 2+'%', marginTop: 1+'%', fontSize: 18+'px'}}>
                    <input className="form-check-input" type="checkbox" onChange={this.handlerEja} style={{marginRight: 1+'%', transform: `scale(1.3)`}} /> EJA?
                </label>
            </div>
        }
*/

        if (this.state.mostraForm === true) {
            mostraForm = <div>
            <h4>Cadastro de turma</h4>
            <div className="row">
                <div className="col-md-6" style={{padding: 0}}>
                    <div className="form-group">
                        <label htmlFor="turma"> Nome da turma </label>
                        <input 
                        type="text" 
                        className="form-control" 
                        id="turma" 
                        required 
                        value={this.state.turma} 
                        onChange={this.handlerTurma} 
                        name="turma"
                        autoFocus
                        ref={this.inputTurma} /> 
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
                        name="qtd"
                        ref={this.inputQtd} />
                    </div>  
                </div>
            </div>
            <div className="row">
                <div className="col-md-6" style={{padding: 0}}>
                    <div className="form-group">
                        <label htmlFor="nivel"> Nível </label>
                        <select className="form-control" id="nivel" name="nivel"value={this.state.nivel} onChange={this.handlerNivel} > 
                        <option value="" > Selecione o nível de ensino</option>
                        <option value="Creche">Creche</option>
                        <option value="Pré escola">Pré escola</option>
                        <option value="Fundamental Anos Iniciais">Fundamental Anos Iniciais</option>
                        <option value="Fundamental Anos Finais">Fundamental Anos Finais</option>
                        <option value="Semi Presencial">Semi Presencial</option>
                        <option value="EJA">EJA</option>
                        {/*<option value="Ensino Médio">Ensino Médio</option>
                        <option value="Ensino Médio Técnico">Ensino Médio Técnico</option>*/}
                        </select>
                    </div>
                </div>
                <div className="col-md-6">
                    {serie}
                </div>
            </div>
                    
                    
            <div className="row">
                <div className="col-md-6" style={{padding:0}}>
                    <label htmlFor="turno"> Turno </label>
                    <select className="form-control" id="nivel" name="nivel"value={this.state.turno} onChange={this.handlerTurno} > 
                        <option value="" > ---Selecione o turno--- </option>
                        <option value="Manhã">Manhã</option>
                        <option value="Tarde">Tarde</option>
                        <option value="Noite">Noite</option>
                        <option value="Intermediário">Intermediário</option>
                    </select>
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
               
            </div>                
                                 
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <button onClick={this.salvarTurma} className="btn btn-success">
                    Adicionar
                </button>

                <button onClick={this.novaTurma} className="btn btn-success">
                    Nova turma
                </button>
            </div>       
            <h4> {this.state.msg} </h4>              
        </div>
        }

        if (filtroTurma.length > 0) {
            mostrarTurma = <div>
                <hr />
                <hr />

                <h1 style={{marginLeft: 1 + '%'}}>Lista de Turmas</h1>
                <button className="btn btn-success" onClick={() => this.setState({mostraForm: true})}> Cadastrar </button>

                {mostraForm}

                <div className="list-group">
                    <table className="tabela">
                        <tbody>
                            <tr className="bordalinha"> 
                                <th>Escola</th>                               
                                <th>Descrição</th>
                                <th>Quantidade</th>
                                <th>Nível</th>
                                <th>Ano de escolaridade</th>
                                <th>Turno</th>
                                <th>Deficiência?</th>
                                <th>Ações</th>                            
                            </tr>
                            {filtroTurma.map((turma, index) => (
                                <tr key={index} className="bordalinha">
                                    <td style={{width: 20+'%'}}>{turma.escola}</td>
                                    <td style={{width: 10+'%'}}>{turma.descricao}</td>                                
                                    <td style={{width: 10+'%'}}>{turma.qtd}</td>
                                    <td style={{width: 15+'%'}}>{turma.nivel}</td>  
                                    <td style={{width: 10+'%'}}>{turma.serie}</td>
                                    <td style={{width: 10+'%'}}>{turma.turno}</td>
                                    <td style={{width: 10+'%'}}>
                                        
                                    </td>                                                                         
                                    <td style={{width: 15+'%'}}>
                                        <IconContext.Provider value={{ size: "2em", className: "global-class-name" }}>
                                            {<Link to={`/turmas/visualizar/${turma.id}`} id="view" style={{textDecoration: 'none'}}> <FaEye /> </Link>}
                                            {<Link to={`/turmas/editar/${turma.id}`} id="edit"> <FaEdit /> </Link>}
                                            {<Link to={`/turmas/editar/${turma.id}`} id="edit"> <FaPowerOff /> </Link>}
                                        </IconContext.Provider>
                                    </td>                                
                                </tr> 
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        }

        return (
            <div style={{margin: 5 + '%'}}>
                {(showAdminBoard || showModeratorBoard) && (
                    <div>
                { current ? (
                    <div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="descricao"> Unidade escolar </label>
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
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label htmlFor="cnpj"> CNPJ </label>
                                    <input                                     
                                    className="form-control" 
                                    maxLength='18'
                                    id="cnpj"                                      
                                    value={current.cnpj} 
                                    onChange={this.handlerCNPJ} 
                                    name="cnpj" />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label htmlFor="inep"> INEP </label>
                                    <input 
                                    className="form-control" 
                                    maxLength="8"
                                    id="inep" 
                                    required 
                                    value={current.inep} 
                                    onChange={this.handlerINEP} 
                                    name="inep" />
                                </div>
                            </div>
                            
                        </div>    
                        
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="cep"> CEP </label>
                                    <input 
                                    type="text" 
                                    className="form-control" 
                                    id="cep" 
                                    required 
                                    value={current.cep} 
                                    onChange={this.handlerCep} 
                                    onBlur={this.pegaLocalizacaoCEP}
                                    name="cep" />                            
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
                                    onChange={this.handlerLogradouro} 
                                    name="logradouro"
                                    ref={this.inputLogradouro} />
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
                                    onChange={this.handlerNumero} 
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
                                    onChange={this.handlerComplemento} 
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
                                    onChange={this.handlerBairro} 
                                    name="bairro"
                                    ref={this.inputBairro} />                            
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
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
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="telefone"> Telefone </label>
                                    <input 
                                    type="text" 
                                    className="form-control" 
                                    id="telefone" 
                                    required 
                                    value={current.telefone} 
                                    onChange={this.handlerTelefone} 
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
                                    required 
                                    value={current.email} 
                                    onChange={this.handlerEmail} 
                                    name="email" />                            
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6" style={{padding: 1+'%'}}>
                            <div className="form-check">
                                    <label className="form-check-label" style={{marginRight: 2+'%'}}>
                                        <input className="form-check-input" type="checkbox" checked={current.eja} onChange={this.handlerEja} style={{marginRight: 1+'%'}} /> Possui EJA
                                    </label>
                                </div>
                            </div>
                            <div className="col-md-6"  style={{padding: 1+'%'}}>
                            <div className="form-check">
                                    <label className="form-check-label" style={{marginRight: 2+'%'}}>
                                        <input className="form-check-input" type="checkbox" checked={current.conveniada}  onChange={this.handlerConveniada} style={{marginRight: 1+'%'}} /> Conveniada
                                    </label>
                                </div>
                            </div>

                            
                        </div>

                        <div className="row">
                            <div hidden className="col-md-6">
                                <div className="form-group">
                                    <label style={{marginRight: 3+'%', marginTop: 1+'%', padding: 0}}>Aceita Deficientes</label>
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
                                    <label className="form-check-label">Sim</label>

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
                                    <label className="form-check-label">Não</label>
                                </div>                                
                            </div>                                                        
                            <div className="col-md-6">
                                <div className="card-body text-secondary">
                                    <button type="button" className="btn btn-info" style={{backgroundColor: 'rgb(226, 88, 34)'}} onClick={this.pegaLocalizacao}>
                                        Localização
                                    </button>
                                </div>
                            </div>  
                        </div>
                        <div className="row">
                            <div className="col-md-12" style={{padding: 0}}>
                                {deficiencias} 
                            </div>
                        </div>

                        <div className="row">
                            {listasub}
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label htmlFor="lat"> Latitude </label>
                                    <input 
                                    type="text" 
                                    className="form-control" 
                                    id="lat" 
                                    required 
                                    value={current.lat} 
                                    onChange={this.handlerLat} 
                                    name="lat"
                                    ref={this.inputLatitude} />                            
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label htmlFor="long"> Longitude </label>
                                    <input 
                                    type="text" 
                                    className="form-control" 
                                    id="long" 
                                    required 
                                    value={current.long} 
                                    onChange={this.handlerLong} 
                                    name="long"
                                    ref={this.inputLongitude} />                            
                                </div>
                            </div>
                        </div>

                        <div style={{display: 'flex', justifyContent: 'space-around'}}>                                 
                            <button onClick={this.salvarEscola} className="btn btn-success" style={{width:10+'%'}}>
                                Salvar
                            </button>
                            
                            <Link to={"/escolas"} className="btn btn-info" style={{width:10+'%'}}>
                                Voltar
                            </Link>                        
                        </div>


                        <h4>{this.state.message}</h4>

                        {mostrarTurma}
                       
                    </div>  
                ) : (
                    <div>
                     <br />
                    <p>Selecione uma escola...</p>
                </div>
                )}
                </div>)}                           
            </div>
        )
    }
}