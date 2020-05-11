import { callApi, getFighterById } from '../helpers/apiHelper';

class FighterService {
  async getFighters() {
    try {
      const endpoint = 'fighters.json';
      const apiResult = await callApi(endpoint, 'GET');

      return apiResult;
    } catch (error) {
      throw error;
    }
  }

  async getFighterDetails(id) {
    // todo: implement this method
    // endpoint - `details/fighter/${id}.json`;    
    try {
      const endpoint = `../../../resources/api/details/fighter/${id}.json`;
      return fetch(endpoint)
        .then((response) => (response.ok ? response.json() : Promise.reject(Error('Failed to load'))))
        .then((result) => result)
        .catch((error) => { throw error; });
    } catch (error) {
      throw error;
    }
  }
}

export const fighterService = new FighterService();
