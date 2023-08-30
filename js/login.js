// Capturando os 3 campos da tela.
let email = document.getElementById('email');
let senha = document.getElementById('senha');
let btnEntrar = document.getElementById('btn-entrar');


// Aqui capturo o evento de click para tomar uma ação qualquer
btnEntrar.addEventListener('click', () => {

    // 1° Pegar o email digitado
    let userEmail = email.value;

    // 2° Pegar a senha digitada.
    let userSenha = senha.value;

    // 3° Validar se o email e senha estão corretos

    if(!userEmail || !userSenha){
        // 4° Caso esteja incorreto, mandar mensagem de usuario ou senha invalida.
        Swal.fire({
            icon: 'error',
            text: 'Os campos de e-mail e senha são obrigatórios!'
        });

        // alert("Os campos de e-mail e senha são obrigatórios!");
        return;
    }

    // Aqui precisamos enviar esse email e senha ao backend para saber se o usuario pode acessar o sistema.
    autenticar(userEmail, userSenha);
});


function autenticar(email, senha){
   const urlBase = `http://localhost:3400`;

   fetch(`${urlBase}/login`, {
    method:'POST',
    headers:{
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, senha})
   })
   .then(response => response = response.json())
   .then(response => {

       if(!!response.mensagem){
        alert(response.mensagem);
        return;

       }else{

        
        salvarToken(response.token);
        salvarUsuario(response.usuario);
        
        // Aqui vou esconder a tela de login e carregar o loading..
        mostrarLoading();

        setTimeout(() =>{
            window.open('controle-cliente.html', '_self');
        }, 5000)
        
       }
    });
}


function mostrarLoading(){
    const divLoading = document.querySelector('#loading');
    divLoading.style.display='block';

    const divBoxlogin = document.querySelector('div.caixa-login')
    divBoxlogin.style.display = 'none';
}