// Classe que representa o nosso cliente

class Cliente {
    constructor(obj) {
        obj = obj  || {};

        this.id = obj.id;
        this.nome = obj.nome;
        this.cpfOuCnpj = obj.cpfOuCnpj;
        this.email  = obj.email;
        this.telefone = obj.telefone;
        this.dataCadastro = obj.dataCadastro;
    }
}