<?php

namespace App\Http\Controllers;

use App\Models\Channel;
use App\Models\Message;
use Illuminate\Http\Request;
use App\Events\MessageSent;
use Illuminate\Support\Facades\Log;

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

        //broadcast(new MessageSent($message->load('user')))->toOthers();
        MessageSent::dispatch($message->load('user'));

        // return response()->json(['message' => $message]);
        return null;
    }
}
