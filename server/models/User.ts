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

export default User;
export { DUMMY_USER };
