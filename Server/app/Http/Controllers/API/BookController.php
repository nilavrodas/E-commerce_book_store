<?php

namespace App\Http\Controllers\API;

use App\Models\Book;
use App\Models\publisher;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;

class BookController extends Controller
{
    public function Add(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'isbn' => 'required|unique:book,isbn',
            'book_name' => 'required|max:191',
            'author_name' => 'required|max:191',
            'coppies' => 'required|max:191',
            'description' => 'required|max:250',
            'selling_price' => 'required|max:191',
            'image' => 'required|image|mimes:jpeg,png,jpg|max:100000',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 442,
                //check
                'Validation_errors' => $validator->messages(),
            ]);
        } //check for timestamp
        else {
            $Books = new Book;
            $Books->isbn = $request->input('isbn');
            $Books->book_name = $request->input('book_name');
            $Books->author_name = $request->input('author_name');
            $Books->description = $request->input('description');
            $Books->selling_price = $request->input('selling_price');


            $Books->coppies = $request->input('coppies');
            // CHECK
            //$publisher_id = publisher::Select('publisher_id')->where('publisher_name', $request->publisher_name)->first();
            //$publisher_id = publisher::where('publisher_name', $request->publisher_name)->value('publisher_id');
            $IsAlreadyHerePublisher = publisher::where('publisher_name', $request->publisher_name)->first();
            if ($IsAlreadyHerePublisher) {
                $Books->publisher_id = $IsAlreadyHerePublisher->publisher_id;
            } else {
                $publisher = publisher::create([
                    'publisher_name' => $request->publisher_name,
                ]);
                $Books->publisher_id = $publisher->publisher_id;
            }



            if ($request->hasfile('image')) {
                $file = $request->file('image');
                $extension = $file->getClientOriginalExtension();
                $filename = time() . '.' . $extension;
                $file->move('uploads/Book/', $filename);
                $Books->image = 'uploads/Book/' . $filename;
            }
            $Books->save();
            return response()->json([
                'ststus' => 200,
                'message' => 'Book added successfully'

            ]);
        }
    }
    public function Show()
    {
        $Books = Book::all();
        return response()->json([
            'status' => 200,
            'Books' => $Books,
        ]);
    }
    public function Edit($isbn)
    {
        $Books = Book::find($isbn);
        if ($Books) {
            return response()->json([
                'status' => 200,
                'Book' => $Books,
                'publisher_name' => publisher::select('publisher_name')->where('publisher_id', $Books->publisher_id)->first(),
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Book not found',
            ]);
        }
    }
    public function Update(Request $request, $isbn)
    {
        $validator = Validator::make($request->all(), [
            'book_name' => 'required|max:191',
            'author_name' => 'required|max:191',
            'coppies' => 'required|max:191',
            'description' => 'required|max:191',
            'selling_price' => 'required|max:191',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 442,
                //check
                'Validation_errors' => $validator->messages(),
            ]);
        } //check for timestamp
        else {
            $Books = Book::find($isbn);
            if ($isbn) {
                $Books->isbn = $request->input('isbn');
                $Books->book_name = $request->input('book_name');
                $Books->author_name = $request->input('author_name');
                $Books->description = $request->input('description');
                $Books->selling_price = $request->input('selling_price');
                $Books->coppies = $request->input('coppies');
                $IsAlreadyHerePublisher = publisher::where('publisher_name', $request->publisher_name)->first();
                if ($IsAlreadyHerePublisher) {
                    $Books->publisher_id = $IsAlreadyHerePublisher->publisher_id;
                } else {
                    $publisher = publisher::create([
                        'publisher_name' => $request->publisher_name,
                    ]);
                    $Books->publisher_id = $publisher->publisher_id;
                }

                if ($request->hasfile('image')) {
                    $path = $Books->image;
                    if (File::exists($path)) {
                        File::delete($path);
                    }
                    $file = $request->file('image');
                    $extension = $file->getClientOriginalExtension();
                    $filename = time() . '.' . $extension;
                    $file->move('uploads/Book/', $filename);
                    $Books->image = 'uploads/Book/' . $filename;
                }
                $Books->update();
                return response()->json([
                    'status' => 200,
                    'message' => 'Book updated successfully'
                ]);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'Book not found'
                ]);
            }
        }
    }
    public function Delete($isbn)
    {
        $Books = Book::find($isbn);
        if ($Books) {
            $Books->delete();
            return response()->json([
                'status' => 200,
                'message' => 'Book deleted successfully',
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Book not found',
            ]);
        }
    }
    public function showSingle($isbn)
    {
        $Books = Book::find($isbn);
        if ($Books) {
            return response()->json([
                'status' => 200,
                'Book' => $Books,
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Book not found',
            ]);
        }
    }
}
