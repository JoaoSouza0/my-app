import delay from '../../utils/delay';
import APIError from '../../errors/APIError';

class HttpClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async get(endpoint, options) {
    return this.request(endpoint, {
      method: 'GET',
      headers: options?.headers,
    });
  }

  async post(endpoint, options) {
    return this.request(endpoint, {
      method: 'POST',
      body: options?.body,
      headers: options?.headers,
    });
  }

  async request(path, options) {
    const headers = new Headers();
    if (options.body) {
      headers.append('Content-Type', 'application/json');
    }

    if (options?.headers) {
      Object.entries(options.headers).forEach(([name, value]) => {
        headers.append(name, value);
      });
    }

    const resp = await fetch(`${this.baseUrl}${path}`, {
      method: options.method,
      body: JSON.stringify(options.body),
      headers,
    });
    await delay(1000);

    let response = null;
    const contentType = resp?.headers.get('Content-Type');

    if (contentType.includes('application/json')) {
      response = await resp.json();
    }

    if (resp.ok) {
      return response;
    }

    throw new APIError(response, response);
  }
}

export default HttpClient;
