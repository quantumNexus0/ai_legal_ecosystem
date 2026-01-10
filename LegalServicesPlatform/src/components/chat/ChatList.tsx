import { useChatStore } from '../../store/chatStore';
import { useAuthStore } from '../../store/authStore';


const ChatList = () => {
  const { chats, setActiveChat, activeChat } = useChatStore();
  const { user } = useAuthStore();

  if (!user) return null;

  return (
    <div className="border-r h-full overflow-y-auto">
      <div className="p-4">
        <h2 className="text-lg font-semibold">Messages</h2>
      </div>
      <div className="space-y-1">
        {chats.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No messages yet</p>
        ) : (
          chats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setActiveChat(chat)}
              className={`w-full p-4 text-left hover:bg-gray-50 transition-colors duration-200 border-l-4 ${activeChat?.id === chat.id ? 'bg-blue-50 border-blue-600' : 'border-transparent'
                }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-3">
                  <img
                    src={chat.profile_image_url || `https://ui-avatars.com/api/?name=${chat.name}&background=random`}
                    alt={chat.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="overflow-hidden">
                    <p className="font-semibold text-gray-900 truncate">{chat.name}</p>
                    {chat.last_message && (
                      <p className="text-sm text-gray-500 truncate">
                        {chat.last_message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-1">
                  {chat.last_message_time && (
                    <span className="text-xs text-gray-400">
                      {new Date(chat.last_message_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  )}
                  {chat.unread_count > 0 && (
                    <span className="bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                      {chat.unread_count}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default ChatList;
