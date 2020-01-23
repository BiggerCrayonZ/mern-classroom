import axios from "axios";
import ConfigurationAPI from "./ConfigurationApi";

class Activities extends ConfigurationAPI {
  getAll = () =>
    new Promise((resolve, reject) => {
      const url = `${this.url}/activity`;
      axios
        .get(url, this.headers)
        .then(response => resolve(response))
        .catch(loginErr => reject(loginErr));
    });
}

export default Activities;