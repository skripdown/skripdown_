<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDocumentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('documents', function (Blueprint $table) {
            $table->id();
            $table->string('author');
            $table->string('id_');
            $table->string('title');
            $table->text('abstract');
            $table->string('abstract_key');
            $table->string('university');
            $table->string('faculty');
            $table->string('department');
            $table->string('url');
            $table->string('conf_font');
            $table->text('parse');
            $table->text('text');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('documents');
    }
}
