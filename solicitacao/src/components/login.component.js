import React, { Component } from 'react'
import AlunoDataService from "../services/aluno.service"
import { Link } from 'react-router-dom'
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";
import "bootstrap/dist/css/bootstrap.min.css"

import aluno from "../images/aluno.png"
import acompanhar from "../images/acompanhar.png"
import buscar from "../images/buscar.png"
import quadro from "../images/quadro.jpeg"

import capa from "../images/capa.jpg"
import calendario from "../images/calendario.jpg"
import documentacao from "../images/documentacao.jpg"
import inscricao from "../images/inscricao.jpg"
import matricular from "../images/matricula.jpg"
import duvidas from "../images/duvidas.jpg"
import fases from "../images/fases.jpg"
import cabecalho from "../images/cabecalho.gif"
import criancas from  "../images/criancas.jpeg"
import doc1 from  "../images/doc1.jpeg"
import doc2 from  "../images/doc2.jpeg"

import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { store } from 'react-notifications-component';
import 'animate.css/animate.min.css';
import './animate.compat.css';

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
        this.hide = this.hide.bind(this)
        
        this.state = {
            alunos: [],
            matriculas: [],
            mostraMatricula: false,
            mostraAcompanhar: false,
            matricula: null,
            protocolo: "",
            dtnascimento: "",
            className: 'show',
            acompanha: null  ,
            hidden: false         
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
        if (this.state.protocolo === "" || this.state.protocolo === null || (this.state.protocolo.toString()).length < 16  ) {
            store.addNotification({
                title: "Alerta!",
                message: "Digite o número de protocolo corretamente!",
                type: "warning",
                insert: "top",
                container: "top-center",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 5000,
                  onScreen: true
                }
              });
            
              return false
        }

        if (this.state.alunos.length > 0) {
            
            this.state.alunos.map((aluno) => {
                if (this.state.protocolo && this.state.protocolo === aluno.protocolo) {
                    this.props.history.push(`/painel-solicitacao/${aluno.id}`)
                    window.location.reload()  
                    return false              
                }              
                
            })
            

            if (this.state.alunos.indexOf({protocolo: this.state.protocolo}) === -1) {
                store.addNotification({
                    title: "Alerta!",
                    message: "Protocolo não encontrado!",
                    type: "warning",
                    insert: "top",
                    container: "top-center",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                      duration: 5000,
                      onScreen: true
                    }
                  });    
                
                  return false
            }
        } else {
            store.addNotification({
                title: "Alerta!",
                message: "Não existem alunos!",
                type: "warning",
                insert: "top",
                container: "top-center",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 5000,
                  onScreen: true
                }
              });
            
              return false
        }

         
    }

    hide() {
        this.setState({
            hidden: true,
            mostraAcompanhar: false
        })
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

                {/*<button type="button" onClick={this.acompanha} > Verificar </button>  */}
            </div>
        }

        let segundo = null
        if (this.state.hidden === true) {
            segundo = <div>
                      
            <div style={{display:'grid', justifyContent: 'center'}}>
                <img src={cabecalho} alt="cabeçalho" />
            </div>
            <div>
                <img src={quadro} alt="quadro" style={{display: 'flex', position: 'absolute', zIndex: -1, width: 100+'vw'}} />
            </div>

            <div className="itens">   
                {matricula} {acompanha}

                <Link to={"/solicita-vaga"}  > 
                    <img src={buscar} className={className} alt="acompanhar" />
                </Link>
                        
                
                <img src={acompanhar} className={className} onClick={this.showAcompanhar} alt="acompanhar" />
                
            </div>

            <div style={{display:'grid', justifyContent: 'center', marginTop: 18+'%', justifyItems: 'center'}}>
                <img src={criancas} alt="calendário" />
                <img src={doc1} alt="Documentação1" />
                <img src={doc2} alt="Documentação2" />
            </div>
        </div>
        }


        return (
            <div>
                <div hidden={this.state.hidden} style={{display: 'flex', justifyContent: 'center'}}>
                    <img src={capa} alt="matrícula"  style={{height: 100+'vh'}} />
                </div>

                <div style={{display: 'flex', justifyContent: 'center', marginTop: 5+'%'}}>
                    <Link to="/solicita-vaga" style={{marginRight: 5+'%'}}> <img src={matricular} alt="matrícula" /> </Link>
                    <button type="button" onClick={this.showAcompanhar}> <img src={inscricao} alt="inscrição" style={{marginRight: 2.5+'%'}} /> </button>
                    <img src={duvidas} alt="dúvidas" style={{marginLeft: 2.5+'%'}} />
                </div>

                <div style={{display: 'flex', justifyContent: 'center', marginTop: 2+'%'}}>
                    <a href="#documents"  style={{marginRight: 4+'%'}}> <img src={documentacao} alt="documentação"  /> </a>
                    <a href="#fases"> <img src={fases} alt="fases" style={{marginRight: 2.5+'%'}} /> </a>
                    <img src={calendario} alt="calendário" style={{marginLeft: 2.5+'%'}}  />
                </div>  

                <section id="documents">
                   <img src={doc1} alt="doc1" />
                   <img src={doc2} alt="doc1" />
                </section>  

                <section id="fases" alt="fasescalendário" style={{display: 'flex', justifyContent: 'center'}}>
                    <img src={criancas} alt="fases" />
                </section>    

                
                <Modal show={this.state.mostraAcompanhar}>
                    <ModalHeader>
                        <ModalTitle>Busca de protocolo</ModalTitle>
                        <div onClick={this.hide}> X </div>
                    </ModalHeader>
                    <ModalBody>{acompanha}</ModalBody>
                    <ModalFooter><button className="btn btn-info" onClick={this.acompanha}>Buscar</button></ModalFooter>
                </Modal>     
            </div>


        )
    }
}