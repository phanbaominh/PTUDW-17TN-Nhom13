import $ from "jquery";
import setupBookDetail from "./book_detail";
import carousel from "./book_carousel";
import profile from "./profile";
import settings from "./settings";
import responsiveSelect from "./responsive-width-select";
import search from "./search";
import notification from "./notification";
import resetPassword from "./reset-password";

function setupHeader() {
  $("#hamburger-button").click(function () {
    $("#header-menu").toggleClass("hidden");
    $("#notification-menu").addClass("hidden");
  });
  $("#notification-button").click(function () {
    $("#header-menu").addClass("hidden");
    $("#notification-menu").toggleClass("hidden");
  });
  $(".header__dropdown--trigger").click(function () {
    $(this).siblings(".header__dropdown").toggleClass("hidden");
  });

  window.addEventListener("click", function (e) {
    $(".header__dropdown--wrapper").each(function () {
      if (!$(this)[0].contains(e.target as Node)) {
        $(this).find(".header__dropdown").addClass("hidden");
      }
    });
  });
}

$(document).ready(function () {
  setupHeader();
  setupBookDetail();
  carousel.setup();
  profile.setup();
  settings.setup();
  responsiveSelect.setup();
  search.setup();
  notification.setup();
  resetPassword.setup();
});
