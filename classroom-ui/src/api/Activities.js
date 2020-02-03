import axios from "axios";
import ConfigurationAPI from "./ConfigurationApi";

class Activities extends ConfigurationAPI {
  getAll = (search = '') =>
    new Promise((resolve, reject) => {
      const url = `${this.url}/activity?search=${search}&sort=startHour:asc`;
      axios
        .get(url, this.headers)
        .then(response => resolve(response))
        .catch(loginErr => reject(loginErr.response));
    });
}

export default Activities;