import { Button } from "@/components/ui/button";
import { ArrowDownIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

interface IProps {
  scrollRef: React.RefObject<HTMLDivElement>;
}

const ScrollToBottom: React.FC<IProps> = ({ scrollRef }) => {
  // if (!scrollRef) return null;

  const [visible, setVisible] = useState(false);

  const scrollToBottom = useCallback((behavior: "instant" | "smooth") => {
    const el = scrollRef.current?.querySelector(
      "[data-radix-scroll-area-viewport]"
    );
    if (el) {
      el.scrollTo({
        behavior,
        top: el.scrollHeight,
      });
    }
  }, [scrollRef]);

  useEffect(() => {
    const el = scrollRef.current?.querySelector(
      "[data-radix-scroll-area-viewport]"
    );
    if (!el) return;

    const handleScroll = () => {
      // Show button if user is not at the bottom
      const isAtBottom = el.scrollTop > el.scrollHeight - el.clientHeight - 200;
      setVisible(!isAtBottom);
    };
    scrollToBottom("instant");
    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, [scrollRef, scrollToBottom]);

  if (!visible) return null;

  return (
    <Button
      variant="outline"
      className="sticky bottom-5 left-[calc(100%-4.5rem)] size-12 rounded-full cursor-pointer"
      onClick={() => scrollToBottom("smooth")}
    >
      <ArrowDownIcon className="size-6 text-muted-foreground" />
    </Button>
  );
};

export default ScrollToBottom;
