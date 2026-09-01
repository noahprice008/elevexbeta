import { createContext, useContext, useState, type ReactNode } from "react";

interface ChatContextValue {
  open: boolean;
  setOpen: (value: boolean) => void;
  toggle: () => void;
}

const ChatContext = createContext<ChatContextValue | null>(null);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((prev) => !prev);
  return <ChatContext.Provider value={{ open, setOpen, toggle }}>{children}</ChatContext.Provider>;
}

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be used within a ChatProvider");
  return ctx;
}
