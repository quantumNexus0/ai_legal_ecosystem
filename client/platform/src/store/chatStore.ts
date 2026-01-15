import { create } from 'zustand';
import { messageService, Message, Chat } from '../services/messageService';

interface ChatState {
  chats: Chat[];
  activeChat: Chat | null;
  messages: Message[];
  isLoading: boolean;
  loadChats: () => Promise<void>;
  setActiveChat: (chat: Chat | null) => void;
  loadMessages: (otherUserId: number) => Promise<void>;
  sendMessage: (content: string, receiverId: number, caseId?: number) => Promise<void>;
  startChat: (user: { id: number, name: string, profile_image_url?: string }) => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  chats: [],
  activeChat: null,
  messages: [],
  isLoading: false,

  loadChats: async () => {
    set({ isLoading: true });
    try {
      const fetchedChats = await messageService.getChats();

      // Check if we have an active chat that is new (temporary) and not in the fetched list
      const currentActive = get().activeChat;
      let finalChats = fetchedChats;

      if (currentActive) {
        const found = fetchedChats.find(c => c.id === currentActive.id);
        if (!found) {
          // It's a temporary chat, keep it in the list
          finalChats = [currentActive, ...fetchedChats];
        } else {
          // Update active chat with latest data/last message from server
          set({ activeChat: found });
        }
      }

      set({ chats: finalChats, isLoading: false });
    } catch (error) {
      console.error('Error loading chats:', error);
      set({ isLoading: false });
    }
  },

  setActiveChat: (chat: Chat | null) => {
    set({ activeChat: chat, messages: [] });
    if (chat) {
      get().loadMessages(chat.id);
    }
  },

  loadMessages: async (otherUserId: number) => {
    try {
      const messages = await messageService.getConversation(otherUserId);
      set({ messages });
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  },

  sendMessage: async (content: string, receiverId: number, caseId?: number) => {
    try {
      const newMessage = await messageService.sendMessage(content, receiverId, caseId);
      set((state) => ({
        messages: [...state.messages, newMessage]
      }));
      // Refresh chats list to update last message
      get().loadChats();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  },
  startChat: (otherUser: { id: number, name: string, profile_image_url?: string }) => {
    const existingChat = get().chats.find(c => c.id === otherUser.id);
    if (existingChat) {
      get().setActiveChat(existingChat);
    } else {
      const newChat: Chat = {
        id: otherUser.id,
        name: otherUser.name,
        email: '', // Not strictly needed for UI display here
        role: 'lawyer', // Or whatever
        profile_image_url: otherUser.profile_image_url,
        unread_count: 0
      };
      set({ activeChat: newChat, messages: [] });
      set({ chats: [newChat, ...get().chats] });
    }
  },
}));
