const SistemaGerenciamentoUsuarios = require('../index.js');


const sistema = new SistemaGerenciamentoUsuarios();



console.log|("\n Cenario de sucesso \n");


console.log("\n Deve criar um usuário \n");
sistema.criarNovoUsuario('João', 'joao@email.com', 'Lete1455', ['leitura']);
sistema.criarNovoUsuario('Maria', 'maria@email.com', 'Mari1567', ['escrita']);

console.log(sistema.listarUsuarios());

console.log("\n Deve realizar o login \n");
sistema.realizarLogin('joao@email.com', 'Lete1455');

console.log("\n Deve alterar os dados do usuário \n");
sistema.alterarDadosUsuario('joao@email.com', 'João Silva', 'Nova1455', ['leitura', 'escrita']);

console.log(sistema.listarUsuarios());

console.log("\n Deve desativar ou ativar um usuário \n");
sistema.ativarDesativarUsuario('maria@email.com');

console.log(sistema.listarUsuarios());

console.log("\n Deve exluir um usuário \n");
sistema.excluirUsuario('joao@email.com');

console.log(sistema.listarUsuarios());
