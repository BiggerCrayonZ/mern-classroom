import { getStorage } from '../functions/User';

class ConfigurationAPI {
  constructor() {
    const authUser = getStorage();
    this.token = (authUser !== undefined && authUser.auth) ? authUser.token : '';
    this.module = '/api';
    // this.module = process.env.production ? ('crm.inverspot.mx/api') : ('crm.treebes2.com/api');

    // this.protocol = 'http';
    this.headers = {
      headers: {
        'x-access-token': this.token,
        'Content-Type': 'application/json',
      },
    };
    this.url = `${this.module}`;
  }
}

export default ConfigurationAPI;
