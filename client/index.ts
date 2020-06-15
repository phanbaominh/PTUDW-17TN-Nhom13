import $ from "jquery";

function setupHeader() {
  $("#hamburger-button").click(function () {
    $("#header-menu").toggleClass("hidden");
  });
}

$(document).ready(function () {
  setupHeader();
});
