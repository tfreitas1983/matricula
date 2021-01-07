import React, { Component } from "react";
import AuthService from "../services/auth.service";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: AuthService.getCurrentUser(),      
      showAdminBoard: false,
      showModeratorBoard: false, 
      showUserBoard: false    ,
      perfil: ""
    }
  }

  componentDidMount() {
    
    
    if (this.state.currentUser) {
        this.setState({
        showModeratorBoard: this.state.currentUser.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: this.state.currentUser.roles.includes("ROLE_ADMIN"),
        showUserBoard: this.state.currentUser.roles.includes("ROLE_USER")
        })
    }

    if (this.state.showUserBoard && ! this.state.showModeratorBoard && !this.state.showAdminBoard) {
      this.setState({
        perfil: "Secretaria Escolar"
      })
    }

    if (this.state.showModeratorBoard && !this.state.showAdminBoard) {
      this.setState({
        perfil: "SEMED"
      })
    }

    if (!this.state.showModeratorBoard && this.state.showAdminBoard) {
      this.setState({
        perfil: "Diretor Escolar"
      })
    }


}

  render() {
    const { currentUser, showAdminBoard, showModeratorBoard,showUserBoard } = this.state;
    
    return (
      <div className="container" style={{marginTop: 6+'%'}}>
        {(showAdminBoard || showModeratorBoard || showUserBoard ) && (
          <div>
          <header className="jumbotron">
            <h3>
              <strong>{currentUser.username}</strong> Profile
            </h3>
          </header>
          <p>
            <strong>Token:</strong>{" "}
            {currentUser.accessToken.substring(0, 20)} ...{" "}
            {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
          </p>
          <p>
            <strong>Id:</strong>{" "}
            {currentUser.id}
          </p>
          <p>
            <strong>Email:</strong>{" "}
            {currentUser.email}
          </p>
          <strong>Authorities:</strong>
          <ul>
            {currentUser.roles &&
              currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
          </ul>
        </div>)}
      </div>
    );
  }
}