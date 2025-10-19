"use client";

import { useAuth } from "@/hooks/useAuth";
import { Chat, Identifier, MessageSend } from "@/shared/types";
import { useEffect, useState } from "react";
import AttachMenu from "./composer/attach";
import EmojiPicker from "./composer/emoji";
import SendText from "./composer/sendText";
import TextInput from "./composer/text";
import VoiceInput from "./composer/voice";

interface IProps {
  chatId: string;
  metaData: Chat;
  onStartTyping: (chat: Identifier) => void;
  onStopTyping: (chat: Identifier) => void;
  onSendMessage: (data: MessageSend, ack: () => void) => void;
}

const ChatComposer: React.FC<IProps> = ({
  chatId,
  metaData,
  onStartTyping,
  onStopTyping,
  onSendMessage,
}) => {
  const [textMessage, setTextMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (textMessage.trim()) {
      if (!isTyping) {
        setIsTyping(true);
        onStartTyping({ id: chatId });
      }

      // Reset timer each time the message changes
      timeoutId = setTimeout(() => {
        setIsTyping(false);
        onStopTyping({ id: chatId });
      }, 1500);
    } else {
      if (isTyping) {
        setIsTyping(false);
        onStopTyping({ id: chatId });
      }
    }

    // Cleanup to clear the previous timeout
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [textMessage, chatId, isTyping, onStartTyping, onStopTyping]);

  const handleClearInput = () => {
    setTextMessage("");
    setIsTyping(false);
    onStopTyping({ id: chatId });
  };

  const handleSendMessage = () => {
    if (textMessage.trim()) {
      onSendMessage({ chatId, content: textMessage }, handleClearInput);
    }
  };

  if (metaData.type === "Channel") {
    // Get current user's role from id
    const userRole = metaData.members.find(
      (member) => member.id === currentUser.id
    )?.role;
    if (userRole !== "Owner" && userRole !== "Admin") {
      return null;
    }
  }

  return (
    <footer className="w-full max-w-6xl mx-auto flex gap-2 px-5">
      <section className="w-full flex justify-center items-center gap-1 bg-background px-4 py-1.25 mb-6 rounded-full">
        <EmojiPicker />
        <TextInput
          value={textMessage}
          onChange={setTextMessage}
          onSend={handleSendMessage}
        />
        <AttachMenu />
      </section>
      {textMessage ? <SendText onSend={handleSendMessage} /> : <VoiceInput />}
    </footer>
  );
};

export default ChatComposer;
