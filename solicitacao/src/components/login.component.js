import React, { Component } from 'react'
import AlunoDataService from "../services/aluno.service"
import { Link } from 'react-router-dom'
import * as moment from 'moment'
import aluno from "../images/aluno.png"
import acompanhar from "../images/acompanhar.png"
import buscar from "../images/buscar.png"
import quadro from "../images/quadro.jpeg"

export default class Login extends Component {
    constructor(props) {
        super(props)

        this.pegaAlunos = this.pegaAlunos.bind(this)
        this.showMatricula = this.showMatricula.bind(this)
        this.showAcompanhar = this.showAcompanhar.bind(this)
        this.handlerMatricula = this.handlerMatricula.bind(this)
        this.handlerProtocolo = this.handlerProtocolo.bind(this)
        this.handlerDtNascimento = this.handlerDtNascimento.bind(this)
        this.verificaMatricula = this.verificaMatricula.bind(this)
        this.acompanha = this.acompanha.bind(this)
        
        this.state = {
            alunos: [],
            matriculas: [],
            mostraMatricula: false,
            mostraAcompanhar: false,
            matricula: null,
            protocolo: "",
            dtnascimento: "",
            className: 'show',
            acompanha: null           
        }
    }

    componentDidMount(){
        this.pegaAlunos()
    }

    pegaAlunos(page = 1) {
        AlunoDataService.buscarTodos(page)
        .then(response => {
            //REST do response da API em duas constantes: 
            // "docs" com os dados do chamado e "info" com os dados das páginas
            const { docs, ...info } = response.data 
            this.setState({
                alunos: docs.map((aluno) => { return {id: aluno.id, cpf: aluno.cpf_responsavel, protocolo: aluno.protocolo}}),
                matriculas: docs.map((aluno) => { return aluno.matricula}),                        
                info: info,
                page: page
            })                
        })
        .catch(e => {
            console.log(e)
        })
    }

    handlerMatricula(e) {
        this.setState({
            matricula: parseInt(e.target.value)
        })
    }

    handlerProtocolo(e){
        this.setState({
            protocolo: e.target.value = parseInt(("" + e.target.value).replace(/\D/g, ''))
        })
    }

    handlerDtNascimento(e){
        this.setState({
            dtnascimento: e.target.value
        })
    }

    showMatricula(){
        this.setState({
            mostraMatricula: true,
            mostraAcompanhar: false,
            className: 'hidden'
        })
    }

    showAcompanhar() {
        this.setState({
            mostraMatricula: false,
            mostraAcompanhar: true,
            className: 'hidden'
        })
    }

    verificaMatricula() {

        if (this.state.matricula === "" || this.state.matricula === null ) {
            alert ("Digite a matrícula do(a) aluno(a)")
            return false
        }

        if (this.state.matriculas.length > 0) {
            if (this.state.matriculas.indexOf(this.state.matricula) > -1) {
                this.props.history.push("/solicita-vaga")
                window.location.reload()                    
            } else {
                alert("Matrícula não encontrada")
            }         
        } else {
            alert("Não existem matrículas")
        }
    }

    acompanha() {
        if (this.state.protocolo === "" || this.state.protocolo === null ) {
            alert ("Digite o protocolo")
            return false
        }

      /*  if (this.state.dtnascimento === "" || this.state.dtnascimento === null ) {
            alert ("Digite a data de nascimento do(a) candidato(a)")
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

        /* if (this.state.alunos.length > 0) {
            if (this.state.alunos.indexOf({dtnascimento: this.state.dtnascimento, cpf: this.state.cpf}) > -1) {
                this.props.history.push(`/painel-solicitacao/${this.state.alunos.id}`)
                window.location.reload()                    
            } else {
                return alert("Solicitação não encontrada")
            }         
        } else {
            alert("Não existem alunos")
        } */

        if (this.state.alunos.length > 0) {
            this.state.alunos.map((aluno) => {
                if (this.state.protocolo && this.state.protocolo === aluno.protocolo) {
                    this.props.history.push(`/painel-solicitacao/${aluno.id}`)
                    window.location.reload()                
                }                                                       
            })        
        } else {
            alert("Não existem alunos")
        }

        if (this.state.alunos.length > 0) {
            if (this.state.alunos.indexOf({protocolo: this.state.protocolo}) > -1) {
                return false                    
            } else {
                return alert("Protocolo não encontrado!")
            } 
        }
    }

    render() {

        const {className} = this.state

        let matricula = null
        if (this.state.mostraMatricula === true) {
            matricula = <div className="matricula">
                <input type="text" placeholder="Digite a matrícula" autoFocus onChange={this.handlerMatricula}/>
                <button type="button" onClick={this.verificaMatricula} > Verificar </button>
            </div>
        }

        let acompanha = null
        if (this.state.mostraAcompanhar === true) {
            acompanha = <div className="acompanha">
              <input placeholder="Digite o protocolo" autoFocus minLength="16" maxLength="16" onChange={this.handlerProtocolo}/>             

                <button type="button" onClick={this.acompanha} > Verificar </button>  
            </div>
        }


        return (
            <div>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <h1>
                        Candita-se à vaga
                    </h1>
                </div>
                
                <div style={{display:'flex', justifyContent: 'center'}}>
                    <img src={quadro} alt="quadro" style={{display: 'flex', position: 'absolute', zIndex: -1, width: 100+'vw'}} />
                </div>

                <div className="itens">   
                    {matricula} {acompanha}

                    <Link to={"/solicita-vaga"}  > 
                        <img src={buscar} className={className} alt="acompanhar" />
                    </Link>
                   {/* <img src={aluno} alt="aluno" className={className} onClick={this.showMatricula}/> */}
                    
                    
                    <img src={acompanhar} className={className} onClick={this.showAcompanhar} alt="acompanhar" />
                    

                    
                </div>
            </div>
        )
    }
}