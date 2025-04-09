import { format } from 'date-fns';
import { useMessages } from "@/components/chat/message-store";

const MessageList = () => {

    const userStatusBgClass = (message) => {
        let className = '';
        switch (message.user.status) {
            case 'online':
                className = 'bg-indigo-500';
                break;
            case 'idle':
                className = 'bg-yellow-500';
                break;
            case 'dnd':
                className = 'bg-red-500';
                break;
            default:
                className = 'bg-gray-500';
        }

        return className;
    }

    const userStatusTextClass = (message) => {
        let className = '';
        switch (message.user.status) {
            case 'online':
                className = 'text-indigo-100';
                break;
            case 'idle':
                className = 'text-yellow-500';
                break;
            case 'dnd':
                className = 'text-red-500';
                break;
            default:
                className = 'text-gray-300';
        }

        return className;
    }

    const messages = useMessages();

    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* 系统消息示例 */}
            <div className="flex items-start">
                <div className="mr-4 flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center">
                        <svg
                            className="w-6 h-6 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </div>
                </div>
                <div>
                    <div className="flex items-baseline">
                        <span className="font-semibold text-gray-300">系统通知</span>
                        <span className="ml-2 text-xs text-gray-400">今天 12:00</span>
                    </div>
                    <p className="text-gray-300 mt-1">欢迎来到本频道！请遵守聊天规则。</p>
                </div>
            </div>

            {/* 用户消息示例 1 */}
            {messages.map((message, index) => (
                <div className="flex items-start group" key={index}>
                    <div className="mr-4 flex-shrink-0">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium ${userStatusBgClass(message)}`}>
                            {message.user.name.split(' ').map(n => n[0]).join('')}
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="flex items-baseline">
                            <span className={`font-semibold ${userStatusTextClass(message)}`}>{message.user.name}</span>
                            <span className="ml-2 text-xs text-gray-400">{format(new Date(message.created_at), 'MMM d, yyyy h:mm a')}</span>
                        </div>
                        <p className="text-gray-100 mt-1">{message.content}</p>
                    </div>
                </div>
            ))}

            {/* 用户消息示例 2 */}
            <div className="flex items-start group">
                <div className="mr-4 flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-medium">
                        BO
                    </div>
                </div>
                <div className="flex-1">
                    <div className="flex items-baseline">
                        <span className="font-semibold text-green-300">Bob</span>
                        <span className="ml-2 text-xs text-gray-400">今天 12:07</span>
                    </div>
                    <p className="text-gray-100 mt-1">欢迎 Alice！有什么问题随时问我们。</p>
                    <p className="text-gray-100 mt-1">这里的人都很好相处的 😊</p>
                </div>
            </div>

            {/* 用户消息示例 3 (带回复) */}
            <div className="flex items-start group">
                <div className="mr-4 flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-medium">
                        CH
                    </div>
                </div>
                <div className="flex-1">
                    <div className="flex items-baseline">
                        <span className="font-semibold text-purple-300">Charlie</span>
                        <span className="ml-2 text-xs text-gray-400">今天 12:10</span>
                    </div>
                    <div className="text-sm text-gray-400 mb-1 flex items-center">
                        <svg
                            className="w-4 h-4 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                            />
                        </svg>
                        回复 Bob
                    </div>
                    <div className="text-gray-100 bg-gray-600 rounded px-3 py-2">
                        完全同意！我们还有个新手指南在 #resources 频道。
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MessageList;
