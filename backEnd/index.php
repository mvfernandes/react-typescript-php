<?php

session_start();
date_default_timezone_set('America/Sao_Paulo');

define('IS_DEVELOPMENT', false);

$urls = [
  'localhost',
  'sesusite'
];

if (in_array($_SERVER['SERVER_NAME'], $urls)) {

  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Headers: *");
  header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

  if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    return http_response_code(200);
  }

  require __DIR__ . "/routes/index.php";
} else {
  echo "Página não encontrada";
}
