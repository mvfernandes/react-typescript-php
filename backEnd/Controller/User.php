<?php

require_once __DIR__ . "/Controller.php";

class User extends Controller
{
    public function __construct($protected = false)
    {
        parent::__construct($protected);
        $this->table = [`id`, `email`, `updated_at`, `created_at`, `nivel`, `empresa`, `nome`];
        $this->tableName = 'users';
    }

    public function Store()
    {
        try {
            $query = "INSERT into `users`" .
                "(`email`, `password`, `empresa`, `nome`, `nivel`)" .
                "VALUES" .
                "(:email, :password, :empresa, :nome, :nivel)";

            $insert = $this->pdo->prepare($query);

            $insert->bindValue(":email", $this->InputJson('email'));
            
            $insert->bindValue(":password", md5($this->InputJson('senha')));
            
            $insert->bindValue(":empresa", $this->InputJson('empresa'));
            $insert->bindValue(":nome", $this->InputJson('nome'));
            $insert->bindValue(":nivel", 2);

            $res = $insert->execute();

            if ($res) {
                
                return $this->Response(true, [], "Usuário criado com sucesso");
            }
            return $this->GenericError();
        } catch (Exception $e) {
            if ($e->errorInfo[1] == 1062) {
                return $this->Response(false, [], "Este e-mail já existe");
            } else {
                return $this->Response(false, [], "Erro no servidor, se persistir, por favor contate o suporte" . $e->getMessage());
            }
        }
    }

    public function Update($id = false)
    {
        $verifyPass = !empty($this->InputJson('password')) ? "`password`=:password,": "";
        
        try {
            $query =  "UPDATE `users` SET" .
                " `email`=:email,  $verifyPass `empresa`=:empresa, `nome`=:nome WHERE `id` = '$id'" ;
           
            $insert = $this->pdo->prepare($query);

            $insert->bindValue(":email", $this->InputJson('email'));
            if ($this->InputJson('password')) {
                $insert->bindValue(":password", md5($this->InputJson('password')));
            }
            $insert->bindValue(":empresa", $this->InputJson('empresa'));
            $insert->bindValue(":nome", $this->InputJson('nome'));

            $res = $insert->execute();

            if ($res) {
                $criadoOuAtualizado = $id ? 'atualizado' : 'criado';
                return $this->Response(true, [], "Usuário " . $criadoOuAtualizado . " com sucesso");
            }
            return $this->GenericError();
        } catch (Exception $e) {
            if ($e->errorInfo[1] == 1062) {
                return $this->Response(false, [], "Este e-mail já existe");
            } else {
                return $this->Response(false, [], "Erro no servidor, se persistir, por favor contate o suporte" . $e->getMessage());
            }
        }
    }

    public function Login($valida_somente = false)
    {
        $email = "";
        $password = "";

            if ($this->InputJson('email') and $this->InputJson('password')) {
                $email = addslashes($this->InputJson('email'));
                $password = md5($this->InputJson('password'));
            } else if ($this->Input('email') and $this->Input('password')) {
                $email = addslashes($this->Input('email'));
                $password = md5($this->Input('password'));
            } else {
                return $this->Response(false, [], "E-mail e senha devem ser preenchidos");
            }
        
        $sql = "SELECT * FROM `users` WHERE (`email` = '$email')
            AND (`password` = '$password')";

        $_query = $this->Select($sql);

        if ($_query) {
            unset($_query['password']);

            $_SESSION['user'] = $_query;
            $this->user = $_query;

            if ($valida_somente) {
                return true;
            }

            return $this->Response(true, $_query, "");
        } else {
            session_destroy();
            if ($valida_somente) {
                return false;
            }
            return $this->Response(false, [], "E-mail ou senha inválido");
        }
    }

    public function All()
    {
        if ($this->user and $this->user['id'] == "1") {
            $users = $this->SelectAll("SELECT `id`, `email`, `updated_at`, `created_at`, `nivel`, `empresa`, `nome` FROM `users` WHERE `id` > '1'");
            return $this->Response(true, $users, "");
        }

        return $this->Response(true, ["" => $this->user], "");
    }

    public function Del($id)
    {
        if ($this->user and $this->user['id'] == "1" and $id != "1") {
            $del = $this->pdo->prepare("DELETE FROM `users` WHERE `id` = :id");
            $del->bindValue(":id", $id);
            $res = $del->execute();
            return $this->Response(true, [$res], "Usuário deletado");
        }
    }

    public function getPerfil()
    {
        $id = $this->user['id'];
        
        $user = $this->Select("SELECT `email`, `empresa`, `nome` FROM `users` WHERE `id` = '$id'");

        return $this->Response(true, $user, "");
        
    }

    public function updatePerfil()
    {
       return $this->Update($this->user['id']);
    }
}
