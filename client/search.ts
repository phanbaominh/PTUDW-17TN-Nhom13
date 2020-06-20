import $ from "jquery";

function setup() {
  $("#search__filter-trigger").click(function () {
    $(".search__filter").addClass("active");
  });
  $(".search__filter-underlay").click(function () {
    $(".search__filter").removeClass("active");
  });
}

export default { setup };
