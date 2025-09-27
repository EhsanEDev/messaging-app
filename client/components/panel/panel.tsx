import { Loader2Icon } from "lucide-react";
import React from "react";

interface IProps<T> {
  header: { btn: React.ReactNode; input: React.ReactNode };
  loading?: boolean;
  list: Array<T>;
  renderItem: (item: T) => React.ReactNode;
  emptyMessage?: string;
}
// Using render props + generic to create a reusable panel component
function Panel<T>({
  header,
  loading,
  list,
  renderItem,
  emptyMessage = "No items available",
}: IProps<T>) {
  let content;
  if (loading) {
    content = (
      <div className="flex-1 flex justify-center items-center">
        <Loader2Icon className="animate-spin text-primary" />
      </div>
    );
  } else if (list.length) {
    content = (
      <ul className="p-1">
        {list.map((item, index) => (
          <React.Fragment key={index}>{renderItem(item)}</React.Fragment>
        ))}
      </ul>
    );
  } else {
    content = (
      <div className="flex-1 flex justify-center items-center">
        <p>{emptyMessage}</p>
      </div>
    );
  }
  return (
    <>
      <header className="h-16 flex items-center px-3 gap-3 border-b-border border-b-1">
        {header.btn}
        {header.input}
      </header>
      {content}
    </>
  );
}

export default Panel;
