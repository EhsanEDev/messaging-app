import { cn } from "@/lib/utils";

interface IProps {
  isOwn: boolean;
}

const BubbleCorner: React.FC<IProps> = ({ isOwn }) => {
  return (
    <svg
      className={cn("self-end", {
        "left-[100%] scale-x-100": isOwn,
        "right-[100%] -scale-x-100": !isOwn,
      })}
      width="15"
      height="20"
      viewBox="0 0 15 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M 6 20 H 0 V 0 C 0.2 3 1 6 3 10 c 2 3 3 7 13 10 z"
        fill="var(--background)"
      />
    </svg>
  );
};

export default BubbleCorner;
