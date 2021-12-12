import delay from '../../utils/delay';

class HttpClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async get(endpoint) {
    const response = await fetch(`${this.baseUrl}${endpoint}`);
    await delay(1000);
    return response.json();
  }

  async post(endpoint, body) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, body);
    await delay(1000);
    return response.json();
  }
}

export default HttpClient;
