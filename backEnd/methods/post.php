<?php
Route::post('/clientes', function () {
    return (new Cliente(true))->Store();
});
Route::post('/users', function () {
    return (new User(true))->Store();
});
Route::post('/login', function () {
    return (new User())->Login();
});

