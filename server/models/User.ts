interface User {
  username: string;
  password: string;
  fullname: string;
  profilePicture: string;
}

const DUMMY_USER: User = {
  username: "1712932",
  password: "123",
  fullname: "Phan Bảo Minh",
  profilePicture:
    "https://lh3.googleusercontent.com/a-/AOh14Gi0DgItGDTATTFV6lPiVrqtja6RZ_qrY91zg42o-g"
};

const DUMMY_USER2: User = {
  username: "1712092",
  password: "123",
  fullname: "Hồ Nguyễn Hải Tuấn",
  profilePicture:
    "/images/user__avatar1.jpg"
};

const DUMMY_USER3: User = {
  username: "1712932",
  password: "123",
  fullname: "Nguyễn Hy Hoài Lâm",
  profilePicture:
    "/images/user__avatar2.jpg"
};

const DUMMY_USERS = [
  DUMMY_USER,
  DUMMY_USER2,
  DUMMY_USER3,
];
export default User;
export { DUMMY_USER, DUMMY_USERS };
