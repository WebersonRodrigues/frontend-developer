const URL = 'http://localhost:3400/clientes';
let modoEdicao = false;

let listaClientes = [];

let btnAdicionar = document.getElementById('btn-adicionar');
let tabelaCliente = document.querySelector('table>tbody');
let modalCliente = new bootstrap.Modal(document.getElementById("modal-cliente"), {});
let tituloModal = document.querySelector('h4.modal-title');

let btnSalvar = document.getElementById('btn-salvar');
let btnCancelar = document.getElementById('btn-cancelar');

let formModal = {
    id: document.getElementById('id'),
    nome: document.getElementById('nome'),
    email: document.getElementById('email'),
    telefone: document.getElementById('telefone'),
    cpf: document.getElementById('cpf'),
    dataCadastro: document.getElementById('dataCadastro')
}

btnAdicionar.addEventListener('click', () =>{
    modoEdicao = false;
    tituloModal.textContent = "Adicionar cliente"
    limparModalCliente();
    modalCliente.show();
});

btnSalvar.addEventListener('click', () => {
    // 1° Capturar os dados do modal
    let cliente = obterClienteDoModal();

    // 2° Se os campos obrigatorios foram preenchidos.
    if(!cliente.cpfOuCnpj || !cliente.email){
        alert("E-mail e CPF são obrigatórios.")
        return;
    }

    // if(modoEdicao){
    //     atualizarClienteBackEnd(cliente);
    // }else{
    //     adicionarClienteBackEnd(cliente);
    // }

    (modoEdicao) ? atualizarClienteBackEnd(cliente) : adicionarClienteBackEnd(cliente);

});

btnCancelar.addEventListener('click', () => {
    modalCliente.hide();
});

function obterClienteDoModal(){

    return new Cliente({
        id: formModal.id.value,
        email: formModal.email.value,
        nome: formModal.nome.value,
        cpfOuCnpj: formModal.cpf.value,
        telefone: formModal.telefone.value,
        dataCadastro: (formModal.dataCadastro.value) 
                ? new Date(formModal.dataCadastro.value).toISOString()
                : new Date().toISOString()
    });
}
 
function obterClientes() {

    fetch(URL, {
        method: 'GET',
        headers :{
            'Authorization': obterToken()
        }
    })
        .then(response => response.json())
        .then(clientes => {
            listaClientes = clientes;
            popularTabela(clientes);
        })
        .catch()
}

function editarCliente(id){
    modoEdicao = true;
    tituloModal.textContent = "Editar cliente"

    let cliente = listaClientes.find(cliente => cliente.id == id);
    
    atualizarModalCliente(cliente);

    modalCliente.show();
}

function atualizarModalCliente(cliente){

    formModal.id.value = cliente.id;
    formModal.nome.value = cliente.nome;
    formModal.cpf.value = cliente.cpfOuCnpj;
    formModal.email.value = cliente.email;
    formModal.telefone.value = cliente.telefone;
    formModal.dataCadastro.value = cliente.dataCadastro.substring(0,10);
}

function limparModalCliente(){

    formModal.id.value ="";
    formModal.nome.value = "";
    formModal.cpf.value = "";
    formModal.email.value = "";
    formModal.telefone.value = "";
    formModal.dataCadastro.value = "";
}

function excluirCliente(id){

    let cliente = listaClientes.find(c => c.id == id);

    if(confirm("Deseja realmente excluir o cliente " + cliente.nome)){
        excluirClienteBackEnd(cliente);
    }
    
}

function criarLinhaNaTabela(cliente) {
    // 1° Criar uma linha da tabela OK
    let tr = document.createElement('tr');

    // 2° Criar as TDs OK
    let tdId = document.createElement('td');
    let tdNome = document.createElement('td');
    let tdCPF = document.createElement('td');
    let tdEmail = document.createElement('td');
    let tdTelefone = document.createElement('td');
    let tdDataCadastro = document.createElement('td');
    let tdAcoes = document.createElement('td');


    // 3° Atualizar as Tds com os valores do cliente OK
    tdId.textContent = cliente.id;
    tdNome.textContent = cliente.nome;
    tdCPF.textContent = cliente.cpfOuCnpj;
    tdEmail.textContent = cliente.email;
    tdDataCadastro.textContent = new Date(cliente.dataCadastro).toLocaleDateString();
    tdTelefone.textContent = cliente.telefone;

    tdAcoes.innerHTML = `<button onclick="editarCliente(${cliente.id})" class="btn btn-outline-primary btn-sm mr-3">
                             Editar
                         </button>
                         <button onclick="excluirCliente(${cliente.id})" class="btn btn-outline-primary btn-sm mr-3">
                             Excluir
                         </button>`;



    // 4° Adicionar as TDs dentro da linha criei. OK
    tr.appendChild(tdId);
    tr.appendChild(tdNome);
    tr.appendChild(tdCPF);
    tr.appendChild(tdEmail);
    tr.appendChild(tdTelefone);
    tr.appendChild(tdDataCadastro);
    tr.appendChild(tdAcoes);

    // 5° Adicionar a linha na tabela.
    tabelaCliente.appendChild(tr);
}

function popularTabela(clientes) {

    // Limpar a tabela...
    tabelaCliente.textContent = "";

    clientes.forEach(cliente => {
        criarLinhaNaTabela(cliente);
    });
}

function adicionarClienteBackEnd(cliente){

    cliente.dataCadastro = new Date().toISOString();

    fetch(URL, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': obterToken()
        },
        body : JSON.stringify(cliente)
    })
    .then(response => response.json())
    .then(response => {

        let novoCliente = new Cliente(response);
        listaClientes.push(novoCliente);

        popularTabela(listaClientes)

        modalCliente.hide();
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Cliente cadastrado com sucesso!',
            showConfirmButton: false,
            timer: 2500
        });
    })
    .catch(error => {
        console.log(error)
    })
}


function atualizarClienteBackEnd(cliente){

    fetch(`${URL}/${cliente.id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': obterToken()
        },
        body : JSON.stringify(cliente)
    })
    .then(response => response.json())
    .then(() => {
        atualizarClienteNaLista(cliente, false);
        modalCliente.hide();

        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Cliente atualizado com sucesso!',
            showConfirmButton: false,
            timer: 2500
        });
    })
    .catch(error => {
        console.log(error)
    })
}

function excluirClienteBackEnd(cliente){

    fetch(`${URL}/${cliente.id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': obterToken()
        }
    })
    .then(response => response.json())
    .then(() => {
        atualizarClienteNaLista(cliente, true);
        modalCliente.hide();
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Cliente excluido com sucesso!',
            showConfirmButton: false,
            timer: 2500
        });
    })
    .catch(error => {
        console.log(error)
    })
}

function atualizarClienteNaLista(cliente, removerCliente){

    let indice = listaClientes.findIndex((c) => c.id == cliente.id);

    (removerCliente) 
        ? listaClientes.splice(indice, 1)
        : listaClientes.splice(indice, 1, cliente);

    popularTabela(listaClientes);
}

obterClientes();
