import React, { Component } from 'react'
import AlunoDataService from "../services/aluno.service"
import EscolaDataService from "../services/escola.service"
import TurmaDataService from "../services/turma.service"
import CepDataService from "../services/cep.service"
import AuthService from "../services/auth.service"
import { Link } from 'react-router-dom'
import { Button, Accordion, Card} from 'react-bootstrap'
import axios from 'axios'
import * as moment from 'moment'
import {cpfMask} from './masks'
import {cepMask} from './cepMask'
import {telMask, celMask} from './telMask'

/*
import Form from "react-validation/build/form"
import Input from "react-validation/build/input"
import CheckButton from "react-validation/build/button"
*/
const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                Este campo é obrigatório!
            </div>
        )
    }
}

export default class AdicionarAluno extends Component {
    constructor(props) {
        super(props)
        this.handlerNome = this.handlerNome.bind(this)
        this.handlerDtNascimento = this.handlerDtNascimento.bind(this)
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
        this.handlerConveniada = this.handlerConveniada.bind(this)
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
        this.handlerIrmao = this.handlerIrmao.bind(this)
        this.handlerVulneravel = this.handlerVulneravel.bind(this)
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

        this.pegaTurmas = this.pegaTurmas.bind(this)
        this.pegaEscolas = this.pegaEscolas.bind(this)
        this.pegaLocalizacao = this.pegaLocalizacao.bind(this)
        this.pegaLocalizacaoCEP = this.pegaLocalizacaoCEP.bind(this)
        this.pegaEnderecoCep = this.pegaEnderecoCep.bind(this)
        this.buscarEscolas = this.buscarEscolas.bind(this)
        this.selecionaOpcao = this.selecionaOpcao.bind(this)
        this.escola = this.escola.bind(this)
        this.calculaSerie = this.calculaSerie.bind(this)

        this.inputLogradouro = React.createRef()
        this.inputBairro = React.createRef()
        this.inputCidade = React.createRef()
        this.inputCep = React.createRef()
        this.inputLatitude = React.createRef()
        this.inputLongitude = React.createRef()

        this.calculaPontos = this.calculaPontos.bind(this)
        this.salvarAluno = this.salvarAluno.bind(this)
        this.novoAluno = this.novoAluno.bind(this)

        this.state = {
            currentUser: AuthService.getCurrentUser(),
            showModeratorBoard: false,
            escolas: [],
            turmas: [],
            ceps: [],
            nome: "",
            dtnascimento: "",
            identificador: "",
            sexo: "",
            rg: "",
            cpf: "",
            nis: "",
            bolsafamilia: "",
            protocolo: "",
            nivel: "",
            serie: "",
            faixaSerie: "",
            turma: "",
            turno: "",
            escola: "",
            conveniada: false,
            irmao: false,
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
            vulneravel: false,
            pontos: 1,
            pontuacao: 0,
            deficiente: "Não",
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
            status: "",
            situacao: true,
            imagem: "",
            url: "",
            submitted: false,
            successful: false,
            p1Location:"",
            message: "",
            infoE: "",
            pageE: "",
            infoT: "",
            pageT:"",
            current: "",
            currentIndex: ""
        }
    }

    componentDidMount() {
        this.pegaEscolas()
        this.pegaTurmas()

        
    if (this.state.currentUser) {
        this.setState({
          showModeratorBoard: this.state.currentUser.roles.includes("ROLE_MODERATOR")
        })
      }
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

    pegaTurmas(page = 1) {
        TurmaDataService.buscarTodos(page)
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

    handlerNome(e) {
        this.setState({
            nome: e.target.value = ("" + e.target.value).toUpperCase()
        })
    }

    handlerDtNascimento(e) {
        this.setState({
            dtnascimento: e.target.value
        })
    }

    handlerSexo(e) {
        this.setState({
            sexo: e.target.value
        })
    }

    handlerRG(e) {
        this.setState({
            rg: e.target.value = ("" + e.target.value).replace(/\D/g, '')
        })
    }

    handlerCPF(e) {
        this.setState({
            cpf: cpfMask(e.target.value)
        })
    }

    handlerProtocolo(e) {
        this.setState({
            protocolo: e.target.value
        })
    }

    handlerNIS(e) {
        this.setState({
            nis: e.target.value = ("" + e.target.value).replace(/\D/g, '')
        })
    }

    handlerBolsaFamilia(e) {
        this.setState({
            bolsafamilia: e.target.value
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

    handlerSerie(e) {
        this.setState({
            serie: e.target.value
        })
    }

    handlerTurma(e) {
        this.setState({
            turma: e.target.value
        })
    }

    handlerTurno(e) {
        this.setState({
            turno: e.target.value
        })
    }

    handlerEscola(e) {
        this.setState({
            escola: e.target.value
        })
    }

    handlerResponsavel(e) {
        this.setState({
            responsavel: e.target.value = ("" + e.target.value).toUpperCase()
        })
    }

    async handlerCPFResponsavel(e) {
        await this.setState({
            cpf_responsavel: cpfMask(e.target.value = ("" + e.target.value).replace(/\D/g, ''))
        })

        await this.setState({
            identificador: this.state.cpf_responsavel.substring(0,3)+moment().valueOf(),
        })
    }

    handlerLogradouro(e) {
        this.setState({
            logradouro: e.target.value = ("" + e.target.value).toUpperCase()
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

    handlerCEP(e) {
        this.setState({
            cep: cepMask(e.target.value)
        })        
    }

    handlerTelefone(e) {
        this.setState({
            telefone: telMask(e.target.value)
        })
    }

    handlerCelular(e) {
        this.setState({
            celular: celMask(e.target.value)
        })
    }

    handlerEmail(e) {
        this.setState({
            email: e.target.value = ("" + e.target.value).toLowerCase()
        })
    }

    handlerIrmao(e) {
        this.setState({
            irmao: e.target.type === 'checkbox' ? e.target.checked : e.target.value
        })
    }

    handlerVulneravel(e) {
        this.setState({
            vulneravel: e.target.type === 'checkbox' ? e.target.checked : e.target.value
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

    handlerDeficiente(e) {
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

    handlerLat(e) {
        this.inputLatitude = this.state.lat
        this.setState({
            lat: e.target.value
        })
    }

    handlerLong(e) {
        this.inputLongitude = this.state.long
        this.setState({
            long: e.target.value
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
            
            this.pegaEnderecoCep()
        }    
    }


    async pegaLocalizacao() {
        const key = 'AIzaSyBwNxO-LGt8HpwtFbMAhBEaUxeew-FCz1o' 

        if (this.state.cidade === "" || this.state.logradouro === "") {
            alert ("O endereço e cidade devem ser preenchidos")
        }
        
        if (this.state.cep === "" && this.state.logradouro !== "" && this.state.cidade !== "" ) {
            const buscaEndereco = await axios
            .get('https://maps.googleapis.com/maps/api/geocode/json?&address=' + 
            this.state.numero + ',' + this.state.logradouro + ',' + this.state.cidade + ', RJ&key=' + key)

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

    calculaSerie() {
        if (this.state.dtnascimento >= '2019-04-01' && this.state.dtnascimento <= '2020-03-31') {
           this.setState({
               nivel: "Creche",
               serie: "Creche I"
           })
        }

        if (this.state.dtnascimento >= '2018-04-01' && this.state.dtnascimento <= '2019-03-31') {
            this.setState({
                nivel: "Creche",
                serie: "Creche II"
            })
        }

        if (this.state.dtnascimento >= '2017-04-01' && this.state.dtnascimento <= '2018-03-31') {
            this.setState({
                nivel: "Creche",
                serie: "Creche III"
            })
        }
        if (this.state.dtnascimento >= '2016-04-01' && this.state.dtnascimento <= '2017-03-31') {
            this.setState({
                nivel: "Pré escola",
                serie: "Pré Escola IV"
            })
        }
        if (this.state.dtnascimento >= '2015-04-01' && this.state.dtnascimento <= '2016-03-31') {
            this.setState({
                nivel: "Pré escola",
                serie: "Pré Escola V"                
            })
        }

        if (this.state.dtnascimento <= '2003-03-31') {
            this.setState({
                eja: true,
                nivel: "EJA"
            })
        }

        if (this.state.dtnascimento > '2010-03-31' && this.state.dtnascimento <= '2015-03-31') {

            this.setState({
                eja: false,
                nivel: "Fundamental Anos Iniciais"
            })

            if (this.state.dtnascimento > '2014-03-31' && this.state.dtnascimento <= '2015-03-31') {
                this.setState({
                    faixaSerie: "1",
                    serie: "1º ano"
                })
            }
            if (this.state.dtnascimento > '2013-03-31' && this.state.dtnascimento <= '2014-03-31') {
                this.setState({
                    faixaSerie: "2",
                    serie: "2º ano"
                })
            }
            if (this.state.dtnascimento > '2012-03-31' && this.state.dtnascimento <= '2013-03-31') {
                this.setState({
                    faixaSerie: "3",
                    serie: "3º ano"
                })
            }
            if (this.state.dtnascimento > '2011-03-31' && this.state.dtnascimento <= '2012-03-31') {
                this.setState({
                    faixaSerie: "4",
                    serie: "4º ano"
                })
            }
            if (this.state.dtnascimento > '2010-03-31' && this.state.dtnascimento <= '2011-03-31') {
                this.setState({
                    faixaSerie: "5",
                    serie: "5º ano"
                })
            }
        }

        if (this.state.dtnascimento > '2003-03-31' && this.state.dtnascimento <= '2010-03-31' && this.state.eja === false) {
            this.setState({
                eja: false,
                nivel: "Fundamental Anos Finais"
            })
            
            if (this.state.dtnascimento > '2009-03-31' && this.state.dtnascimento <= '2010-03-31') {
                this.setState({
                    faixaSerie: "6",
                    serie: "6º ano"
                })
            }
            if (this.state.dtnascimento > '2008-03-31' && this.state.dtnascimento <= '2009-03-31') {
                this.setState({
                    faixaSerie: "7",
                    serie: "7º ano"
                })
            }
            if (this.state.dtnascimento > '2007-03-31' && this.state.dtnascimento <= '2008-03-31') {
                this.setState({
                    faixaSerie: "8",
                    serie: "8º ano"
                })
            }
            if (this.state.dtnascimento <= '2007-03-31') {
                this.setState({
                    faixaSerie: "9",
                    serie: "9º ano"
                })
            }
        }

    }

    buscarEscolas() {

        this.calculaSerie()

        let todasDistancias = []
        let atual = [this.state.lat, this.state.long]
        let todas = null
        let filtroTurma = null
        let turmaEscola = null
        let todasEscolas = null
        let filtroEscolas = []

        if (this.state.dtnascimento <= '2020-03-31' && this.state.deficiente === "Não") {
           
            if (this.state.conveniada === true) {
               todas = this.state.escolas.filter((escola) => {
                return escola.conveniada === true
               })
            } else {
                todas = this.state.escolas
            }

            if (this.state.eja === true) {
                todas = this.state.escolas.filter((escola) => {
                    return escola.eja === true
                })

                filtroTurma = this.state.turmas.filter((turma) => {
                    return ((turma.serie === this.state.serie) && (turma.turno === this.state.turno) && (turma.eja === true))
                }) 
    
                turmaEscola = filtroTurma.map((turma) => {
                    return todas.filter((escola) => {
                        return turma.escola === escola.descricao
                    })
                }) 

                filtroEscolas = turmaEscola.filter((escola) => {
                    return escola.length > 0
                })  

                todasEscolas = filtroEscolas.filter(function (a) {
                    return !this[JSON.stringify(a)] && (this[JSON.stringify(a)] = true);
                }, Object.create(null)) 

               
            } else {         
                todas = this.state.escolas

                filtroTurma = this.state.turmas.filter((turma) => {
                    return ((turma.serie === this.state.serie) && (turma.turno === this.state.turno))
                }) 

                turmaEscola = filtroTurma.map((turma) => {
                    return todas.filter((escola) => {
                        return turma.escola === escola.descricao
                    })
                }) 
                
                filtroEscolas = turmaEscola.filter((escola) => {
                    return escola.length > 0
                })  

                todasEscolas = filtroEscolas.filter(function (a) {
                    return !this[JSON.stringify(a)] && (this[JSON.stringify(a)] = true);
                }, Object.create(null)) 

                

            }           

            this.setState({
                turmaEscola: turmaEscola,
                todas: todas,
                filtroTurma: filtroTurma,
                todasEscolas: todasEscolas
            })

            if (todasEscolas.length === 0) {
                alert ("Nenhuma escola encontrada nos parâmetros selecionados")
            }
                       
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

        

        if (this.state.dtnascimento <= '2020-03-31' && this.state.deficiente === 'Sim') {
            if (this.state.auditiva === true) {
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

            if (this.state.autismo === true) {
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

            if (this.state.fala === true) {
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

            if (this.state.mental === true) {
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

            if (this.state.motora === true) {
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

            if (this.state.visual === true) {
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

            if (this.state.cegueira === true) {
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

            if (this.state.baixaVisao === true) {
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

            if (this.state.surdoCegueira === true) {
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

            if (this.state.multipla === true) {
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

            if (this.state.superdotacao === true) {
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

            if (this.state.down === true) {
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

        if (this.state.dtnascimento >= '2021-04-01') {
            alert("Data de nascimento incorreta")   
            return false         
        } 

        if (this.state.dtnascimento < '1900-01-01') {
            alert("Data de nascimento incorreta")
            return false            
        } 


        if (this.state.dtnascimento >= '2020-04-01' && this.state.dtnascimento <= '2021-03-31') {
            alert("Somente crianças com 1 completo até 31/03/2021 podem se candidatar")
            return false
        }
    }

    selecionaOpcao(item, index) {
        this.setState({
            current: item,
            currentIndex: index
        })

        this.escola()
    }

    async escola () {
        if (this.state.current.length > 0) {
            await this.setState({
                escola: this.state.current.descricao
            })
        }        
    }

    calculaPontos () {

        let arrayPontos = []
        if (this.state.deficiente === "Sim") {
           
            arrayPontos.push(50)
        }

        if (this.state.irmao === true) {            
            
            arrayPontos.push(5)
        }

        if (this.state.vulneravel === true) {            
           
            arrayPontos.push(2)
        }

        if (this.state.bolsafamilia === "Sim") {            
           
            arrayPontos.push(4)
        }
        
        let soma = []   
        soma = arrayPontos.reduce((a, b) => {return a += b}, 0)
       
        this.setState({
            pontos: soma
        })

        this.timerSave = setTimeout(() => {
            this.salvarAluno()
        }, 1000) 
        
        
    }

    salvarAluno() {

        if (this.state.turno === "") {
            alert ("Turno deve ser preenchido")
            return false
        }

        
        if (this.state.dtnascimento >= '2021-04-01') {
            alert("Data de nascimento incorreta")   
            return false         
        } 
        if (this.state.dtnascimento < '1900-01-01') {
            alert("Data de nascimento incorreta")
            return false            
        } 

        if (this.state.dtnascimento >= '2020-04-01' && this.state.dtnascimento <= '2021-03-31') {
            alert("Somente crianças com 1 completo até 31/03/2021 podem se candidatar à vaga")
            return false
        }

        if (this.state.lat === "" || this.state.long === "") {
            alert(`As latitudes e longitudes devem ser preenchidas para localizar as unidades escolares mais próximas.
Digite o CEP e pressione a tecla TAB,
ou digite o endereço e cidade corretamente e clique no botão localização. `)
            return false
        }

                

        var data = {
            username: this.state.currentUser.username,
            nome: this.state.nome,
            dtnascimento: moment(this.state.dtnascimento,'YYYY-MM-DD'),
            sexo: this.state.sexo,
            identificador: this.state.identificador,
            rg: this.state.rg,
            cpf: this.state.cpf,
            nis: this.state.nis,
            bolsafamilia: this.state.bolsafamilia,
            //protocolo: this.state.protocolo,
            nivel: this.state.nivel,
            serie: this.state.serie,
            turma: this.state.turma,
            turno: this.state.turno,
            escola: this.state.current.descricao,
            irmao: this.state.irmao,
            vulneravel: this.state.vulneravel,
            pontos: this.state.pontos,
            responsavel: this.state.responsavel,
            cpf_responsavel: this.state.cpf_responsavel,
            logradouro: this.state.logradouro,
            numero: this.state.numero,
            complemento: this.state.complemento,
            bairro: this.state.bairro,
            cidade: this.state.cidade,
            uf: "RJ",
            cep: this.state.cep,
            telefone: this.state.telefone,
            celular: this.state.celular,
            email: this.state.email,
            eja: this.state.eja,
            deficiente: this.state.deficiente,
            mental: this.state.mental,
            fala: this.state.fala,
            auditiva: this.state.auditiva,
            motora: this.state.motora,
            visual: this.state.visual,                        
            cegueira: this.state.cegueira,
            baixaVisao: this.state.baixaVisao,
            multipla: this.state.multipla,
            surdoCegueira: this.state.surdoCegueira,
            superdotacao: this.state.superdotacao,
            down: this.state.down,
            autismo: this.state.autismo,
            chkOutra: this.state.chkOutra,
            outra: this.state.outra,
            lat: this.state.lat,
            long: this.state.long,
            status: "Em análise"
        }

        AlunoDataService.cadastrar(data)
        .then(response => {
            this.setState({
                id: response.data.id,
                username: response.data.username,
                nome: response.data.nome,
                dtnascimento: response.data.dtnascimento,
                sexo: response.data.sexo,
                identificador: response.data.identificador,
                rg: response.data.rg,
                cpf: response.data.cpf,
                nis: response.data.nis,
                bolsafamilia: response.data.bolsafamilia,
                protocolo: response.data.protocolo,
                nivel: response.data.nivel,
                serie: response.data.serie,
                turma: response.data.turma,
                turno: response.data.turno,
                escola: response.data.escola,
                irmao: response.data.irmao,
                vulneravel: response.data.vulneravel,
                pontos: response.data.pontos,
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
            })
            console.log(response.data)
            })
            .catch(e => {
                console.log(e)
            })        
    }

    novoAluno() {
        window.location.reload()
        /*this.setState({
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
            distancias: "",
            irmao: false,
            pontos: 1,
            vulneravel: false,
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
            foto: "default.jpg",
            status: "",
            situacao: true,
            imagem: "",
            url: "",
            submitted: false,
            successful: false,
            p1Location:"",
            message: ""
        }) */
    }


    render() {

        const {distancias, lat, long, currentIndex, showModeratorBoard} = this.state

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

        if (distancias && lat && long) {
            mostrarOpcoes = <div className="escola-list">
                {distancias.map((item, index) => {
                   
            
                    if (item.auditiva === true) {
                        auditiva = <div>
                            <label> Deficiência auditiva e surdez, </label>
                        </div>
                    }
            
                    if (item.autismo === true) {
                        autismo = <div>
                            <label> Transtorno do espectro autista </label>
                        </div>
                    }
            
                   /* if (item.fala === true) {
                        fala = <div>
                            <label> Fala</label>
                        </div>
                    } */
            
                    if (item.mental === true) {
                        mental = <div>
                            <label>Deficiência intelectual</label>
                        </div>
                    }
            
                    if (item.motora === true) {
                        motora = <div>
                            <label> Deficiência física</label>
                        </div>
                    }
            
                    /*if (item.down === true) {
                        down = <div>
                            <label>, Síndrome de Down</label>
                        </div>
                    }*/
            
                    if (item.visual === true) {
                        visual = <div>
                            <label> Deficiência visual</label>
                        </div>
                    }

                    if (item.cegueira === true) {
                        cegueira = <div>
                            <label> Cegueira</label>
                        </div>
                    }

                    if (item.baixaVisao === true) {
                        baixaVisao = <div>
                            <label>Baixa visão</label>
                        </div>
                    }

                    if (item.surdoCegueira === true) {
                        surdoCegueira = <div>
                            <label> Surdocegueira</label>
                        </div>
                    }

                    if (item.multipla === true) {
                        multipla = <div>
                            <label>Deficiência múltipla</label>
                        </div>
                    }

                    if (item.superdotacao === true) {
                        superdotacao = <div>
                            <label> Altas habilidades / Superdotação</label>
                        </div>
                    }
            
                    if (item.chkOutra === true) {
                        outra = <div>
                            <label> Outra: {item.outra}</label>
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

        if (this.state.nivel === "Creche") {
            serie = <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Ano de escolaridade</label>
                        <select className="form-control" id="serie" name="serie" value={this.state.serie} onChange={this.handlerSerie}  > 
                            <option value="" disabled> --- Selecio --- </option>
                            <option value="Creche I">Creche I</option>
                            <option value="Creche II">Creche II</option>
                            <option value="Creche III">Creche III</option>                       
                        </select>
                    </div> 
                </div>
                <div className="col-md-4">
                    <div className="form-group">
                        <label>Turno</label>
                        <select className="form-control" id="serie" name="serie" value={this.state.turno} onChange={this.handlerTurno}  > 
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
                                <input className="form-check-input" type="checkbox" onChange={this.handlerConveniada} style={{marginRight: 1+'%'}} /> Conveniada
                            </label>
                        </div>
                    </div>
                </div>                
            </div>
        }

        if (this.state.nivel === "Pré escola") {
            serie = <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Ano de escolaridade</label>
                        <select className="form-control" id="serie" name="serie" value={this.state.serie} onChange={this.handlerSerie}  > 
                            <option value="" disabled> --- Selecione --- </option>
                            <option value="Pré Escola IV">Pré Escola IV</option>
                            <option value="Pré Escola V">Pré Escola V</option>                     
                        </select>
                    </div> 
                </div>
                <div className="col-md-4">
                    <div className="form-group">
                        <label>Turno</label>
                        <select className="form-control" id="serie" name="serie" value={this.state.turno} onChange={this.handlerTurno}  > 
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
                                <input className="form-check-input" type="checkbox" onChange={this.handlerConveniada} style={{marginRight: 1+'%'}} /> Conveniada
                            </label>
                        </div>
                    </div>
                </div>                
            </div>
        }

        if (this.state.nivel === "Fundamental Anos Iniciais") {
            serie = <div className="row">
            <div className="form-group">
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
            <div className="col-md-6">
                <div className="form-group">
                    <label>Turno</label>
                    <select className="form-control" id="serie" name="serie" value={this.state.turno} onChange={this.handlerTurno}  > 
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

        if (this.state.nivel === "Fundamental Anos Finais") {
            serie = <div className="row">
            <div className="form-group">
                <label>Ano de escolaridade</label>
                <select className="form-control" id="serie" name="serie" value={this.state.serie} onChange={this.handlerSerie}  > 
                    <option value="" disabled> --- Selecione --- </option>
                    <option value="6º ano">6º ano</option>
                    <option value="7º ano">7º ano</option>
                    <option value="8º ano">8º ano</option>
                    <option value="9º ano">9º ano</option>
                    
                </select>
            </div>
            <div className="col-md-6">
                <div className="form-group">
                    <label>Turno</label>
                    <select className="form-control" id="serie" name="serie" value={this.state.turno} onChange={this.handlerTurno}  > 
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

        /*if (this.state.nivel === "Semi Presencial") {
            serie = <div className="row">
            <div className="form-group">
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
            <div className="col-md-6">
                <div className="form-group">
                    <label>Turno</label>
                    <select className="form-control" id="serie" name="serie" value={this.state.turno} onChange={this.handlerTurno}  > 
                        <option value="" disabled>---Escolha o turno---</option>
                        <option value="Manhã"> Manhã</option>
                        <option value="Tarde"> Tarde</option>
                        <option value="Noite"> Noite</option>                  
                        <option value="Intermediário"> Intermediário</option>                  
                    </select>
                </div> 
            </div>
        </div>
        }*/

        if (this.state.nivel === "EJA") {
            serie = <div className="row">
            <div className="form-group">
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
            <div className="col-md-6">
                <div className="form-group">
                    <label>Turno</label>
                    <select className="form-control" id="serie" name="serie" value={this.state.turno} onChange={this.handlerTurno}  > 
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


        /*let eja = null
        if (this.state.dtnascimento === "") {
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

        if (this.state.dtnascimento >= '2003-04-01' && this.state.dtnascimento <= '2006-03-31' ) {
            eja =  <div className="form-group row">                    
            <div className="col-md-6" style={{paddingLeft: 30}}>
                <div className="form-check col-md-6">
                    <label className="form-check-label" style={{paddingLeft: 30+'%',width: 'max-content', fontSize: 18+'px'}}>
                        <input className="form-check-input" type="checkbox" checked={this.state.eja === true} onChange={this.handlerEja}  /> Candidato(a) EJA
                    </label>
                </div>
            </div>
            </div> 
        }  

        if (this.state.dtnascimento  <= '2003-03-31' ) {
            eja =  <div className="form-group row">                    
            <div className="col-md-6" style={{paddingLeft: 30}}>
                <div className="form-check col-md-6">
                    <label className="form-check-label" style={{paddingLeft: 30+'%',width: 'max-content', fontSize: 18+'px'}}>
                        <input className="form-check-input" type="checkbox" disabled checked={true} onChange={this.handlerEja}  /> Candidato(a) EJA
                    </label>
                </div>
            </div>
            </div> 
        }     */   
    
        let deficiencias = null
        let outraDeficiencia = null
        if (this.state.chkOutra === true) {
            outraDeficiencia = 
                <input type="text" className="form-control" onChange={this.handlerOutra} placeholder="Digite a deficiência" />          
        }

        if (this.state.deficiente === 'Sim') {
            deficiencias = <div>
                <label className="col-md-12">Marque as deficiências que o(a) aluno(a) possui: </label>
                <div className="form-group row">                    
                    <div className="col-sm-12">
                        <div className="form-check">
                            <label className="form-check-label"  style={{marginRight: 3+'%'}}>
                                <input className="form-check-input" type="checkbox" onChange={this.handlerAuditiva} /> Deficiência auditiva e surdez
                            </label>
                            {/*<label className="form-check-label"  style={{marginRight: 3+'%'}}>
                                <input className="form-check-input" type="checkbox" onChange={this.handlerFala} /> Fala
                            </label> */}
                            <label className="form-check-label"  style={{marginRight: 3+'%'}}>
                                <input className="form-check-input" type="checkbox" onChange={this.handlerMental} /> Deficiência intelectual
                            </label>
                            <label className="form-check-label"  style={{marginRight: 3+'%'}}>
                                <input className="form-check-input" type="checkbox" onChange={this.handlerMotora} /> Deficiência física
                            </label>
                            <label className="form-check-label"  style={{marginRight: 3+'%'}}>
                                <input className="form-check-input" type="checkbox" onChange={this.handlerVisual}/> Deficiência visual
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
                                <input className="form-check-input" type="checkbox" onChange={this.handlerChkOutra} style={{marginRight: 1+'%'}} /> Outra
                            </label>
                            {outraDeficiencia}
                        </div>
                    </div>                    
                </div>
            </div>
        }

        return (
            <div>
                
                { this.state.submitted ? (
                    <div style={{marginTop: 10+'%'}}>
                        <h4> Cadastrado com sucesso!</h4>
                        <h4>Protocolo: {this.state.protocolo}</h4>
                        <button className="btn btn-success" onClick={this.novoAluno}>
                            Adicionar
                        </button>
                    </div>
                ) : (
                    <div>
                        {showModeratorBoard && ( 
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
                                                        <input 
                                                        type="text" 
                                                        className="form-control" 
                                                        onChange={this.handlerResponsavel} 
                                                        placeholder="Nome do responsável"
                                                        autoFocus 
                                                        validations={[required]} />
                                                    </div>
                                                </div>
                                                <div className="col-md-3">
                                                    <div className="card-body text-secondary">
                                                        <input                                                          
                                                        maxLength='14'
                                                        className="form-control" 
                                                        value={this.state.cpf_responsavel}
                                                        name="cpf_responsavel"
                                                        placeholder="Digite o CPF do responsável"
                                                        onChange={this.handlerCPFResponsavel} />
                                                    </div>
                                                </div>
                                                <div className="col-md-3">
                                                    <div className="card-body text-secondary">
                                                        <input 
                                                        maxLength='9'
                                                        name="cep"
                                                        className="form-control" 
                                                        onChange={this.handlerCEP} 
                                                        placeholder="Digite o CEP"
                                                        value={this.state.cep}
                                                        ref={this.inputCep}
                                                        onBlur={this.pegaLocalizacaoCEP} />
                                                    </div>  
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="card-body text-secondary">
                                                        <input 
                                                        type="text" 
                                                        className="form-control" 
                                                        onChange={this.handlerLogradouro} 
                                                        placeholder="Digite o endereço"
                                                        ref={this.inputLogradouro} />
                                                    </div>
                                                </div>
                                                <div className="col-md-2">
                                                    <div className="card-body text-secondary">
                                                        <input 
                                                        type="text" 
                                                        className="form-control" 
                                                        onChange={this.handlerNumero} 
                                                        placeholder="Digite o número" />
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="card-body text-secondary">
                                                        <input 
                                                        type="text" 
                                                        className="form-control" 
                                                        onChange={this.handlerComplemento} 
                                                        placeholder="Digite o complemento" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <div className="card-body text-secondary">
                                                    <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    onChange={this.handlerBairro} 
                                                    placeholder="Digite o bairro"
                                                    ref={this.inputBairro} />
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="card-body text-secondary">
                                                    <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    onChange={this.handlerCidade} 
                                                    placeholder="Digite a cidade"
                                                    ref={this.inputCidade} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-3">
                                                <div className="card-body text-secondary">
                                                    <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    onChange={this.handlerLat} 
                                                    placeholder="Obtém a latitude" 
                                                    ref={this.inputLatitude}/>
                                                </div>
                                            </div>                                    
                                            <div className="col-md-3">
                                                <div className="card-body text-secondary">
                                                    <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    onChange={this.handlerLong} 
                                                    placeholder="Obtém a longitude"
                                                    ref={this.inputLongitude} />
                                                </div>
                                            </div>
                                            <div className="col-md-2">
                                                <div className="card-body text-secondary">
                                                    <button type="button" className="btn btn-info" style={{backgroundColor: 'rgb(226, 88, 34)'}} onClick={this.pegaLocalizacao}>
                                                        Localização
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <div className="card-body text-secondary">
                                                    <input 
                                                    type="email" 
                                                    className="form-control" 
                                                    onChange={this.handlerEmail} 
                                                    placeholder="Digite o e-mail"
                                                     />
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="card-body text-secondary">
                                                    <input 
                                                    maxLength="14"
                                                    name="telefone" 
                                                    className="form-control" 
                                                    value={this.state.telefone}
                                                    onChange={this.handlerTelefone} 
                                                    placeholder="Digite o telefone" />
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="card-body text-secondary">
                                                    <input 
                                                    maxLength="15" 
                                                    className="form-control" 
                                                    onChange={this.handlerCelular} 
                                                    value={this.state.celular}
                                                    placeholder="Digite o celular" />
                                                </div>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                        DADOS DO(A) ALUNO(A)
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="1">
                                    <Card.Body>
                                        <div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="card-body text-secondary"  style={{paddingTop: 20, paddingLeft: 0, margin: 0}}>
                                                        <input 
                                                        type="text" 
                                                        className="form-control" 
                                                        onChange={this.handlerNome} 
                                                        placeholder="Nome do(a) aluno(a)"                                             
                                                        validations={[required]} />
                                                    </div>
                                                </div>
                                                <div className="col-md-3" style={{padding: 0, margin: 0}}>
                                                    <label style={{padding: 0, margin: 0}}>Data de Nascimento</label>
                                                    <div className="card-body text-secondary" style={{padding: 0, margin: 0}}>
                                                        <input 
                                                        type="date" 
                                                        className="form-control" 
                                                        onChange={this.handlerDtNascimento} 
                                                        placeholder="Data de nascimento" 
                                                        onBlur={this.calculaSerie}
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
                                                                checked={this.state.sexo === 'Feminino'}
                                                                onChange={this.handlerSexo} />
                                                        </div>
                                                        <label className="form-check-label" onClick={() => this.setState({sexo: "Feminino"})} style={{marginRight: 3+'%'}}>Feminino</label>

                                                        <div className="form-check form-check-inline">
                                                            <input 
                                                                className="form-check-input"
                                                                type="radio"
                                                                name="sexo"
                                                                id="sexoMasculino"
                                                                value="Masculino"
                                                                checked={this.state.sexo === 'Masculino'}
                                                                onChange={this.handlerSexo} />
                                                        </div>
                                                        <label className="form-check-label" onClick={() => this.setState({sexo: "Masculino"})}>Masculino</label>
                                                    </div> 
                                                </div>
                                            </div>
                                            <div className="row">
                                                
                                                <div className="col-md-2">
                                                    <div className="card-body text-secondary" style={{padding: 0, margin: 0}}>
                                                        <input 
                                                        maxLength='14'
                                                        className="form-control" 
                                                        value={this.state.cpf}
                                                        name="cpf"
                                                        onChange={this.handlerCPF} 
                                                        placeholder="Digite o CPF" />
                                                    </div>
                                                </div>
                                                <div className="col-md-2">
                                                    <div className="card-body text-secondary" style={{padding: 0, margin: 0}}>
                                                        <input 
                                                        maxLength="11"
                                                        className="form-control" 
                                                        onChange={this.handlerRG} 
                                                        placeholder="Digite o RG" />
                                                    </div>
                                                </div>
                                                <div className="col-md-2">
                                                    <div className="card-body text-secondary" style={{padding: 0, margin: 0}}>
                                                        <input 
                                                        maxLength="11" 
                                                        className="form-control" 
                                                        onChange={this.handlerNIS} 
                                                        placeholder="Digite o NIS" />
                                                    </div>
                                                </div>
                                                <div className="col-md-2">
                                                    
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
                                                                    checked={this.state.bolsafamilia === 'Sim'}
                                                                    onChange={this.handlerBolsaFamilia}
                                                                     />
                                                            </div>
                                                            <label className="form-check-label" onClick={() => this.setState({bolsafamilia: "Sim"})}>Sim</label>

                                                            <div className="form-check form-check-inline" style={{marginLeft: 2+'%'}}>
                                                                <input 
                                                                    className="form-check-input"
                                                                    type="radio"
                                                                    name="naobolsa"
                                                                    id="naobolsa"
                                                                    value="Não"
                                                                    checked={this.state.bolsafamilia === 'Não'}
                                                                    onChange={this.handlerBolsaFamilia} />
                                                            </div>
                                                            <label className="form-check-label" onClick={() => this.setState({bolsafamilia: "Não"})}>Não</label>
                                                        </div>
                                                    
                                                </div>
                                                <div className="row" style={{display: 'flex', marginTop: 1+'%'}}>
                                                    {/*<div className="col-md-6">
                                                        {eja} 
                                                    </div>   */}      

                                                                             
                                                </div>  
                                                                                                                                      
                                            </div>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="form-group row">                                
                                                        <div className="form-check" style={{marginLeft:3+'%'}}>
                                                            <label className="form-check-label">
                                                                <input className="form-check-input" type="checkbox" onChange={this.handlerIrmao} style={{marginRight: 1+'%'}} /> Possui irmão na unidade escolar pretendida
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="form-group row">                                
                                                        <div className="form-check" style={{marginLeft:3+'%'}}>
                                                            <label className="form-check-label">
                                                                <input className="form-check-input" type="checkbox" onChange={this.handlerVulneravel} style={{marginRight: 1+'%'}} /> Aluno(a) no Creas/Conselho Tutelar
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-12">
                                                <div className="col-md-6">
                                                        <div className="form-group">                                    
                                                            <label style={{marginRight: 3+'%', marginTop: 1+'%'}}>Possui Deficiências</label>
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
                                                            <label className="form-check-label" onClick={() => this.setState({deficiente: "Sim"})}>Sim</label>

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
                                                    {deficiencias} 
                                                </div>
                                            </div>                                            
                                        </div>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="2">
                                        BUSCA DE VAGAS
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="2">
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
                        <div>
                            {mostrarOpcoes}
                        </div>
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
                        </div>
                        )}
                    </div>
                )}                          
            </div>
        )
    }
}