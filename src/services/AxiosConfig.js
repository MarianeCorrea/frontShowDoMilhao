import axios from 'axios';

// Cria uma instância do axios com a URL base da API
const instance = axios.create({
  baseURL: 'http://localhost:8080/', // Substitua pelo URL do seu backend
});

export default instance;