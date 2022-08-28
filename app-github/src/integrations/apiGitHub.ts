import axios from 'axios';

const endpointApi = axios.create({
  baseURL: "https://api.github.com/"
});

export { endpointApi };