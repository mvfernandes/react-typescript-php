<?php

Route::put('/users/([0-9]*)', function ($id) {
    return (new User())->Update($id);
});
Route::put('/clientes/([0-9]*)', function ($id) {
    return (new Cliente(true))->Store($id);
});
Route::put('/perfil', function () {
    return (new User(true))->updatePerfil();
});