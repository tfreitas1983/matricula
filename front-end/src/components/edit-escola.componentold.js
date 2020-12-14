import React, { Component } from "react"
import EscolaDataService from "../services/escola.service"
import SubPrefeituraDataService from "../services/subprefeitura.service"
import AuthService from "../services/auth.service"
import {Link} from 'react-router-dom'
import axios from 'axios'

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

        this.pegaSubPrefeituras = this.pegaSubPrefeituras.bind(this)
        this.pegaLocalizacao = this.pegaLocalizacao.bind(this)
        this.pegaLocalizacaoCEP = this.pegaLocalizacaoCEP.bind(this)

        this.inputLogradouro = React.createRef()
        this.inputBairro = React.createRef()
        this.inputLatitude = React.createRef()
        this.inputLongitude = React.createRef()

        this.salvarEscola = this.salvarEscola.bind(this)

        this.state = {
            currentUser: AuthService.getCurrentUser(),
            message: "",
            subprefeituras: [],
            current: {
                id: null,
                descricao: "",
                cnpj: "",
                inep: "",
                logradouro: "",
                numero: "",
                complemento: "",
                bairro: "",
                cidade: "Belford Roxo",
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
    

    handlerDescricao(e) {
        const descricao = e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                descricao: descricao
            }
        }))
    }

    handlerCNPJ(e) {
        const CNPJ = e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                CNPJ: CNPJ
            }
        }))
    }

    handlerINEP(e) {
        const INEP = e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                INEP: INEP
            }
        }))
    }


    handlerLogradouro(e) {
        const logradouro = e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                logradouro: logradouro
            }
        }))
    }

    handlerNumero(e) {
        const numero = e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                numero: numero
            }
        }))
    }

    handlerComplemento(e) {
        const complemento = e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                complemento: complemento
            }
        }))
    }

    handlerBairro(e) {
        const bairro = e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                bairro: bairro
            }
        }))
    }
    
    handlerCidade(e) {
        const cidade = e.target.value
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
        const cep = e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                cep: cep
            }
        }))
    }

    handlerTelefone(e) {
        const telefone = e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                telefone: telefone
            }
        }))
    }

    handlerEmail(e) {
        const email = e.target.value
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

    async pegaLocalizacaoCEP() {
        const key = 'AIzaSyDy5XJj1VaYQlZZFQtWsCrji4i4bSz1uXU'        

        if (this.state.current.cep !== "" || this.state.current.cep !== undefined ) {
            const buscaCEP = await axios.get('https://maps.googleapis.com/maps/api/geocode/json?&address=' + 
            this.state.current.cep + '&key=' + key)

            this.setState({
                p1Location: buscaCEP.data         
            })
            
            this.timerID = setTimeout(() => {
                this.setState(prevState =>({
                    current: {
                       ...prevState.current, 
                       lat: buscaCEP.data.results[0].geometry.location.lat,
                       long: buscaCEP.data.results[0].geometry.location.lng          
                    } 
                }))

                this.inputLogradouro.current.value = this.state.current.logradouro
                this.inputBairro.current.value = this.state.current.bairro 
                
                this.inputLatitude.current.value = this.state.current.lat
                this.inputLongitude.current.value = this.state.current.long
            }, 2000)              

            const pegaEndereco = await axios.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='+
            buscaCEP.data.results[0].geometry.location.lat+','+
            buscaCEP.data.results[0].geometry.location.lng+'&key='+key)
            this.setState(prevState =>({
                current: {
                    ...prevState.current,
                    logradouro: pegaEndereco.data.results[0].address_components[1].long_name,              
                    bairro: pegaEndereco.data.results[0].address_components[2].long_name
                }   
            }))
        }    
    }

    async pegaLocalizacao() {
        const key = 'AIzaSyDy5XJj1VaYQlZZFQtWsCrji4i4bSz1uXU' 
        
        if (this.state.current.cep === "" && this.state.current.logradouro !== "" ) {
            const buscaEndereco = await axios
            .get('https://maps.googleapis.com/maps/api/geocode/json?&address=' + 
            this.state.current.numero + ',' +this.state.current.logradouro + ', Belford Roxo, RJ&key=' + key)

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
        var data = null

        if (this.state.current.deficiente === "Não") {

            data = {
                descricao: this.state.current.descricao,
                cnpj: this.state.current.cnpj,
                inep: this.state.current.inep,
                username: this.state.currentUser.username,
                cep: this.state.current.cep,
                logradouro: this.state.current.logradouro,
                numero: this.state.current.numero,
                complemento: this.state.current.complemento,
                bairro: this.state.current.bairro,
                cidade: "Belford Roxo",
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
                cnpj: this.state.current.cnpj,
                inep: this.state.current.inep,
                username: this.state.currentUser.username,
                cep: this.state.current.cep,
                logradouro: this.state.current.logradouro,
                numero: this.state.current.numero,
                complemento: this.state.current.complemento,
                bairro: this.state.current.bairro,
                cidade: "Belford Roxo",
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
    

    


    render () {

        const {current, subprefeituras} = this.state

        
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
            
                <option value="" disabled>---Selecione---</option>  
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

        return (
            <div style={{margin: 5 + '%'}}>
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
                                    type="text" 
                                    className="form-control" 
                                    id="cnpj" 
                                    required 
                                    value={current.cnpj} 
                                    onChange={this.handlerCNPJ} 
                                    name="cnpj" />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label htmlFor="inep"> INEP </label>
                                    <input 
                                    type="text" 
                                    className="form-control" 
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
                            <div className="col-md-3" style={{padding: 1+'%'}}>
                            <div className="form-check">
                                    <label className="form-check-label" style={{marginRight: 2+'%'}}>
                                        <input className="form-check-input" type="checkbox" checked={current.eja} onChange={this.handlerEja} style={{marginRight: 1+'%'}} /> Possui EJA?
                                    </label>
                                </div>
                            </div>
                            <div className="col-md-3"  style={{padding: 1+'%'}}>
                            <div className="form-check">
                                    <label className="form-check-label" style={{marginRight: 2+'%'}}>
                                        <input className="form-check-input" type="checkbox" checked={current.conveniada}  onChange={this.handlerConveniada} style={{marginRight: 1+'%'}} /> Conveniada?
                                    </label>
                                </div>
                            </div>

                            {listasub}
                        </div>

                        <div className="row">
                            <div hidden className="col-md-6">
                                <div className="form-group">
                                    <label style={{marginRight: 3+'%', marginTop: 1+'%', padding: 0}}>Aceita Deficientes?</label>
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
                            <div className="col-md-6">
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
                            <div className="col-md-6">
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
                       
                    </div>  
                ) : (
                    <div>
                     <br />
                    <p>Selecione uma escola...</p>
                </div>
                )}                           
            </div>
        )
    }
}