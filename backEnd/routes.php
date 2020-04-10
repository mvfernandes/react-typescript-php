<?php

require __DIR__ . "/Route.php";

Route::ResolvePath("/backEnd/", "/seusite/api/");

require __DIR__ . "/Controller/Controller.php";

require __DIR__ . "/Controller/User.php";
require __DIR__ . "/Controller/Cliente.php";
require __DIR__ . "/Controller/Menu.php";
require __DIR__ . "/Controller/Home.php";

require __DIR__ . "/methods/get.php";
require __DIR__ . "/methods/post.php";
require __DIR__ . "/methods/put.php";
require __DIR__ . "/methods/delete.php";

Route::run('/');