import axios from 'axios';

// url ของBack-end
const API = axios.create({
  // baseURL: `http://161.246.58.251:9300/`
  baseURL: `http://localhost:5000/`
});

// url ของFront-end
// const url_base = `http://161.246.58.251:9200/`
const url_base = `http://localhost:3000/`;

export {
  API,
  url_base
}