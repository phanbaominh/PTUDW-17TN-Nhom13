import $ from "jquery";

function setHeaderSelectWidth(this: HTMLElement) {
  let currentText = $(this).find(".main option:selected").text();
  $(this).find(".tmp option").text(currentText);
  $(this).find(".main").width($(this).find(".tmp").width()!);
}

$(document).ready(function () {
  $("#header-select").each(setHeaderSelectWidth);
  $("#header-select").change(setHeaderSelectWidth);

  // Handlers for sidebar
  $("#header-hamburger").click(function () {
    $("#sidebar").toggleClass("active");
  });
  $("body").click(function (e: JQuery.ClickEvent) {
    if ($("#sidebar-wrapper").has(e.target).length === 0) {
      $("#sidebar").removeClass("active");
    }
  });
});
