import FormData from "form-data";
import fetch from "node-fetch";

function uploadImage(rawData: string) {
  const formData = new FormData();
  formData.append("image", rawData);
  formData.append("type", "base64");
  return fetch("https://api.imgur.com/3/upload", {
    method: "POST",
    headers: {
      Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
    },
    body: formData,
  });
}

export default uploadImage;
