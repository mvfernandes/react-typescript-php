<?php

class Conn
{
    public $pdo;
    public function __construct()
    {
        try {
            if ($_SERVER['SERVER_NAME'] === 'localhost') {
                $host = 'localhost';
                $user = 'root';
                $senha = '';
                $bd = 'phpreact';

            } else {
                $host = "localhost";
                $bd = "seu_banco";
                $user = "seu_user";
                $senha = "sua_senha";
            }

            $this->pdo = new PDO("mysql:dbname=" . $bd . ";host=" . $host, $user, $senha);
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->pdo->exec("set names utf8");
        } catch (PDOException $e) {
            echo "Erro na conexão ". $e->getMessage();die;
        }
    }
}
