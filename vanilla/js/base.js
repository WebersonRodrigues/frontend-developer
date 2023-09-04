
function salvarToken(token){
    localStorage.setItem('token', token)
}

function salvarUsuario(usuario){
    localStorage.setItem('usuario', JSON.stringify(usuario));
}

function obterToken(){
    return localStorage.getItem("token");  //retorna o valor do item "token"
}

function obterUsuario(){
    return localStorage.getItem("usuario") || "{}";   //retorna o valor do item "usuario", se não existir, ret
}

function sairSistema(){
    localStorage.removeItem("token");//remove o item "token", limpando a sessão
    localStorage.removeItem("usuario");
    direcionarTelaDeLogin();
}

function direcionarTelaDeLogin(){
    window.open('login.html', '_self');
}

function usuarioEstaLogado(){
    let token = obterToken();

    return !!token;
}

function validarUsuarioAutenticado(){

    let logado = usuarioEstaLogado();

    // Só vai entrar aqui se eu estiver na tela login
    if(window.location.pathname == "/login.html"){
        
        if(logado){
            window.open("controle-cliente.html", '_self')
        }
    } else if(!logado && window.location.pathname == "/controle-cliente.html"){
        direcionarTelaDeLogin();
    }

}


validarUsuarioAutenticado();