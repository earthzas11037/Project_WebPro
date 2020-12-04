import axios from 'axios';

// url ของBack-end
const API = axios.create({
  baseURL: `http://localhost:8000/`
});

// url ของFront-end
const url_base = `http://localhost:3000/`;

export {
  API,
  url_base
}