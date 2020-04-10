# React Typescript e Material UI com php para fins didáticos

Projeto criado com React e typescript, backEnd em php;

Dentro da pasta backEnd existe uma pasta sql, crie sua base com nome 'phpreact' e insira as tabelas necessárias

Inicie o server localhost:9001, email: adm@adm.com e  senha: 123456

Se for rodar o back e o front em development, acesse o arquivo .\backEnd\Controller\Controller.php e descomente o bloco:

 if ($_SERVER['SERVER_NAME'] === 'localhost') {
    $_SESSION['user'] = [
        "id" => 1,
        "nivel" => 1,
    ];
}

<img src="print.png" alt="Exemplo" width="auto"/>