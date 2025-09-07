"use client";

import { useEffect, useState } from "react";
import AttachMenu from "./composer/attach";
import EmojiPicker from "./composer/emoji";
import SendText from "./composer/sendText";
import TextInput from "./composer/text";
import VoiceInput from "./composer/voice";
import { ChatSendMsg } from "@/shared/types";

interface IProps {
  chatId: string;
  // onStartTyping: () => void;
  // onStopTyping: () => void;
  onSendMessage: (data: ChatSendMsg, ack: () => void) => void;
}

const ChatComposer: React.FC<IProps> = ({
  chatId,
  // onStartTyping,
  // onStopTyping,
  onSendMessage,
}) => {
  const [textMessage, setTextMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (textMessage.trim()) {
      if (!isTyping) {
        setIsTyping(true);
        // onStartTyping();
      }

      // Reset timer each time the message changes
      timeoutId = setTimeout(() => {
        setIsTyping(false);
        // onStopTyping();
      }, 1500);
    } else {
      if (isTyping) {
        setIsTyping(false);
        // onStopTyping();
      }
    }

    // Cleanup to clear the previous timeout
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [textMessage]);

  const handleClearInput = () => {
    setTextMessage("");
  };

  const handleSendMessage = () => {
    if (textMessage.trim()) {
      onSendMessage({ receiverId: chatId, content: textMessage }, handleClearInput);
    }
  };

  return (
    <footer className="w-full max-w-6xl mx-auto flex gap-2 px-5">
      <section className="w-full flex justify-center items-center gap-1 bg-background px-4 py-2 mb-6 rounded-full">
        <EmojiPicker />
        <TextInput value={textMessage} onChange={setTextMessage} />
        <AttachMenu />
      </section>
      {textMessage ? <SendText onSend={handleSendMessage} /> : <VoiceInput />}
    </footer>
  );
};

export default ChatComposer;
