// "use client";

// import { socket } from "@/lib/socket";
// import { useEffect, useState } from "react";
// // import { SOCKET_EVENTS } from "../../";
// const SOCKET_EVENTS = {
//   REGISTER_USER: "register_user",
//   SEND_PRIVATE_MESSAGE: "send_private_message",
//   RECEIVE_PRIVATE_MESSAGE: "receive_private_message",
//   SEND_GROUP_MESSAGE: "send_group_message",
//   RECEIVE_GROUP_MESSAGE: "receive_group_message",
// } as const;
// export default function Dashboard() {
//   const [userName, setUserName] = useState<string>("");
//   const [input, setInput] = useState("");
//   const [messages, setMessages] = useState<string[]>([]);

//   useEffect(() => {
//     socket.on(SOCKET_EVENTS.RECEIVE_PRIVATE_MESSAGE, (msg) => {
//       console.log("Private message received:", msg);
//       setMessages((prevMessages) => [...prevMessages, msg.text]);
//     });
//     socket.on(SOCKET_EVENTS.RECEIVE_GROUP_MESSAGE, (msg) => {
//       console.log("Group message received:", msg);
//       setMessages((prevMessages) => [...prevMessages, msg.text]);
//     });

//     return () => {
//       socket.off(SOCKET_EVENTS.RECEIVE_PRIVATE_MESSAGE, (msg) => {});
//       socket.off(SOCKET_EVENTS.RECEIVE_GROUP_MESSAGE, (msg) => {});
//     };
//   }, []);

//   const sendGroupMessage = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const text = Object.fromEntries(new FormData(e.target as HTMLFormElement))
//       .groupMessage as string;
//     socket.emit(SOCKET_EVENTS.SEND_GROUP_MESSAGE, {
//       text: text,
//       from: userName,
//       group: "family",
//       time: new Date().toISOString(),
//     });
//   };

//   const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const to = Object.fromEntries(new FormData(e.target as HTMLFormElement))
//       .recipient as string;
//     socket.emit(SOCKET_EVENTS.SEND_PRIVATE_MESSAGE, {
//       text: input,
//       from: userName,
//       to: to,
//       time: new Date().toISOString(),
//     });
//     setInput("");
//   };
//   const registerUser = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const name = Object.fromEntries(new FormData(e.target as HTMLFormElement))
//       .username as string;
//     setUserName(name);
//     socket.emit(SOCKET_EVENTS.REGISTER_USER, { userId: name });
//   };

//   return (
//     <div className="">
//       <h1>Private Chat</h1>
//       <h2>{userName}</h2>
//       <ul>
//         {messages.map((msg, index) => (
//           <li key={index}>{msg}</li>
//         ))}
//       </ul>
//       <form onSubmit={sendMessage}>
//         <input
//           type="text"
//           placeholder="enter message"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//         />
//         <input
//           type="text"
//           name="recipient"
//           placeholder="enter recipient username"
//         />
//         <button type="submit">Send</button>
//       </form>
//       <form onSubmit={sendGroupMessage}>
//         <input
//           type="text"
//           name="groupMessage"
//           placeholder="Enter your group message"
//         />
//         <button type="submit">send group</button>
//       </form>
//     </div>
//   );
// }
