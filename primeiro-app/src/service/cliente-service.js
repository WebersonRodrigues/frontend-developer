import service from "./service";
import usuarioService from "./usuario-service";

function obter(){

    return new Promise((resolve, reject) => {
        service.get('/clientes', {
            headers: {
                'Authorization': usuarioService.obterToken()
            }
        })
        .then(response => resolve(response))
        .catch(erro => reject(erro))
    });
}

export default {
    obter
}