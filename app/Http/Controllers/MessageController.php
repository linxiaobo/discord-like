<?php

namespace App\Http\Controllers;

use App\Models\Channel;
use App\Models\Message;
use Illuminate\Http\Request;
use App\Events\MessageSent;

class MessageController extends Controller
{
    public function store(Request $request, Channel $channel)
    {
        // 基础权限验证
        if (!$channel->server->members->contains(auth()->id())) {
            abort(403, 'You are not a member of this server');
        }

        $validated = $request->validate([
            'content' => 'required|string|max:2000'
        ]);

        $message = $channel->messages()->create([
            'content' => $validated['content'],
            'user_id' => auth()->id()
        ]);

        broadcast(new MessageSent($message->load('user')))->toOthers();

        return back();
    }
}
