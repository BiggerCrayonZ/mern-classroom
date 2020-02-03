import axios from "axios";
import ConfigurationAPI from "./ConfigurationApi";

class Activities extends ConfigurationAPI {
  getAll = (search = "") =>
    new Promise((resolve, reject) => {
      const url = `${this.url}/activity?search=${search}&sort=startHour:asc`;
      axios
        .get(url, this.headers)
        .then(response => resolve(response))
        .catch(loginErr => reject(loginErr.response));
    });
  clean = () =>
    new Promise((resolve, reject) => {
      const url = `${this.url}/activity/empty`;
      axios
        .delete(url, this.headers)
        .then(response => resolve(response))
        .catch(loginErr => reject(loginErr.response));
    });
  upload = (file) =>
    new Promise((resolve, reject) => {
      const url = `${this.url}/activity/file`;
      const formData = new FormData();
      formData.append('file', file);
      console.log({ file })
      axios
        .post(url, formData, this.headers)
        .then(response => resolve(response))
        .catch(loginErr => reject(loginErr.response));
    });
}

export default Activities;
