<?php

require_once __DIR__ . "/Route.php";

$route = new Route("/backEnd/", "/seusite/api/");

require_once __DIR__ . "/methods/get.php";
require_once __DIR__ . "/methods/post.php";
require_once __DIR__ . "/methods/put.php";
require_once __DIR__ . "/methods/delete.php";

$route->run('/');