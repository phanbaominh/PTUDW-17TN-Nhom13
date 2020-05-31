interface User {
  username: string;
  password: string;
  profilePicture: string;
}

const DUMMY_USER: User = {
  username: "1712932",
  password: "123",
  profilePicture: "/images/baka-user-profile-picture.png"
};

export default User;
export { DUMMY_USER };
