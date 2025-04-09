// resources/js/Pages/Chat.tsx
import AuthenticatedLayout from '@/layouts/auth-layout'
import { Head } from '@inertiajs/react'
import ServerList from '@/components/server-list'
import ChannelList from '@/components/channel-list'
import MessageView from '@/components/message-view'
import MessageInput from '@/components/message-input'
import MessageListener from "@/components/ui/message-listener";

interface Props {
    server: {
        id: string
        name: string
        channels: Array<{
            id: string
            name: string
            type: string
            topic?: string
            unread_count?: number
        }>
    }
    channel: {
        id: string
        name: string
        messages: Array<{
            id: string
            content: string
            created_at: string
            edited_at?: string
            is_pinned: boolean
            user: {
                id: string
                name: string
                avatar?: string
                status?: string
            }
            reactions?: Array<{
                id: string
                emoji: string
                count: number
                me: boolean
            }>
        }>
    }
    servers: Array<{
        id: string
        name: string
        icon?: string
        unread_count?: number
    }>
}

export default function Chat({ server, channel, servers }: Props) {
    return (
        <AuthenticatedLayout>
            <Head title={`${channel.name} | ${server.name}`} />

            <div className="flex h-screen bg-discord-dark text-gray-100">
                <ServerList servers={servers} currentServerId={server.id} />

                <ChannelList
                    server={server}
                    currentChannelId={channel.id}
                />

                <div className="flex-1 flex flex-col bg-discord-dark-200">
                    <div className="flex-1 overflow-hidden">
                        <MessageView messages={channel.messages} />
                    </div>

                    {/*<MessageListener channelId={channel.id} />*/}
                    <MessageInput channelId={channel.id} />
                </div>

                <div className="w-60 bg-discord-dark-100 border-l border-discord-dark">

                </div>
            </div>
        </AuthenticatedLayout>
    )
}
