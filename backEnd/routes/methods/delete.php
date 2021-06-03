<?php

require_once __DIR__ . "/../../Controller/User.php";
require_once __DIR__ . "/../../Controller/Cliente.php";

$route->delete('/users/([0-9]*)', function ($id) {
  return (new User(true))->Del($id);
});

$route->delete('/clientes/([0-9]*)', function ($id) {
  return (new Cliente(true))->Del($id);
});
