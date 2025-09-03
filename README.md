# 🏗️ Project Architecture Overview

This document outlines the updated architectural decisions, structure, and flow for our messaging app project based on **Next.js** (frontend) and **Node.js (Express + Socket.IO)** (backend).

---

## 🧩 Project Structure

```bash
messaging-app/
├── client/            # Next.js (React) frontend
│── server/            # Node.js + Express + Socket.IO backend
```

---

## 🔐 Authentication & Data Flow (Shared)

* **JWT token** is stored in a **secure, HTTP-only cookie**.
* Token is **automatically sent** in the `Cookie` header on every request.
* **Consumers** of the token:

  * **Frontend (Client)** — for page access checks and protecting routes.
  * **Backend (Server)** — for API request authentication and user validation.
* Server components can read the token from cookies for SSR data fetching.
* Socket connections read the token from cookies during handshake.

---

## 💻 Client-Side Details

* Built with **Next.js** App Router.
* Uses **server components** for initial data fetching and SSR.
* **Client components** handle:

  * Real-time socket events via `useChatSocket`.
  * UI state management for messages, typing indicators, and chat actions.
* UI is broken down into reusable parts (Toolbar, Thread, Composer).
* No direct socket logic inside UI components; all handled in hooks.

---

## 🖥️ Server-Side Details

* Built with **Express.js** + **Socket.IO**.
* Middleware stack includes:

  * Cookie parsing.
  * JWT verification.
* Socket.IO namespaces/rooms for chats.
* API endpoints for:

  * Fetching chat history.
  * Managing participants.
  * Authentication.
* Emits and listens for real-time events: `message:new`, `typing:start`, `typing:stop`.

---

## 🧠 Key Design Decisions

1. **Separation of Concerns** — Shared responsibilities are clearly defined between client and server.
2. **Central Socket Layer** — All real-time logic is contained in one place for maintainability.
3. **Composable UI** — Reusable, isolated UI components.
4. **Unified Auth Strategy** — Both client and server use the same token source via cookies.

---

## License  
This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.  
