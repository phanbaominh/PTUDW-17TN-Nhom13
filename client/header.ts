import $ from "jquery";

function setHeaderSelectWidth(this: HTMLElement) {
  let currentText = $(this).find(".main option:selected").text();
  $(this).find(".tmp option").text(currentText);
  $(this).find(".main").width($(this).find(".tmp").width()!);
}

function setup() {
  $("#header-select").each(setHeaderSelectWidth);
  $("#header-select").change(setHeaderSelectWidth);

  // Handlers for sidebar
  $("#header-hamburger").click(function () {
    $("#sidebar").toggleClass("active");
  });
  $("body").click(function handleClickOutsideSidebar(e: JQuery.ClickEvent) {
    if ($("#sidebar-wrapper").has(e.target).length === 0) {
      $("#sidebar").removeClass("active");
    }
  });

  // Handlers for user menu
  $("#header__user-menu__trigger").click(function () {
    $("#header__user-menu").toggleClass("active");
  });
  $("body").click(function handleClickOutsideUserMenu(e: JQuery.ClickEvent) {
    if ($("#header__user-menu--wrapper").has(e.target).length === 0) {
      $("#header__user-menu").removeClass("active");
    }
  });
}

export default { setup };
