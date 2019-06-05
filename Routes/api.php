<?php

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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
// Origin
Route::prefix('tree')->group(function() {
    Route::get('/', 'TreeController@index');
    Route::get('/{any}', 'TreeController@index')->where('any', '.*');
});
// End Origin

// Menu___
Route::prefix('menu')->group(function() {
    /**
     * Get and set json
     * @param Illuminate\Http\Request
     * @method post
     */
    Route::post('/', function(Request $request){
        $table = 'menu_json';
        $queryTable = DB::table($table);
        // validation
        $validation = Validator::make(
            $request->all(),
            [
                'data' => 'required'
            ]
        );
        // get and set json
        if (!$validation->fails()) {
            $queryTable->updateOrInsert(
                [
                    'id' => 1
                ],
                [
                    'data' => $request->data
                ]
            );
        }
        // get data
        $getData = $queryTable->where('id', 1)->first();
        return response()->json($getData, 200);
    });

    /**
     * Get and set data
     * @param Illuminate\Http\Request
     * @method post
     */
    Route::post('/data', function(Request $request) {
        $data = $request->data;
        $table = "menu_data";
        if($data == null) return response()->json(['not found'], 404);
        $responseData = DB::table($table)->where('id', $data['id'])->first();
        if(!$responseData) return ['null'];
        DB::table($table)->updateOrInsert(
            [
                'id' => $data['id']
            ],
            [
                'content' => $data['content'],
                'updated_at' => new Carbon()
            ]
        );
        return response()->json([
            'sucess' => $responseData
        ],200);
    });
});
// End Menu___

// Category__

// End Category__