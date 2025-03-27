<?php

use App\Http\Controllers\ChannelController;
use App\Http\Controllers\MessageController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    // 频道相关路由
    Route::prefix('servers/{server}')->group(function () {
        // 显示频道消息
        Route::get('/channels/{channel}', [ChannelController::class, 'show'])
            ->name('channels.show');

        // 创建频道表单
        Route::get('/channels/create', [ChannelController::class, 'create'])
            ->name('channels.create')
            ->middleware('can:create,App\Models\Channel,server');

        // 存储新频道
        Route::post('/channels', [ChannelController::class, 'store'])
            ->name('channels.store')
            ->middleware('can:create,App\Models\Channel,server');

        // 编辑频道表单
        Route::get('/channels/{channel}/edit', [ChannelController::class, 'edit'])
            ->name('channels.edit')
            ->middleware('can:update,channel');

        // 更新频道
        Route::put('/channels/{channel}', [ChannelController::class, 'update'])
            ->name('channels.update')
            ->middleware('can:update,channel');

        // 删除频道
        Route::delete('/channels/{channel}', [ChannelController::class, 'destroy'])
            ->name('channels.destroy')
            ->middleware('can:delete,channel');
    });

    // 消息相关路由 (可单独分组)
    Route::prefix('channels/{channel}')->group(function () {
        Route::post('/messages', [MessageController::class, 'store'])
            ->name('channels.messages.store');

        Route::put('/messages/{message}', [ChannelController::class, 'updateMessage'])
            ->name('channels.messages.update')
            ->middleware('can:update,message');

        Route::delete('/messages/{message}', [ChannelController::class, 'destroyMessage'])
            ->name('channels.messages.destroy')
            ->middleware('can:delete,message');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
