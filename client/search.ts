import $ from "jquery";
import qs from "querystring";

function setup() {
  $("#search__filter-trigger").click(function () {
    $(".search__filter").addClass("active");
  });
  $(".search__filter-underlay").click(function () {
    $(".search__filter").removeClass("active");
  });

  $(".sort-select").change(function (this: HTMLSelectElement) {
    let search = qs.parse(location.search.slice(1));
    let sort = this.value;
    search.sort = sort;
    location.href = "/search?" + qs.stringify(search);
  });
}

export default { setup };
