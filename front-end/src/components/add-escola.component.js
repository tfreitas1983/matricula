import React, { Component } from 'react'
import EscolaDataService from "../services/escola.service"
import TurmaDataService from "../services/turma.service"
import SubPrefeituraDataService from "../services/subprefeitura.service"
import CepDataService from "../services/cep.service"
import AuthService from "../services/auth.service"
import {Link} from 'react-router-dom'
import axios from 'axios'
import * as moment from 'moment'
import {cnpjMask} from './cnpjMask'
import {cepMask} from './cepMask'
import {telMask} from './telMask'


export default class AdicionarEscola extends Component {
    constructor(props) {
        super(props)
        this.handlerDescricao = this.handlerDescricao.bind(this)       
        this.handlerCNPJ = this.handlerCNPJ.bind(this) 
        this.handlerINEP = this.handlerINEP.bind(this) 
        this.handlerLogradouro = this.handlerLogradouro.bind(this)
        this.handlerNumero = this.handlerNumero.bind(this)
        this.handlerComplemento = this.handlerComplemento.bind(this)        
        this.handlerBairro = this.handlerBairro.bind(this)      
        this.handlerCidade = this.handlerCidade.bind(this)  
        this.handlerCEP = this.handlerCEP.bind(this) 
        this.handlerTelefone = this.handlerTelefone.bind(this)
        this.handlerEmail = this.handlerEmail.bind(this)
        this.handlerEja = this.handlerEja.bind(this)
        this.handlerSubPrefeitura = this.handlerSubPrefeitura.bind(this)
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
        this.estadoUpload = this.estadoUpload.bind(this)

        this.handlerTurma = this.handlerTurma.bind(this)
        this.handlerNivel = this.handlerNivel.bind(this)
        this.handlerQtd = this.handlerQtd.bind(this)
        this.handlerTurno = this.handlerTurno.bind(this)
        this.handlerSerie = this.handlerSerie.bind(this)

        this.pegaSubPrefeituras = this.pegaSubPrefeituras.bind(this)
        this.pegaLocalizacao = this.pegaLocalizacao.bind(this)
        this.pegaLocalizacaoCEP = this.pegaLocalizacaoCEP.bind(this)
        this.pegaEnderecoCep = this.pegaEnderecoCep.bind(this)

        this.inputLogradouro = React.createRef()
        this.inputBairro = React.createRef()
        this.inputCidade = React.createRef()
        this.inputLatitude = React.createRef()
        this.inputLongitude = React.createRef()

        this.salvarImagem = this.salvarImagem.bind(this)
        this.salvarEscola = this.salvarEscola.bind(this)
        this.salvarTurma = this.salvarTurma.bind(this)
        this.novaTurma = this.novaTurma.bind(this)

        this.inputQtd = React.createRef()
        this.inputTurma = React.createRef()

        this.state = {
            currentUser: AuthService.getCurrentUser(),
            showAdminBoard: false,
            showModeratorBoard: false,
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
            subprefeituras: [],
            ceps: [],
            subprefeitura: "",
            conveniada: false,
            turma: "",
            ejaTurma: false,
            qtd: "",
            identificador: "",
            matriculas: 0,
            serie: "",
            turno: "",
            msg: "",
            deficiente: "Sim",
            mental: true,
            fala: true,
            auditiva: true,
            motora: true,
            visual: true,        
            cegueira: true,
            baixaVisao: true,
            multipla: true,
            surdoCegueira: true,
            superdotacao: true,
            down: true,
            autismo: true,
            chkOutra: true,
            outra: "",
            lat: "",
            long: "",
            foto: "default.jpg",
            situacao: true,
            imagem: "",
            url:"",
            p1Location:"",
            info: "",
            page: "",
            submitted: false
        }
    }

    componentDidMount() {
        this.pegaSubPrefeituras()   
        
        if (this.state.currentUser) {
            this.setState({
              showModeratorBoard: this.state.currentUser.roles.includes("ROLE_MODERATOR"),
              showAdminBoard: this.state.currentUser.roles.includes("ROLE_ADMIN")
            })
          }
    }

    pegaSubPrefeituras (page = 1) {        
       SubPrefeituraDataService.buscarTodos(page)
        .then(response => {
        //REST do response da API em duas constantes: 
        // "docs" com os dados do chamado e "info" com os dados das páginas
            const { docs, ...info } = response.data 
            this.setState({
                subprefeituras: docs,
                info: info,
                page: page
            })                
        })
        .catch(e => {
            console.log(e)
        })
    }

    estadoUpload(e) {
        //Verifica se o usuário escolheu e depois cancelou a escolha do arquivo. Assim a imagem volta a ser a padrão
        if(!e.target.files[0]){
            const imagem = {name: "default.jpg", type: "image/jpeg"}
            const foto = "default.jpg"
            const url = ""
            this.setState({
                imagem: imagem,
                url: url,
                foto: foto
            })
        }
        //Quando o usuário escolhe uma imagem a ser enviada
        else {
            const imagem = e.target.files[0]
            this.setState({
                imagem: imagem,
                url: URL.createObjectURL(imagem)          
            })
        }
    }

    async handlerDescricao(e) {
        await this.setState({
            descricao: e.target.value = ("" + e.target.value).toUpperCase()
        })

        await this.setState({
            idescola: moment().valueOf(),
        })
    }

    handlerCNPJ(e) {
        this.setState({
            cnpj: cnpjMask(e.target.value)
        })
    }

    handlerINEP(e) {
        this.setState({
            inep: e.target.value.replace(/\D/g, '')
        })
    }

    handlerLogradouro(e) {
        this.setState({
            logradouro: e.target.value
        })
    }

    handlerNumero(e) {
        this.setState({
            numero: e.target.value
        })
    }

    handlerComplemento(e) {
        this.setState({
            complemento: e.target.value = ("" + e.target.value).toUpperCase()
        })
    }

    handlerBairro(e) {
        this.setState({
            bairro: e.target.value = ("" + e.target.value).toUpperCase()
        })
    }

    handlerCidade(e) {
        this.setState({
            cidade: e.target.value = ("" + e.target.value).toUpperCase()
        })
    }

    async handlerCEP(e) {
        await this.setState({
            cep: cepMask(e.target.value)
        })
    }

    handlerTelefone(e) {
        this.setState({
            telefone: telMask(e.target.value)
        })
    }

    handlerEmail(e) {
        this.setState({
            email: e.target.value = ("" + e.target.value).toLowerCase()
        })
    }

    handlerSubPrefeitura(e) {
        this.setState({
            subprefeitura: e.target.value
        })
    }


    handlerEja(e) {
        this.setState({
            eja: e.target.type === 'checkbox' ? e.target.checked : e.target.value
        })
    }

    handlerConveniada(e) {
        this.setState({
            conveniada: e.target.type === 'checkbox' ? e.target.checked : e.target.value
        })
    }

    handlerLat(e) {
        this.setState({
            lat: e.target.value
        })
    }

    handlerLong(e) {
        this.setState({
            long: e.target.value
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

    async handlerTurma(e) {
        await this.setState({
            turma: e.target.value = ("" + e.target.value).toUpperCase()
        })

        await this.setState({
            identificador: moment().valueOf(),
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

        if (this.state.cep !== "" || this.state.cep !== undefined ) {
           await CepDataService.buscarCep(this.state.cep,page)
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
                this.setState({
                    logradouro: this.state.ceps[0].logradouro,              
                    bairro: this.state.ceps[0].bairro,
                    cidade: this.state.ceps[0].cidade
                }) 
                this.inputLogradouro.current.value = this.state.logradouro
                this.inputBairro.current.value = this.state.bairro            
                this.inputCidade.current.value = this.state.cidade 
            }

            if ( this.state.ceps.length === 0) {
                alert("CEP não localizado")
            }
             
        }
    }

    async pegaLocalizacaoCEP() {
        const key = 'AIzaSyBwNxO-LGt8HpwtFbMAhBEaUxeew-FCz1o'        

        if (this.state.cep !== "" || this.state.cep !== undefined ) {
            const buscaCEP = await axios
            .get('https://maps.googleapis.com/maps/api/geocode/json?&address=' + 
            this.state.cep + '&key=' + key)
            
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
        
        if (this.state.cep === "" && this.state.logradouro !== ""  && this.state.cidade !== "" ) {
            const buscaEndereco = await axios
            .get('https://maps.googleapis.com/maps/api/geocode/json?&address=' + 
            this.state.numero + ',' +this.state.logradouro + ',' + this.state.cidade  + ', RJ&key=' + key)

            this.setState({
                p1Location: buscaEndereco.data         
            })

            if (buscaEndereco.data.results.length > 0) {
                this.timerID = setTimeout(() => {
                    this.setState({                
                        lat: buscaEndereco.data.results[0].geometry.location.lat,
                        long: buscaEndereco.data.results[0].geometry.location.lng          
                    })
                    this.inputLatitude.current.value = this.state.lat
                    this.inputLongitude.current.value = this.state.long
                }, 2000)   
            } 

            this.timerID = setTimeout(() => {
                if (this.state.lat !== "" && this.state.long !== "") {
                    alert ("Localização obtida com sucesso!")
                }
            }, 2500) 
        }        
    }


   salvarImagem() {
    
        if(this.state.foto === "default.jpg") {
            this.salvarChamado()  
            return false
        } if(this.state.foto !== "default.jpg") {
        
            var data = new FormData()
            data.append('file', this.state.imagem)
        
            EscolaDataService.cadastrarImagem(data)
            .then(response => {
                this.setState({
                    foto: response.data.foto
                })
                this.salvarEscola()
            })
            .catch(e => {
                console.log(e)
            })
        }
    }

    salvarEscola() {

        if (this.state.descricao === "") {
            alert("Deve ser cadastrada uma descrição para a unidade escolar")
            return false
        }

        if (this.state.logradouro === "" || this.state.cidade === "" ) {
            alert("Deve ser cadastrado endereço e cidade para a unidade escolar")
            return false
        }

        if (this.state.lat === "" || this.state.long === "") {
            alert(`As latitudes e longitudes devem ser preenchidas para a unidade escolar.
Digite o CEP e pressione a tecla TAB,
ou digite o endereço e cidade corretamente e clique no botão localização. `)
            return false
        }

        var data = null
        if (this.state.deficiente === "Não") {
            data = {
                descricao: this.state.descricao,
                idescola: this.state.idescola,
                cnpj: this.state.cnpj,
                inep: this.state.inep,
                username: this.state.currentUser.username,
                cep: this.state.cep,
                logradouro: this.state.logradouro,
                numero: this.state.numero,
                complemento: this.state.complemento,
                bairro: this.state.bairro,
                cidade: this.state.cidade,
                uf: 'RJ',
                telefone: this.state.telefone,
                email: this.state.email,
                eja: this.state.eja,
                conveniada: this.state.conveniada,
                subprefeitura: this.state.subprefeitura,
                lat: this.state.lat,
                long: this.state.long,            
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
                chkOutra:true,
                outra: "",
                foto: this.state.foto
            }    
        } else {

            data = {
                descricao: this.state.descricao,
                idescola: this.state.idescola,
                cnpj: this.state.cnpj,
                inep: this.state.inep,
                username: this.state.currentUser.username,
                cep: this.state.cep,
                logradouro: this.state.logradouro,
                numero: this.state.numero,
                complemento: this.state.complemento,
                bairro: this.state.bairro,
                cidade: this.state.cidade,
                uf: 'RJ',
                telefone: this.state.telefone,
                email: this.state.email,
                eja: this.state.eja,
                conveniada: this.state.conveniada,
                subprefeitura: this.state.subprefeitura,
                lat: this.state.lat,
                long: this.state.long,            
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
                chkOutra: true,          
                outra: this.state.outra,
                foto: this.state.foto
            }
        }

        EscolaDataService.cadastrar(data)
        .then(response => {
            this.setState({
                id: response.data.id,
                descricao: response.data.descricao,
                idescola: response.data.idescola,
                cnpj: response.data.cnpj,
                inep: response.data.inep,
                username: response.data.username,
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
                foto: response.data.foto,
                situacao: response.data.situacao,
                submitted: true
            })            
        })
        .catch(e => {
            console.log(e)
        })
    }

    async salvarTurma() {

        if (this.state.turma === "") {
            alert("Deve ser cadastrada uma descrição para a turma")
            return false
        }

        if (this.state.qtd === "") {
            alert("Deve ser cadastrada uma quantidade para a turma")
            return false
        }

        if (this.state.serie === "") {
            alert("Deve ser cadastrado um ano de escolaridade para a turma")
            return false
        }

        var data = null
        if (this.state.deficiente === "Não") {
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
                escola: this.state.descricao,
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
                escola: this.state.descricao,
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
                eja: response.data.ejaTurma,
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

    render() {

        const {subprefeituras,  showAdminBoard, showModeratorBoard} = this.state

        let listasub = null
        let lista = subprefeituras.map((item, index) => ( 
            <option value={item.descricao} key={index}>{item.descricao}</option>
        ))
        
        listasub = <div className="col-md-6" style={{padding: 0, marginBottom: 2+'%'}}>   
            <label>Subprefeitura</label>                                          
            <select 
                className="form-control" 
                id="curso" 
                name="curso"
                value={this.state.subprefeitura}                                    
                onChange={this.handlerSubPrefeitura} >     
            
                <option value="" >---Selecione---</option>  
                {lista}                     
            </select>
        </div>

        let deficiencias = null
        let outra = null
        if (this.state.chkOutra === true) {
            outra = 
                <input type="text" hidden className="form-control" onChange={this.handlerOutra} placeholder="Digite a deficiência" />          
        }

        if (this.state.deficiente === 'Sim') {
            deficiencias = <div>
                <label hidden className="col-sm-6">Marque as deficiências que a escola atende: </label>
                <div hidden className="form-group row">                    
                    <div className="col-sm-12">
                        <div className="form-check">
                            <label className="form-check-label"  style={{marginRight: 2+'%'}}>
                                <input className="form-check-input" type="checkbox" onChange={this.handlerAuditiva} style={{marginRight: 1+'%'}} /> Deficiência auditiva e surdez
                            </label>
                            <label className="form-check-label"  style={{marginRight: 3+'%'}}>
                                <input className="form-check-input" type="checkbox" onChange={this.handlerFala} style={{marginLeft: -1+'%', marginRight: 1+'%'}} /> Fala
                            </label>
                            <label className="form-check-label"  style={{marginRight: 3+'%'}}>
                                <input className="form-check-input" type="checkbox" onChange={this.handlerMental} style={{marginLeft: -1+'%'}} /> Deficiência mental
                            </label>
                            <label className="form-check-label"  style={{marginRight: 3+'%'}}>
                                <input className="form-check-input" type="checkbox" onChange={this.handlerMotora} style={{marginLeft: -1+'%'}} /> Deficiência física
                            </label>
                            <label className="form-check-label"  style={{marginRight: 3+'%'}}>
                                <input className="form-check-input" type="checkbox" onChange={this.handlerVisual} style={{marginLeft: -1+'%'}} /> Deficiência visual
                            </label>
                            <label className="form-check-label"  style={{marginRight: 3+'%'}}>
                                <input className="form-check-input" type="checkbox" onChange={this.handlerCegueira} style={{marginLeft: -1+'%'}} /> Cegueira
                            </label>
                            <label className="form-check-label"  style={{marginRight: 3+'%'}}>
                                <input className="form-check-input" type="checkbox" onChange={this.handlerSurdoCegueira} style={{marginLeft: -1+'%'}} /> Surdocegueira
                            </label>
                            <label className="form-check-label"  style={{marginRight: 3+'%'}}>
                                <input className="form-check-input" type="checkbox" onChange={this.handlerBaixaVisao} style={{marginLeft: -1+'%'}} /> Baixa visão
                            </label>
                            <label className="form-check-label"  style={{marginRight: 3+'%'}}>
                                <input className="form-check-input" type="checkbox" onChange={this.handlerMultipla} style={{marginLeft: -1+'%'}} /> Deficiência múltipla
                            </label>
                            
                          {/*  <label className="form-check-label"  style={{marginRight: 3+'%'}}>
                                <input className="form-check-input" type="checkbox" onChange={this.handlerDown} style={{marginLeft: -1+'%'}} /> Síndrome de Down
                                </label> */}
                            <label className="form-check-label"  style={{marginRight: 3+'%'}}>
                                <input className="form-check-input" type="checkbox" onChange={this.handlerAutismo} style={{marginLeft: -1+'%'}} /> Transtorno do espectro autista
                            </label>
                            <label className="form-check-label"  style={{marginRight: 3+'%'}}>
                                <input className="form-check-input" type="checkbox" onChange={this.handlerSuperdotacao} style={{marginLeft: -1+'%'}} /> Altas habilidades / Superdotação
                            </label>
                            <label className="form-check-label"  style={{marginRight: 3+'%'}}>
                                <input className="form-check-input" type="checkbox" onChange={this.handlerChkOutra} style={{marginLeft: -1+'%'}} /> Outra
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

        /*if (this.state.nivel === "Semi Presencial") {
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



        let eja = null
        if (this.state.nivel === "Fundamental Anos Finais") {
            eja = <div className="form-check">
                <label className="form-check-label" style={{marginRight: 2+'%', marginTop: 1+'%', fontSize: 18+'px'}}>
                    <input className="form-check-input" type="checkbox" onChange={this.handlerEja} style={{marginRight: 1+'%', transform: `scale(1.3)`}} /> EJA
                </label>
            </div>
        }
    

        let turmas = null
        if (this.state.id && this.state.id !== "") {
            turmas = <div>
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
                            <select className="form-control" id="nivel" name="nivel" value={this.state.nivel} onChange={this.handlerNivel} > 
                            <option value="" >Selecione o nível de ensino</option>
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
                            <label style={{marginRight: 3+'%', marginTop: 1+'%'}}>Aceita Deficientes</label>
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

        return (
            <div className="submit-form">
                { this.state.submitted ? (
                    <div style={{margin: 5 + '%'}}>
                        <h4> Unidade Escolar cadastrada com sucesso!</h4>

                        {turmas}
                        <Link to={"/escolas"} className="btn btn-info">
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
                                    required 
                                    value={this.state.descricao} 
                                    onChange={this.handlerDescricao} 
                                    name="descricao"
                                    autoFocus />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label htmlFor="cnpj"> CNPJ </label>
                                    <input 
                                    maxLength='18'
                                    className="form-control" 
                                    id="cnpj" 
                                    value={this.state.cnpj} 
                                    onChange={this.handlerCNPJ} 
                                    name="cnpj"
                                    ref={this.inputCNPJ} />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label htmlFor="inep"> INEP </label>
                                    <input 
                                    maxLength="8"
                                    className="form-control" 
                                    id="inep" 
                                    value={this.state.inep} 
                                    onChange={this.handlerINEP} 
                                    name="inep"
                                    ref={this.inputinep} />
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
                                    value={this.state.cep} 
                                    onChange={this.handlerCEP} 
                                    name="cep"
                                    onBlur={this.pegaLocalizacaoCEP} />                            
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
                                    value={this.state.logradouro} 
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
                                    value={this.state.numero} 
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
                                    value={this.state.complemento} 
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
                                    value={this.state.bairro} 
                                    onChange={this.handlerBairro} 
                                    name="bairro" 
                                    ref={this.inputBairro}/>                            
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
                                    value={this.state.cidade} 
                                    onChange={this.handlerCidade} 
                                    name="cidade" 
                                    ref={this.inputCidade}/>                            
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
                                    value={this.state.telefone} 
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
                                    value={this.state.email} 
                                    onChange={this.handlerEmail} 
                                    name="email" />                            
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group row">                                                    
                                    <div className="form-check" style={{marginLeft:3+'%'}}>
                                        <label className="form-check-label">
                                            <input className="form-check-input" type="checkbox" onChange={this.handlerEja} style={{marginRight: 1+'%'}} /> Possui EJA
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group row">                                
                                    <div className="form-check" style={{marginLeft:3+'%'}}>
                                        <label className="form-check-label">
                                            <input className="form-check-input" type="checkbox" onChange={this.handlerConveniada} style={{marginRight: 1+'%'}} /> Conveniada
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">                                    
                                    <label hidden style={{marginRight: 3+'%', marginTop: 1+'%'}}>Aceita Deficientes</label>
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
                                            onChange={this.handlerDeficiente}
                                            hidden />
                                    </div>
                                    <label hidden className="form-check-label">Sim</label>

                                    <div className="form-check form-check-inline" style={{marginLeft: 2+'%'}}>
                                        <input 
                                            className="form-check-input"
                                            type="radio"
                                            name="nao"
                                            id="nao"
                                            value="Não"
                                            checked={this.state.deficiente === 'Não'}
                                            onChange={this.handlerDeficiente}
                                            hidden />
                                    </div>
                                    <label hidden className="form-check-label">Não</label>
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
                        {deficiencias}         

                        <div className="row">
                            {listasub}

                            <div className="col-md-3">
                                <div className="form-group">
                                    <label htmlFor="lat"> Latitude </label>
                                    <input 
                                    type="lat" 
                                    className="form-control" 
                                    id="lat" 
                                    required 
                                    value={this.state.lat} 
                                    onChange={this.handlerLat} 
                                    name="lat"
                                    ref={this.inputLatitude} />                            
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label htmlFor="long"> Longitude </label>
                                    <input 
                                    type="long" 
                                    className="form-control" 
                                    id="long" 
                                    required 
                                    value={this.state.long} 
                                    onChange={this.handlerLong} 
                                    name="long"
                                    ref={this.inputLongitude} />                            
                                </div>
                            </div>
                        </div>          
                        <button onClick={this.salvarEscola} className="btn btn-success">
                            Adicionar
                        </button>
                        </div>)}                       
                    </div>
                )}
            </div>
        )
    }
}