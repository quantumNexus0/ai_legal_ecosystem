import api from './api';

export interface Message {
  id: number;
  sender_id: number;
  receiver_id: number;
  content: string;
  is_read: boolean;
  created_at: string;
  case_id?: number | null;
}

export interface Chat {
  id: number;
  name: string;
  email: string;
  role: string;
  profile_image_url?: string;
  last_message?: string;
  last_message_time?: string;
  unread_count: number;
}

export const messageService = {
  getChats: async (): Promise<Chat[]> => {
    const response = await api.get('/messages/chats');
    return response.data;
  },

  getConversation: async (otherUserId: number): Promise<Message[]> => {
    const response = await api.get(`/messages/conversation/${otherUserId}`);
    return response.data;
  },

  sendMessage: async (content: string, receiverId: number, caseId?: number): Promise<Message> => {
    const response = await api.post('/messages', {
      content,
      receiver_id: receiverId,
      case_id: caseId
    });
    return response.data;
  },
};
