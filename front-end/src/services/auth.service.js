import axios from "axios";

const API_URL = "http://10.1.1.26.net:8085/api/auth/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "signin", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(nome, username, email, password, escola, roles) {
    return axios.post(API_URL + "signup", {
      nome,
      username,
      email,
      password,     
      escola,
      roles
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }

  changePassword(username, password) {
    return axios
      .put(API_URL + "change", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }
}

export default new AuthService();
