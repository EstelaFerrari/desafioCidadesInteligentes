const bcrypt = require('bcrypt');

// Classe para um usuário
class Usuario {
    constructor(nome, email, senha, permissoes = []) {
        this.nome = nome;
        this.email = email;
        this.senha = this.hashSenha(senha);
        this.permissoes = permissoes;
        this.dataCriacao = new Date();
        this.ultimaDataLogin = null;
        this.statusAtivacao = true; // Ativo por padrão
    }

    hashSenha(senha) {
        const saltRounds = 10;
        return bcrypt.hashSync(senha, saltRounds);
    }

    verificarSenha(senha) {
        if (senha.length < 8) {
            return false;
        }
        // Verifica se a senha possui pelo menos um número
        if (!/\d/.test(senha)) {
            return false;
        }
        // Verifica se a senha possui pelo menos uma letra maiúscula
        if (!/[A-Z]/.test(senha)) {
            return false;
        }
        // Verifica se a senha possui pelo menos uma letra minúscula
        if (!/[a-z]/.test(senha)) {
            return false;
        }

        return bcrypt.compareSync(senha, this.senha);
    }

    ativarDesativarUsuario() {
        this.statusAtivacao = !this.statusAtivacao;
    }

    validarEmail() {
        let re = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        return re.test(this.email);
    }
}




class SistemaGerenciamentoUsuarios {
    constructor() {
        this.usuarios = [];
    }
    // criar um novo usuátio
    criarNovoUsuario(nome, email, senha, permissoes) {
        try {
            if (!nome || !email || !senha || permissoes === undefined) {
                throw new Error('Preencha todos os campos.');
            }

            const novoUsuario = new Usuario(nome, email, senha, permissoes);

            if (!novoUsuario.validarEmail() || !novoUsuario.verificarSenha(senha)) {
                throw new Error('E-mail ou senha inválido.');
            }

            const usuarioExistente = this.encontrarUsuarioPorEmail(email);
            if (usuarioExistente) {
                throw new Error('E-mail já cadastrado.');
            }

            this.usuarios.push(novoUsuario);
            console.log('Novo usuário criado com sucesso!');
            return novoUsuario;
        } catch (error) {
            console.error(error.message);
            return null;
        }
    }


    // encontrar um usuário utilizando o email
    encontrarUsuarioPorEmail(email) {
        return this.usuarios.find((user) => user.email === email);
    }

    listarUsuarios() {
        return this.usuarios;
    }
    //alterar os dados de um usuário
    alterarDadosUsuario(email, novoNome, novaSenha, novasPermissoes) {
        try {
            const usuario = this.encontrarUsuarioPorEmail(email);

            if (!usuario) {
                throw new Error('Usuário não encontrado.');
            }

            if (!novoNome || !novaSenha || novasPermissoes === undefined) {
                throw new Error('Preencha todos os campos.');
            }

            usuario.nome = novoNome;
            usuario.senha = usuario.hashSenha(novaSenha);
            usuario.permissoes = novasPermissoes;

            console.log('Dados do usuário alterados com sucesso!');
        } catch (error) {
            console.error(error.message);
        }
    }


    // ativar ou desativar um usuário
    ativarDesativarUsuario(email) {
        try {
            const usuario = this.encontrarUsuarioPorEmail(email);

            if (!usuario) {
                throw new Error('Usuário não encontrado.');
            }

            usuario.ativarDesativarUsuario();
            console.log('Status de ativação do usuário alterado com sucesso!');
        } catch (error) {
            console.error(error.message);
        }
    }

    //excluir um usuário
    excluirUsuario(email) {
        try {
            const index = this.usuarios.findIndex((user) => user.email === email);

            if (index !== -1) {
                this.usuarios.splice(index, 1);
                console.log('Usuário excluído com sucesso!');
            } else {
                throw new Error('Usuário não encontrado.');
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    //realizar login
    realizarLogin(email, senha) {
        try {
            const usuario = this.encontrarUsuarioPorEmail(email);

            if (!usuario) {
                throw new Error('Usuário ou senha inválido.');
            }


            if (!usuario.verificarSenha(senha)) {
                throw new Error('Usuário ou senha inválido.');
            }

            if (!usuario.statusAtivacao) {
                throw new Error('Usuário desativado.');
            }

            usuario.ultimaDataLogin = new Date();
            console.log('Login realizado com sucesso!');
        } catch (error) {
            console.error(error.message);
        }
    }

}

module.exports = SistemaGerenciamentoUsuarios;
