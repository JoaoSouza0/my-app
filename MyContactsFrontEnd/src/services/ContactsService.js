import HttpClient from './utils/HttpClient';

class ContactsService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001');
  }

  async listContacts(order = 'asc') {
    return this.httpClient.get(`/contacts?orderBy=${order}`);
  }

  async creatContact(contact) {
    return this.httpClient.post('/contacts', contact);
  }
}

export default new ContactsService();
