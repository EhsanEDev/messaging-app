# 🏗️ Project Architecture Overview

This document outlines the key architectural decisions, structure, and flow for a messaging app project based on a **Next.js** frontend and a **Node.js (Express + Socket.IO)** backend.

---

## 🔐 Login & Token Flow

### 1. **User submits login form**

* Frontend: Sends `POST` request to `http://localhost:4000/api/auth/signin` with `{ username, password }`.

### 2. **Backend validates user**

* If credentials are valid, returns a JWT signed with a secret.
* Token includes user info (e.g., `id`, `username`).

### 3. **Frontend stores token**

```ts
sessionStorage.setItem("auth_token", token);
```

### 4. **Token usage**

* **HTTP requests**: Attach token in `Authorization` header:

```ts
fetch("/api/messages", {
  headers: { Authorization: `Bearer ${token}` }
});
```

* **WebSocket**: Attach token when connecting:

```ts
io("http://localhost:4000", {
  auth: { token }
});
```

### 🧠 Key Concept:

> JWT **is not for page-level access**, it’s for **data-level access**.

**What it means:**

* Pages/components in Next.js are accessible and renderable regardless of authentication.
* But actual **data** (e.g., messages, user info) is protected and fetched conditionally using the token.
* This decouples routing/UI from sensitive data access.

---

## 🧠 Responsibilities

### 📦 Server (apps/server)

* Handles API endpoints (e.g., `/api/auth/signin`)
* Manages WebSocket connections and events
* Authenticates requests using JWT (via Express and Socket.IO middleware)
* Responsible for persisting and broadcasting data

### 🖥️ Client (apps/web)

* Renders all pages and components
* Handles form submissions and API calls
* Maintains token in `sessionStorage`
* Initiates WebSocket connection with token
* Shows/hides UI conditionally based on login state (via context or state)

---
