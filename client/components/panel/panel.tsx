import React from "react";

interface IProps<T> {
  header: { btn: React.ReactNode; input: React.ReactNode };
  main?: React.ReactNode;
  list: Array<T>;
  renderItem: (item: T) => React.ReactNode;
  empty?: React.ReactNode;
}
// Using render props + generic to create a reusable panel component
function Panel<T>({
  header,
  main,
  list,
  renderItem,
  empty = <p>No items available</p>,
}: IProps<T>) {
  let content;
  if (list.length) {
    content = (
      <ul className="p-1">
        {list.map((item, index) => (
          <React.Fragment key={index}>{renderItem(item)}</React.Fragment>
        ))}
      </ul>
    );
  } else {
    content = (
      <div className="flex-1 flex justify-center items-center">{empty}</div>
    );
  }
  return (
    <>
      <header className="h-16 flex items-center px-3 gap-3 border-b-border border-b-1">
        {header.btn}
        {header.input}
      </header>
      {main && <div className="flex justify-center items-center">{main}</div>}
      {content}
    </>
  );
}

export default Panel;
