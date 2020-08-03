import $ from "jquery";

function resizeSelect() {
  let currentText = $(this).find("option:selected").text();
  $(this).siblings(".tmp-select").find("option").text(currentText);
  $(this).width($(this).siblings(".tmp-select").width()!);
}

function setup() {
  $(".responsive-width-select").change(resizeSelect);
  $(".responsive-width-select").each(resizeSelect);
}

export default { setup };
