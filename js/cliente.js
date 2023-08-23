const URL = 'http://localhost:3400/clientes';
let modoEdicao = false;

let btnAdicionar = document.getElementById('btn-adicionar');
let tabelaCliente = document.querySelector('table>tbody');
let modalCliente = new bootstrap.Modal(document.getElementById("modal-cliente"), {});
let tituloModal = document.querySelector('h4.modal-title');

btnAdicionar.addEventListener('click', () =>{
    modoEdicao = false;
    tituloModal.textContent = "Adicionar cliente"
    modalCliente.show();
});

function obterClientes() {

    fetch(URL, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(clientes => {
            popularTabela(clientes);
        })
        .catch()
}

function editarCliente(id){
    modoEdicao = true;
    tituloModal.textContent = "Editar cliente"
    modalCliente.show();
    
    // alert('Aqui vou editar o cliente ' + id);
}

function excluirCliente(id){
    alert('Aqui vou excluir o cliente ' + id);
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
    tdDataCadastro.textContent = cliente.dataCadastro;
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

    clientes.forEach(cliente => {
        criarLinhaNaTabela(cliente);
    });
}

obterClientes();
