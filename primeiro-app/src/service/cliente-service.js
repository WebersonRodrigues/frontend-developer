import service from "./service";
import usuarioService from "./usuario-service";

function obter(){

    return new Promise((resolve, reject) => {
        service.get('/clientes')
        .then(response => resolve(response))
        .catch(erro => reject(erro))
    });
}

function adicionar(cliente){
    
    cliente.dataCadastro = new Date().toISOString();

    return new Promise((resolve, reject) => {
        service.post('/clientes', cliente)
        .then(response => resolve(response))
        .catch(erro => reject(erro))
    });
}


export default {
    obter,
    adicionar
}