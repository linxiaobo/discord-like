import { type Server, type Channel, type ServerList, type User, Message } from '@/types';
import {Head, usePage} from "@inertiajs/react";
import ChatLayout from "@/layouts/chat-layout";
import MessageList from "@/components/chat/message-list";
import ServerList from "@/components/chat/server-list";
import ChannelList from "@/components/chat/channel-list";
import UserPanel from "@/components/chat/user-panel";
import MessageInput from '@/components/chat/message-input';
import { useEffect } from 'react';
import { useMessageActions } from "@/components/chat/message-store";
import MessageListener from "@/components/chat/message-listener";

type ChannelIndexProps = {
    server: Server;
    channel: Channel;
    messages: Message[];
    servers: ServerList;
};

export default function ChannelHome({server, channel, latest_messages, servers }: ChannelIndexProps) {
    const { setMessages, setCurrentChannel } = useMessageActions();

    useEffect(() => {
        setMessages(latest_messages);
        setCurrentChannel(channel.id);
    }, [channel.id]);

    return (
        <ChatLayout>
            <Head title={`${channel.name} | ${server.name}`} />

            <div className="flex h-full">
                {/* Server sidebar */}
                <ServerList servers={servers} currentServerId={server.id} />

                {/* Channel sidebar */}
                <div className="w-60 bg-gray-800 flex flex-col">
                    {/* Server name header */}
                    <div
                        className="flex items-center justify-between px-4 py-3 border-b border-gray-900 shadow-sm cursor-pointer hover:bg-gray-700">
                        <h2 className="font-semibold truncate">{server.name}</h2>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                             fill="currentColor">
                            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/>
                        </svg>
                    </div>

                    {/* Channel list */}
                    <div className="flex-1 overflow-y-auto px-2 py-2 space-y-1">
                        {/* Channel categories and channels would go here */}
                        <ChannelList server={server} />
                    </div>

                    {/* User panel */}
                    <UserPanel />
                </div>

                {/* Main chat area */}
                <div className="flex-1 flex flex-col bg-gray-700">
                    {/* Channel header */}
                    <div className="h-12 border-b border-gray-900 flex items-center px-4 shadow-sm">
                        <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-1"
                                 viewBox="0 0 20 20" fill="currentColor">
                                <path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"/>
                            </svg>
                            <span className="font-semibold">channel-name</span>
                        </div>
                    </div>

                    {/* Messages container */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {/* Messages would go here */}
                        <MessageList />
                    </div>

                    {/* Message input */}
                    <div className="p-4">
                        <MessageInput channel={channel} />
                    </div>
                </div>

                {/* Members sidebar (optional) */}
                <div className="w-60 bg-gray-800 hidden md:flex flex-col border-l border-gray-900">
                    <div className="p-4 border-b border-gray-900">
                        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Online — 1</h3>
                    </div>
                    <div className="flex-1 overflow-y-auto p-2">
                        {/* Member list would go here */}
                        <div className="flex items-center p-2 rounded hover:bg-gray-700">
                            <div className="relative">
                                <div
                                    className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-xs">US
                                </div>
                                <div
                                    className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-gray-800"></div>
                            </div>
                            <span className="ml-2 text-sm">Username</span>
                        </div>
                    </div>
                </div>
            </div>
        </ChatLayout>
    );
}
