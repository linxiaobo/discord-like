<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddFieldsToUsersTable extends Migration
{
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('avatar')->nullable();
            $table->string('status')->default('online')->comment('online, idle, dnd, offline');
            $table->string('custom_status')->nullable();
            $table->timestamp('last_active_at')->nullable();
            $table->boolean('is_bot')->default(false);
        });
    }

    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['avatar', 'status', 'custom_status', 'last_active_at', 'is_bot']);
        });
    }
}
