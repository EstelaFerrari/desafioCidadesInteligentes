const SistemaGerenciamentoUsuarios = require('../index.js');


const sistema = new SistemaGerenciamentoUsuarios();

//usuário criado para teste
sistema.criarNovoUsuario('Maria', 'maria@email.com', 'Mari1567', ['escrita']);

console.log("\n Cenario de insucesso \n");

console.log("Não deve criar um usuário");
sistema.criarNovoUsuario('', 'joao@email.com', 'Lete1455', ['leitura']);
sistema.criarNovoUsuario('João', 'joaoemail.com', 'Lete155', ['leitura']);
sistema.criarNovoUsuario('Maria', 'maria@email.com', 'Mari1567', ['escrita']);

console.log("\n Deve mostrar erro ao tentar fazer login \n")
sistema.realizarLogin('joaoemail.com', 'Lete1455');
sistema.realizarLogin('joao@email.com', 'Lete155');

console.log("\n Deve mostrar erro ao tentar alterar um usuario \n")
sistema.alterarDadosUsuario('joao@email.com', 'Lete155');
sistema.alterarDadosUsuario('maria@email.com', 'Mari57', ['escrita']);

console.log("\n Deve dar erro ao tentar desativar ou ativar um usuário \n");
sistema.ativarDesativarUsuario('maria@emai.com');

console.log("\n Deve exluir um usuário \n");
sistema.excluirUsuario('joao@email.com');




//console.log(sistema.listarUsuarios());

