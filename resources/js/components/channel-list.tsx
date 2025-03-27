import { Link } from '@inertiajs/react'
import { ChevronDown, Hash, Mic, Megaphone, Plus, Headphones, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/Components/ui/tooltip'
import { ScrollArea } from '@/components/ui/scroll-area'

interface Channel {
    id: string
    name: string
    type: 'text' | 'voice' | 'announcement'
    unread_count?: number
}

interface Server {
    id: string
    name: string
    channels: Channel[]
}

export default function ChannelList({
                                        server,
                                        currentChannelId
                                    }: {
    server: Server
    currentChannelId?: string
}) {
    // 按类型分组频道
    const textChannels = server.channels.filter(c => c.type === 'text')
    const voiceChannels = server.channels.filter(c => c.type === 'voice')
    const announcementChannels = server.channels.filter(c => c.type === 'announcement')

    // 获取频道图标
    const getChannelIcon = (type: string) => {
        switch (type) {
            case 'text': return <Hash className="h-4 w-4 mr-1" />
            case 'voice': return <Mic className="h-4 w-4 mr-1" />
            case 'announcement': return <Megaphone className="h-4 w-4 mr-1" />
            default: return <Hash className="h-4 w-4 mr-1" />
        }
    }

    return (
        <div className="flex flex-col h-full bg-discord-dark-100">
            {/* 服务器名称和下拉按钮 */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-discord-dark shadow-sm">
                <div className="flex items-center">
                    <button className="text-gray-200 hover:text-gray-100">
                        <ChevronDown className="h-5 w-5" />
                    </button>
                    <h2 className="ml-1 font-semibold text-gray-200">{server.name}</h2>
                </div>
            </div>

            {/* 频道列表 */}
            <ScrollArea className="flex-1">
                {/* 文本频道 */}
                {textChannels.length > 0 && (
                    <div className="mt-2">
                        <div className="flex items-center justify-between px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            <span>Text Channels</span>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button className="text-gray-400 hover:text-gray-200">
                                        <Plus className="h-3 w-3" />
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent side="top">
                                    Create Text Channel
                                </TooltipContent>
                            </Tooltip>
                        </div>

                        <div className="mt-1 space-y-1">
                            {textChannels.map((channel) => (
                                <Link
                                    key={channel.id}
                                    href={`/servers/${server.id}/channels/${channel.id}`}
                                    className={`flex items-center px-2 py-1 rounded mx-2 ${
                                        currentChannelId === channel.id
                                            ? 'bg-discord-dark-300 text-white'
                                            : 'text-gray-400 hover:bg-discord-dark-300 hover:text-gray-200'
                                    }`}
                                >
                                    {getChannelIcon(channel.type)}
                                    <span className="ml-1">{channel.name}</span>
                                    {channel.unread_count && (
                                        <span className="ml-auto bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      {channel.unread_count}
                    </span>
                                    )}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* 语音频道 */}
                {voiceChannels.length > 0 && (
                    <div className="mt-4">
                        <div className="flex items-center justify-between px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            <span>Voice Channels</span>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button className="text-gray-400 hover:text-gray-200">
                                        <Plus className="h-3 w-3" />
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent side="top">
                                    Create Voice Channel
                                </TooltipContent>
                            </Tooltip>
                        </div>

                        <div className="mt-1 space-y-1">
                            {voiceChannels.map((channel) => (
                                <button
                                    key={channel.id}
                                    className={`flex items-center px-2 py-1 rounded mx-2 w-full text-left ${
                                        currentChannelId === channel.id
                                            ? 'bg-discord-dark-300 text-white'
                                            : 'text-gray-400 hover:bg-discord-dark-300 hover:text-gray-200'
                                    }`}
                                >
                                    {getChannelIcon(channel.type)}
                                    <span className="ml-1">{channel.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* 公告频道 */}
                {announcementChannels.length > 0 && (
                    <div className="mt-4">
                        <div className="flex items-center justify-between px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            <span>Announcements</span>
                        </div>

                        <div className="mt-1 space-y-1">
                            {announcementChannels.map((channel) => (
                                <Link
                                    key={channel.id}
                                    href={`/servers/${server.id}/channels/${channel.id}`}
                                    className={`flex items-center px-2 py-1 rounded mx-2 ${
                                        currentChannelId === channel.id
                                            ? 'bg-discord-dark-300 text-white'
                                            : 'text-gray-400 hover:bg-discord-dark-300 hover:text-gray-200'
                                    }`}
                                >
                                    {getChannelIcon(channel.type)}
                                    <span className="ml-1">{channel.name}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </ScrollArea>

            {/* 用户面板区域 */}
            <div className="p-2 border-t border-discord-dark">
                <div className="flex items-center justify-between p-2 rounded bg-discord-dark-300">
                    <div className="flex items-center">
                        <div className="relative">
                            <div className="h-8 w-8 rounded-full bg-discord-primary flex items-center justify-center text-white">
                                {server.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-discord-dark-300"></div>
                        </div>
                        <div className="ml-2">
                            <div className="text-sm font-medium text-gray-200">{server.name}</div>
                            <div className="text-xs text-gray-400">Online</div>
                        </div>
                    </div>
                    <div className="flex space-x-1">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button className="text-gray-400 hover:text-gray-200">
                                    <Mic className="h-4 w-4" />
                                </button>
                            </TooltipTrigger>
                            <TooltipContent side="top">
                                Mute
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button className="text-gray-400 hover:text-gray-200">
                                    <Headphones className="h-4 w-4" />
                                </button>
                            </TooltipTrigger>
                            <TooltipContent side="top">
                                Deafen
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button className="text-gray-400 hover:text-gray-200">
                                    <Settings className="h-4 w-4" />
                                </button>
                            </TooltipTrigger>
                            <TooltipContent side="top">
                                User Settings
                            </TooltipContent>
                        </Tooltip>
                    </div>
                </div>
            </div>
        </div>
    )
}
