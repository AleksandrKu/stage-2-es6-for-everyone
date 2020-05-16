import { fightersDetails, fighters } from './mockData';
import { api } from '../../constants/config';
//const API_URL = 'https://api.github.com/repos/binary-studio-academy/stage-2-es6-for-everyone/contents/resources/api/';
const API_URL = api.url;
const useMockAPI = true;

async function callApi(endpoint, method) {
 const url = API_URL + endpoint;
  const options = {
    method,
  };
        let fightersFromApi;
        try {
          const response = await fetch(url, options);
          if(response.ok) {   
            fightersFromApi = await response.json();
            if(fightersFromApi && Array.isArray(fightersFromApi) && fightersFromApi.length > 0) {
              return fightersFromApi;
            }            
          }          
        } catch(error) {
          fightersFromApi = null;
        }
        return fakeCallApi('fighters.json')
}

async function fakeCallApi(endpoint) {
  const response = endpoint === 'fighters.json' ? fighters : getFighterById(endpoint);

  return new Promise((resolve, reject) => {
    setTimeout(() => (response ? resolve(response) : reject(Error('Failed to load'))), 500);
  });
}

function getFighterById(endpoint) {
  const start = endpoint.lastIndexOf('/');
  const end = endpoint.lastIndexOf('.json');
  const id = endpoint.substring(start + 1, end);

  return fightersDetails.find((it) => it._id === id);
}

export { callApi };
