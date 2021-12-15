import delay from '../../utils/delay';
import APIError from '../../errors/APIError';

class HttpClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async get(endpoint) {
    await delay(1000);
    const response = await fetch(`${this.baseUrl}${endpoint}`);
    const contentType = response.headers.get('Content-Type');

    let body = null;
    if (contentType.includes('application/json')) {
      body = await response.json();
    }

    if (response.ok) {
      return body;
    }

    throw new APIError(response, body);
  }

  async post(endpoint, body) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, body);
    await delay(1000);
    return response.json();
  }
}

export default HttpClient;
