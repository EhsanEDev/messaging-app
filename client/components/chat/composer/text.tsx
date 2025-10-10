import { Input } from "@/components/ui/input";

interface IProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
}

const TextInput: React.FC<IProps> = ({ value, onChange, onSend }) => {
  return (
    <Input
      type="text"
      placeholder="Type your message..."
      className="border-0 rounded-lg px-1 mb-0.5 w-full flex-1 focus-visible:ring-0 shadow-none bg-background!"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault(); // prevents newline in input
          onSend();
        }
      }}
    />
  );
};

export default TextInput;
