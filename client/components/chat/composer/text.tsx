import { Input } from "@/components/ui/input";

interface IProps {
    value: string;
    onChange: (value: string) => void;
}

const TextInput: React.FC<IProps> = ({ value, onChange }) => {
  return (
    <Input
      type="text"
      placeholder="Type your message..."
      className="border-0 rounded-lg px-1 mb-0.5 w-full flex-1 focus-visible:ring-0 shadow-none"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default TextInput;
