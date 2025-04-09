import { type Server, type Channel, type ServerList } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";
import { Link } from '@inertiajs/react';

export default function ServerList({ servers, currentServerId }: {
    servers: ServerList,
    currentServerId?: string
}) {
    return (
        <div className="w-16 bg-gray-900 flex flex-col items-center py-3 space-y-2 border-r border-gray-800">
            {/* Server icons would go here */}
            {servers.map((server) => (
                <Tooltip key={server.id}>
                    <TooltipTrigger asChild>
                        <Link
                            href={`/servers/${server.id}`}
                            className={`relative rounded-full transition-all ${
                                currentServerId === server.id
                                    ? 'rounded-2xl font-bold'
                                    : 'hover:rounded-2xl bg-discord-dark-100 hover:bg-discord-primary'
                            }`}
                        >
                            <Avatar className="h-12 w-12">
                                <AvatarImage src={server.icon} />
                                <AvatarFallback>
                                    {server.name.split(' ').map((word) => word[0]).join('')}
                                </AvatarFallback>
                            </Avatar>
                        </Link>
                    </TooltipTrigger>
                </Tooltip>
            ))}

            {/* Add server button */}
            <div
                className="w-12 h-12 rounded-full bg-gray-700 hover:bg-green-500 transition-colors cursor-pointer flex items-center justify-center text-green-500 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                </svg>
            </div>
        </div>
    );
}
