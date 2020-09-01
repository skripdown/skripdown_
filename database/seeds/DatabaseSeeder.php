<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        DB::table('skripdowns')->insert([
            'foreign_words' => 'online|offline|software|file',
            'translate_words' => 'daring|luring|perangkat lunak|berkas'
        ]);
    }
}
