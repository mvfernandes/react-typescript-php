<?php

require_once __DIR__ . "/../../Controller/User.php";
require_once __DIR__ . "/../../Controller/Cliente.php";

$route->post('/clientes', function () {
  return (new Cliente(true))->Store();
});
$route->post('/users', function () {
  return (new User(true))->Store();
});
$route->post('/login', function () {
  return (new User())->Login();
});
