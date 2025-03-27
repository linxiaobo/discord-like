<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateServerUserTable extends Migration
{
    public function up()
    {
        Schema::create('server_user', function (Blueprint $table) {
            $table->id();
            $table->foreignId('server_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('nickname')->nullable();
            $table->timestamp('joined_at')->useCurrent();
            $table->timestamps();

            $table->unique(['server_id', 'user_id']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('server_user');
    }
}
