"use client";

import { Identifier, MessageSend } from "@/shared/types";
import { useEffect, useState } from "react";
import AttachMenu from "./composer/attach";
import EmojiPicker from "./composer/emoji";
import SendText from "./composer/sendText";
import TextInput from "./composer/text";
import VoiceInput from "./composer/voice";

interface IProps {
  chatId: string;
  onStartTyping: (chat: Identifier) => void;
  onStopTyping: (chat: Identifier) => void;
  onSendMessage: (data: MessageSend, ack: () => void) => void;
}

const ChatComposer: React.FC<IProps> = ({
  chatId,
  onStartTyping,
  onStopTyping,
  onSendMessage,
}) => {
  const [textMessage, setTextMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (!isTyping) {
      setIsTyping(true);
      onStartTyping({ id: chatId });
    }

    // Reset timer each time the message changes
    timeoutId = setTimeout(() => {
      setIsTyping(false);
      onStopTyping({ id: chatId });
    }, 1000);

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
      onSendMessage({ chatId, content: textMessage }, handleClearInput);
    }
  };

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
