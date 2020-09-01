<?php
/** @noinspection PhpUndefinedMethodInspection */
/** @noinspection SpellCheckingInspection */
/** @noinspection PhpUndefinedFieldInspection */

namespace App\Http\Controllers;

use App\Document;
use App\Skripdown;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;

class Controller extends BaseController
{

    public function openEditor() {
        $doc = null;
        return view('editor',compact('doc'));
    }

    public function submit(Request $request) {
        $text = $request->text;
        $univ = $request->university;
        $dept = $request->department;
        $fact = $request->faculty;
        $prse = $request->parse;
        $urls = $request->url;
        $cfnt = $request->conf_font;
        $doc  = null;

        if ($urls == 'none') {
            $alp_ = 'abcdefghi__--jklmnopqrstuvwxyz__--ABCDEFGHIJK__--LMNOPQRSTUVWXYZ0123456789_-';
            $len  = strlen($alp_);
            for ($i = 0; $i < 20; $i++) {
                $urls .= $alp_[rand(0, $len - 1)];
            }

            $urls = date("s").date("h").$urls;
            $doc  = new Document();
            $doc  ->url = $urls;
        }
        else {
            $doc = DB::table('documents')->where('url',$urls)->first();
            $doc = Document::find($doc->id);
        }

        $doc->university    = $univ;
        $doc->faculty       = $fact;
        $doc->department    = $dept;
        $doc->text          = $text;
        $doc->parse         = $prse;
        $doc->conf_font     = $cfnt;
        $doc->save();

        return redirect('/editor/'.$urls);
    }

    public function openDoc($url) {
        $check = DB::table('documents')->where('url',$url)->get()->count();
        if ($check == 1) {
            $doc = DB::table('documents')->where('url',$url)->first();
            return view('editor',compact('doc'));
        }
        else {
            return '404 NOT FOUND!';
        }
    }

    public function parseDoc($url) {
        $check = DB::table('documents')->where('url',$url)->get()->count();
        if ($check == 1) {
            $doc = DB::table('documents')->where('url',$url)->first();
            $result = array($doc->university,$doc->department,$doc->parse);
            return view('print.out',compact('result'));
        }
        else {
            return '404 NOT FOUND!';
        }
    }

    public function skripdownForeignWords(Request $request) {

        $skripdown = Skripdown::find(1);
        if ($request->foreign_word !== 'online|offline') {
            $skripdown->foreign_words = $request->foreign_word;
            $skripdown->translate_words = $request->translate_word;
            $skripdown->save();
        }

        return response()->json(
            array(
                'foreign_word'=>$skripdown->foreign_words,
                'translate_word'=>$skripdown->translate_words
            ),200
        );
    }
}
