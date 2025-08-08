const USERS = [
  { id: "1", username: "ehsan", password: "123456" },
  { id: "2", username: "narges", password: "123456" },
  { id: "3", username: "admin", password: "123456" },
  { id: "4", username: "abbas", password: "123456" },
];

export default function findUserByCredentials(username, password) {
  const normalizedUsername = username.trim().toLowerCase();

  const user = USERS.find(
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
