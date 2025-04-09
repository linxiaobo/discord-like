import { type Server } from '@/types';

export default function ChannelList({ server }: { server: Server }) {
    const channels = server.channels;

    return (
        <div>
            <div className="text-xs font-semibold text-gray-400 px-2 py-1 uppercase tracking-wider">
                TEXT CHANNELS
            </div>
            {channels.map((channel) => (
                <div className="px-2 py-1 rounded hover:bg-gray-700 text-gray-300 cursor-pointer">
                    # {channel.name}
                </div>
            ))}
        </div>
    );
}
