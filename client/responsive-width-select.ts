import $ from "jquery";

function setup() {
  $(".responsive-width-select").change(function () {
    let currentText = $(this).find("option:selected").text();
    $(this).siblings(".tmp-select").find("option").text(currentText);
    $(this).width($(this).siblings(".tmp-select").width()!);
  });
}

export default { setup };
