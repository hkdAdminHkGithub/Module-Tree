<?php
Route::prefix('tree')->group(function() {
    Route::get('/', 'TreeController@index');
    Route::get('/{any}', 'TreeController@index')->where('any', '.*');
});

// Menu___

// End Menu___

// Category__

// End Category__