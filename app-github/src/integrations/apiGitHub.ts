import axios from 'axios';

const endpointApi = axios.create({
  baseURL: "https://api.github.com/users"
});


export { endpointApi };