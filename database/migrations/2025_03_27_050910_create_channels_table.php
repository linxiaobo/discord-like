<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateChannelsTable extends Migration
{
    public function up()
    {
        Schema::create('channels', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->foreignId('server_id')->constrained()->onDelete('cascade');
            $table->enum('type', ['text', 'voice', 'announcement'])->default('text');
            $table->text('topic')->nullable();
            $table->boolean('is_private')->default(false);
            $table->integer('position')->default(0);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('channels');
    }
}
