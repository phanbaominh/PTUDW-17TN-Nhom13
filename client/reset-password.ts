import $ from "jquery";
import "./global";

interface ResetPasswordFormElement extends HTMLFormElement {
  password: HTMLInputElement;
  password1: HTMLInputElement;
}

function setup() {
  $("#reset-password-form").submit(function (e) {
    let form = e.target as ResetPasswordFormElement;
    let password = form.password.value;
    let password1 = form.password1.value;
    if (password !== password1) {
      window.flash("error", "Mật khẩu không khớp");
      return false;
    }
  });
}

export default { setup };
