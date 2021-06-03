<?php

require_once __DIR__ . "/Controller.php";

class Cliente extends Controller
{
    public function __construct($protected = false)
    {
        parent::__construct($protected);
        $this->tableName = 'clientes';
    }

    public function Store($id = false)
    {
        try {

            $query = $id ?
                "UPDATE " . $this->tableName . " SET" .
                "`email`=:email,
                `id_user`=:id_user,
                `empresa`=:empresa,
                `nome`=:nome,
                `email`=:email,
                `telefone`=:telefone,
                `celular`=:celular,
                `cpf`=:cpf,
                `rg`=:rg,
                `cnpj`=:cnpj,
                `cep`=:cep,
                `endereco`=:endereco,
                `cidade`=:cidade,
                `estado`=:estado,
                `numero` = :numero,
                `bairro` = :bairro,
                `cpfCnpj` = :cpfCnpj
                WHERE `id` = '$id'"  :

                "INSERT into " . $this->tableName .
                "(`id_user`,
                `empresa`,
                `nome`,
                `email`,
                `telefone`,
                `celular`,
                `cpf`,
                `rg`,
                `cnpj`,
                `cep`,
                `endereco`,
                `cidade`,
                `estado`,
                `numero`,
                `bairro`,
                `cpfCnpj`)" .
                "VALUES" .
                "(:id_user,
                :empresa,
                :nome,
                :email,
                :telefone,
                :celular,
                :cpf,
                :rg,
                :cnpj,
                :cep,
                :endereco,
                :cidade,
                :estado,
                :numero,
                :bairro,
                :cpfCnpj)";

            $insert = $this->pdo->prepare($query);

            $insert->bindValue(":id_user", $this->user['id'] ?? null);
            $insert->bindValue(":email", $this->InputJson('email') ?? "");
            $insert->bindValue(":empresa", $this->InputJson('empresa') ?? "");
            $insert->bindValue(":nome", $this->InputJson('nome'));
            $insert->bindValue(":email", $this->InputJson('email'));
            $insert->bindValue(":telefone", $this->InputJson('telefone'));
            $insert->bindValue(":celular", $this->InputJson('celular'));
            $insert->bindValue(":cpf", $this->InputJson('cpf'));
            $insert->bindValue(":rg", $this->InputJson('rg'));
            $insert->bindValue(":cnpj", $this->InputJson('cnpj'));
            $insert->bindValue(":cep", $this->InputJson('cep'));
            $insert->bindValue(":endereco", $this->InputJson('endereco'));
            $insert->bindValue(":cidade", $this->InputJson('cidade'));
            $insert->bindValue(":estado", $this->InputJson('estado'));

            $insert->bindValue(":numero", $this->InputJson('numero'));
           
            $insert->bindValue(":bairro", $this->InputJson('bairro'));
            $insert->bindValue(":cpfCnpj", $this->InputJson('cpfCnpj'));

            $res = $insert->execute();

            if ($res) {
                $criadoOuAtualizado = $id ? 'atualizado' : 'criado';
                return $this->Response(true, [], "Cliente " . $criadoOuAtualizado . " com sucesso");
            }
            return $this->GenericError();
        } catch (Exception $e) {
            if ($e->errorInfo[1] == 1062) {
                return $this->Response(false, [], "Este e-mail já existe");
            } else {
                return $this->Response(false, [], "Erro no servidor, se persistir, por favor contate o suporte." . $e->getMessage());
            }
        }
    }

    public function All()
    {
        if ($this->user) {
            $myId = $this->user['id'];
            $users = [];

            if ($this->user['nivel'] == 1) {
                $users = $this->SelectAll("SELECT * FROM `clientes` as cli
                LEFT JOIN(
                    SELECT id as ref_id, email as ref_email, nome as ref_nome, empresa as ref_empresa FROM `users`
                ) as u
                ON cli.id_user = u.ref_id ORDER BY cli.id DESC;");
            } else {

                $users = $this->SelectAll("SELECT * FROM `clientes` WHERE `id_user` = '$myId' ORDER BY `clientes`.id DESC;");
            }


            function validateToJson($user, $key)
            {
                if ($user[$key][0] == "[" and $user[$key][strlen($user[$key]) - 1] == "]") {
                    return json_decode($user[$key]);
                } else {
                    return [];
                }
            }

            $Response = array_map(function ($user) {

                if ($this->user['nivel'] == 1) {
                    $user['responsavel'] = [
                        'id' => $user['ref_id'],
                        'email' => $user['ref_email'],
                        'nome' => $user['ref_nome'],
                        'empresa' => $user['ref_empresa'],
                    ];

                    unset($user['ref_id']);
                    unset($user['ref_email']);
                    unset($user['ref_nome']);
                    unset($user['ref_empresa']);
                }
                return $user;
            }, $users);

            return $this->Response(true, $Response, "");
        }
    }

    public function Del($id)
    {
        if ($this->user) {
            $del = $this->pdo->prepare("DELETE FROM " . $this->tableName . " WHERE `id` = :id");
            $del->bindValue(":id", $id);
            $res = $del->execute();
            return $this->Response(true, [$res], "");
        }
    }
}
