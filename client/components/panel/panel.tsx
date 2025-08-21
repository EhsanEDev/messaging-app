import React from "react";

interface IProps<T> {
  header: { btn: React.ReactNode; input: React.ReactNode };
  list: Array<T>;
  renderItem: (item: T) => React.ReactNode;
  emptyMessage?: string;
};
// Using render props + generic to create a reusable panel component
function Panel<T>({
  header,
  list,
  renderItem,
  emptyMessage = "No items available",
}: IProps<T>) {
  return (
    <>
      <header className="h-16 flex items-center px-6 gap-4 border-b-border border-b-1">
        {header.btn}
        {header.input}
      </header>
      {list.length ? (
        <ul className="p-2">
          {list.map((item, index) => (
            <li key={index}>{renderItem(item)}</li>
          ))}
        </ul>
      ) : (
        <div className="h-full flex justify-center items-center">
          <p>{emptyMessage}</p>
        </div>
      )}
    </>
  );
}

export default Panel;
