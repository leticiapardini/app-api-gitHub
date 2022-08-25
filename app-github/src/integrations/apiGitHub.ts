import axios from 'axios';

const edpointApi = axios.create({
  baseURL: "https://api.github.com/users"
});

export { edpointApi };