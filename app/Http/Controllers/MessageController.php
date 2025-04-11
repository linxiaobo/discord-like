<?php

namespace App\Http\Controllers;

use App\Models\Channel;
use Illuminate\Http\Request;
use App\Events\MessageSent;

/**
 * Class MessageController
 */
class MessageController extends Controller
{
    /**
     * @param Request $request
     * @param Channel $channel
     * @return null
     */
    public function store(Request $request, Channel $channel)
    {
        // 基础权限验证
        if (!$channel->server->members->contains(auth()->id())) {
            abort(403, 'You are not a member of this server');
        }

        $validated = $request->validate([
            'content' => 'required|string|max:2000',
            'client_id' => 'string|max:2000',
        ]);

        $message = $channel->messages()->create([
            'content' => $validated['content'],
            'user_id' => auth()->id(),
            'client_id' => $validated['client_id'],
        ]);

        //broadcast(new MessageSent($message->load('user')))->toOthers();
        MessageSent::dispatch($message->load('user'));

        // return response()->json(['message' => $message]);
        return null;
    }
}
