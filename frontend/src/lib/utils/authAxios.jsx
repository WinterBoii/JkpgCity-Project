import axios from 'axios';

const authAxios = axios.create({
	baseURL: 'http://localhost:3001',
});

export default authAxios;
