export const UserList = [
    {
    id: "1756280677130",
    username: "Ehsan",
    avatarUrl: "https://i.pravatar.cc/150?img=1",
    password: "123456"
  },
  {
    id: "1756280717140",
    username: "Ethan",
    avatarUrl: "https://i.pravatar.cc/150?img=2",
    password: "123456"
  },
  {
    id: "1756280717150",
    username: "Narges",
    avatarUrl: "https://i.pravatar.cc/150?img=3",
    password: "123456"
  },
  {
    id: "1756280717160",
    username: "Narsis",
    avatarUrl: "https://i.pravatar.cc/150?img=4",
    password: "123456"
  },
];

export const UserRepo = {
  findAll() {
    return UserList;
  },

  findById(id) {
    return UserList.find((u) => u.id === id) || null;
  },

  findByUsername(username) {
    const normalizedUsername = username.trim().toLowerCase();
    return UserList.find((u) => u.username.toLowerCase() === normalizedUsername) || null;
  },

  findByCredentials(username, password) {
    const user = this.findByUsername(username);
    if (!user) {
      return { error: "Username not found", status: 404 };
    }
    if (user.password !== password) {
      return { error: "Incorrect password", status: 401 };
    }
    return { user };
  },

  register(username, password) {
    const user = this.findByUsername(username);
    if (user) {
      return { error: "The username has already been taken", status: 409 };
    }
    const newUser = {
      id: String(Date.now()),
      username,
      avatarUrl: `https://i.pravatar.cc/150?img=${UserList.length + 1}`,
      password,
    };
    UserList.push(newUser);
    return newUser;
  },
};
