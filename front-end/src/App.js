import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import logo from './images/logo.png'


import Dashboard from "./components/dashboard.component.js"

//import Usuario from "./components/list-usuario.component.js"
//import AdicionarUsuario from "./components/add-usuario.component.js"
//import EditarUsuario from "./components/edit-usuario.component.js"
import VisualizarUsuario from "./components/view-usuario.component"

import Escola from "./components/list-escola.component.js"
import AdicionarEscola from "./components/add-escola.component.js"
import EditarEscola from "./components/edit-escola.component.js"
import VisualizarEscola from "./components/view-escola.component"

import Aluno from "./components/list-aluno.component.js"
import AdicionarAluno from "./components/add-aluno.component.js"
import EditarAluno from "./components/edit-aluno.component.js"
import VisualizarAluno from "./components/view-aluno.component"
import GestaoAluno from "./components/gestao-aluno.component"

import Turma from "./components/list-turma.component.js"
import AdicionarTurma from "./components/add-turma.component.js"
import EditarTurma from "./components/edit-turma.component.js"
import VisualizarTurma from "./components/view-turma.component"

import Solicitacoes from "./components/solicitacoes.component"

import Curso from "./components/list-curso.component.js"
import AdicionarCurso from "./components/add-curso.component.js"
import EditarCurso from "./components/edit-curso.component.js"
import VisualizarCurso from "./components/view-curso.component"

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
//import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN")
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {

    const { currentUser, showModeratorBoard, showAdminBoard } = this.state
  
    return (
      <Router>
          <div>            
            <nav className="navbar fixed-top navbar-expand" style={{backgroundColor: '#E25822', padding: 0, margin: 0}}>
              <a href="/" className="navbar-brand"><img src={logo} alt="logo" style={{height: 50+'px'}}/></a>
              <div className="navbar-nav mr-auto">
                


                {showModeratorBoard && (
                  <div style={{display: 'flex', justifyContent: 'space-between'}}>
                   {/* <li className="nav-item">
                      <Link to={"/mod"} className="nav-link">
                        Painel
                      </Link>
                    </li>*/}
                    <li className="nav-item">
                    <Link to={"/register"} className="nav-link">
                      Usuários
                    </Link>
                    </li>
                    <li className="nav-item">
                    <Link to={"/escolas"} className="nav-link">
                      Escolas
                    </Link>
                    </li>
                    <li className="nav-item">
                      <Link to={"/alunos"} className="nav-link">
                        Alunos
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to={"/turmas"} className="nav-link">
                        Turmas
                      </Link>
                    </li>
                    {/*<li className="nav-item">
                      <Link to={"/cursos"} className="nav-link">
                        Cursos
                      </Link>
                    </li> */}
                    <li className="nav-item">
                      <Link to={"/solicitacoes"} className="nav-link">
                        Solicitações de candidatos
                      </Link>
                    </li>
                    {/*<li className="nav-item">
                      <Link to={"/user"} className="nav-link">
                        Candidatos aprovados
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to={"/relatorios"} className="nav-link">
                        Relatórios
                      </Link>
                    </li>  */}
                  </div>
              )}

              {showAdminBoard && (
                <div style={{display: 'flex', justifyContent: 'space-between'}}>                 
                  <li className="nav-item">
                  <Link to={"/escolas"} className="nav-link">
                    Escolas
                  </Link>
                  </li>
                  <li className="nav-item">
                  <Link to={"/turmas"} className="nav-link">
                    Turmas
                  </Link>
                </li>
                {/*<li className="nav-item">
                  <Link to={"/cursos"} className="nav-link">
                    Cursos
                  </Link>
              </li> */}
                
              </div>
              )}

              {currentUser && (
                <div>
                  <li className="nav-item">
                    <Link to={"/solicitacoes"} className="nav-link">
                      Solicitações de candidatos
                    </Link>
                </li>
                </div>
              )}
            </div>

            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    {currentUser.nome}
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={this.logOut}>
                    Sair
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                </li>

                
              </div>
            )}              
              
            </nav>

            <Switch>
              <Route exact path={"/"} component={Login} />              
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profile" component={Profile} />
              <Route path="/user" component={BoardUser} />
              <Route path="/mod" component={BoardModerator} />
              <Route path="/admin" component={BoardAdmin} />
              <Route exact path={"/dashboard"} component={Dashboard} />   
              {/*<Route exact path="/usuarios" component={Usuario} /> 
              <Route exact path="/usuarios/adicionar" component={AdicionarUsuario} />
              <Route exact path="/usuarios/editar/:id" component={EditarUsuario} /> */}          
              <Route exact path="/usuarios/visualizar/:id" component={VisualizarUsuario} /> 
              <Route exact path="/escolas" component={Escola} />
              <Route exact path="/escolas/adicionar" component={AdicionarEscola} />
              <Route exact path="/escolas/editar/:id" component={EditarEscola} />  
              <Route exact path="/escolas/visualizar/:id" component={VisualizarEscola} /> 
              <Route exact path="/alunos" component={Aluno} />
              <Route exact path="/alunos/adicionar" component={AdicionarAluno} />
              <Route exact path="/alunos/editar/:id" component={EditarAluno} />
              <Route exact path="/alunos/gestao/:id" component={GestaoAluno} />
              <Route exact path="/alunos/visualizar/:id" component={VisualizarAluno} />
              <Route exact path="/turmas" component={Turma} />
              <Route exact path="/turmas/adicionar" component={AdicionarTurma} />
              <Route exact path="/turmas/editar/:id" component={EditarTurma} />             
              <Route exact path="/turmas/visualizar/:id" component={VisualizarTurma} /> 
              <Route exact path="/solicitacoes" component={Solicitacoes} />
              {/* <Route exact path="/cursos" component={Curso} />
              <Route exact path="/cursos/adicionar" component={AdicionarCurso} />
              <Route exact path="/cursos/editar/:id" component={EditarCurso} />             
              <Route exact path="/cursos/visualizar/:id" component={VisualizarCurso} />  */}            
            </Switch>
          </div>
      </Router>
    )
  }
}

export default App;