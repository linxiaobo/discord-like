import ChatLayout from '@/layouts/chat-layout';
import MessageListDemo from "@/components/chat/message-list-demo";

export default function Demo() {
    return (
        <ChatLayout>
            <div className="flex h-full">
                {/* Server sidebar */}
                <div className="w-16 bg-gray-900 flex flex-col items-center py-3 space-y-2 border-r border-gray-800">
                    {/* Server icons would go here */}
                    <div
                        className="w-12 h-12 rounded-full bg-gray-700 hover:bg-indigo-500 transition-colors cursor-pointer"></div>
                    <div
                        className="w-12 h-12 rounded-full bg-gray-700 hover:bg-indigo-500 transition-colors cursor-pointer"></div>
                    <div
                        className="w-12 h-12 rounded-full bg-gray-700 hover:bg-indigo-500 transition-colors cursor-pointer"></div>

                    {/* Add server button */}
                    <div
                        className="w-12 h-12 rounded-full bg-gray-700 hover:bg-green-500 transition-colors cursor-pointer flex items-center justify-center text-green-500 hover:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                        </svg>
                    </div>
                </div>

                {/* Channel sidebar */}
                <div className="w-60 bg-gray-800 flex flex-col">
                    {/* Server name header */}
                    <div
                        className="flex items-center justify-between px-4 py-3 border-b border-gray-900 shadow-sm cursor-pointer hover:bg-gray-700">
                        <h2 className="font-semibold truncate">Server Name</h2>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                             fill="currentColor">
                            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/>
                        </svg>
                    </div>

                    {/* Channel list */}
                    <div className="flex-1 overflow-y-auto px-2 py-2 space-y-1">
                        {/* Channel categories and channels would go here */}
                        <div className="text-xs font-semibold text-gray-400 px-2 py-1 uppercase tracking-wider">TEXT
                            CHANNELS
                        </div>
                        <div className="px-2 py-1 rounded hover:bg-gray-700 text-gray-300 cursor-pointer"># general</div>
                        <div className="px-2 py-1 rounded hover:bg-gray-700 text-gray-300 cursor-pointer"># random</div>
                    </div>

                    {/* User panel */}
                    <div className="p-2 bg-gray-800 border-t border-gray-900">
                        <div className="flex items-center justify-between p-2 rounded hover:bg-gray-700">
                            <div className="flex items-center">
                                <div className="relative">
                                    <div
                                        className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-xs">US
                                    </div>
                                    <div
                                        className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-gray-800"></div>
                                </div>
                                <div className="ml-2">
                                    <div className="text-sm font-medium">Username</div>
                                    <div className="text-xs text-gray-400">#1234</div>
                                </div>
                            </div>
                            <div className="flex space-x-1 text-gray-400">
                                {/* Mic, headphone, settings icons would go here */}
                                <svg className="w-5 h-5 hover:text-gray-200" fill="none" stroke="currentColor"
                                     viewBox="0 0 24 24">
                                    <path d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"/>
                                </svg>
                            </div>
                        </div>
                    </div>
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
                        <MessageListDemo />
                    </div>

                    {/* Message input */}
                    <div className="p-4">
                        <div className="bg-gray-600 rounded-lg px-4 py-2">
                            <div className="flex items-center">
                                <button className="text-gray-400 hover:text-gray-200 p-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                                         viewBox="0 0 24 24" stroke="currentColor">
                                        <path d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                                    </svg>
                                </button>
                                <input
                                    type="text"
                                    placeholder="Message #channel"
                                    className="bg-transparent flex-1 px-2 py-1 text-gray-200 focus:outline-none"
                                />
                            </div>
                        </div>
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
