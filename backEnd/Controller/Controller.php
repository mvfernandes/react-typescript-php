<?php
session_start();

require __DIR__ . "/../Conn.php";

class Controller extends Conn
{
    public $user;
    public $table = [];
    public $tableName= "";
    private $postJson;

    public function __construct($protected)
    {
        parent::__construct();
        $this->postJson = json_decode(file_get_contents('php://input'), true);

        // if ($_SERVER['SERVER_NAME'] === 'localhost') {
        //     $_SESSION['user'] = [
        //         "id" => 1,
        //         "nivel" => 1,
        //     ];
        // }

        if ($protected and !isset($_SESSION['user'])) {
            echo json_encode([
                "expired" => true,
            ]);
        return die;
        } else {
            $this->user = $_SESSION['user'] ?? false;
        }

    
    }

    public function Select($sql)
    {
        return  $this->pdo->query($sql)->fetch(PDO::FETCH_ASSOC);
    }

    public function SelectAll($sql)
    {
        return  $this->pdo->query($sql)->fetchAll(PDO::FETCH_ASSOC);
    }

    public function Json($params)
    {
        echo json_encode($params);
        return;
    }

    public function InputJsonAll()
    {
        return $this->postJson;
    }

    public function InputJson($param = "")
    {
        return $this->postJson[$param] ?? "";
    }

    public function Input($param)
    {
        return filter_input(INPUT_POST, $param) ?? "" ;
    }

    public function GenericError()
    {
        return $this->Json([
            "Success" => false,
            "Data" => [],
            "Message" => "Algo deu errado, tente novamente mas, se persistir, por favor contate o suporte"
        ]);
    }

    public function Response(bool $Success, $Data, string $Message)
    {
        return $this->Json([
            "Success" => $Success,
            "Data" => $Data,
            "Message" => $Message
        ]);
    }
}
