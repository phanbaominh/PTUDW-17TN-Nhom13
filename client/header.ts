import $ from "jquery";

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

export default { setup: setupHeader };
