import { create } from "zustand";

export type MessageType = "user" | "ai";

export interface Message {
  id: string;
  content: string;
  type: MessageType;
  timestamp: Date;
}

interface ChatStore {
  messages: Message[];
  addMessage: (content: string, type: MessageType) => void;
  sendUserMessage: (content: string) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  messages: [
    {
      id: "1",
      content: "Hello",
      type: "user",
      timestamp: new Date(),
    },
    {
      id: "2",
      content:
        "Hello User! I'm your AI learning assistant. I can help you with questions from your Mathematics textbook. What would you like to learn about today?",
      type: "ai",
      timestamp: new Date(),
    },
  ],

  addMessage: (content: string, type: MessageType) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      type,
      timestamp: new Date(),
    };

    set((state) => ({
      messages: [...state.messages, newMessage],
    }));
  },

  sendUserMessage: (content: string) => {
    set((state) => {
      const userMessage: Message = {
        id: Date.now().toString(),
        content,
        type: "user",
        timestamp: new Date(),
      };

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "Hello User! I'm your AI learning assistant. I can help you with questions from your Mathematics textbook. What would you like to learn about today?",
        type: "ai",
        timestamp: new Date(),
      };

      return {
        messages: [...state.messages, userMessage, aiMessage],
      };
    });
  },
}));
