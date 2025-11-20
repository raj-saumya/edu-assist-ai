import { create } from "zustand";
import { streamConvoWithDummyData } from "~/api/convo";

export type MessageType = "user" | "ai";

export type Message = {
  id: string;
  content: string;
  type: MessageType;
  timestamp: Date;
  imageUrl?: string;
};

export type WorkspaceType = "canvas" | "pdf" | null;

type ChatStore = {
  messages: Message[];
  addMessage: (content: string, type: MessageType, imageUrl?: string) => void;
  updateMessage: (id: string, content: string) => void;
  sendUserMessage: (content: string, imageUrl?: string) => void;
  sendStreamingMessage: (content: string, imageUrl?: string) => void;
  activeWorkspace: WorkspaceType;
  toggleWorkspace: (type: WorkspaceType) => void;
  closeWorkspace: () => void;
  isCanvasOpen: boolean;
  toggleCanvas: () => void;
  setCanvasOpen: (isOpen: boolean) => void;
};

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

  addMessage: (content: string, type: MessageType, imageUrl?: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      type,
      timestamp: new Date(),
      imageUrl,
    };

    set((state) => ({
      messages: [...state.messages, newMessage],
    }));
  },

  updateMessage: (id: string, content: string) => {
    set((state) => ({
      messages: state.messages.map((msg) =>
        msg.id === id ? { ...msg, content } : msg
      ),
    }));
  },

  sendUserMessage: (content: string, imageUrl?: string) => {
    set((state) => {
      const userMessage: Message = {
        id: Date.now().toString(),
        content,
        type: "user",
        timestamp: new Date(),
        imageUrl,
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

  sendStreamingMessage: (content: string, imageUrl?: string) => {
    const userMessageId = Date.now().toString();
    const aiMessageId = (Date.now() + 1).toString();

    // Add user message
    set((state) => {
      const userMessage: Message = {
        id: userMessageId,
        content,
        type: "user",
        timestamp: new Date(),
        imageUrl,
      };

      return {
        messages: [...state.messages, userMessage],
      };
    });

    // Add empty AI message that will be updated as stream comes in
    set((state) => {
      const aiMessage: Message = {
        id: aiMessageId,
        content: "",
        type: "ai",
        timestamp: new Date(),
      };

      return {
        messages: [...state.messages, aiMessage],
      };
    });

    // Start streaming
    streamConvoWithDummyData(
      (chunk) => {
        // Update AI message with the extracted response content
        // The chunk is already the parsed 'response' field from the JSON
        set((state) => ({
          messages: state.messages.map((msg) =>
            msg.id === aiMessageId ? { ...msg, content: chunk } : msg
          ),
        }));
      },
      () => {
        // On complete
        console.log("Stream complete");
      },
      (error) => {
        // On error
        console.error("Stream error:", error);
        set((state) => ({
          messages: state.messages.map((msg) =>
            msg.id === aiMessageId
              ? { ...msg, content: "Error: Failed to get response" }
              : msg
          ),
        }));
      }
    );
  },
  activeWorkspace: null,
  toggleWorkspace: (type: WorkspaceType) =>
    set((state) => ({
      activeWorkspace: state.activeWorkspace === type ? null : type,
    })),
  closeWorkspace: () => set({ activeWorkspace: null }),
  isCanvasOpen: false,
  toggleCanvas: () =>
    set((state) => ({
      isCanvasOpen: !state.isCanvasOpen,
      activeWorkspace: !state.isCanvasOpen ? "canvas" : null,
    })),
  setCanvasOpen: (isOpen: boolean) =>
    set({ isCanvasOpen: isOpen, activeWorkspace: isOpen ? "canvas" : null }),
}));
