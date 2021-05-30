import axios from 'axios';

const api = axios.create({
  baseURL: 'https://agendamento-edital023.netlify.app/api/',
});

export default api;