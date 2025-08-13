"use client";

import { useEffect, useRef, useState } from "react";
import AttachMenu from "./footer/attach";
import EmojiPicker from "./footer/emoji";
import SendText from "./footer/sendText";
import TextInput from "./footer/text";
import VoiceInput from "./footer/voice";

interface IProps {
  onTypingStart: () => void;
  onTypingStop: () => void;
  onSendMessage: (message: string, ack: () => void) => void;
}

const ChatFooter: React.FC<IProps> = ({
  onTypingStart,
  onTypingStop,
  onSendMessage,
}) => {
  const [textMessage, setTextMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (textMessage.trim()) {
      if (!isTyping) {
        setIsTyping(true);
        onTypingStart();
      }

      // Reset timer each time the message changes
      timeoutId = setTimeout(() => {
        setIsTyping(false);
        onTypingStop();
      }, 1500);
    } else {
      if (isTyping) {
        setIsTyping(false);
        onTypingStop();
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
      onSendMessage(textMessage, handleClearInput);
    }
  };

  return (
    <footer className="w-full flex gap-2 px-4">
      <section className="w-full flex justify-center items-center gap-1 bg-background px-4 py-2 mb-6 rounded-full">
        <EmojiPicker />
        <TextInput value={textMessage} onChange={setTextMessage} />
        <AttachMenu />
      </section>
      {textMessage ? <SendText onSend={handleSendMessage} /> : <VoiceInput />}
    </footer>
  );
};

export default ChatFooter;
