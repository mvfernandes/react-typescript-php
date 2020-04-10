<?php

class Home extends Controller
{
    public function __construct($protected = false) {
        parent::__construct($protected);
    }
    
    public function countUsers() {

    $userNivel = $this->user['nivel'];

        $users = $this->SelectAll("SELECT count(*) - 1 as total from `users` WHERE  `nivel` >= '$userNivel'");
        $clientes = $this->SelectAll("SELECT count(*) - 1 as total from `clientes` WHERE  `nivel` >= '$userNivel'");

        return $this->Json([
            "Success" => true,
            "Data" => $this->SelectAll("SELECT count(*) - 1 as total from `users` WHERE  `nivel` >= '$userNivel'"),
            "Message" => ""
        ]);
    }
    
}
