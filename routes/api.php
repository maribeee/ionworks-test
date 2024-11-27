<?php

use App\Http\Controllers\DataController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/



Route::get('/api/getAllData', [DataController::class, 'getAllData']);
Route::get('/api/getChartData/crate/{cRate}/temp/{temp}', [DataController::class, 'getChartDataByArgs']);
