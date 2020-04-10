<?php

Route::get('/logout', function () {
    session_destroy();
    echo json_encode([
        'Success' => true
    ]);
    return;
});

Route::get('/menu', function () {
    return (new Menu(true))->GetMenu();
});

Route::get('/users', function () {
    return (new User(true))->All();
});
Route::get('/clientes', function () {
    return (new Cliente(true))->All();
});

Route::get('/perfil', function () {
    return (new User(true))->getPerfil();
});