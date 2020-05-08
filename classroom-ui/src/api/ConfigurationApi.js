import { getStorage } from '../functions/User';

class ConfigurationAPI {
  constructor() {
    const authUser = getStorage();
    const mainUrl = process.env.REACT_APP_ENV_PROD === 'true' ? process.env.REACT_APP_API_URL_PROD : process.env.REACT_APP_API_URL_DEV;
    this.token = (authUser !== undefined && authUser.auth) ? authUser.token : '';
    this.module = process.env.REACT_APP_API_MODULE;

    this.protocol = process.env.REACT_APP_ENV_PROD === 'true' ? process.env.REACT_APP_API_PROTOCOL_PROD : process.env.REACT_APP_API_PROTOCOL_DEV;;
    this.headers = {
      headers: {
        'x-access-token': this.token,
        'Content-Type': 'application/json',
      },
    };
    this.url = `${this.protocol}${mainUrl}${this.module}`;
  }
}

export default ConfigurationAPI;
