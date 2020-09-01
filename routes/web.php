<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});
Route::get('/editor', 'Controller@openEditor');
Route::get('/editor/{url}', 'Controller@openDoc');
Route::get('/parse/{url}', 'Controller@parseDoc');
Route::post('submit_text','Controller@submit');
Route::post('post_foreign_words','Controller@skripdownForeignWords');
