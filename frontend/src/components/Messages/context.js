import { createContext } from "react";

export const IMessage = {
  text: undefined,
  onUndo: undefined,
};
export const MessageContext = createContext(IMessage);