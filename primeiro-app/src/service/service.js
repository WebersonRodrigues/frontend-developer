import axios from "axios";

const service = axios.create({
    baseURL: 'http://localhost:3400'
});

export default service;