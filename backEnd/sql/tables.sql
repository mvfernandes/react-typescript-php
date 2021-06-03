CREATE TABLE `menu` (
  `id` int NOT NULL AUTO_INCREMENT,
  `icon` varchar(50) NOT NULL,
  `text` varchar(50) NOT NULL,
  `route` varchar(150) NOT NULL,
  `nivel` int NOT NULL DEFAULT '9',
  PRIMARY KEY (`id`)
);

INSERT INTO `phpreact`.`menu` (`icon`, `text`, `route`, `nivel`) VALUES ('home', 'Home', '/', '9');
INSERT INTO `phpreact`.`menu` (`icon`, `text`, `route`, `nivel`) VALUES ('user', 'Usuários', 'usuarios', '1');
INSERT INTO `phpreact`.`menu` (`icon`, `text`, `route`, `nivel`) VALUES ('user', 'Clientes', 'clientes', '9');
INSERT INTO `phpreact`.`menu` (`icon`, `text`, `route`, `nivel`) VALUES ('user', 'Meus Dados', 'perfil', '9');


CREATE TABLE `clientes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_user` int NOT NULL,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `empresa` varchar(150) NOT NULL,
  `nome` varchar(150) NOT NULL,
  `email` varchar(100) DEFAULT '',
  `telefone` varchar(20) DEFAULT '',
  `celular` varchar(20) DEFAULT '',
  `cpf` varchar(20) NOT NULL,
  `rg` varchar(20) DEFAULT '',
  `cnpj` varchar(20) DEFAULT '',
  `cep` varchar(20) DEFAULT '',
  `endereco` varchar(150) NOT NULL,
  `cidade` varchar(150) NOT NULL,
  `bairro` varchar(150) NOT NULL,
  `numero` varchar(150) NOT NULL,
  `cpfCnpj` varchar(50) NOT NULL,
  `estado` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `password` text NOT NULL,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `nivel` int NOT NULL DEFAULT '3',
  `empresa` varchar(150) NOT NULL,
  `nome` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
);
INSERT INTO `phpreact`.`users` (`nome`, `email`, `password`, `nivel`, `empresa`) VALUES ('Vinicius', 'adm@adm.com', MD5('123456'), '1', 'Empresa Teste');