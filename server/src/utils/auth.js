// Mock user data instead of a database
const USERS = [
  { id: "1", username: "ehsan", password: "123456" },
  { id: "2", username: "narges", password: "123456" },
  { id: "3", username: "admin", password: "123456" },
  { id: "4", username: "abbas", password: "123456" },
];

export function findUserByCredentials(username, password) {
  return USERS.find((u) => u.username === username && u.password === password) || null;
}
