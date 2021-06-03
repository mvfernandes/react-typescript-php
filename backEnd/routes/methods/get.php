<?php

require_once __DIR__ . "/../../Controller/User.php";
require_once __DIR__ . "/../../Controller/Cliente.php";
require_once __DIR__ . "/../../Controller/Menu.php";

$route->get('/logout', function () {
  session_destroy();
  echo json_encode([
    'Success' => true
  ]);
  return;
});

$route->get('/menu', function () {
  return (new Menu(true))->GetMenu();
});

$route->get('/users', function () {
  return (new User(true))->All();
});
$route->get('/clientes', function () {
  return (new Cliente(true))->All();
});

$route->get('/perfil', function () {
  return (new User(true))->getPerfil();
});

// $route->get('/([0-9]*)', function ($var1) {
//   echo $var1 . ' is a great number!';
//   include "teste.php";
// });

// Route::get('/users/([A-z]*)/([A-z]*)', function ($var1, $var2) {
//     echo $var1 . ' is a great !' . $var2;
// });