import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator"
import EscolaDataService from "../services/escola.service"
import AuthService from "../services/auth.service"

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Este campo é obrigatório!
      </div>
    )
  }
}

const email = value => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        O e-mail não é válido.
      </div>
    )
  }
}

const vusername = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        O usuário deve possuir entre 3 e 20 caracteres.
      </div>
    )
  }
}

const vnome = value => {
  if (value.length < 6 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        O nome deve possuir entre 6 e 20 caracteres.
      </div>
    )
  }
}

const vpassword = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        A senha deve possuir no mínimo 6 caracteres.
      </div>
    )
  }
}

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this)
    this.onChangeUsername = this.onChangeUsername.bind(this)
    this.onChangeEmail = this.onChangeEmail.bind(this)
    this.onChangePassword = this.onChangePassword.bind(this)
    this.onChangeNome = this.onChangeNome.bind(this)
    this.onChangeEscola = this.onChangeEscola.bind(this)    
    this.onChangePerfil = this.onChangePerfil.bind(this)
    this.pegaEscolas = this.pegaEscolas.bind(this)

    this.state = {
      currentUser: AuthService.getCurrentUser(),
      showModeratorBoard: false,
      showAdminBoard: false,
      username: "",
      email: "",
      password: "",
      nome: "",
      perfil: "",
      escolas: [],
      selectedEscola: "",
      roles: [],
      successful: false,
      message: "",
      situacao: true
    };
  }

  componentDidMount() {
    this.pegaEscolas() 
    
    if (this.state.currentUser) {
      this.setState({
        showModeratorBoard: this.state.currentUser.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: this.state.currentUser.roles.includes("ROLE_ADMIN")
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
            info: info,
            page: page
        })                
    })
    .catch(e => {
        console.log(e)
    })
  }

  onChangeNome(e) {
    this.setState({
      nome: e.target.value
    })
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  onChangeEscola(e) {
    const selectedEscola = e.target.value
    this.setState({
      selectedEscola: selectedEscola 
    })
  }

  onChangePerfil(e) {
    this.setState({
      perfil: e.target.value
    })    
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.register(
        this.state.nome,
        this.state.username,
        this.state.email,
        this.state.password,
        this.state.selectedEscola,
        this.state.roles,
        this.state.situacao
      ).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true
          });
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage
          });
        }
      );
    }
  }

  render() {

    const {escolas, showModeratorBoard} = this.state
    

    let listaescola = null
    listaescola = escolas.map((escola, index) => (
      <option value={escola.descricao} key={index}>{escola.descricao}</option>
    ))

    let escola = null
    if (this.state.perfil !== "moderator" && this.state.perfil !== "") {
      escola = <div>
        <label htmlFor="escolhaescola"> Escola </label>
        <div style={{marginBottom: 10+'px'}}>                                
            <select 
                className="form-control" 
                id="categoria" 
                name="categoria"
                value={this.state.selectedEscola}                                    
                onChange={this.onChangeEscola}  >    
            
                <option value="" disabled>---Selecione---</option>  
                {listaescola}                              
                
            </select>
        </div>
      </div>
    }
   
    return (

      
      <div className="col-md-12" style={{marginTop: 6+'%'}}>
        {showModeratorBoard && (
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <Form onSubmit={this.handleRegister} ref={c => {this.form = c;}}>
            {!this.state.successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="username">Usuário</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    validations={[required, vusername]}
                    autoFocus
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="nome">Nome</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="nome"
                    value={this.state.nome}
                    onChange={this.onChangeNome}
                    validations={[required, vnome]}                    
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">E-mail</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    validations={[required, email]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Senha</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    validations={[required, vpassword]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="perfil"> Perfil </label>
                  <select
                    multiple={false}
                    className="form-control" 
                    placeholder="Selecione o perfil"
                    id="perfil" 
                    name="perfil"
                    value={this.state.perfil}                                    
                    onChange={this.onChangePerfil}                   
                    >                                                                            
                    <option value="" disabled>--- Selecione o perfil --- </option>
                    <option value="user"> Secretaria Escolar </option>  
                    <option value="admin"> Diretor Escolar </option> 
                    <option value="moderator"> SEMED </option>
                  </select>
                </div>

                {escola}


                <div className="form-group">
                  <button className="btn btn-primary btn-block">Cadastrar</button>
                </div>
              </div>
            )}

            {this.state.message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
        )}
      </div>
    )
  }
}