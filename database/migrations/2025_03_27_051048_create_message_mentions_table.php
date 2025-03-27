<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMessageMentionsTable extends Migration
{
    public function up()
    {
        Schema::create('message_mentions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('message_id')->constrained()->onDelete('cascade');
            $table->foreignId('mentioned_user_id')->constrained('users')->onDelete('cascade');
            $table->timestamps();

            $table->unique(['message_id', 'mentioned_user_id']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('message_mentions');
    }
}
