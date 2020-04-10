<?php

Route::delete('/users/([0-9]*)', function ($id) {
    return (new User(true))->Del($id);

});

Route::delete('/clientes/([0-9]*)', function ($id) {
    return (new Cliente(true))->Del($id);

});