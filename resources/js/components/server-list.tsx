import { Link } from '@inertiajs/react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { PlusIcon } from "lucide-react";

interface Server {
    id: string
    name: string
    icon?: string
    unread_count?: number
}

export default function ServerList({ servers, currentServerId }: {
    servers: Server[]
    currentServerId?: string
}) {
    return (
        <div className="flex flex-col items-center space-y-2 py-3 bg-discord-dark w-16">
            {servers.map((server) => (
                <Tooltip key={server.id}>
                    <TooltipTrigger asChild>
                        <Link
                            href={`/servers/${server.id}`}
                            className={`relative rounded-full transition-all ${
                                currentServerId === server.id
                                    ? 'rounded-2xl bg-discord-primary'
                                    : 'hover:rounded-2xl bg-discord-dark-100 hover:bg-discord-primary'
                            }`}
                        >
                            <Avatar className="h-12 w-12">
                                <AvatarImage src={server.icon} />
                                <AvatarFallback>
                                    {server.name.split(' ').map((word) => word[0]).join('')}
                                </AvatarFallback>
                            </Avatar>

                            {server.unread_count && (
                                <span className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
                  {server.unread_count}
                </span>
                            )}
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                        {server.name}
                    </TooltipContent>
                </Tooltip>
            ))}

            <Tooltip>
                <TooltipTrigger asChild>
                    <button className="rounded-full bg-discord-dark-100 hover:bg-green-500 transition-colors h-12 w-12 flex items-center justify-center text-green-500 hover:text-white">
                        {<PlusIcon className="h-5 w-5" />}
                    </button>
                </TooltipTrigger>
                <TooltipContent side="right">
                    Add a Server
                </TooltipContent>
            </Tooltip>
        </div>
    )
}
