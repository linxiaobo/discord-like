<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRolesTable extends Migration
{
    public function up()
    {
        Schema::create('roles', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->foreignId('server_id')->constrained()->onDelete('cascade');
            $table->string('color')->default('#99aab5');
            $table->boolean('is_admin')->default(false);
            $table->boolean('can_manage_messages')->default(false);
            $table->boolean('can_manage_channels')->default(false);
            $table->boolean('can_manage_roles')->default(false);
            $table->boolean('can_manage_server')->default(false);
            $table->boolean('can_kick_members')->default(false);
            $table->boolean('can_ban_members')->default(false);
            $table->integer('position')->default(0);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('roles');
    }
}
