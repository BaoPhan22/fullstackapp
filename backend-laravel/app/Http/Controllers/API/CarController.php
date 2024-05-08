<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Car;

class CarController extends Controller
{
    public function get()
    {
        try {
            $data = Car::select('cars.*', 'person.name as user_name')->join('person', 'person.id', 'cars.user_id')->get();
            return response()->json($data, 200);
        } catch (\Throwable $th) {
            return response()->json(['error' => $th->getMessage()], 500);
        }
    }

    public function create(Request $request)
    {
        try {
            $data['name'] = $request['name'];
            $data['color'] = $request['color'];
            $data['year'] = $request['year'];
            $data['user_id'] = $request['user_id'];
            $res = Car::create($data);
            return response()->json($res, 200);
        } catch (\Throwable $th) {
            return response()->json(['error' => $th->getMessage()], 500);
        }
    }

    public function getById($id)
    {
        try {
            $data = Car::select('cars.*', 'person.name as user_name')->join('person', 'person.id', 'cars.user_id')->find($id);
            return response()->json($data, 200);
        } catch (\Throwable $th) {
            return response()->json(['error' => $th->getMessage()], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $data['name'] = $request['name'];
            $data['color'] = $request['color'];
            $data['year'] = $request['year'];
            $data['user_id'] = $request['user_id'];
            Car::find($id)->update($data);
            $res = Car::select('cars.*', 'person.name as user_name')->join('person', 'person.id', 'cars.user_id')->find($id);
            return response()->json($res, 200);
        } catch (\Throwable $th) {
            return response()->json(['error' => $th->getMessage()], 500);
        }
    }

    public function delete($id)
    {
        try {
            $res = Car::find($id)->delete();
            return response()->json(["deleted" => $res], 200);
        } catch (\Throwable $th) {
            return response()->json(['error' => $th->getMessage()], 500);
        }
    }
}
