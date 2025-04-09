<?php

namespace App\Http\Controllers;

use App\Models\Channel;
use App\Models\Server;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class AppController extends Controller
{
    /**
     * @var Server
     */
    public Server $server;

    /**
     * @var Channel
     */
    public Channel $channel;

    /**
     * @param Server $server
     * @param Channel $channel
     */
    public function __construct(
        Server $server,
        Channel $channel,
    ) {
        $this->server = $server;
        $this->channel = $channel;
    }

    /**
     * @param Request $request
     * @return RedirectResponse
     */
    public function __invoke(Request $request): RedirectResponse
    {
        $servers = $request->user()->servers()->get();
        if ($servers->count() > 0) {
            $currentServer = $servers->first();
        } else {
            $currentServer = $this->server->getDefaultServer();
        }

        $channels = $currentServer->channels();
        if ($channels->count() > 0) {
            $currentChannel = $channels->first();
        } else {
            $currentChannel = $this->channel->getDefaultChannel();
        }

        return redirect()->route('channels.home', [
            'server' => $currentServer->id,
            'channel' => $currentChannel->id
        ]);
    }
}
