import { UserList } from "../constants/users.js";

export default function findUserByCredentials(username, password) {
  const normalizedUsername = username.trim().toLowerCase();

  const user = UserList.find(
    (u) => u.username.toLowerCase() === normalizedUsername
  );

  if (!user) {
    return { error: "Username not found", status: 404 };
  }

  if (user.password !== password) {
    return { error: "Incorrect password", status: 401 };
  }

  return { user };
}
