import React from 'react';
import { useAuthStore } from '../../store/authStore';
import type { Message } from '../../services/messageService';
import { formatDistanceToNow } from 'date-fns';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const { user } = useAuthStore();
  const isOwn = Number(user?.id) === message.sender_id;

  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[70%] rounded-lg p-3 ${isOwn
          ? 'bg-blue-600 text-white'
          : 'bg-gray-100 text-gray-900'
          }`}
      >
        <p className="text-sm">{message.content}</p>
        <span className="text-xs opacity-75 mt-1 block">
          {formatDistanceToNow(new Date(message.created_at))} ago
        </span>
      </div>
    </div>
  );
};

export default ChatMessage;
