import { usePage } from '@inertiajs/react'
import { format, formatDistanceToNow } from 'date-fns'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal, Reply, Pin, Trash2, Pencil } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { useMemo } from 'react'

interface User {
    id: string
    name: string
    avatar?: string
    status?: string
}

interface Message {
    id: string
    content: string
    created_at: string
    edited_at?: string
    is_pinned: boolean
    user: User
    reactions?: Array<{
        id: string
        emoji: string
        count: number
        me: boolean
    }>
    replies?: Message[]
}

export default function MessageView({ messages }: { messages: Message[] }) {
    const { auth } = usePage().props
    const currentUser = auth.user as User

    // 分组连续消息
    const groupedMessages = useMemo(() => {
        return messages.reduce((acc: any[], message, index) => {
            const prevMessage = messages[index - 1]

            // 如果上一条消息是同一个人在10分钟内发送的，则分组
            const shouldGroup = prevMessage &&
                prevMessage.user.id === message.user.id &&
                new Date(message.created_at).getTime() - new Date(prevMessage.created_at).getTime() < 600000

            if (shouldGroup) {
                acc[acc.length - 1].messages.push(message)
            } else {
                acc.push({
                    user: message.user,
                    timestamp: message.created_at,
                    messages: [message],
                })
            }

            return acc
        }, [])
    }, [messages])

    return (
        <ScrollArea className="h-full w-full">
            <div className="flex flex-col space-y-4 p-4">
                {groupedMessages.map((group, groupIndex) => (
                    <div key={`${group.user.id}-${groupIndex}`} className="flex group">
                        <div className="mr-4 flex-shrink-0">
                            {group.messages[0] === group.messages.at(0) && (
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <div className="relative">
                                            <Avatar className="h-10 w-10">
                                                <AvatarImage src={group.user.avatar} />
                                                <AvatarFallback>
                                                    {group.user.name.split(' ').map(n => n[0]).join('')}
                                                </AvatarFallback>
                                            </Avatar>
                                            {group.user.status && (
                                                <div className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-discord-dark-200 ${
                                                    group.user.status === 'online' ? 'bg-green-500' :
                                                        group.user.status === 'idle' ? 'bg-yellow-500' :
                                                            group.user.status === 'dnd' ? 'bg-red-500' : 'bg-gray-500'
                                                }`}></div>
                                            )}
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent side="top">
                                        {group.user.name}
                                    </TooltipContent>
                                </Tooltip>
                            )}
                        </div>

                        <div className="flex-1">
                            {group.messages[0] === group.messages.at(0) && (
                                <div className="flex items-center space-x-2">
                                    <span className="font-semibold text-gray-200">{group.user.name}</span>
                                    <span className="text-xs text-gray-400">
                    {format(new Date(group.timestamp), 'MMM d, yyyy h:mm a')}
                  </span>
                                </div>
                            )}

                            <div className="space-y-1">
                                {group.messages.map((message: Message) => (
                                    <div
                                        key={message.id}
                                        className="flex items-start group hover:bg-discord-dark-300/30 rounded px-2 py-1"
                                    >
                                        <div className="flex-1">
                                            <div className="text-gray-100 whitespace-pre-wrap">
                                                {message.content}
                                            </div>

                                            {message.edited_at && (
                                                <span className="text-xs text-gray-400">
                          (edited {formatDistanceToNow(new Date(message.edited_at))} ago)
                        </span>
                                            )}

                                            {message.reactions && message.reactions.length > 0 && (
                                                <div className="flex flex-wrap gap-1 mt-1">
                                                    {message.reactions.map((reaction) => (
                                                        <button
                                                            key={`${message.id}-${reaction.emoji}`}
                                                            className={`text-xs px-2 py-0.5 rounded-full flex items-center space-x-1 ${
                                                                reaction.me
                                                                    ? 'bg-blue-500/20 text-blue-200 border border-blue-500/30'
                                                                    : 'bg-discord-dark-300 text-gray-300 hover:bg-discord-dark-400'
                                                            }`}
                                                        >
                                                            <span>{reaction.emoji}</span>
                                                            <span>{reaction.count}</span>
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 text-gray-400 hover:text-gray-200 hover:bg-discord-dark-400"
                                                    >
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent className="w-48 bg-discord-dark-300 border-discord-dark-400">
                                                    <DropdownMenuItem className="focus:bg-discord-dark-400">
                                                        <Reply className="mr-2 h-4 w-4" />
                                                        <span>Reply</span>
                                                    </DropdownMenuItem>

                                                    {message.is_pinned ? (
                                                        <DropdownMenuItem className="focus:bg-discord-dark-400">
                                                            <Pin className="mr-2 h-4 w-4" />
                                                            <span>Unpin</span>
                                                        </DropdownMenuItem>
                                                    ) : (
                                                        <DropdownMenuItem className="focus:bg-discord-dark-400">
                                                            <Pin className="mr-2 h-4 w-4" />
                                                            <span>Pin</span>
                                                        </DropdownMenuItem>
                                                    )}

                                                    {message.user.id === currentUser.id && (
                                                        <>
                                                            <DropdownMenuItem className="focus:bg-discord-dark-400">
                                                                <Pencil className="mr-2 h-4 w-4" />
                                                                <span>Edit</span>
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem className="text-red-400 focus:bg-red-500/10">
                                                                <Trash2 className="mr-2 h-4 w-4" />
                                                                <span>Delete</span>
                                                            </DropdownMenuItem>
                                                        </>
                                                    )}
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </ScrollArea>
    )
}
