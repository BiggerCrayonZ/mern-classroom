import { getStorage } from '../functions/User';

class ConfigurationAPI {
  constructor() {
    const authUser = getStorage();
    console.log({ authUser })
    this.token = (authUser !== undefined && authUser.auth) ? authUser.token : '';
    this.domain = '192.168.1.77:4000/api';
    // this.domain = process.env.production ? ('crm.inverspot.mx/api') : ('crm.treebes2.com/api');

    this.protocol = 'http';
    this.headers = {
      headers: {
        'x-access-token': this.token,
        'Content-Type': 'application/json',
      },
    };
    this.url = `${this.protocol}://${this.domain}`;
  }
}

export default ConfigurationAPI;
