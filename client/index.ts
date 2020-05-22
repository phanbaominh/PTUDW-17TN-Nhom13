import $ from "jquery";

function setHeaderSelectWidth(this: HTMLSelectElement) {
  let currentText = $(this).find(".main option:selected").text();
  $(this).find(".tmp option").text(currentText);
  $(this).find(".main").width($(this).find(".tmp").width());
}

$(document).ready(function () {
  $("#header-select").each(setHeaderSelectWidth);
  $("#header-select").change(setHeaderSelectWidth);
});
