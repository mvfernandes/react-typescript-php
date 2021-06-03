<?php

require_once __DIR__ . "/../../Controller/User.php";
require_once __DIR__ . "/../../Controller/Cliente.php";

$route->put('/users/([0-9]*)', function ($id) {
  return (new User())->Update($id);
});
$route->put('/clientes/([0-9]*)', function ($id) {
  return (new Cliente(true))->Store($id);
});
$route->put('/perfil', function () {
  return (new User(true))->updatePerfil();
});
