import axios from "axios";
import ConfigurationAPI from "./ConfigurationApi";

class User extends ConfigurationAPI {
  logIn = ({ email, password }) =>
    new Promise((resolve, reject) => {
      const body = {
        email,
        password
      };
      const url = '/auth/signin';
      axios
        .post(url, body, this.headers)
        .then(response => resolve(response))
        .catch(loginErr => reject(loginErr));
    });
}

export default User;
