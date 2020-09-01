<?php
/** @noinspection SpellCheckingInspection */

namespace App;

use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    protected $fillable = [
        'university',
        'faculty',
        'department',
        'text',
        'url',
        'parse',
        'conf_font',
        'author',
        'id_',
        'title',
        'abstract',
        'abstract_key',
    ];
}
