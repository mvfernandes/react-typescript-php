<?php

require_once __DIR__ . "/Controller.php";

class Menu extends Controller
{
    public function __construct($protected = false) {
        parent::__construct($protected);
    }
    
    public function GetMenu()
    {
        if ($this->user) {
            $userNivel = $this->user['nivel'];

            return $this->Json([
                "Success" => true,
                "Data" => $this->SelectAll("SELECT `id`, `icon`, `text`, `route` FROM `menu` WHERE `nivel` >= '$userNivel'"),
                "Message" => ""
            ]);
        }
    }
}
