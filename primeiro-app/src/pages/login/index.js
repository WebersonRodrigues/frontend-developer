import { useState } from 'react';
import Swal from 'sweetalert2'
import './index.css';

import usuarioService from '../../service/usuario-service';

function Login (){
    const [email, setEmail] = useState('admin@admin.com');
    const [senha, setSenha] = useState('123456');

    const logar = () => {
  
        if(!email || !senha){
            Swal.fire({
                icon: 'error',
                text: 'Os campos de e-mail e senha são obrigatórios!'
            });
            return;
        }     
        // Me comunicar com a api e fazer a autenticação...

        usuarioService.autenticar(email, senha)
        .then(response => {
            usuarioService.salvarToken(response.data.token);
            usuarioService.salvarUsuario(response.data.usuario);
            
            window.location='/';
        })
        .catch(erro =>{
            console.log(erro)
        })
    };

    return (
        <div className="caixa-login">

            {/* Titulo da tela de login  */}
            <div className="titulo-login">
                <h1>Login</h1>
            </div>

            {/* Grupo do e-mail  */}
            <div className="grupo">
                <label for="email">E-mail</label> <br/>
                
                <input id="email" value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="exemplo@exemplo.com" />
            </div>

            {/* Grupo do senha  */}
            <div className="grupo">
                <label for="senha">Senha</label> <br/>
                <input id="senha" value={senha} onChange={(e) => setSenha(e.target.value)} type="password"/>
            </div>

            {/* Link para recuperar a senha  */}
            <div className="esqueci-minha-senha">
                <a href="#">Esqueci minha senha</a>
            </div>

            <button id="btn-entrar" onClick={logar}> Entrar</button>
        </div>
    )
}

export default Login;